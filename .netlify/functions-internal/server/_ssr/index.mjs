let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-CP3qqhg6.mjs").then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
function parseEmailList(value) {
  return (value ?? "").split(",").map((entry) => entry.trim()).filter(Boolean);
}
async function normalizeCatastrophicSsrResponse(response) {
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
const server = {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/send-contact-emails" && request.method === "POST") {
        try {
          const body = await request.json().catch(() => null);
          const id = body?.id;
          if (!id) {
            return new Response(JSON.stringify({ error: "missing id" }), { status: 400 });
          }
          const envObj = env ?? {};
          const SUPABASE_URL = envObj.SUPABASE_URL || process.env.SUPABASE_URL;
          const SUPABASE_SERVICE_ROLE_KEY = envObj.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
          const RESEND_API_KEY = envObj.RESEND_API_KEY || process.env.RESEND_API_KEY;
          const RESEND_FROM_EMAIL = envObj.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || envObj.ADMIN_EMAIL || process.env.ADMIN_EMAIL;
          const CONTACT_INBOXES = parseEmailList(
            envObj.CONTACT_INBOXES || process.env.CONTACT_INBOXES || envObj.ADMIN_EMAIL || process.env.ADMIN_EMAIL
          );
          if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            return new Response(JSON.stringify({ error: "Missing Supabase server credentials" }), { status: 500 });
          }
          if (!RESEND_FROM_EMAIL || CONTACT_INBOXES.length === 0) {
            return new Response(JSON.stringify({ error: "Missing Resend sender or inbox configuration" }), { status: 500 });
          }
          const { createClient } = await import("../_libs/supabase__supabase-js.mjs");
          const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
          const { data, error } = await supabaseAdmin.from("contact_requests").select("*").eq("id", id).limit(1).maybeSingle();
          if (error) {
            console.error("Supabase fetch error", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          }
          if (!data) {
            return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
          }
          if (!RESEND_API_KEY) {
            console.error("Missing Resend API key");
            return new Response(JSON.stringify({ error: "Missing email provider configuration" }), { status: 500 });
          }
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
          const formatPhotosHtml = (photos) => {
            if (!photos || !Array.isArray(photos) || photos.length === 0) return "<p style='color: #64748B;'>No photos attached.</p>";
            return `<div style="display: grid; gap: 10px; margin-top: 10px;">` + photos.map((p, i) => `
                <div style="margin-bottom: 15px;">
                  <img src="${p.url}" style="width: 100%; max-width: 500px; border-radius: 4px; border: 1px solid #E2E8F0;"/>
                  <div style="font-size: 12px; color: #64748B; margin-top: 4px;">${p.name ?? `photo-${i}`}</div>
                </div>`).join("") + `</div>`;
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
                  <p style="margin: 10px 0 0 0; font-size: 18px; color: #2563EB; font-weight: bold;">07000 000 000</p>
                </div>

                <p style="margin-top: 24px; font-size: 14px; color: #64748B;">
                  You requested: ${data.service}<br/>
                  Preferred time: ${data.service_datetime}
                </p>
              </div>
              <div style="${footerStyles}">
                <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Task-Fix. All rights reserved.</p>
              </div>
            </div>
          `;
          try {
            const { Resend } = await import("../_libs/resend.mjs");
            const resend = new Resend(RESEND_API_KEY);
            const adminResult = await resend.emails.send({
              from: RESEND_FROM_EMAIL,
              to: CONTACT_INBOXES,
              subject: adminSubject,
              html: adminHtml,
              reply_to: data.email || void 0
            });
            if (adminResult.error) {
              console.error("Resend Admin Email Error:", adminResult.error);
              throw new Error(`Admin email failed: ${adminResult.error.message}`);
            }
            if (data.email) {
              const clientResult = await resend.emails.send({
                from: RESEND_FROM_EMAIL,
                to: data.email,
                subject: clientSubject,
                html: clientHtml
              });
              if (clientResult.error) {
                console.error("Resend Client Email Error:", clientResult.error);
              }
            }
          } catch (err) {
            console.error("Email send error", err);
            return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500 });
          }
          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        } catch (err) {
          console.error("api handler error", err);
          return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500 });
        }
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
export {
  server as default,
  renderErrorPage as r
};
