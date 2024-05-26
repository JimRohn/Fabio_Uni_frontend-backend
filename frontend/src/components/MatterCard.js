import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MatterCard({ matter }) {
  const statusStyles = {
    Open: { color: 'green', fontWeight: 'bold' },
    Closed: { color: 'red', fontWeight: 'bold' },
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '16px auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="h5" component="div">
          {matter.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} style={statusStyles[matter.status]}>
          {matter.status}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline' }}>
          Location:
        </Typography>{' '}
        <Typography variant="body2" sx={{ display: 'inline' }}>
          {matter.location}
        </Typography>
        <br />
        <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline' }}>
          Description:
        </Typography>{' '}
        <Typography variant="body2" sx={{ display: 'inline' }}>
          {matter.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" color="primary">
          View Full Case Description and Related Files
        </Button>
      </CardActions>
    </Card>
  );
}
