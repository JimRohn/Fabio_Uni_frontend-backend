// server.js
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let db = new sqlite3.Database('./database/tami_me.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

app.post('/search', (req, res) => {
  const query = req.body.query;
  const sql = `SELECT * FROM Employees WHERE expertise LIKE ? OR firstName LIKE ? OR lastName LIKE ?`;
  const params = [`%${query}%`, `%${query}%`, `%${query}%`];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});
