const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors');

// Enable all CORS requests
app.use(cors());

// Or, to enable CORS requests only from your frontend:
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(express.json()); // Middleware for parsing JSON bodies

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// SQLite setup
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database/tami_me.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create the Employees table
db.run(`
  CREATE TABLE IF NOT EXISTS Employees (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Department TEXT,
    Expertise TEXT,
    Email TEXT
  );
`, (error) => {
  if (error) {
    console.error("Something went wrong when creating the Employees table", error);
  } else {
    console.log("Employees table is ready to be used");
  }
});

// Endpoints
// Get all employees
app.get('/employees', (req, res) => {
  db.all(`SELECT * FROM Employees;`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    console.log(rows); // This will output the data to the console
    res.json({
      message: "success",
      data: rows
    });
  });
});

// Get a single employee by id
app.get('/employees/:id', (req, res) => {
  const sql = `SELECT * FROM Employees WHERE ID = ?;`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row
    });
  });
});

// Create a new employee
app.post('/employees', (req, res) => {
  const { firstName, lastName, department, expertise, email } = req.body;
  const sql = `INSERT INTO Employees (FirstName, LastName, Department, Expertise, Email) VALUES (?, ?, ?, ?, ?);`;
  db.run(sql, [firstName, lastName, department, expertise, email], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      employeeId: this.lastID
    });
  });
});

// Create multiple employees
app.post('/employees/bulk', (req, res) => {
    // req.body should be an array of employee objects
    const employees = req.body;
    const sqlInsert = 'INSERT INTO Employees (FirstName, LastName, Department, Expertise, Email) VALUES (?, ?, ?, ?, ?)';
    
    // Start a database transaction
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      employees.forEach(employee => {
        db.run(sqlInsert, [employee.firstName, employee.lastName, employee.department, employee.expertise, employee.email]);
      });
      db.run('COMMIT', (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: `${employees.length} employees added successfully.` });
      });
    });
  });
  

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { firstName, lastName, department, expertise, email } = req.body;
  const sql = `UPDATE Employees SET FirstName = ?, LastName = ?, Department = ?, Expertise = ?, Email = ? WHERE ID = ?;`;
  db.run(sql, [firstName, lastName, department, expertise, email, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      changes: this.changes
    });
  });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const sql = `DELETE FROM Employees WHERE ID = ?;`;
  db.run(sql, req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "deleted",
      changes: this.changes
    });
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
