import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EventCard({ event }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '16px auto',
        padding: 2,
        backgroundColor: '#e3f2fd', // Light blue background
        border: '1px solid #90caf9', // Border color matching Material-UI theme
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline' }}>
          Location:
        </Typography>{' '}
        <Typography variant="body2" sx={{ display: 'inline' }}>
          {event.location}
        </Typography>
        <br />
        <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline' }}>
          Description:
        </Typography>{' '}
        <Typography variant="body2" sx={{ display: 'inline' }}>
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
