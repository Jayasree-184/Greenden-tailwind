const { DatabaseSync } = require('node:sqlite')
const path = require('path')

// Creates greenden.db in this folder the first time the server runs.
// Uses node:sqlite — SQLite built directly into Node.js itself (available
// since Node 22.5, no separate install needed). This avoids the native
// module compilation that better-sqlite3 needs (which requires Visual
// Studio Build Tools on Windows if no prebuilt binary matches your exact
// Node version — the error you hit). node:sqlite is currently marked
// "experimental" by Node (you'll see a warning when the server starts) but
// is stable enough for a project like this.
const db = new DatabaseSync(path.join(__dirname, 'greenden.db'))

db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT,
        city TEXT,
        country TEXT,
        state TEXT,
        zipcode TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
`)

module.exports = db
