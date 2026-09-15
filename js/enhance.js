// Greenden — vanilla JS enhancements.
// This file does NOT change your .html files. It runs after the page loads,
// finds your existing elements (nav, product cards, forms) with plain
// querySelector calls, and attaches behavior to them. Anything visually new
// (the cart icon, "Add to Cart" buttons, error messages) is created here at
// runtime with document.createElement / innerHTML — never written into the
// .html source.

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu()
    setupActiveLink()
    setupCartUI()
    setupProductCards()
    setupSearchFilter()
    setupNewsletterForm()
    setupContactForm()
    setupScrollToTop()
})

// --- backend -----------------------------------------------------------
// The backend (greenden-backend/) runs separately, on its own port. Change
// this if you run it somewhere other than your own machine on port 4000.

const API_BASE = 'http://localhost:4000'

// --- helpers -----------------------------------------------------------

function insertMessage(refEl, text, className, position = 'afterend') {
    const p = document.createElement('p')
    p.textContent = text
    p.className = className
    p.setAttribute('data-gd-message', 'true')
    refEl.insertAdjacentElement(position, p)
}

function clearMessages(scopeEl) {
    scopeEl.querySelectorAll('[data-gd-message]').forEach((el) => el.remove())
}

// --- mobile menu ---------------------------------------------------------

function setupMobileMenu() {
    const nav = document.querySelector('nav')
    if (!nav) return
    const hamburger = nav.querySelector(':scope > svg')
    const linksList = nav.querySelector(':scope > ul')
    if (!hamburger || !linksList) return

    hamburger.style.cursor = 'pointer'
    hamburger.addEventListener('click', () => {
        linksList.classList.toggle('hidden')
        linksList.classList.toggle('flex')
        linksList.classList.toggle('flex-col')
    })
}

// --- active nav link -------------------------------------------------------

function setupActiveLink() {
    const nav = document.querySelector('nav')
    if (!nav) return
    const currentFile = window.location.pathname.split('/').pop() || 'index.html'
    nav.querySelectorAll('ul a').forEach((link) => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('underline', 'text-black')
        }
    })
}

// --- cart icon + dropdown, injected into the nav --------------------------

function setupCartUI() {
    const nav = document.querySelector('nav')
    if (!nav) return
    const hamburger = nav.querySelector(':scope > svg')

    const wrapper = document.createElement('div')
    wrapper.style.position = 'relative'
    wrapper.innerHTML = `
        <button id="gd-cart-btn" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span id="gd-cart-badge" class="hidden absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"></span>
        </button>
        <div id="gd-cart-panel" class="hidden absolute right-0 top-full mt-2 bg-white border border-black rounded shadow-xl p-4 w-72 z-20 text-left"></div>
    `

    if (hamburger) {
        nav.insertBefore(wrapper, hamburger)
    } else {
        nav.appendChild(wrapper)
    }

    const cartBtn = wrapper.querySelector('#gd-cart-btn')
    const cartPanel = wrapper.querySelector('#gd-cart-panel')
    const badge = wrapper.querySelector('#gd-cart-badge')

    function updateBadge() {
        const count = window.GreendenCart.getCartCount()
        if (count > 0) {
            badge.textContent = count
            badge.classList.remove('hidden')
        } else {
            badge.classList.add('hidden')
        }
    }

    function renderPanel() {
        const items = window.GreendenCart.getCart()
        if (items.length === 0) {
            cartPanel.innerHTML = `<p class="font-bold mb-2">Your Cart</p><p class="text-gray-600">Your cart is empty.</p>`
            return
        }
        const total = window.GreendenCart.getCartTotal()
        const rows = items
            .map(
                (item) => `
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <p>${item.name} x${item.qty}</p>
                        <p class="text-gray-600 text-sm">${item.price}</p>
                    </div>
                    <button class="text-red-600 hover:underline text-sm" data-remove="${item.name}">Remove</button>
                </div>`
            )
            .join('')
        cartPanel.innerHTML = `
            <p class="font-bold mb-2">Your Cart</p>
            ${rows}
            <p class="font-bold mt-3">Total: $${total.toFixed(2)}</p>
            <div class="flex gap-2 mt-3">
                <button id="gd-cart-clear" class="border border-black rounded p-2 flex-1 hover:bg-black hover:text-white">Clear</button>
                <button id="gd-cart-checkout" class="bg-black text-white rounded p-2 flex-1">Checkout</button>
            </div>
        `
        cartPanel.querySelectorAll('[data-remove]').forEach((btn) => {
            btn.addEventListener('click', () => {
                window.GreendenCart.removeFromCart(btn.getAttribute('data-remove'))
                renderPanel()
            })
        })
        cartPanel.querySelector('#gd-cart-clear').addEventListener('click', () => {
            window.GreendenCart.clearCart()
            renderPanel()
        })
        cartPanel.querySelector('#gd-cart-checkout').addEventListener('click', () => {
            alert('Checkout is not implemented yet — this is a demo.')
        })
    }

    cartBtn.addEventListener('click', () => {
        cartPanel.classList.toggle('hidden')
        if (!cartPanel.classList.contains('hidden')) renderPanel()
    })

    updateBadge()
    window.addEventListener('cartchange', () => {
        updateBadge()
        if (!cartPanel.classList.contains('hidden')) renderPanel()
    })
    window.addEventListener('storage', () => {
        updateBadge()
        if (!cartPanel.classList.contains('hidden')) renderPanel()
    })
}

