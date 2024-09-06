import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/UserList.css';

/**
 * UserList component that fetches and displays a list of users with pagination.
 */
const UserList = ({ setLoading }) => {
  const [users, setUsers] = useState([]); // State to store users
  const [error, setError] = useState(null); // State to manage errors
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const usersPerPage = 20; // Number of users to display per page

  useEffect(() => {
    // Fetch users from API
    setLoading(true); // Set loading to true when fetching starts
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched users:", data); // Log fetched data
        setUsers(data); // Set the users data
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        setError('Failed to fetch users.');
        setLoading(false); // Set loading to false in case of error
      });
  }, [setLoading]);

  // Handler function to delete a user
  const handleDelete = (id) => {
    setLoading(true); // Set loading to true when deleting starts
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the user from the local state
        setUsers(users.filter(user => user.id !== id));
        setLoading(false); // Set loading to false after success
      })
      .catch(() => {
        setError('Failed to delete user.');
        setLoading(false); // Set loading to false in case of error
      });
  };

  // Show error message if present
  if (error) return <div>{error}</div>;

  // Calculate current page users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {currentUsers.map(user => ( // Display users for the current page
          <li key={user.id} className="user-item">
            <p>{user.name} ({user.email})</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.street}, {user.address.city}</p>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <Link to={`/edit-user/${user.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
