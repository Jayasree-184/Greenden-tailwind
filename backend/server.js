require('dotenv').config()

const express = require('express')
const cors = require('cors')
const db = require('./db')
const { sendWelcomeEmail } = require('./email')

const app = express()
const PORT = 4000

app.use(cors())          // lets the frontend (a different origin/port) call this API
app.use(express.json())  // parses JSON request bodies into req.body
app.use(express.static('public'))  // serves public/admin.html at /admin.html

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value)

// --- Contact form ------------------------------------------------------

app.post('/api/contact', (req, res) => {
    const { fullName, email, address, city, country, state, zipcode } = req.body || {}

    const errors = {}
    if (!fullName || !fullName.trim()) errors.fullName = 'Full name is required.'
    if (!email || !email.trim()) {
        errors.email = 'Email is required.'
    } else if (!isValidEmail(email)) {
        errors.email = 'Enter a valid email address.'
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    const stmt = db.prepare(`
        INSERT INTO contact_submissions (full_name, email, address, city, country, state, zipcode)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(fullName.trim(), email.trim(), address || '', city || '', country || '', state || '', zipcode || '')

    res.status(201).json({ success: true, id: result.lastInsertRowid })
})

// Lets you actually see what's been submitted — open this URL in a browser
app.get('/api/contact', (req, res) => {
    const rows = db.prepare('SELECT * FROM contact_submissions ORDER BY id DESC').all()
    res.json(rows)
})

app.delete('/api/contact/:id', (req, res) => {
    const result = db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id)
    if (result.changes === 0) return res.status(404).json({ success: false, error: 'Not found.' })
    res.json({ success: true })
})

// --- Newsletter ----------------------------------------------------------

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body || {}

    if (!email || !email.trim()) {
        return res.status(400).json({ success: false, error: 'Please enter your email address.' })
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid email address.' })
    }

    try {
        const stmt = db.prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)')
        const result = stmt.run(email.trim())
        res.status(201).json({ success: true, id: result.lastInsertRowid })
        // Fire-and-forget: don't make the person wait for the email to send
        // before their subscribe button shows success. Errors are handled
        // and logged inside sendWelcomeEmail itself.
        sendWelcomeEmail(email.trim())
    } catch (err) {
        // UNIQUE constraint on email — they already subscribed.
        // node:sqlite doesn't give a clean error code like better-sqlite3 did,
        // so we check the message text instead.
        if (err.message && err.message.includes('UNIQUE constraint failed')) {
            return res.status(200).json({ success: true, alreadySubscribed: true })
        }
        console.error(err)
        res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' })
    }
})

app.get('/api/newsletter', (req, res) => {
    const rows = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY id DESC').all()
    res.json(rows)
})

app.delete('/api/newsletter/:id', (req, res) => {
    const result = db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(req.params.id)
    if (result.changes === 0) return res.status(404).json({ success: false, error: 'Not found.' })
    res.json({ success: true })
})

// --- health check ----------------------------------------------------------

app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Visiting the server root goes straight to the admin page
app.get('/', (req, res) => res.redirect('/admin.html'))

app.listen(PORT, () => {
    console.log(`Greenden backend running at http://localhost:${PORT}`)
})
