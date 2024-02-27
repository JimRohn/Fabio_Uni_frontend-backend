import React from 'react';
import { useParams } from 'react-router-dom';
import { rows } from './UserList'; // Adjust the import path as needed
import UserCard from '../components/UserCard'; // Import your UserCard component
import SearchAppBar from '../components/SearchAppBar/SearchAppBar';
const UserProfile = () => {
  const { id } = useParams();
  const user = rows.find((user) => user.id === parseInt(id, 10));

  if (!user) {
    return <div>User not found</div>;
  }

  // Prepare the user data to pass to the UserCard
  // Assuming your user data has fields like `firstName`, `lastName`, etc.
  const userDataForCard = {
    name: `${user.firstName} ${user.lastName}`,
    // Add an avatar URL and description/bio to your mock data or modify these fields as needed
    avatar: user.avatarUrl || '/static/images/avatar/default.jpg', // Fallback to a default avatar if none is provided
    description: user.bio || 'No bio available', // Fallback to a default message if none is provided
    // Include any additional fields you want to display in the UserCard
  };

  return (



    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <SearchAppBar />
      <UserCard user={userDataForCard} />
    </div>
  );
};

export default UserProfile;