// --- "Add to Cart" buttons on product cards --------------------------------
// Works for both the Best Seller grid (index.html, uses <h1> for the name)
// and the Products grid (products.html, uses <p> for the name) — it reads
// whichever text isn't the price.

function setupProductCards() {
    document.querySelectorAll('.grid').forEach((grid) => {
        grid.querySelectorAll(':scope > div').forEach((card) => {
            if (card.querySelector('[data-add-to-cart]')) return
            const texts = [...card.querySelectorAll('h1, p')]
            const priceEl = texts.find((el) => /^\$\d/.test(el.textContent.trim()))
            const nameEl = texts.find((el) => el !== priceEl)
            if (!priceEl || !nameEl) return

            const btn = document.createElement('button')
            btn.textContent = 'Add to Cart'
            btn.setAttribute('data-add-to-cart', 'true')
            btn.className =
                'mt-2 bg-black text-white rounded p-1 text-sm px-3 hover:bg-green-100 hover:text-black border border-black'
            btn.addEventListener('click', () => {
                window.GreendenCart.addToCart({
                    name: nameEl.textContent.trim(),
                    price: priceEl.textContent.trim(),
                })
            })
            card.appendChild(btn)
        })
    })
}

// --- product search filter (products.html) --------------------------------

function setupSearchFilter() {
    const input = document.querySelector('input[placeholder="Search for a Product..."]')
    if (!input) return
    const grid = document.querySelector('.grid')
    if (!grid) return
    const cards = grid.querySelectorAll(':scope > div')

    input.addEventListener('input', () => {
        const term = input.value.trim().toLowerCase()
        cards.forEach((card) => {
            const nameEl = [...card.querySelectorAll('p')].find((p) => !/^\$\d/.test(p.textContent.trim()))
            const matches = nameEl && nameEl.textContent.toLowerCase().includes(term)
            card.style.display = matches ? '' : 'none'
        })
    })
}

// --- newsletter form (index.html) ------------------------------------------

