import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserForm.css';


//Component for creating or editing a user.
 
const UserForm = ({ setLoading, user }) => {
  const [name, setName] = useState(user ? user.name : ''); 
  const [email, setEmail] = useState(user ? user.email : ''); 
  const [phone, setPhone] = useState(user ? user.phone : ''); 
  const [address, setAddress] = useState(user ? user.address.street : ''); 
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // Hook for navigation

  // Handler function to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    const method = user ? 'PUT' : 'POST'; // Determine method based on whether user exists
    const url = user
      ? `https://jsonplaceholder.typicode.com/users/${user.id}`
      : 'https://jsonplaceholder.typicode.com/users';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, address }), // Send user data
    })
      .then(response => response.json())
      .then(() => {
        setLoading(false); // Set loading to false after success
        navigate('/users'); // Navigate to user list
      })
      .catch(() => {
        setError('Failed to save user.');
        setLoading(false); // Set loading to false in case of error
      });
  };

  return (
    <div className="user-form">
      <h2>{user ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Save
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default UserForm;
