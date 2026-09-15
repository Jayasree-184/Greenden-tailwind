require('dotenv').config()

const express = require('express')
const cors = require('cors')
const db = require('./db')
const { sendWelcomeEmail } = require('./email')

const app = express()

// Render provides PORT through the environment.
// Locally, the backend will use port 4000.
const PORT = process.env.PORT || 4000

// ---------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------

// Allows the frontend to communicate with this backend.
app.use(cors())

// Parses JSON request bodies.
app.use(express.json())

// Serves files from backend/public
app.use(express.static('public'))

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value)

// ---------------------------------------------------------------------
// Contact Form
// ---------------------------------------------------------------------

app.post('/api/contact', (req, res) => {
    const {
        fullName,
        email,
        address,
        city,
        country,
        state,
        zipcode
    } = req.body || {}

    const errors = {}

    if (!fullName || !fullName.trim()) {
        errors.fullName = 'Full name is required.'
    }

    if (!email || !email.trim()) {
        errors.email = 'Email is required.'
    } else if (!isValidEmail(email)) {
        errors.email = 'Enter a valid email address.'
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            errors
        })
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO contact_submissions
            (
                full_name,
                email,
                address,
                city,
                country,
                state,
                zipcode
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `)

        const result = stmt.run(
            fullName.trim(),
            email.trim(),
            address || '',
            city || '',
            country || '',
            state || '',
            zipcode || ''
        )

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid
        })
    } catch (err) {
        console.error('Contact submission error:', err)

        res.status(500).json({
            success: false,
            error: 'Something went wrong. Please try again.'
        })
    }
})

// Get contact submissions
app.get('/api/contact', (req, res) => {
    try {
        const rows = db
            .prepare(
                'SELECT * FROM contact_submissions ORDER BY id DESC'
            )
            .all()

        res.json(rows)
    } catch (err) {
        console.error('Get contact submissions error:', err)

        res.status(500).json({
            success: false,
            error: 'Unable to retrieve contact submissions.'
        })
    }
})

// Delete contact submission
app.delete('/api/contact/:id', (req, res) => {
    try {
        const result = db
            .prepare(
                'DELETE FROM contact_submissions WHERE id = ?'
            )
            .run(req.params.id)

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Not found.'
            })
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.error('Delete contact error:', err)

        res.status(500).json({
            success: false,
            error: 'Unable to delete submission.'
        })
    }
})

// ---------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body || {}

    if (!email || !email.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Please enter your email address.'
        })
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Please enter a valid email address.'
        })
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO newsletter_subscribers (email)
            VALUES (?)
        `)

        const result = stmt.run(email.trim())

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid
        })

        // Send welcome email without making the user wait.
        sendWelcomeEmail(email.trim())
    } catch (err) {
        // Email already exists.
        if (
            err.message &&
            err.message.includes('UNIQUE constraint failed')
        ) {
            return res.status(200).json({
                success: true,
                alreadySubscribed: true
            })
        }

        console.error('Newsletter subscription error:', err)

        res.status(500).json({
            success: false,
            error: 'Something went wrong. Please try again.'
        })
    }
})

// Get newsletter subscribers
app.get('/api/newsletter', (req, res) => {
    try {
        const rows = db
            .prepare(
                'SELECT * FROM newsletter_subscribers ORDER BY id DESC'
            )
            .all()

        res.json(rows)
    } catch (err) {
        console.error('Get newsletter subscribers error:', err)

        res.status(500).json({
            success: false,
            error: 'Unable to retrieve newsletter subscribers.'
        })
    }
})

// Delete newsletter subscriber
app.delete('/api/newsletter/:id', (req, res) => {
    try {
        const result = db
            .prepare(
                'DELETE FROM newsletter_subscribers WHERE id = ?'
            )
            .run(req.params.id)

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Not found.'
            })
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.error('Delete newsletter subscriber error:', err)

        res.status(500).json({
            success: false,
            error: 'Unable to delete subscriber.'
        })
    }
})

// ---------------------------------------------------------------------
// Health Check
// ---------------------------------------------------------------------

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    })
})

// ---------------------------------------------------------------------
// Root Route
// ---------------------------------------------------------------------

app.get('/', (req, res) => {
    res.redirect('/admin.html')
})

// ---------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Greenden backend running on port ${PORT}`)
})