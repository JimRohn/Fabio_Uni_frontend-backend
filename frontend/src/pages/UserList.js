import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 }, // Make sure the field name is in lowercase if that's what your database uses
  {
    field: 'firstName',
    headerName: 'first name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
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
    field: "expertise", // Make sure the field name is in lowercase if that's what your database uses
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
  const [rows, setRows] = useState([]); // Add state for rows
  const navigate = useNavigate();

  // Function to fetch users from the backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        // Map the backend data to the DataGrid expected format
        const mappedRows = json.data.map((item) => ({
          id: item.ID, // 'id' field is expected by DataGrid for the row id
          firstName: item.FirstName,
          lastName: item.LastName,
          // Assuming your backend does not provide 'age', 'phone', and 'location', you might want to add them as null or some default value
          age: null, // or some default value if you have it
          expertise: item.Expertise,
          department: item.Department,
          email: item.Email,
          phone: null, // or some default value if you have it
          location: null, // or some default value if you have it
        }));
        setRows(mappedRows); // Use the mapped data for the rows state
      } catch (error) {
        console.error("Could not fetch users: ", error);
      }
    }
  
    fetchUsers();
  }, []);
  

  const handleRowClick = (params) => {
    // Navigate to the user profile page with the user's id
    navigate(`/user-profile/${params.row.id}`);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Typography variant="h4" component="h1">
          List of People working in the Law Firm
        </Typography>
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





