import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SITE_URL = "https://taskfixltd.com";
const PHONE_NUMBER = "07346 811790";
const WHATSAPP_URL = "https://wa.me/447346811790";
const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const MODEL_MAX_OUTPUT_TOKENS = 500;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type WebChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type AiReply = {
  text: string;
  incomplete: boolean;
};

// ── Service definitions (mirrors the website) ──────────────────────────
const services = [
  {
    slug: "gardening",
    name: "Gardening",
    emoji: "🌱",
    short: "Lawns mowed, hedges trimmed, gardens tidied.",
  },
  {
    slug: "painting",
    name: "Painting",
    emoji: "🎨",
    short: "Interior and exterior painting, neat and tidy.",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    emoji: "✨",
    short: "Deep cleans, end-of-tenancy, regular visits.",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    emoji: "🔧",
    short: "Leaks, taps, toilets and small installs.",
  },
  {
    slug: "electrical",
    name: "Electrical",
    emoji: "⚡",
    short: "Sockets, lights and small electrical jobs.",
  },
  {
    slug: "handyman-jobs",
    name: "Handyman Jobs",
    emoji: "🔨",
    short: "Odd jobs, repairs and small fixes around the home.",
  },
  {
    slug: "carpet-removal",
    name: "Carpet Removal",
    emoji: "✂️",
    short: "Old carpets pulled up and taken away.",
  },
  {
    slug: "carpet-fitting",
    name: "Carpet Fitting",
    emoji: "🏠",
    short: "Precise fitting for any room or stairs.",
  },
  {
    slug: "house-removals",
    name: "House Removals",
    emoji: "🚚",
    short: "Full house moves, carefully and on time.",
  },
  {
    slug: "man-with-van",
    name: "Man with Van",
    emoji: "📦",
    short: "Single items or small loads, anywhere local.",
  },
] as const;

const WEBSITE_CONTEXT = [
  "Task-Fix is a local UK home services team. Brand line: Every job, sorted.",
  `Website: ${SITE_URL}`,
  `Contact page for free quotes: ${SITE_URL}/contact`,
  `Phone and WhatsApp: ${PHONE_NUMBER}`,
  `WhatsApp link: ${WHATSAPP_URL}`,
  "",
  "Services:",
  ...services.map((service) => `- ${service.name}: ${service.short}`),
  "- Other / Not sure: customers can describe the job and Task-Fix will route it.",
  "",
  "Pricing and quote policy:",
  "- Free quotes.",
  "- No call-out fee.",
  "- Quick fix jobs are from £39/hour with a 1-hour minimum.",
  "- Half day is £149 for up to four hours of stacked jobs.",
  "- Larger work is quoted as a fixed-price project.",
  "- Materials are charged at cost where needed.",
  "- Task-Fix is fully insured with public liability cover.",
  "",
  "Availability and area:",
  "- Routine bookings run 8am-8pm every day.",
  "- Emergency callouts are available 24/7.",
  "- Task-Fix covers the local town, surrounding villages, and roughly a 100-mile radius.",
  "- Removals and man-with-van work can go further by quote.",
  "",
  "Quote request details to collect:",
  "- Service needed.",
  "- Postcode or area.",
  "- Preferred date/time and urgency.",
  "- Short description of the job.",
  "- Photos if helpful.",
].join("\n");

