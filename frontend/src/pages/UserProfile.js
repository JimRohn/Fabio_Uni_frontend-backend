import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard'; // Ensure this path is correct
import SearchAppBar from '../components/SearchAppBar/SearchAppBar'; // Ensure this path is correct

const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null); // Initialize state for user data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Function to fetch user data from the backend
    async function fetchUser() {
      try {
        // Use the environment variable to construct the URL
        const url = `${process.env.REACT_APP_BACKEND_URL}/employees/${id}`;
        console.log("Fetching user data from URL:", url); // Log the URL
        // Make the GET request to the backend
        const response = await fetch(url);
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response body as JSON
        const data = await response.json();
        console.log("Fetched user data:", data); // Log the fetched data
        // Update the state with the user data
        setUser(data.data); // Ensure you're setting the correct part of the response
      } catch (error) {
        // Log any errors to the console
        console.error("Could not fetch user:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    }

    fetchUser();
  }, [id]); // This effect should run whenever the user ID changes

  // If user data is still being fetched, display a loading message
  if (loading) {
    return <div>Loading user data...</div>;
  }

  // If user data could not be fetched, display an error message
  if (!user) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  // Prepare user data to pass to the UserCard component
  const userDataForCard = {
    name: `${user.FirstName} ${user.LastName}`,
    avatar: user.AvatarUrl || '/static/images/avatar/default.jpg', // Adjust as needed
    description: user.Bio || 'No bio available', // Adjust as needed
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
