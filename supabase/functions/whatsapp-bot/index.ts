import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SITE_URL = "https://taskfixltd.com";
const PHONE_NUMBER = "07346 811790";
const WHATSAPP_URL = "https://wa.me/447346811790";
const GEMINI_GENERATE_CONTENT_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_OPENAI_MODEL = "gpt-5.5";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type WebChatMessage = {
  role: "assistant" | "user";
  content: string;
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

const AI_INSTRUCTIONS = [
  "You are the Task-Fix AI assistant for the Task-Fix website.",
  "Your job is to help website visitors with Task-Fix only: services, prices, quotes, availability, service area, website navigation, and contact details.",
  "Use only the Task-Fix context below. If a fact is missing, say you are not sure and route the visitor to WhatsApp, phone, or the contact page.",
  "If the visitor asks about anything unrelated to Task-Fix or this website, politely refuse and say you can only help with Task-Fix home services.",
  "Do not claim that you booked an appointment, accepted payment, dispatched staff, edited the website, or changed any backend data.",
  "When a visitor wants a quote, collect the useful details and point them to the contact page or WhatsApp.",
  "Keep replies friendly, direct, and short: 2-5 lines for normal answers, max 8 lines for service lists.",
  "Use chat-style plain text. Do not use Markdown headings, tables, horizontal rules, or code blocks.",
  "Do not use Markdown links. If sharing a link, write the plain URL.",
  "When listing menu options, use numbered lines like 1. Gardening, 2. Painting. Do not use bullet dots for the service menu.",
  "If listing services, group them briefly instead of explaining every service unless the visitor asks for full details.",
  "",
  WEBSITE_CONTEXT,
].join("\n");

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

function shouldUseGuidedReply(rawBody: string) {
  const body = rawBody.trim().toLowerCase();

  if (
    [
      "menu",
      "services",
      "service",
      "hi",
      "hello",
      "start",
      "hey",
      "help",
      "quote",
      "free quote",
      "other",
      "not sure",
    ].includes(body)
  ) {
    return true;
  }

  if (/^(?:[1-9]|10|11)$/.test(body)) return true;

  return getServiceIndex(body) !== null;
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

function getWebSessionKey(value: unknown): string {
  const rawValue = typeof value === "string" ? value : "";
  const sanitized = rawValue.replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 80);
  const fallback = crypto.randomUUID();

  return sanitized.startsWith("web:") ? sanitized : `web:${sanitized || fallback}`;
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

function extractGeminiText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const candidates = (payload as Record<string, unknown>).candidates;
  if (!Array.isArray(candidates)) return null;

  const chunks: string[] = [];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;

    const content = (candidate as Record<string, unknown>).content;
    if (!content || typeof content !== "object") continue;

    const parts = (content as Record<string, unknown>).parts;
    if (!Array.isArray(parts)) continue;

    for (const part of parts) {
      if (!part || typeof part !== "object") continue;

      const text = (part as Record<string, unknown>).text;
      if (typeof text === "string" && text.trim()) {
        chunks.push(text.trim());
      }
    }
  }

  return chunks.length ? chunks.join("\n").trim() : null;
}

function extractOpenAIText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as Record<string, unknown>;

  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }

  const output = response.output;
  if (!Array.isArray(output)) return null;

  const chunks: string[] = [];

  for (const item of output) {
    if (!item || typeof item !== "object") continue;

    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;

    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== "object") continue;

      const text = (contentItem as Record<string, unknown>).text;
      if (typeof text === "string" && text.trim()) {
        chunks.push(text.trim());
      }
    }
  }

  return chunks.length ? chunks.join("\n").trim() : null;
}

async function getGeminiReply(message: string, history: WebChatMessage[]): Promise<string | null> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) return null;

  const model = (Deno.env.get("GEMINI_MODEL") || DEFAULT_GEMINI_MODEL).replace(/^models\//, "");
  const contents = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  try {
    const response = await fetch(
      `${GEMINI_GENERATE_CONTENT_BASE_URL}/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: AI_INSTRUCTIONS }],
          },
          contents,
          generationConfig: {
            maxOutputTokens: 260,
            temperature: 0.3,
          },
        }),
      },
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const error =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>).error : null;
      const errorMessage =
        error && typeof error === "object" ? (error as Record<string, unknown>).message : null;

      console.error(
        `Gemini response failed: ${response.status}${
          typeof errorMessage === "string" ? ` ${errorMessage}` : ""
        }`,
      );
      return null;
    }

    return extractGeminiText(payload);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Gemini request failed.");
    return null;
  }
}

async function getOpenAIReply(message: string, history: WebChatMessage[]): Promise<string | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;

  const model = Deno.env.get("OPENAI_MODEL") || DEFAULT_OPENAI_MODEL;
  const input = [
    ...history,
    {
      role: "user",
      content: message,
    },
  ];

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions: AI_INSTRUCTIONS,
        input,
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
        max_output_tokens: 260,
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const error =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>).error : null;
      const errorMessage =
        error && typeof error === "object" ? (error as Record<string, unknown>).message : null;

      console.error(
        `OpenAI response failed: ${response.status}${
          typeof errorMessage === "string" ? ` ${errorMessage}` : ""
        }`,
      );
      return null;
    }

    return extractOpenAIText(payload);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "OpenAI request failed.");
    return null;
  }
}

async function getAiReply(message: string, history: WebChatMessage[]): Promise<string | null> {
  const provider = (Deno.env.get("AI_PROVIDER") || "auto").toLowerCase();

  if (provider === "gemini") {
    return getGeminiReply(message, history);
  }

  if (provider === "openai") {
    return getOpenAIReply(message, history);
  }

  return (await getGeminiReply(message, history)) ?? (await getOpenAIReply(message, history));
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
      const sessionKey = getWebSessionKey(payload?.sessionId);
      const history = normalizeWebHistory(payload?.history);

      if (!message.trim()) {
        return jsonResponse({ error: "Message is required." }, 400);
      }

      if (shouldUseGuidedReply(message)) {
        return jsonResponse({ reply: await buildReply(sessionKey, message) });
      }

      const reply =
        (await getAiReply(message.trim(), history)) ?? (await buildReply(sessionKey, message));
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
