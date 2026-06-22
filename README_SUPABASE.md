## Supabase integration

1. Install dependency

```bash
npm install
```

2. Environment

- For frontend (Vite) use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- For server use `SUPABASE_SERVICE_ROLE_KEY` (keep this secret).
- For sending emails set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_INBOXES` on the server. `CONTACT_INBOXES` can be a comma-separated list of inboxes that should receive new quote requests.
- `ADMIN_EMAIL` is still supported as a fallback for local setups, but `RESEND_FROM_EMAIL` should be a verified Resend sender.

See `.env.example` for an example.

3. Usage

- Frontend (client) import from `src/lib/supabase.ts`:

```ts
import { supabase } from "./src/lib/supabase";

const { data, error } = await supabase.from("todos").select("*");
```

- Server (admin) import from `src/lib/supabase-server.ts`:

```ts
import { supabaseAdmin } from "./src/lib/supabase-server";

const { data, error } = await supabaseAdmin.from("secrets").select("*");
```

Security note: only use the service role key on trusted servers (not in browser).

4. Chatbot

The site includes a floating chatbot that calls the `whatsapp-bot` Edge Function at:

```txt
https://<project-ref>.supabase.co/functions/v1/whatsapp-bot
```

Deploy `supabase/functions/whatsapp-bot/index.ts` with `verify_jwt = false`. This is required because the same function receives unauthenticated Twilio webhook requests and browser chat requests using the publishable key in the `apikey` header.

5. Database table

Run [supabase-contact-schema.sql](supabase-contact-schema.sql) in the Supabase SQL editor to create or update the `contact_requests` table. If you already had the table, rerun the file so Supabase picks up the new `email` column and refreshes the schema cache.

The contact form stores:

- `name`, `phone`, `postcode`
- `service`, `service_datetime`
- `email` for optional client follow-up
- `property_size` and `description`
- `photos` as JSON data URLs for up to 3 attached images
