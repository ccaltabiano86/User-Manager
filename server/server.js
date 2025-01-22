const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// Setup app and database
const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

// Initialize database table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT,
      email TEXT NOT NULL UNIQUE
    )
  `);
});

// API Routes
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { firstName, lastName, email } = req.body;
  db.run('INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)', [firstName, lastName, email], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ id: this.lastID });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
