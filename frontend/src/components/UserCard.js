// UserCard.js
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function UserCard({ user }) { // Accept user prop
    return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        overflow: 'auto',
        resize: 'horizontal',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content
        gap: 2, // Adds space between items
      }}
    >
      <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }} /> {/* Use dynamic data and adjust size */}
      <CardContent sx={{ textAlign: 'center' }}> 
      {/* Center the text */}
      
        <Typography level="h6">{user.name}</Typography> {/* Use dynamic data */}
        <Typography level="body2">{user.bio || 'No bio available'}</Typography> {/* Use dynamic data or fallback */}
       Specialisation: <Typography level="body2">{user.specialisation}</Typography> {/* Example for speciality */}
       e-mail: <Typography level="body2">{user.email}</Typography> {/* Example for email */}
      phone:  <Typography level="body2">{user.phone}</Typography> {/* Example for phone */}
     location: <Typography level="body2">{user.location}</Typography> {/* Example for location */}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}> {/* Center the buttons */}
        <Button variant="outlined" color="neutral">
          View
        </Button>
        <Button variant="solid" color="primary">
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}
