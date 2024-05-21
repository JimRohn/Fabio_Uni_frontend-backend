import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SemanticSearchBar from '../components/SemanticSearchBar/SemanticSearchBar';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
    editable: true,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 160,
    editable: true,
  },
  {
    field: "expertise",
    headerName: 'Expertise',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
];

export default function UserList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        const mappedRows = json.data.map((item, index) => ({
          id: item.ID,
          firstName: item.FirstName,
          lastName: item.LastName,
          department: item.Department,
          expertise: item.Expertise,
          email: item.Email,
        }));
        setRows(mappedRows);
      } catch (error) {
        console.error("Could not fetch users: ", error);
      }
    }
    fetchUsers();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/user-profile/${params.row.id}`);
  };

  const handleSearchResults = (results) => {
    const uniqueResults = results.map((item, index) => ({
      id: item.ID || index, // Use existing ID or fall back to index
      firstName: item.FirstName,
      lastName: item.LastName,
      department: item.Department,
      expertise: item.Expertise,
      email: item.Email,
    }));
    setRows(uniqueResults);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Typography variant="h4" component="h1">
          List of People working in the Law Firm
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={4}>
        <SemanticSearchBar onSearchResults={handleSearchResults} />
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              pageSize: 5,
            },
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
}