const KNOWLEDGE_CHUNKS = [
  {
    title: "Services",
    keywords: [
      "service",
      "services",
      "repair",
      "fix",
      "plumbing",
      "electrical",
      "painting",
      "cleaning",
      "garden",
      "gardening",
      "handyman",
      "carpet",
      "removal",
      "removals",
      "van",
      "moving",
    ],
    content: services.map((service) => `${service.name}: ${service.short}`).join("\n"),
  },
  {
    title: "Prices and Quotes",
    keywords: ["quote", "qoute", "price", "prices", "cost", "charge", "charges", "pricing", "estimate", "pay"],
    content: [
      "Free quotes.",
      "No call-out fee.",
      "Quick fix jobs are from £39/hour with a 1-hour minimum.",
      "Half day is £149 for up to four hours of stacked jobs.",
      "Larger work is quoted as a fixed-price project.",
      "Materials are charged at cost where needed.",
      "For a quote, collect: service needed, postcode/area, preferred date/time, urgency, short job details, and photos if helpful.",
    ].join("\n"),
  },
  {
    title: "Availability and Service Area",
    keywords: [
      "available",
      "availability",
      "emergency",
      "urgent",
      "outside",
      "area",
      "region",
      "radius",
      "postcode",
      "town",
      "village",
      "villages",
      "far",
      "distance",
      "travel",
      "double",
    ],
    content: [
      "Routine bookings run 8am-8pm every day.",
      "Emergency callouts are available 24/7.",
      "Task-Fix covers the local town, surrounding villages, and roughly a 100-mile radius.",
      "Removals and man-with-van work can go further by quote.",
    ].join("\n"),
  },
  {
    title: "Contact and Navigation",
    keywords: ["contact", "phone", "call", "whatsapp", "number", "website", "form", "book", "booking"],
    content: [
      `Website: ${SITE_URL}`,
      `Contact page: ${SITE_URL}/contact`,
      `Phone: ${PHONE_NUMBER}`,
      `WhatsApp: ${WHATSAPP_URL}`,
      "The assistant can guide visitors to services, pricing, contact, and quote information, but cannot create confirmed bookings or take payment.",
    ].join("\n"),
  },
  {
    title: "Assistant Scope",
    keywords: ["movie", "movies", "film", "watch", "music", "game", "joke", "date", "bye", "dumb", "hell", "ok"],
    content: [
      "The assistant is for Task-Fix website visitors.",
      "If the user asks off-topic questions, answer briefly and naturally, then redirect to Task-Fix home services.",
      "If the user says goodbye, respond politely and leave the door open.",
      "If the user is rude or frustrated, stay calm and useful.",
    ].join("\n"),
  },
];

function tokenizeForRetrieval(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9£]+/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2),
  );
}

function retrieveWebsiteKnowledge(message: string, history: WebChatMessage[]) {
  const recentText = history
    .slice(-4)
    .map((item) => item.content)
    .join(" ");
  const tokens = tokenizeForRetrieval(`${recentText} ${message}`);
  const ranked = KNOWLEDGE_CHUNKS.map((chunk) => ({
    chunk,
    score: chunk.keywords.reduce((score, keyword) => score + (tokens.has(keyword) ? 1 : 0), 0),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const selected = ranked.filter((item) => item.score > 0).map((item) => item.chunk);
  const chunks = selected.length ? selected : KNOWLEDGE_CHUNKS.slice(0, 4);

  return chunks.map((chunk) => `[${chunk.title}]\n${chunk.content}`).join("\n\n");
}

const AI_INSTRUCTIONS = [
  "You are the Task-Fix AI assistant for the Task-Fix website.",
  "Sound like a capable modern AI assistant, not a scripted FAQ menu.",
  "Your job is to help website visitors with Task-Fix only: services, prices, quotes, availability, service area, website navigation, and contact details.",
  "Use the retrieved Task-Fix knowledge below. If a fact is missing, say you are not sure and route the visitor to WhatsApp, phone, or the contact page.",
  "If the visitor asks about anything unrelated to Task-Fix or this website, reply briefly in a human way, then say you can help with Task-Fix home services.",
  "Do not claim that you booked an appointment, accepted payment, dispatched staff, edited the website, or changed any backend data.",
  "When a visitor wants a quote, collect the useful details and point them to the contact page or WhatsApp.",
  "If the visitor asks what you can do, briefly explain that you can help with Task-Fix services, prices, quotes, availability, service areas, navigation, and contact details.",
  "If the visitor says goodbye, says they are leaving, or says they do not need the service, acknowledge politely and leave the door open.",
  "If the visitor is rude or frustrated, stay calm, do not argue, and offer one useful next step.",
  "If the visitor asks about areas outside the normal service region, explain the 100-mile local radius and that removals/man-with-van work can go further by quote.",
  "Answer the user's actual message. Do not repeat the same generic fallback unless the message is genuinely unclear.",
  "Keep replies friendly, direct, and short: 1-4 lines for normal answers, max 8 lines for service lists.",
  "Use chat-style plain text. Do not use Markdown headings, tables, horizontal rules, or code blocks.",
  "Do not use Markdown links. If sharing a link, write the plain URL.",
  "When listing services, use short numbered lines only if the visitor asks for a list or menu.",
  "If listing services, group them briefly instead of explaining every service unless the visitor asks for full details.",
  "",
  "Base Task-Fix context:",
  WEBSITE_CONTEXT,
].join("\n");

function buildWebAiInstructions(message: string, history: WebChatMessage[]) {
  return [
    AI_INSTRUCTIONS,
    "",
    "Retrieved Task-Fix knowledge for this message:",
    retrieveWebsiteKnowledge(message, history),
  ].join("\n");
}

// ── Session helpers ────────────────────────────────────────────────────
interface Session {
  phone: string;
  step: string;
  language: string;
}

async function getSession(phone: string): Promise<Session> {
  const { data } = await supabase.from("whatsapp_sessions").select("*").eq("phone", phone).single();

  if (data) return data as Session;

  const newSession: Session = { phone, step: "welcome", language: "en" };
  await supabase.from("whatsapp_sessions").insert(newSession);
  return newSession;
}

async function updateSession(phone: string, updates: Partial<Pick<Session, "step" | "language">>) {
  await supabase
    .from("whatsapp_sessions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("phone", phone);
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
    ...services.map((s, i) => `${i + 1}. ${s.name} ${s.emoji}`),
    `11. Other / Not sure ❓`,
    ``,
    `Or type *quote* to request a free quote right now.`,
  ].join("\n");
}

function getServiceResponse(index: number): string {
  const s = services[index];
  const quoteUrl = `${SITE_URL}/contact?service=${s.slug}`;

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
  ].join("\n");
}

function getOtherResponse(): string {
  const quoteUrl = `${SITE_URL}/contact`;

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
  ].join("\n");
}

function getQuoteResponse(): string {
  const quoteUrl = `${SITE_URL}/contact`;

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
  ].join("\n");
}

