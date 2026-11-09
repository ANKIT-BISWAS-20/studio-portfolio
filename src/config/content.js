// ─────────────────────────────────────────────────────────────
//  CONTENT CONSTANTS: names, text, links, projects.
//  Edit freely; nothing else in the code needs to change.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Northlight Studio', // placeholder brand: rename freely
  email: 'hello@yourstudio.com',
  whatsapp: '', // country code + number, no "+", e.g. '919XXXXXXXXX'. '' hides the link
  availability: 'Taking on new projects',
  responseTime: 'We reply within one working day',
  footerNote: '',
  seo: {
    title: 'Northlight Studio: Web products that feel considered',
    description: 'A small freelance web studio building web apps, APIs, business sites and AI features.',
  },
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  title: {
    before: 'We build',
    words: ['web apps', 'APIs that scale', 'business sites', 'AI features'], // rotates
    after: 'that feel considered.',
  },
  lede: 'A small studio for web apps, APIs, business sites and AI features. Thoughtful design, clean code, and a single clear line of communication from first call to launch.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See our work', href: '#work' },
  chips: ['React', 'FastAPI', 'PostgreSQL', 'TypeScript', 'AI'], // floating tags around the animation
  statsCount: 3, // how many items from `stats` to show under the buttons
  scrollCue: 'Scroll',
}

export const sections = {
  services: { eyebrow: '( What we do )', title: 'Four things,', accent: 'done properly.' },
  work: {
    eyebrow: '( Selected work )',
    title: 'Proof,',
    accent: 'not promises.',
    lede: "A mix of shipped work and design studies. Each one is labelled honestly, so you always know what you're looking at.",
  },
  process: { eyebrow: '( How we work )', title: 'Simple,', accent: 'transparent, on time.' },
  team: { eyebrow: '( Two people, one clear line of communication )' },
}

export const contact = {
  eyebrow: "( Let's talk )",
  title: 'Have an idea?',
  accent: "Let's make it real.",
  lede: 'Tell us a little about your project.',
  submitLabel: 'Send enquiry',
  sentLabel: 'Opening your email app…',
  sentNote: 'Your email app should open with the brief ready to send.',
  mailSubject: 'New project enquiry: {type}', // {type} is replaced
  labels: {
    name: 'Your name',
    email: 'Email',
    type: 'Project type',
    budget: 'Budget',
    message: 'About the project',
  },
  types: ['Web app', 'Backend / API', 'Business website', 'AI feature', 'Not sure yet'],
  budgets: ['Under ₹50k', '₹50k – ₹1.5L', '₹1.5L – ₹5L', '₹5L+', "Let's discuss"],
  defaultBudget: "Let's discuss",
}

export const services = [
  {
    n: '01',
    title: 'Web applications',
    desc: 'Dashboards, SaaS products and internal tools, built to be fast, accessible and easy to extend.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    n: '02',
    title: 'Backend & APIs',
    desc: 'Clean REST APIs, database design, migrations, authentication and role-based access.',
    tags: ['FastAPI', 'Node.js', 'PostgreSQL'],
  },
  {
    n: '03',
    title: 'Business & landing sites',
    desc: 'Sharp, responsive websites that load quickly and turn visitors into enquiries.',
    tags: ['Responsive', 'SEO-ready', 'Animations'],
  },
  {
    n: '04',
    title: 'AI integrations',
    desc: 'Chatbots, search and automation powered by modern LLM APIs, wired into your existing product.',
    tags: ['LLM APIs', 'Automation', 'Search'],
  },
]

// Keep labels honest: "Case study", "Personal project" or "Concept".
// Swap concepts for real client work (with permission) as you win it.
export const projects = [
  {
    title: 'Udayaam',
    kind: 'Case study',
    year: '2024',
    desc: 'An AI-driven platform for standardising odd school structures across India, spanning 145,000+ schools. Built by a team of six: roadmap generation, resource allocation and stakeholder engagement, on a backend architecture designed from scratch.',
    tags: ['AI platform', 'Backend architecture', 'Team lead'],
    badge: '1st place · Smart India Hackathon 2024',
    link: '',
  },
  {
    title: 'Pujo Night Planner',
    kind: 'Personal project',
    year: '2026',
    desc: 'A Durga Puja night-out planner for pandal hopping around Kolkata, with accounts and live, shared plans for groups of friends.',
    tags: ['React', 'Auth', 'Realtime'],
    badge: '',
    link: '',
  },
  {
    title: 'Retail Ops Dashboard',
    kind: 'Concept',
    year: '2026',
    desc: 'A design study for a merchant dashboard: sales, products, discounts and reports in one calm, fast interface.',
    tags: ['React', 'Data tables', 'Charts'],
    badge: '',
    link: '',
  },
  {
    title: 'Bloom & Bean',
    kind: 'Concept',
    year: '2026',
    desc: 'A design study for a neighbourhood café: menu, story and bookings in a warm, animated one-page site.',
    tags: ['Landing page', 'Motion', 'SEO-ready'],
    badge: '',
    link: '',
  },
]

export const process = [
  { n: '01', title: 'Discover', desc: 'A short call to understand your goals, users, budget and deadline. You get a clear scope and a fixed quote.' },
  { n: '02', title: 'Design', desc: 'Wireframes and a visual direction you can react to before any heavy code is written.' },
  { n: '03', title: 'Build', desc: 'Weekly progress, a live preview link, and honest updates the moment anything changes.' },
  { n: '04', title: 'Launch & support', desc: 'Deployment, handover documentation and a support window so nothing is left hanging.' },
]

export const team = [
  { role: 'Client partner', desc: 'Your single point of contact. Listens, scopes, keeps the project on schedule and the communication clear.' },
  { role: 'Engineering', desc: 'Full-stack engineering with experience on enterprise ERP and SaaS platforms. Builds what was agreed, properly.' },
]

export const stats = [
  { value: '1st', label: 'Smart India Hackathon 2024' },
  { value: '20+', label: 'REST APIs shipped professionally' },
  { value: '145k+', label: 'schools targeted by our AI platform' },
  { value: '4', label: 'core services, one small team' },
]

export const stack = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redux', 'Tailwind CSS', 'Material UI', 'REST APIs',
]
