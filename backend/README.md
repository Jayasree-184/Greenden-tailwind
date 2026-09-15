# Greenden Backend

A small Express API backing the Newsletter and Contact forms on the frontend
(`greenden-vanilla-js`). Saves submissions to a real SQLite database file.

## What it does
- `POST /api/newsletter` — save an email signup, and send a real welcome
  email via Resend (if you've set up an API key — see below). Returns
  `{ alreadySubscribed: true }` instead of an error if that email already
  subscribed (email is a unique column).
- `POST /api/contact` — save a contact form submission. Requires `fullName`
  and a valid `email`; other fields (address, city, country, state, zipcode)
  are optional.
- `GET /api/newsletter` and `GET /api/contact` — list everything saved so
  far, as raw JSON.
- `DELETE /api/newsletter/:id` and `DELETE /api/contact/:id` — remove one row.
- `GET /admin.html` (or just `http://localhost:4000/` — it redirects there) —
  a proper admin page: two tables (subscribers, submissions), a Refresh
  button, and a Delete button per row.
- `GET /health` — quick check that the server is up.

## Sending real emails (optional)
Newsletter signups can trigger a real "Welcome to Greenden" email using
[Resend](https://resend.com) — free, no credit card, and no domain
verification needed to get started (it uses Resend's own test sender address).

1. Sign up at resend.com and grab an API key from the dashboard.
2. Copy `.env.example` to `.env` and paste your key in:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
3. Restart the server. That's it — subscribing now sends a real email.

**Without a `.env` file, everything still works exactly as before** — the
signup still saves to the database, it just skips the email step (you'll see
a line in the server console saying so). This was a deliberate choice: the
app isn't broken just because email isn't configured yet.

If the email fails to send for any reason (bad key, Resend having an issue,
no internet), the signup still succeeds — the failure is logged to the
console but never blocks or breaks the actual subscription. I tested this
specifically with a fake API key to confirm.

## Why SQLite (and why not `better-sqlite3`)
SQLite stores everything in one file (`greenden.db`, created automatically
the first time you run the server) — no database server to install or
configure, but it's a real SQL database with actual tables, not a JSON file.

This uses **`node:sqlite`** — SQLite built directly into Node.js itself
(available since Node 22.5) — instead of the `better-sqlite3` npm package.
`better-sqlite3` is a *native* module: if npm doesn't have a prebuilt binary
for your exact Node version + OS, it tries to compile one from source, which
on Windows requires Visual Studio's C++ Build Tools installed. That's a heavy
ask for a small project, so this avoids it entirely — `npm install` only
pulls in Express and CORS, both pure JavaScript, nothing to compile.

You'll see a one-line warning when the server starts:
```
ExperimentalWarning: SQLite is an experimental feature and might change at any time
```
That's expected and harmless — Node labels it experimental, but it works
fine for this.

**Requires Node 22.5 or newer.** Check yours with `node --version`; if it's
older, either update Node or ask me to switch this back to `better-sqlite3`
(and I'll also point you to installing the Visual Studio Build Tools it needs
on Windows).

## Setup
```bash
npm install
npm start
```
Runs on **http://localhost:4000**. Open that URL in a browser — it redirects
straight to the admin page. Leave this running in its own terminal — the
frontend expects it to be there.

`npm run dev` restarts the server automatically when you edit a file
(uses Node's built-in `--watch`, no extra tool needed).

## Project structure
```
greenden-backend/
├── package.json
├── server.js          # Express app + all routes
├── db.js              # opens greenden.db, creates tables if they don't exist
├── email.js            # Resend welcome-email logic
├── .env.example         # copy to .env and add your Resend API key
├── public/
│   └── admin.html      # the admin page (plain HTML + fetch, no framework)
└── greenden.db         # created automatically on first run (not committed to git)
```

## Trying it without the frontend
```bash
curl -X POST http://localhost:4000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'

curl http://localhost:4000/api/newsletter
```

## Running the whole thing (backend + frontend together)
1. Terminal 1: `cd greenden-backend && npm install && npm start`
2. Terminal 2: `cd greenden-vanilla-js && python3 -m http.server 8000`
3. Open `http://localhost:8000/index.html`, try the newsletter box on the
   home page or the form on the Contact page.
4. Check it actually saved: open `http://localhost:4000/api/newsletter` or
   `http://localhost:4000/api/contact` in another tab.

If the backend isn't running, the forms still validate client-side, but
submitting shows "Could not reach the server. Is the backend running?"
instead of silently failing.

## What's NOT in scope here
Cart/checkout is still frontend-only (`localStorage`) — this backend only
covers the two things you asked for: contact submissions and newsletter
signups. No authentication, no email sending, no deployment config — this
is a local dev setup, not production-ready as-is (e.g. there's no rate
limiting, and CORS is wide open to any origin for simplicity).
