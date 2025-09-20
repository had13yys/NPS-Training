const sqlite3 = require('sqlite3').verbose();

// Open or create the database file
const db = new sqlite3.Database('./profiles.db', (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
    }
});

// Create table if it doesn’t exist
db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
        username TEXT PRIMARY KEY,
        b3Count INTEGER DEFAULT 0
    )
`);

module.exports = db;
