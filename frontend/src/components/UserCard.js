import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function UserCard({ user }) { 
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        overflow: 'auto',
        resize: 'horizontal',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{user.name}</Typography>
        {user.description && (
          <Typography variant="body2">{user.description}</Typography>
        )}
        <Typography variant="body2">
          Specialisation: {user.expertise || 'Not provided'}
        </Typography>
        <Typography variant="body2">
          e-mail: {user.email || 'Not provided'}
        </Typography>
        <Typography variant="body2">
          phone: {user.phone || 'Not provided'}
        </Typography>
        <Typography variant="body2">
          location: {user.location || 'Not provided'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="outlined">
          View
        </Button>
        <Button variant="contained" color="primary">
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}
