// src/components/SemanticSearchBar/SemanticSearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const SemanticSearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/search', { query });
      onSearchResults(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  return (
    <Box display="flex" mb={4}>
      <TextField
        variant="outlined"
        placeholder="Search for experts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        size="small"
        style={{ marginRight: '8px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SemanticSearchBar;
