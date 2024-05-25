import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard'; 
import SearchAppBar from '../components/SearchAppBar/SearchAppBar'; 

const UserProfile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchUser() {
      try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/employees/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data.data); 
      } catch (error) {
        console.error("Could not fetch user:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchUser();
  }, [id]); 

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  const userDataForCard = {
    name: `${user.FirstName} ${user.LastName}`,
    avatar: user.AvatarUrl || '/static/images/avatar/default.png', 
    description: user.Bio || '', 
    expertise: user.Expertise,
    email: user.Email,
    phone: user.Phone,
    location: user.Location
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <SearchAppBar />
      <UserCard user={userDataForCard} />
    </div>
  );
};

export default UserProfile;
