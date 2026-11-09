// Vercel serverless function: POST /api/contact
// Saves the enquiry form to MongoDB. The connection string lives only in the MONGODB_URI
// environment variable (never in the browser bundle).
import { MongoClient } from 'mongodb'

const DB_NAME = process.env.MONGODB_DB || 'northlight_studio'
const COLLECTION = 'contact_submissions'

// reuse one connection across warm invocations
let clientPromise
const getCollection = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
  clientPromise ||= new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 }).connect()
  const col = (await clientPromise).db(DB_NAME).collection(COLLECTION)
  await col.createIndex({ createdAt: -1 }).catch(() => {})
  return col
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    const col = await getCollection()
    await col.insertOne({
      ...doc,
      status: 'new',
      createdAt: new Date(),
      userAgent: clean(req.headers['user-agent'], 300),
    })
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
