// Vercel serverless function: POST /api/contact
// Saves the enquiry form to MongoDB. The connection string lives only in the MONGODB_URI
// environment variable (never in the browser bundle).
import { createHmac, randomUUID } from 'node:crypto'
import { MongoClient } from 'mongodb'

const DB_NAME = process.env.MONGODB_DB || 'northlight_studio'
const COLLECTION = 'contact_submissions'
const RATE_LIMIT_MS = 10 * 60 * 1000

// reuse one connection across warm invocations
let clientPromise
const getCollection = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
  clientPromise ||= new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 }).connect()
  const db = (await clientPromise).db(DB_NAME)
  const col = db.collection(COLLECTION)
  await col.createIndex({ createdAt: -1 }).catch(() => {})
  const rateLimits = db.collection('contact_rate_limits')
  await rateLimits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
  return { col, rateLimits }
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const visitorKey = (req, email) => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = req.headers['x-real-ip'] || (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '')
  const identity = ip ? `ip:${ip}` : `email:${email}`
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET || process.env.MONGODB_URI
  return createHmac('sha256', secret).update(identity).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const b = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}

  // honeypot: real visitors never fill this hidden field, bots do. Pretend success.
  if (clean(b.website, 200)) return res.status(200).json({ ok: true })

  const doc = {
    name: clean(b.name, 120),
    email: clean(b.email, 200).toLowerCase(),
    type: clean(b.type, 80),
    budget: clean(b.budget, 80),
    message: clean(b.message, 5000),
  }
  if (!doc.name || !EMAIL.test(doc.email) || !doc.message) {
    return res.status(400).json({ ok: false, error: 'Please fill in your name, a valid email and a message.' })
  }

  try {
    const { col, rateLimits } = await getCollection()
    const key = visitorKey(req, doc.email)
    const requestId = randomUUID()
    const now = new Date()

    try {
      await rateLimits.updateOne(
        { _id: key, expiresAt: { $lte: now } },
        { $set: { expiresAt: new Date(now.getTime() + RATE_LIMIT_MS), requestId } },
        { upsert: true },
      )
    } catch (err) {
      if (err.code === 11000) {
        const existing = await rateLimits.findOne({ _id: key }, { projection: { expiresAt: 1 } })
        const retryAfter = Math.max(
          1,
          Math.ceil(((existing?.expiresAt?.getTime() ?? now.getTime() + RATE_LIMIT_MS) - now.getTime()) / 1000),
        )
        res.setHeader('Retry-After', String(retryAfter))
        return res.status(429).json({ ok: false, error: 'You recently sent an enquiry. Please wait before sending another.' })
      }
      throw err
    }

    try {
      await col.insertOne({
        ...doc,
        status: 'new',
        createdAt: now,
        userAgent: clean(req.headers['user-agent'], 300),
      })
    } catch (err) {
      await rateLimits.deleteOne({ _id: key, requestId })
      throw err
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact save failed:', err.message)
    clientPromise = undefined // reconnect next time
    return res.status(500).json({ ok: false, error: 'Could not save your message right now.' })
  }
}

function safeJson(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
