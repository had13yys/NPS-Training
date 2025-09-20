const db = require('./database');

// Add a b3
function addB3(username) {
    db.run(
        `INSERT INTO profiles (username, b3Count) VALUES (?, 1)
         ON CONFLICT(username) DO UPDATE SET b3Count = b3Count + 1`,
        [username]
    );
}

// Get profile
function getProfile(username) {
    db.get(`SELECT b3Count FROM profiles WHERE username = ?`, [username], (err, row) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${username} has ${row ? row.b3Count : 0} b3s.`);
        }
    });
}

// Example usage:
addB3("TestUser");
getProfile("TestUser");
