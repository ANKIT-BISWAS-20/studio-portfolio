// ─────────────────────────────────────────────────────────────
//  CONTENT CONSTANTS: names, text, links, projects.
//  Edit freely; nothing else in the code needs to change.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Northlight Studio', // placeholder brand: rename freely
  email: 'bakshiprothama@gmail.com',
  phone: '+91 90385 52499',
  whatsapp: '919038552499', // country code + number, no "+". '' hides the link
  contactPerson: { name: 'Prothama Bakshi', role: 'Client partner' },
  availability: 'Taking on new projects',
  responseTime: 'We reply within one working day',
  footerNote: '',
  // Public address of the deployed site. Used for the canonical link, social cards, sitemap and robots.txt.
  // On Vercel it is picked up automatically from the project's production domain; set it here (or via the
  // VITE_SITE_URL environment variable) once you have your own domain, e.g. 'https://northlight.studio'.
  url: 'https://yourstudio.com',
  seo: {
    title: 'Northlight Studio: Web apps, APIs, websites & AI features',
    description:
      'Northlight Studio is a small freelance studio building fast React web apps, FastAPI and Node.js backends, SEO-ready business websites and AI features. Clean code, clear communication, fixed quotes.',
    image: '/og-image.png', // 1200x630, in /public
    imageAlt: 'Northlight Studio: web products that feel considered',
    locale: 'en_IN',
    themeColor: '#5B5BF0',
    sameAs: [], // profile links (GitHub, LinkedIn…) to list in the search-engine data, e.g. ['https://github.com/you']
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
  services: {
    eyebrow: '( What we do )',
    title: 'Four things,',
    accent: 'done properly.',
    hint: 'Tap the arrow on any row to see what we do and where we have done it.',
  },
  work: {
    eyebrow: '( Selected work )',
    title: 'Proof,',
    accent: 'not promises.',
    lede: "A mix of shipped work and design studies. Each one is labelled honestly, so you always know what you're looking at.",
  },
  showcase: {
    eyebrow: '( Behind the build )',
    title: 'Craft,',
    accent: 'in every detail.',
    lede: 'Late nights, clean commits and a lot of small decisions that add up to something that feels right.',
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
  sentLabel: 'Sending…',
  doneLabel: 'Sent, thank you!',
  rateLimitLabel: 'Please wait',
  errorNote: "We couldn't save that just now, so your email app is opening instead.",
  rateLimitNote: 'You recently sent an enquiry. Please wait up to 10 minutes before sending another.',
  sentNote: 'Thanks! Your enquiry has reached us and we will reply by email.',
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
    icon: 'svcApp',
    desc: 'Dashboards, SaaS products and internal tools, built to be fast, accessible and easy to extend.',
    tags: ['React', 'Next.js', 'TypeScript'],
    more: {
      photo: 'dash',
      intro: 'From a first wireframe to a deployed app your team can actually use every day.',
      points: [
        'Interface design and reusable component systems in React / Next.js',
        'Sign-in, roles and permissions',
        'Data tables, charts, forms and file uploads',
        'Layouts that work on phones as well as desktops',
        'Performance work: code splitting, lazy loading and caching',
      ],
      doneLabel: 'Where we have done it',
      done: 'Pujo Night Planner (accounts and live shared plans) and the Retail Ops Dashboard study (sales, products, discounts and reports).',
    },
  },
  {
    n: '02',
    title: 'Backend & APIs',
    icon: 'svcApi',
    desc: 'Clean REST APIs, database design, migrations, authentication and role-based access.',
    tags: ['FastAPI', 'Node.js', 'PostgreSQL'],
    more: {
      photo: 'code',
      intro: 'The part users never see but always feel: reliable, documented and ready to grow.',
      points: [
        'REST API design with clear contracts and documentation',
        'PostgreSQL schema design and safe migrations',
        'Authentication and role-based access control',
        'Validation, error handling and logging',
        'Integrations with third-party services',
      ],
      doneLabel: 'Where we have done it',
      done: '20+ REST APIs shipped professionally on enterprise ERP and SaaS platforms, and the backend architecture for Udayaam, designed from scratch.',
    },
  },
  {
    n: '03',
    title: 'Business & landing sites',
    icon: 'svcSite',
    desc: 'Sharp, responsive websites that load quickly and turn visitors into enquiries.',
    tags: ['Responsive', 'SEO-ready', 'Animations'],
    more: {
      photo: 'cafe',
      intro: 'A site that looks considered, loads fast and makes it easy to get in touch.',
      points: [
        'Responsive pages tuned for mobile speed',
        'SEO basics: semantic markup, titles, descriptions and sitemaps',
        'Motion and micro-interactions that stay smooth on phones',
        'Enquiry forms, email and WhatsApp links',
        'Content you can edit without touching the layout',
      ],
      doneLabel: 'Where we have done it',
      done: 'Bloom & Bean (a warm one-page café site, as a concept) and this studio site itself.',
    },
  },
  {
    n: '04',
    title: 'AI integrations',
    icon: 'svcAi',
    desc: 'Chatbots, search and automation powered by modern LLM APIs, wired into your existing product.',
    tags: ['LLM APIs', 'Automation', 'Search'],
    more: {
      photo: 'learn',
      intro: 'Practical AI that saves people time, added to the product you already have.',
      points: [
        'Chat assistants that answer from your own content',
        'Summaries and automatic notes',
        'Search and recommendations',
        'Workflow automation with LLM APIs',
        'Caching and guardrails to keep speed and cost under control',
      ],
      doneLabel: 'Where we have done it',
      done: 'Optimi-Z (Gemini-powered video summaries, notes and a doubt-solving chatbot) and Udayaam (AI roadmap generation for 145,000+ schools).',
    },
  },
]