function getInvalidInputMessage(): string {
  return [
    `Sorry, I didn't understand that. 🤔`,
    ``,
    `Please pick a number (1-11) from the menu, or type:`,
    `• *menu* — see all services`,
    `• *quote* — request a free quote`,
    `• *help* — get assistance`,
    ``,
    `If you prefer, call or WhatsApp us 24/7:`,
    `📞 ${PHONE_NUMBER}`,
    ``,
    `Or contact us here:`,
    `${SITE_URL}/contact`,
  ].join("\n");
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
  ].join("\n");
}

function getOwnerResponse(): string {
  return [
    `You're chatting with *Task-Fix* — the local home services team behind this website.`,
    ``,
    `For the owner/team contact, call or WhatsApp us 24/7:`,
    `📞 ${PHONE_NUMBER}`,
    ``,
    `You can also request a free quote here:`,
    `${SITE_URL}/contact`,
  ].join("\n");
}

function getContactResponse(): string {
  return [
    `You can call or WhatsApp Task-Fix 24/7 on:`,
    `📞 ${PHONE_NUMBER}`,
    ``,
    `For a free quote, use:`,
    `${SITE_URL}/contact`,
  ].join("\n");
}

function getServiceIndex(body: string): number | null {
  const numberChoice = parseInt(body, 10);

  if (numberChoice >= 1 && numberChoice <= services.length) {
    return numberChoice - 1;
  }

  const normalized = body
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const normalizedWords = body
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  if (/\bcarpet\b/.test(normalizedWords)) {
    if (/\b(remov|remove|remova|removal|lift|pull|dispose|take away)\w*\b/.test(normalizedWords)) {
      return services.findIndex((service) => service.slug === "carpet-removal");
    }

    if (/\b(fit|fitting|install|lay|stairs|underlay|gripper)\w*\b/.test(normalizedWords)) {
      return services.findIndex((service) => service.slug === "carpet-fitting");
    }
  }

  const serviceIndex = services.findIndex((service) => {
    const normalizedName = service.name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return (
      normalized === service.slug ||
      normalized === normalizedName ||
      body.includes(service.name.toLowerCase()) ||
      service.name
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word.length > 4 && normalizedWords.includes(word))
    );
  });

  return serviceIndex >= 0 ? serviceIndex : null;
}

function hasAnyWord(body: string, words: string[]) {
  return words.some((word) => body.includes(word));
}

