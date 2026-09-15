// Shared shopping cart logic — plain JS, no build step.
// Cart state lives in localStorage so it persists across index.html /
// products.html / contact.html (separate pages, no bundler/router to share
// React state directly).

const CART_KEY = 'greenden_cart'

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || []
    } catch {
        return []
    }
}

function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    // Let any listening components (e.g. the navbar badge) know the cart changed.
    window.dispatchEvent(new Event('cartchange'))
}

function addToCart(product) {
    const items = getCart()
    const existing = items.find((item) => item.name === product.name)
    if (existing) {
        existing.qty += 1
    } else {
        items.push({ ...product, qty: 1 })
    }
    saveCart(items)
}

function removeFromCart(name) {
    saveCart(getCart().filter((item) => item.name !== name))
}

function clearCart() {
    saveCart([])
}

function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0)
}

function getCartTotal() {
    return getCart().reduce(
        (sum, item) => sum + item.qty * parseFloat(item.price.replace('$', '')),
        0
    )
}

window.GreendenCart = { getCart, addToCart, removeFromCart, clearCart, getCartCount, getCartTotal }
