import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const SITE_URL = 'https://taskfixltd.com'
const PHONE_NUMBER = '07346 811790'

// ── Service definitions (mirrors the website) ──────────────────────────
const services = [
  { slug: 'gardening',       name: 'Gardening',        emoji: '🌱', short: 'Lawns mowed, hedges trimmed, gardens tidied.' },
  { slug: 'painting',        name: 'Painting',         emoji: '🎨', short: 'Interior and exterior painting, neat and tidy.' },
  { slug: 'cleaning',        name: 'Cleaning',         emoji: '✨', short: 'Deep cleans, end-of-tenancy, regular visits.' },
  { slug: 'plumbing',        name: 'Plumbing',         emoji: '🔧', short: 'Leaks, taps, toilets and small installs.' },
  { slug: 'electrical',      name: 'Electrical',       emoji: '⚡', short: 'Sockets, lights and small electrical jobs.' },
  { slug: 'handyman-jobs',   name: 'Handyman Jobs',    emoji: '🔨', short: 'Odd jobs, repairs and small fixes around the home.' },
  { slug: 'carpet-removal',  name: 'Carpet Removal',   emoji: '✂️', short: 'Old carpets pulled up and taken away.' },
  { slug: 'carpet-fitting',  name: 'Carpet Fitting',   emoji: '🏠', short: 'Precise fitting for any room or stairs.' },
  { slug: 'house-removals',  name: 'House Removals',   emoji: '🚚', short: 'Full house moves, carefully and on time.' },
  { slug: 'man-with-van',    name: 'Man with Van',     emoji: '📦', short: 'Single items or small loads, anywhere local.' },
] as const

// Number labels for the menu — supports up to 11 items
const numberEmojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟','1️⃣1️⃣']

// ── Session helpers ────────────────────────────────────────────────────
interface Session {
  phone: string
  step: string
  language: string
}

async function getSession(phone: string): Promise<Session> {
  const { data } = await supabase
    .from('whatsapp_sessions')
    .select('*')
    .eq('phone', phone)
    .single()

  if (data) return data as Session

  const newSession: Session = { phone, step: 'welcome', language: 'en' }
  await supabase.from('whatsapp_sessions').insert(newSession)
  return newSession
}

async function updateSession(phone: string, updates: Partial<Pick<Session, 'step' | 'language'>>) {
  await supabase
    .from('whatsapp_sessions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('phone', phone)
}

// ── Message builders ───────────────────────────────────────────────────
function getWelcomeMessage(): string {
  return [
    `🔧 *Task-Fix* — Every job, sorted.`,
    ``,
    `Welcome! We're your local team of plumbers, painters, electricians, gardeners and more.`,
    ``,
    `What can we help with? Pick a number:`,
    ``,
    ...services.map((s, i) => `${numberEmojis[i]} ${s.name} ${s.emoji}`),
    `${numberEmojis[10]} Other / Not sure ❓`,
    ``,
    `Or type *quote* to request a free quote right now.`,
  ].join('\n')
}

function getServiceResponse(index: number): string {
  const s = services[index]
  const quoteUrl = `${SITE_URL}/contact?service=${s.slug}`

  return [
    `${s.emoji} *${s.name}*`,
    ``,
    s.short,
    ``,
    `💷 Free quotes · No call-out fee · Fully insured`,
    ``,
    `👉 Get a free quote online:`,
    quoteUrl,
    ``,
    `📞 Or call/WhatsApp us 24/7:`,
    PHONE_NUMBER,
    ``,
    `Type *menu* to see all services again.`,
  ].join('\n')
}

function getOtherResponse(): string {
  const quoteUrl = `${SITE_URL}/contact`

  return [
    `❓ *Not sure which service you need?*`,
    ``,
    `No worries! Just tell us what needs doing and we'll figure it out.`,
    ``,
    `👉 Describe the job here:`,
    quoteUrl,
    ``,
    `📞 Or call/WhatsApp us 24/7:`,
    PHONE_NUMBER,
    ``,
    `Type *menu* to see all services.`,
  ].join('\n')
}

function getQuoteResponse(): string {
  const quoteUrl = `${SITE_URL}/contact`

  return [
    `📝 *Request a Free Quote*`,
    ``,
    `Fill in our quick form (takes 1 minute) and we'll get back to you — usually the same day:`,
    ``,
    `👉 ${quoteUrl}`,
    ``,
    `Or if it's urgent, call us right now:`,
    `📞 ${PHONE_NUMBER}`,
    ``,
    `Type *menu* to browse services.`,
  ].join('\n')
}

function getInvalidInputMessage(): string {
  return [
    `Sorry, I didn't understand that. 🤔`,
    ``,
    `Please pick a number (1-11) from the menu, or type:`,
    `• *menu* — see all services`,
    `• *quote* — request a free quote`,
    `• *help* — get assistance`,
  ].join('\n')
}

function getHelpMessage(): string {
  return [
    `ℹ️ *Task-Fix WhatsApp Help*`,
    ``,
    `Here's what you can do:`,
    ``,
    `• Type *menu* — browse our services`,
    `• Type *quote* — request a free quote`,
    `• Type a number *1-11* — get info on a specific service`,
    `• Type *help* — see this message`,
    ``,
    `📞 Need to speak to someone? Call us 24/7:`,
    PHONE_NUMBER,
    ``,
    `🌐 Visit our website:`,
    SITE_URL,
  ].join('\n')
}

// ── TwiML response builder ────────────────────────────────────────────
function twiml(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message><![CDATA[${message}]]></Message>
</Response>`
}

// ── Main handler ───────────────────────────────────────────────────────
Deno.serve(async (req) => {
  // Twilio sends form-encoded POST data
  const formData = await req.formData()
  const from = formData.get('From') as string
  const body = (formData.get('Body') as string)?.trim()?.toLowerCase()

  if (!from || !body) {
    return new Response(twiml('Please send a message to get started. Type *hi* or *menu*.'), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  let replyMessage = ''

  // ── Global commands (always take priority) ──────────────────────────
  if (['menu', 'hi', 'hello', 'start', 'hey'].includes(body)) {
    await updateSession(from, { step: 'menu' })
    replyMessage = getWelcomeMessage()

    return new Response(twiml(replyMessage), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  if (body === 'help') {
    replyMessage = getHelpMessage()
    return new Response(twiml(replyMessage), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  if (body === 'quote') {
    replyMessage = getQuoteResponse()
    return new Response(twiml(replyMessage), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  // ── Session-based flow ──────────────────────────────────────────────
  const session = await getSession(from)

  // Welcome step — first time users
  if (session.step === 'welcome') {
    await updateSession(from, { step: 'menu' })
    replyMessage = getWelcomeMessage()
  }
  // Menu step — expecting a service number
  else if (session.step === 'menu') {
    const num = parseInt(body, 10)

    if (num >= 1 && num <= 10) {
      replyMessage = getServiceResponse(num - 1)
      // Stay on menu step so they can pick another service
    } else if (num === 11 || body === 'other') {
      replyMessage = getOtherResponse()
    } else {
      replyMessage = getInvalidInputMessage()
    }
  }
  // Fallback
  else {
    await updateSession(from, { step: 'menu' })
    replyMessage = getWelcomeMessage()
  }

  return new Response(twiml(replyMessage), {
    headers: { 'Content-Type': 'text/xml' },
  })
})
