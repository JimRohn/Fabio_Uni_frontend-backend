import React from 'react';
import MatterCard from '../components/MatterCard';
import { Box, Typography } from '@mui/material';

const sampleMatters = [
  {
    title: 'Doe vs. ABC Corporation',
    status: 'Open',
    location: 'London',
    description: 'A detailed case involving a dispute between John Doe and ABC Corporation regarding breach of contract.',
  },
  {
    title: 'Smith vs. XYZ Inc.',
    status: 'Closed',
    location: 'Manchester',
    description: 'A resolved case involving an employment dispute between Jane Smith and XYZ Inc.',
  },
  // Add more sample matters as needed
];

function Matters() {
  return (
    <Box sx={{ textAlign: 'center', padding: '16px 0' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '48px' }}>
        View open and closed matters
      </Typography>
      <Box sx={{ marginTop: '48px' }}>
        {sampleMatters.map((matter, index) => (
          <MatterCard key={index} matter={matter} />
        ))}
      </Box>
    </Box>
  );
}

export default Matters;
