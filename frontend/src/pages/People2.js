import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, Button } from '@mui/material';

const columns = [
  { field: 'ID', headerName: 'ID', width: 90 },
  { field: 'FirstName', headerName: 'First Name', width: 150, editable: true },
  { field: 'LastName', headerName: 'Last Name', width: 150, editable: true },
  { field: 'Department', headerName: 'Department', width: 160, editable: true },
  { field: 'Expertise', headerName: 'Expertise', width: 150 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Location', headerName: 'Location', width: 150 },
];

const People2 = () => {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/initialize_db');
        console.log("Database initialized successfully", response.data);
        if (response.data.error) {
          throw new Error(response.data.error);
        }
      } catch (err) {
        console.error("Error initializing database:", err);
        setError('Error initializing database. Please try again.');
      }
    };

    initializeDatabase();
  }, []);

  const handleSearch = async () => {
    try {
      console.log("Query:", query);
      const response = await axios.get(`http://127.0.0.1:5000/search?query=${encodeURIComponent(query)}`);
      console.log("Received response data:", response.data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const mappedRows = response.data.database_results.map((item, index) => ({
        id: item.ID || index, // Use existing ID or fallback to index
        FirstName: item.FirstName,
        LastName: item.LastName,
        Department: item.Department,
        Expertise: item.Expertise,
        Email: item.Email,
        Location: item.Location,
      }));
      setRows(mappedRows);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching data. Please try again.');
      console.error("Error:", err);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Typography variant="h4" component="h1">
          List of People working in the Law Firm
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={4}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginLeft: 2 }}>
          Search
        </Button>
      </Box>

      {error && (
        <Box display="flex" justifyContent="center" marginBottom={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default People2;
