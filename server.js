const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint for Roblox to send a b3
app.post('/b3', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    db.run(
        `INSERT INTO profiles (username, b3Count) VALUES (?, 1)
         ON CONFLICT(username) DO UPDATE SET b3Count = b3Count + 1`,
        [username],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            return res.json({ message: `Added 1 b3 to ${username}` });
        }
    );
});

// Endpoint to get profile info
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;

    db.get(
        `SELECT b3Count FROM profiles WHERE username = ?`,
        [username],
        (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ username, b3Count: row ? row.b3Count : 0 });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
