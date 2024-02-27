import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { Container, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
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
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'Specialisation',
    headerName: 'Specialisation',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 150,
  },
];

export const rows = [
  // ... Your rows data ...
{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, Specialisation: 'Criminal Law', email: 'Johnsnow@email.com', phone: '123456789', location: 'London, UK'},
{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function UserList() {
  const navigate = useNavigate();
  
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
















