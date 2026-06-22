import { type FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.1 18.7 6 15.4a7.2 7.2 0 1 1 2.8 2.7l-3.7.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5-.1l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.6 0 .5-.2 1-.6 1.3-.5.4-1.2.6-1.9.5-1.5-.2-3.1-1-4.4-2.3-1.3-1.3-2.2-2.9-2.4-4.4-.1-.7.1-1.3.5-1.8.2-.3.4-.6.8-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const CHAT_SESSION_KEY = "taskfix-chat-session-id";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi, Task-Fix here. What can we help with today?",
  },
];

const quickActions = [
  { label: "menu", message: "menu" },
  { label: "Free quote", message: "quote" },
  { label: "Plumbing", message: "plumbing" },
  { label: "Other", message: "other" },
];

function getLocalReply(message: string) {
  const normalized = message.toLowerCase();
  const asksOwner = ["owner", "boss", "manager", "company name", "your name", "who are you"].some(
    (word) => normalized.includes(word),
  );
  const asksContact = ["number", "phone", "mobile", "call", "whatsapp", "contact"].some((word) =>
    normalized.includes(word),
  );

  if (asksOwner) {
    return [
      "You're chatting with *Task-Fix* — the local home services team behind this website.",
      "",
      "For the owner/team contact, call or WhatsApp us 24/7:",
      "📞 07346 811790",
      "",
      "You can also request a free quote here:",
      "https://taskfixltd.com/contact",
    ].join("\n");
  }

  if (asksContact) {
    return [
      "You can call or WhatsApp Task-Fix 24/7 on:",
      "📞 07346 811790",
      "",
      "For a free quote, use:",
      "https://taskfixltd.com/contact",
    ].join("\n");
  }

  return null;
}

function createId(prefix = "msg") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `web:${crypto.randomUUID()}`;
  }

  return `web:${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getStoredSessionId() {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.localStorage.getItem(CHAT_SESSION_KEY);
    if (existing) return existing;

    const next = createSessionId();
    window.localStorage.setItem(CHAT_SESSION_KEY, next);
    return next;
  } catch {
    return createSessionId();
  }
}

function isJwtKey(value: string) {
  return value.split(".").length === 3;
}

function renderInlineText(line: string) {
  const parts = line.split(/(\*[^*]+\*|https?:\/\/[^\s]+)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="break-all font-semibold text-accent underline underline-offset-2"
        >
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <strong key={`${part}-${index}`}>{part.slice(1, -1)}</strong>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function renderMessageText(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {renderInlineText(line)}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getStoredSessionId());
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending, open]);

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || sending) return;

    setInput("");
    setSending(true);
    setMessages((current) => [
      ...current,
      { id: createId("user"), role: "user", content: message },
    ]);

    try {
      const localReply = getLocalReply(message);
      if (localReply) {
        setMessages((current) => [
          ...current,
          { id: createId("assistant"), role: "assistant", content: localReply },
        ]);
        return;
      }

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Chat is not configured.");
      }

      const activeSessionId = sessionId || getStoredSessionId();
      if (!sessionId) setSessionId(activeSessionId);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      };

      if (isJwtKey(SUPABASE_ANON_KEY)) {
        headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`;
      }

      const response = await fetch(
        `${SUPABASE_URL.replace(/\/+$/, "")}/functions/v1/whatsapp-bot`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            message,
            sessionId: activeSessionId,
          }),
        },
      );

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Chat request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content:
            typeof payload?.reply === "string"
              ? payload.reply
              : "Thanks. Please tell us a little more about the job.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content: [
            "I couldn't reach chat right now.",
            "",
            "Call or WhatsApp us 24/7:",
            "📞 07346 811790",
            "",
            "Or contact us here:",
            "https://taskfixltd.com/contact",
          ].join("\n"),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          className="mb-3 flex h-[min(42rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xl"
          aria-label="Task-Fix chat"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">Task-Fix chat</h2>
                <p className="truncate text-xs text-primary-foreground/75">24/7 home services</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-muted/30 px-3 py-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      "max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed shadow-sm " +
                      (message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/60 bg-card text-card-foreground")
                    }
                  >
                    {renderMessageText(message.content)}
                  </div>
                </div>
              ))}

              {sending ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </div>
                </div>
              ) : null}
              <div ref={scrollRef} />
            </div>
          </div>

          <div className="border-t border-border/70 bg-card p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  disabled={sending}
                  onClick={() => void sendMessage(action.message)}
                  className="shrink-0 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/60 disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message"
                className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/35"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                aria-label="Send message"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        {open ? (
          <a
            href="https://wa.me/447346811790"
            target="_blank"
            rel="noreferrer"
            className="hidden h-12 items-center gap-2 rounded-md border border-border/70 bg-card px-3 text-sm font-semibold text-foreground shadow-lg transition-colors hover:bg-secondary/50 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-accent" />
            WhatsApp
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="glow-yellow flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
          aria-label={open ? "Hide chat" : "Open chat"}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