async function buildReply(from: string, rawBody: string): Promise<string> {
  const body = rawBody.trim().toLowerCase();

  if (!from || !body) {
    return "Please send a message to get started. Type *hi* or *menu*.";
  }

  if (["menu", "services", "service", "hi", "hello", "start", "hey"].includes(body)) {
    await getSession(from);
    await updateSession(from, { step: "menu" });
    return getWelcomeMessage();
  }

  if (body === "help") {
    return getHelpMessage();
  }

  if (body === "quote" || body === "free quote") {
    return getQuoteResponse();
  }

  if (hasAnyWord(body, ["owner", "boss", "manager", "company name", "your name", "who are you"])) {
    return getOwnerResponse();
  }

  if (hasAnyWord(body, ["number", "phone", "mobile", "call", "whatsapp", "contact"])) {
    return getContactResponse();
  }

  const serviceIndex = getServiceIndex(body);
  if (serviceIndex !== null) {
    await getSession(from);
    await updateSession(from, { step: "menu" });
    return getServiceResponse(serviceIndex);
  }

  if (body === "11" || body === "other" || body === "not sure") {
    await getSession(from);
    await updateSession(from, { step: "menu" });
    return getOtherResponse();
  }

  const session = await getSession(from);

  if (session.step === "welcome") {
    await updateSession(from, { step: "menu" });
    return getWelcomeMessage();
  }

  if (session.step === "menu") {
    return getInvalidInputMessage();
  }

  await updateSession(from, { step: "menu" });
  return getWelcomeMessage();
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function normalizeWebHistory(value: unknown): WebChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .flatMap((item): WebChatMessage[] => {
      if (!item || typeof item !== "object") return [];

      const record = item as Record<string, unknown>;
      const role =
        record.role === "assistant" ? "assistant" : record.role === "user" ? "user" : null;
      const content = typeof record.content === "string" ? record.content.trim() : "";

      if (!role || !content) return [];

      return [{ role, content: content.slice(0, 1200) }];
    })
    .slice(-8);
}

function getLastWord(value: string) {
  return value.toLowerCase().match(/[a-z]+$/)?.[0] ?? "";
}

function looksIncompleteReply(value: string) {
  const text = value.trim();
  if (!text) return true;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lastLine = lines.at(-1) ?? text;

  if (/https?:\/\/\S+$/i.test(lastLine) || /\b\d{5,}\b$/.test(lastLine)) return false;
  if (/[.!?)]["']?$/.test(lastLine)) return false;

  const weakEndingWords = new Set([
    "a",
    "an",
    "and",
    "at",
    "by",
    "can",
    "for",
    "from",
    "get",
    "in",
    "of",
    "or",
    "the",
    "to",
    "visiting",
    "with",
    "your",
  ]);
  const words = lastLine.split(/\s+/).filter(Boolean);

  return words.length <= 12 || weakEndingWords.has(getLastWord(lastLine));
}

function buildCompletionRetryMessage(originalMessage: string, partialReply: string) {
  return [
    "Your previous answer was cut off before it finished.",
    "Rewrite the full answer to the visitor's original message below.",
    "Do not mention the cut-off. Do not continue mid-sentence. Return one complete answer.",
    "End with a full sentence, phone number, or plain URL.",
    "",
    `Original visitor message: ${originalMessage}`,
    "",
    `Cut-off answer: ${partialReply}`,
  ].join("\n");
}

function getFallbackAiReply(_message: string) {
  return [
    "I'm having trouble reaching the AI assistant right now.",
    `For Task-Fix help, send the job details, postcode, and preferred time here: ${SITE_URL}/contact`,
    `You can also call or WhatsApp ${PHONE_NUMBER}.`,
  ].join("\n");
}

function finishIncompleteReply(partialReply: string, originalMessage: string) {
  const text = partialReply.trim();
  if (!text) return getFallbackAiReply(originalMessage);

  if (/\bget a$/i.test(text)) {
    return `${text} free custom quote. Please share the job details, postcode, and preferred date/time.`;
  }

  if (/\bcan$/i.test(text)) {
    return `${text} use ${SITE_URL}/contact or WhatsApp ${WHATSAPP_URL}`;
  }

  if (/\bvisiting$/i.test(text)) {
    return `${text} ${SITE_URL}/contact.`;
  }

  if (/\b(?:to|for|with|by|at|from|your|the|a|an|and|or|of|in)$/i.test(text)) {
    return `${text} us through ${SITE_URL}/contact.`;
  }

  return /[.!?)]["']?$/.test(text) ? text : `${text}.`;
}

function extractGroqReply(payload: unknown): AiReply | null {
  if (!payload || typeof payload !== "object") return null;

  const choices = (payload as Record<string, unknown>).choices;
  if (!Array.isArray(choices)) return null;

  const chunks: string[] = [];
  let stoppedByLength = false;

  for (const choice of choices) {
    if (!choice || typeof choice !== "object") continue;

    if ((choice as Record<string, unknown>).finish_reason === "length") {
      stoppedByLength = true;
    }

    const message = (choice as Record<string, unknown>).message;
    if (!message || typeof message !== "object") continue;

    const content = (message as Record<string, unknown>).content;
    if (typeof content === "string" && content.trim()) {
      chunks.push(content.trim());
    }
  }

  const text = chunks.join("\n").trim();
  if (!text) return null;

  return { text, incomplete: stoppedByLength || looksIncompleteReply(text) };
}

async function getGroqReply(
  message: string,
  history: WebChatMessage[],
  instructions: string,
): Promise<AiReply | null> {
  const apiKey = Deno.env.get("GROQ_API_KEY");
  if (!apiKey) {
    console.error("GROQ_API_KEY is missing; Groq cannot reply.");
    return null;
  }

  const model = Deno.env.get("GROQ_MODEL") || DEFAULT_GROQ_MODEL;
  const messages = [
    {
      role: "system",
      content: instructions,
    },
    ...history.map((item) => ({
      role: item.role,
      content: item.content,
    })),
    {
      role: "user",
      content: message,
    },
  ];

  try {
    const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_completion_tokens: MODEL_MAX_OUTPUT_TOKENS,
        temperature: 0.3,
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Groq API error payload:", JSON.stringify(payload));

      const error =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>).error : null;
      const errorMessage =
        error && typeof error === "object" ? (error as Record<string, unknown>).message : null;

      console.error(
        `Groq response failed: ${response.status}${
          typeof errorMessage === "string" ? ` ${errorMessage}` : ""
        }`,
      );
      return null;
    }

    return extractGroqReply(payload);
  } catch (error) {
    console.error("Groq fetch threw:", error instanceof Error ? error.message : error);
    return null;
  }
}

