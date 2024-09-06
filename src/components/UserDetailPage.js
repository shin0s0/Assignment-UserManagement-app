import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';

// Component that fetches and displays user details for editing.

const UserDetailPage = ({ setLoading }) => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fetch user details from API
    setLoading(true); // Set loading to true when fetching starts
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(() => {
        setError('Failed to fetch user details.');
        setLoading(false); // Set loading to false in case of error
      });
  }, [id, setLoading]);

  if (error) return <div>{error}</div>;

  return (
    <div className="user-detail">
      <h2>Edit User</h2>
      {user && <UserForm user={user} setLoading={setLoading} />}
      {/* Render UserForm with user data */}
    </div>
  );
};

export default UserDetailPage;
