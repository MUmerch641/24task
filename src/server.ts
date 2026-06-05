import "./lib/error-capture";
import "./lib/load-env"; // Load environment variables from .env.local in dev mode

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

function parseEmailList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Server-side email webhook for contact submissions
      if (url.pathname === "/api/send-contact-emails" && request.method === "POST") {
        try {
          const body = await request.json().catch(() => null);
          const id = body?.id;
          if (!id) {
            return new Response(JSON.stringify({ error: "missing id" }), { status: 400 });
          }

          const envObj = (env as Record<string, string | undefined> | undefined) ?? {};
          // Fall back to process.env for local development (Vite), use env for production (Wrangler)
          const SUPABASE_URL = envObj.SUPABASE_URL || process.env.SUPABASE_URL;
          const SUPABASE_SERVICE_ROLE_KEY = envObj.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
          const RESEND_API_KEY = envObj.RESEND_API_KEY || process.env.RESEND_API_KEY;
          const RESEND_FROM_EMAIL =
            envObj.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || envObj.ADMIN_EMAIL || process.env.ADMIN_EMAIL;
          const CONTACT_INBOXES = parseEmailList(
            envObj.CONTACT_INBOXES || process.env.CONTACT_INBOXES || envObj.ADMIN_EMAIL || process.env.ADMIN_EMAIL,
          );

          if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            return new Response(JSON.stringify({ error: "Missing Supabase server credentials" }), { status: 500 });
          }
          if (!RESEND_FROM_EMAIL || CONTACT_INBOXES.length === 0) {
            return new Response(JSON.stringify({ error: "Missing Resend sender or inbox configuration" }), { status: 500 });
          }

          // lazy import of supabase client to avoid env assumptions in modules
          const { createClient } = await import("@supabase/supabase-js");
          const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

          const { data, error } = await supabaseAdmin.from("contact_requests").select("*").eq("id", id).limit(1).maybeSingle();
          if (error) {
            console.error("Supabase fetch error", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          }
          if (!data) {
            return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
          }

          // Resend is used to send emails. Require keys plus a verified sender and inbox recipients.
          if (!RESEND_API_KEY) {
            console.error("Missing Resend API key");
            return new Response(JSON.stringify({ error: "Missing email provider configuration" }), { status: 500 });
          }

          // Build admin email
          const adminSubject = `New Request: ${data.service ?? "(service)"} - ${data.name}`;
          const clientSubject = `We received your quote request — Task-Fix`;

          const emailStyles = `
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          `;

          const headerStyles = `
            background-color: #0F172A;
            color: white;
            padding: 24px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            text-align: center;
          `;

          const contentStyles = `
            padding: 32px;
            border: 1px solid #E2E8F0;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            background-color: #FFFFFF;
          `;

          const footerStyles = `
            margin-top: 24px;
            text-align: center;
            font-size: 12px;
            color: #64748B;
          `;

          const formatPhotosHtml = (photos: any[] | null) => {
            if (!photos || !Array.isArray(photos) || photos.length === 0) return "<p style='color: #64748B;'>No photos attached.</p>";
            return `<div style="display: grid; gap: 10px; margin-top: 10px;">` + 
              photos.map((p: any, i: number) => `
                <div style="margin-bottom: 15px;">
                  <img src="${p.url}" style="width: 100%; max-width: 500px; border-radius: 4px; border: 1px solid #E2E8F0;"/>
                  <div style="font-size: 12px; color: #64748B; margin-top: 4px;">${p.name ?? `photo-${i}`}</div>
                </div>`).join("") + 
              `</div>`;
          };

          const adminHtml = `
            <div style="${emailStyles}">
              <div style="${headerStyles}">
                <h1 style="margin: 0; font-size: 20px;">New Quote Request</h1>
              </div>
              <div style="${contentStyles}">
                <h2 style="margin-top: 0; font-size: 18px; color: #0F172A;">Customer Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.name}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold;">Phone:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.phone}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.email ?? "-"}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold;">Postcode:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.postcode}</td></tr>
                </table>

                <h2 style="margin-top: 24px; font-size: 18px; color: #0F172A;">Service Request</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold; width: 120px;">Service:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; text-transform: capitalize;">${data.service}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold;">Datetime:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.service_datetime}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-weight: bold;">Prop. Size:</td><td style="padding: 8px 0; border-bottom: 1px solid #F1F5F9;">${data.property_size ?? "-"}</td></tr>
                </table>

                <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">Description</h3>
                <div style="background-color: #F8FAFC; padding: 16px; border-radius: 4px; border-left: 4px solid #0F172A;">
                  ${(data.description ?? "").replace(/\n/g, "<br/>")}
                </div>

                <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">Photos</h3>
                ${formatPhotosHtml(data.photos ?? [])}
              </div>
              <div style="${footerStyles}">
                <p>This request was sent from your website contact form.</p>
              </div>
            </div>
          `;

          const clientHtml = `
            <div style="${emailStyles}">
              <div style="${headerStyles}">
                <h1 style="margin: 0; font-size: 20px;">Request Received</h1>
              </div>
              <div style="${contentStyles}">
                <p>Hi <strong>${data.name ?? "Customer"}</strong>,</p>
                <p>Thank you for contacting <strong>Task-Fix</strong>. We've received your request for <strong>${data.service}</strong> and our team is reviewing the details.</p>
                <p>We typically respond with a free quote within a few hours during business hours.</p>
                
                <div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; margin-top: 24px; text-align: center;">
                  <p style="margin: 0; font-weight: bold; color: #0F172A;">Need urgent help?</p>
                  <p style="margin: 5px 0 0 0;">Call or WhatsApp us 24/7:</p>
                  <p style="margin: 10px 0 0 0; font-size: 18px; color: #2563EB; font-weight: bold;">07346 811790</p>
                </div>

                <p style="margin-top: 24px; font-size: 14px; color: #64748B;">
                  You requested: ${data.service}<br/>
                  Preferred time: ${data.service_datetime}
                </p>
              </div>
              <div style="${footerStyles}">
                <p>&copy; ${new Date().getFullYear()} Task-Fix. All rights reserved.</p>
              </div>
            </div>
          `;

          // Send emails via Resend
          try {
            const { Resend } = await import("resend");
            const resend = new Resend(RESEND_API_KEY);

            // Send admin notification
            const adminResult = await resend.emails.send({
              from: RESEND_FROM_EMAIL,
              to: CONTACT_INBOXES,
              subject: adminSubject,
              html: adminHtml,
              reply_to: data.email || undefined,
            });

            if (adminResult.error) {
              console.error("Resend Admin Email Error:", adminResult.error);
              throw new Error(`Admin email failed: ${adminResult.error.message}`);
            }

            // Send client confirmation (if email provided)
            if (data.email) {
              const clientResult = await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: data.email,
                subject: clientSubject,
                html: clientHtml,
              });
              
              if (clientResult.error) {
                console.error("Resend Client Email Error:", clientResult.error);
                // We don't necessarily want to fail the whole request if only the client email fails,
                // but we should at least log it.
              }
            }
          } catch (err) {
            console.error("Email send error", err);
            return new Response(JSON.stringify({ error: (err as Error).message ?? String(err) }), { status: 500 });
          }

          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        } catch (err) {
          console.error("api handler error", err);
          return new Response(JSON.stringify({ error: (err as Error).message ?? String(err) }), { status: 500 });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
