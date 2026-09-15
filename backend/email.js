const { Resend } = require('resend')

// Only sends real emails if RESEND_API_KEY is set (see .env.example).
// Without it, this quietly does nothing — the newsletter signup still
// works and still saves to the database, it just skips the email step.
// That keeps the app usable out of the box, with real email as an
// opt-in step once you've signed up for a free Resend account.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

async function sendWelcomeEmail(toEmail) {
    if (!resend) {
        console.log(`(No RESEND_API_KEY set — skipping welcome email to ${toEmail})`)
        return
    }

    try {
        const { error } = await resend.emails.send({
            // onboarding@resend.dev is Resend's own test sender — works
            // immediately with no domain setup, good enough for a project
            // like this. Swap in your own verified domain later if you want.
            from: 'Greenden <onboarding@resend.dev>',
            to: toEmail,
            subject: 'Welcome to Greenden 🌱',
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
                    <h1 style="color: #166534;">Welcome to Greenden!</h1>
                    <p>Thanks for signing up for our newsletter. You'll be the first to hear
                    about new plants, restocks, and discounts.</p>
                    <p style="color: #888; font-size: 12px; margin-top: 32px;">
                        Bringing nature to your home with love and care since 2015.
                    </p>
                </div>
            `,
        })

        // The Resend SDK doesn't throw on a failed send — it resolves with
        // { data, error } instead, so a failure has to be checked explicitly
        // rather than relying on catch alone.
        if (error) {
            console.error('Failed to send welcome email:', error.message || error)
            return
        }
        console.log(`Welcome email sent to ${toEmail}`)
    } catch (err) {
        // Covers network-level failures (e.g. no internet), which DO throw.
        console.error('Failed to send welcome email:', err.message)
    }
}

module.exports = { sendWelcomeEmail }
