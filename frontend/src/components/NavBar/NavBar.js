import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const drawerWidth = 240;

const drawerItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" }, // Changed path to "/"
  { text: "People", icon: <PeopleIcon />, path: "/users" }, // Adjusted path
  { text: "Matters", icon: <WorkIcon />, path: "/matters" },
  { text: "Events", icon: <CalendarMonthIcon />, path: "/events" },
  { text: "Learning", icon: <SchoolIcon />, path: "/learning" },
];

export default function PermanentDrawerLeft() {
  const navigate = useNavigate(); // Hook for navigation

  const handleListItemClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