function setupNewsletterForm() {
    const subscribeBtn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Subscribe')
    if (!subscribeBtn) return
    const section = subscribeBtn.closest('section')
    const input = section.querySelector('input[type="text"]')
    if (!input) return

    subscribeBtn.addEventListener('click', async () => {
        clearMessages(section)
        const value = input.value.trim()
        // Client-side checks first — instant feedback, no network round trip
        // for obvious mistakes.
        if (!value) {
            insertMessage(input, 'Please enter your email address.', 'text-red-600 text-sm')
            return
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
            insertMessage(input, 'Please enter a valid email address.', 'text-red-600 text-sm')
            return
        }

        subscribeBtn.disabled = true
        try {
            const res = await fetch(`${API_BASE}/api/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value }),
            })
            const data = await res.json()
            if (!res.ok) {
                insertMessage(input, data.error || 'Something went wrong. Please try again.', 'text-red-600 text-sm')
                return
            }
            input.value = ''
            const message = data.alreadySubscribed ? "You're already subscribed!" : 'Thanks for subscribing!'
            insertMessage(subscribeBtn, message, 'mt-2 text-green-700')
        } catch (err) {
            insertMessage(input, 'Could not reach the server. Is the backend running?', 'text-red-600 text-sm')
        } finally {
            subscribeBtn.disabled = false
        }
    })
}

// --- contact form (contact.html) --------------------------------------------

function setupContactForm() {
    const submitBtn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Submit')
    if (!submitBtn) return
    const container = submitBtn.closest('.bg-green-900')
    if (!container) return
    const inputs = container.querySelectorAll('input')
    const fullNameInput = inputs[0]
    const emailInput = inputs[1]
    const addressInput = inputs[2]
    const cityInput = inputs[3]
    const countryInput = inputs[4]
    const stateInput = inputs[5]
    const zipcodeInput = inputs[6]

    submitBtn.addEventListener('click', async () => {
        clearMessages(container)
        let hasError = false

        // Client-side checks first, same as before.
        if (!fullNameInput.value.trim()) {
            insertMessage(fullNameInput, 'Full name is required.', 'text-red-300 text-sm')
            hasError = true
        }
        if (!emailInput.value.trim()) {
            insertMessage(emailInput, 'Email is required.', 'text-red-300 text-sm')
            hasError = true
        } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            insertMessage(emailInput, 'Enter a valid email address.', 'text-red-300 text-sm')
            hasError = true
        }

        if (hasError) return

        submitBtn.disabled = true
        try {
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: fullNameInput.value.trim(),
                    email: emailInput.value.trim(),
                    address: addressInput.value.trim(),
                    city: cityInput.value.trim(),
                    country: countryInput.value.trim(),
                    state: stateInput.value.trim(),
                    zipcode: zipcodeInput.value.trim(),
                }),
            })
            const data = await res.json()

            if (!res.ok) {
                // Server-side validation failed even though client-side passed
                // (e.g. someone bypassed the browser and hit the API directly) —
                // show whatever the server says.
                if (data.errors) {
                    if (data.errors.fullName) insertMessage(fullNameInput, data.errors.fullName, 'text-red-300 text-sm')
                    if (data.errors.email) insertMessage(emailInput, data.errors.email, 'text-red-300 text-sm')
                } else {
                    insertMessage(submitBtn, 'Something went wrong. Please try again.', 'mt-3 text-red-300')
                }
                return
            }

            inputs.forEach((input) => (input.value = ''))
            insertMessage(submitBtn, "Thanks! We'll get back to you soon.", 'mt-3 text-yellow-200')
        } catch (err) {
            insertMessage(submitBtn, 'Could not reach the server. Is the backend running?', 'mt-3 text-red-300')
        } finally {
            submitBtn.disabled = false
        }
    })
}

// --- scroll-to-top button, injected into <body> -----------------------------

function setupScrollToTop() {
    const btn = document.createElement('button')
    btn.textContent = '↑'
    btn.className = 'hidden fixed bottom-5 right-5 bg-black text-white rounded-full w-10 h-10 shadow-xl z-20'
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    document.body.appendChild(btn)

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn.classList.remove('hidden')
        else btn.classList.add('hidden')
    })
}
