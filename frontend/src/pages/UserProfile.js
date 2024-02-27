import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard'; // Ensure this path is correct
import SearchAppBar from '../components/SearchAppBar/SearchAppBar'; // Ensure this path is correct

const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null); // Initialize state for user data

  useEffect(() => {
    // Function to fetch user data from the backend
    async function fetchUser() {
      try {
        // Use the environment variable to construct the URL
        const url = `${process.env.REACT_APP_BACKEND_URL}/employees/${id}`;
        // Make the GET request to the backend
        const response = await fetch(url);
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response body as JSON
        const data = await response.json();
        // Update the state with the user data
        setUser(data);
      } catch (error) {
        // Log any errors to the console
        console.error("Could not fetch user:", error);
      }
    }

    fetchUser();
  }, [id]); // This effect should run whenever the user ID changes

  // If user data has not been fetched, display a loading message
  if (!user) {
    return <div>Loading user data...</div>;
  }

  // Prepare user data to pass to the UserCard component
  const userDataForCard = {
    name: `${user.firstName} ${user.lastName}`,
    avatar: user.avatarUrl || '/static/images/avatar/default.jpg', // Adjust as needed
    description: user.bio || 'No bio available', // Adjust as needed
    // Add any other fields needed for the UserCard
  };

  // Render the SearchAppBar and UserCard components
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <SearchAppBar />
      <UserCard user={userDataForCard} />
    </div>
  );
};

export default UserProfile;
