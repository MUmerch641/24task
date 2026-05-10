## Goal

Restructure the homepage from a SaaS layout to a local handyman/services business. Replace the SaaS "features" and "pricing" sections with content built around these 9 services:

Gardening · Painting · Cleaning · House Removals · Handyman Jobs · Carpet Removal · Carpet Fitting · Plumbing · Man with Van

## Changes

1. **Hero** — rework copy from SaaS pitch to "Reliable local handyman & home services. One call, every job done." Primary CTA: "Get a free quote" → /contact. Secondary: "See services".

2. **Services grid** (replaces the old features section) — 9 cards, each with a Lucide icon, service name, and one‑line description. Responsive: 1 col mobile / 2 col tablet / 3 col desktop. Cards link to `/services#<slug>`.

3. **Pricing → "How it works / Pricing"** (replaces tier table) — short 3‑step strip ("Tell us the job → Get a free quote → We turn up and do it") plus a simple pricing note ("Free quotes. No call‑out fee. Fixed prices on most jobs."). No SaaS tiers.

4. **Keep** the existing testimonials, FAQ, and contact form — they already fit a services business. FAQ copy gets light edits to swap any SaaS wording (e.g. "cancel subscription") for trades wording (quotes, scheduling, payment).

5. **/services route** — new page listing all 9 services with longer descriptions and a "Request this service" link to /contact. Own `head()` SEO. Anchor IDs match the home grid links.

6. **Contact form** — add a "Service needed" dropdown pre‑filled with the 9 services. Keep existing Cloud insert wiring; just add the new column value into the message body (no schema change).

## Out of scope

- Booking calendar, payments, admin dashboard
- Per‑service detail pages (one /services page covers all 9)
- Schema changes to `contact_messages`

Approve and I'll make the changes.
