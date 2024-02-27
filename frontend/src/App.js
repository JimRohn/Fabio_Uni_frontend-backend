import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import PermanentDrawerLeft from "./components/NavBar/NavBar";
import { Box, Toolbar } from "@mui/material";
import Learning from "./pages/Learning";
import UserList from "./pages/UserList";
import Events from "./pages/Events";
import Matters from "./pages/Matters";

function App() {
  const drawerWidth = 240;

  return (
    <BrowserRouter>
      <SearchAppBar />
      <PermanentDrawerLeft />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar /> {/* This pushes content down below AppBar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/matters" element={<Matters />} />
          <Route path="/learning" element={<Learning />} />
          {/* ... other routes */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
