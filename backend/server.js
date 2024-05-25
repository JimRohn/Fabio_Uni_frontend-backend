const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

// Configure CORS to allow requests from any origin
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use('/static', express.static('public'));

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

// Initialize database endpoint
app.post('/initialize_db', (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Employees (
      ID INTEGER PRIMARY KEY,
      FirstName TEXT,
      LastName TEXT,
      Department TEXT,
      Expertise TEXT,
      Email TEXT,
      Location TEXT,
      AvatarUrl TEXT
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Database initialized successfully' });
  });
});

// Fetch all employees
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

// Fetch a single employee by ID
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
  const sql = 'SELECT * FROM Employees WHERE Expertise LIKE ? OR FirstName LIKE ? OR LastName LIKE ? OR Location LIKE ?';
  const params = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];

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