async function getAiReply(
  message: string,
  history: WebChatMessage[],
  instructions: string,
): Promise<AiReply | null> {
  return getGroqReply(message, history, instructions);
}

async function getCompleteAiReply(message: string, history: WebChatMessage[]): Promise<string> {
  const instructions = buildWebAiInstructions(message, history);
  const firstReply = await getAiReply(message, history, instructions);
  if (!firstReply) {
    console.error("AI returned null, using local fallback.");
    return getFallbackAiReply(message);
  }
  if (!firstReply.incomplete) return firstReply.text;

  console.error(`AI reply looked incomplete: ${firstReply.text}`);

  const retryReply = await getAiReply(
    buildCompletionRetryMessage(message, firstReply.text),
    history,
    instructions,
  );

  if (retryReply && !retryReply.incomplete) {
    return retryReply.text;
  }

  if (retryReply?.text) {
    console.error(`AI retry still looked incomplete: ${retryReply.text}`);
    return finishIncompleteReply(retryReply.text, message);
  }

  return finishIncompleteReply(firstReply.text, message);
}

// ── TwiML response builder ────────────────────────────────────────────
function twiml(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message><![CDATA[${message}]]></Message>
</Response>`;
}

// ── Main handler ───────────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method === "GET") {
    return jsonResponse({ message: "Task-Fix chatbot is online." });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const contentType = req.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const payload = await req.json();
      const message = typeof payload?.message === "string" ? payload.message : "";
      const history = normalizeWebHistory(payload?.history);

      if (!message.trim()) {
        return jsonResponse({ error: "Message is required." }, 400);
      }

      const reply = await getCompleteAiReply(message.trim(), history);
      return jsonResponse({ reply });
    } catch (error) {
      return jsonResponse(
        { error: error instanceof Error ? error.message : "Invalid request." },
        400,
      );
    }
  }

  // Twilio sends form-encoded POST data
  const formData = await req.formData();
  const from = formData.get("From") as string;
  const body = formData.get("Body") as string;
  const replyMessage = await buildReply(from, body ?? "");

  return new Response(twiml(replyMessage), {
    headers: { ...corsHeaders, "Content-Type": "text/xml" },
  });
});
