const express = require('express');
const cors = require('cors'); // Ensure cors is required
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

// Enable all CORS requests
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// SQLite setup
let db = new sqlite3.Database('./database/tami_me.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Get all employees
app.get('/employees', (req, res) => {
  db.all('SELECT * FROM Employees;', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single employee by ID
app.get('/employees/:id', (req, res) => {
  const sql = 'SELECT * FROM Employees WHERE ID = ?;';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Search employees
app.post('/search', (req, res) => {
  const query = req.body.query;
  const sql = 'SELECT * FROM Employees WHERE expertise LIKE ? OR firstName LIKE ? OR lastName LIKE ?';
  const params = [`%${query}%`, `%${query}%`, `%${query}%`];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the database connection on server close
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed.');
    process.exit(0);
  });
});