// Keep labels honest: "Case study", "Personal project" or "Concept".
// Swap concepts for real client work (with permission) as you win it.
// `image`: a photo key from images.js, or any full image URL.
// `video`: { type: 'youtube' | 'loom', id, url, start? } opens a player on the card.
// `links`: extra buttons on the card. `featured` makes the card full-width.
export const projects = [
  {
    title: 'Udayaam',
    kind: 'Case study',
    year: '2024',
    desc: 'An AI-driven platform for standardising odd school structures across India, spanning 145,000+ schools. Built by a team of six: roadmap generation, resource allocation and stakeholder engagement, on a backend architecture designed from scratch.',
    tags: ['AI platform', 'Backend architecture', 'Team lead'],
    badge: '1st place · Smart India Hackathon 2024',
    featured: true,
    image: 'https://i.ytimg.com/vi/PzK6Q-YX0DI/hqdefault.jpg', // YouTube thumbnail of the demo
    imageFallback: 'night',
    video: { type: 'youtube', id: 'PzK6Q-YX0DI', url: 'https://youtu.be/PzK6Q-YX0DI', label: 'Watch demo' },
    links: [],
  },
  {
    title: 'Optimi-Z',
    kind: 'Hackathon project',
    year: '2025',
    desc: 'Turn hustle into habit. A Chrome extension that opens YouTube lessons in a distraction-free focus mode, tracks attention in the browser with face tracking, writes AI summaries and timestamped notes, and answers doubts with a built-in Gemini chatbot. Built with Team Velocis (4 people) at Diversion 2K25.',
    points: [
      'Full-screen focus mode with personal attention analytics',
      'AI summaries and downloadable timestamped notes',
      'Gemini chatbot for instant doubt-solving without leaving the video',
      'Web Workers keep face tracking and AI work from slowing the browser',
    ],
    tags: ['Chrome extension', 'React', 'Node.js', 'MongoDB', 'Gemini API', 'MediaPipe'],
    badge: 'Built at Diversion 2K25',
    featured: true,
    flip: true,
    image: 'https://assets.devfolio.co/hackathons/da10b8cf1e0a4418a5a189d54a221c70/projects/3f2dbffad8e548a49ce9279610772c25/fc99fc08-d1c8-4117-9f90-3390e9a45138.jpeg',
    imageFallback: 'learn',
    video: {
      type: 'loom',
      id: 'cc833cd9881248c9ad03ce34c97cc76b',
      start: 2,
      url: 'https://www.loom.com/share/cc833cd9881248c9ad03ce34c97cc76b?t=2',
      label: 'Watch demo',
    },
    links: [
      { label: 'Live site', href: 'https://optimi-z-frontend.vercel.app/' },
      { label: 'Devfolio', href: 'https://devfolio.co/projects/optimiz-af12' },
      { label: 'Frontend repo', href: 'https://github.com/AnushkaBanerjee/Optimi-Z-Frontend' },
      { label: 'Server repo', href: 'https://github.com/ANKIT-BISWAS-20/Optimi-Z-Server' },
      { label: 'Optima repo', href: 'https://github.com/Rohxn16/optimiz-optima' },
    ],
  },
  {
    title: 'Pujo Night Planner',
    kind: 'Personal project',
    year: '2026',
    desc: 'A Durga Puja night-out planner for pandal hopping around Kolkata, with accounts and live, shared plans for groups of friends.',
    tags: ['React', 'Auth', 'Realtime'],
    badge: '',
    image: 'night',
    links: [{ label: 'Live app', href: 'https://sasthinightpujoplan.vercel.app/' }],
  },
  {
    title: 'Retail Ops Dashboard',
    kind: 'Concept',
    year: '2026',
    desc: 'A design study for a merchant dashboard: sales, products, discounts and reports in one calm, fast interface.',
    tags: ['React', 'Data tables', 'Charts'],
    badge: '',
    image: 'dash',
    links: [],
  },
  {
    title: 'Bloom & Bean',
    kind: 'Concept',
    year: '2026',
    desc: 'A design study for a neighbourhood café: menu, story and bookings in a warm, animated one-page site.',
    tags: ['Landing page', 'Motion', 'SEO-ready'],
    badge: '',
    featured: true,
    image: 'cafe',
    links: [],
  },
]

// Photos for the Craft section (keys from images.js). `anim` is a slot in animations.js.
export const showcase = [
  { photo: 'night', anim: 'craftCode', label: 'Clean code', note: 'Readable, tested and easy for the next person to pick up.', chips: ['Readable', 'Tested', 'Documented'] },
  { photo: 'dash', anim: 'craftData', label: 'Clear data', note: 'Dashboards that answer the question at a glance.', chips: ['Charts', 'Tables'] },
  { photo: 'cafe', anim: 'craftDesign', label: 'Warm design', note: 'Sites with a personality that matches the business.', chips: ['Brand', 'Motion'] },
]

// Words that scroll along the bottom of the Craft section
export const principles = ['Readable code', 'Honest scope', 'Fast pages', 'Accessible by default', 'Clear commits', 'Small decisions', 'Calm interfaces']

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
