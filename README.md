# Greenden

Your three original `.html` files are here **completely unmodified**, except for
two `<script>` lines added right before `</body>`:

```html
<script src="./js/cart.js"></script>
<script src="./js/enhance.js"></script>
```

That's the only change to `index.html`, `products.html`, and `contact.html`.
Every class, every tag, every typo (the `hov` class, the broken header `<img>`
tag) is exactly what you pasted. No React, no JSX, no Babel, no build step.

## How this works

`js/enhance.js` runs after the page loads. It uses plain DOM methods
(`querySelector`, `addEventListener`, `document.createElement`) to:

1. **Find** your existing nav, product cards, and forms in the page — it
   doesn't know your markup in advance, it looks for patterns (e.g. "a
   `<button>` whose text is exactly 'Submit'") to locate the right elements.
2. **Attach** behavior to what it finds (a click listener on the hamburger
   icon, an `input` listener on the search box).
3. **Create** new elements only where something needs to visually appear that
   wasn't there before (the cart icon, "Add to Cart" buttons, error
   messages) — always at runtime, into the live page, never into the `.html`
   file itself.

## What it adds
- **Mobile menu**: hamburger icon toggles the nav links
- **Active nav link**: current page's link gets underlined
- **Shopping cart**: a cart icon is inserted into the nav; "Add to Cart"
  buttons are inserted onto each product card (Best Sellers + Products grid);
  clicking the cart icon shows a dropdown with items, quantities, total,
  remove/clear, and a demo checkout button. Cart state is stored in
  `localStorage` (`js/cart.js`) so it persists across all three pages.
- **Product search**: filters the Products grid live as you type
- **Form validation**: the newsletter box and contact form check required
  fields / email format and show inline messages
- **Scroll-to-top button**: appears once you scroll down 400px
- **Real backend**: the Newsletter box (Home page) and Contact form now send
  their data to a small Express + SQLite API (see the separate
  `greenden-backend` project) instead of just showing a fake success message.
  Client-side validation still runs first; the server call happens after.
  If the backend isn't running, you'll see "Could not reach the server. Is
  the backend running?" instead of a silent failure.

## Running it (frontend only, no backend)
Because `enhance.js` and `cart.js` are loaded via `<script src="...">`, opening
`index.html` by double-clicking it usually still works fine here (unlike the
React/Babel version, plain `<script src>` isn't blocked by CORS on `file://`
in most browsers) — but a local server is still the safer bet:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Running it with the backend (for the newsletter/contact forms to actually save)
1. In `greenden-backend/`: `npm install && npm start` (runs on port 4000)
2. In this folder: `python3 -m http.server 8000`
3. Open `http://localhost:8000/index.html`

Without step 1, everything else still works (menu, cart, search) — only the
newsletter/contact submissions will show a "can't reach the server" message.

## How this compares to the other two versions from this conversation
- **This version**: zero new file types, your `.html` unmodified, plain JS —
  closest to "just add JS" in the most literal sense.
- **`greenden-react-only`**: same idea (CDN, no build tool) but using React,
  which meant your markup had to move into `.jsx` files.
- **`greenden-react`**: the Vite + React version — the one that matches how
  React is actually built and shipped on real jobs, worth learning next.
