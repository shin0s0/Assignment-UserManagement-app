import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetailPage from './components/UserDetailPage'; 
import './Styles/App.css';

// App component that sets up routes and includes navigation links.
function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">User Management</Link>
            <div className="navbar-links">
              <Link to="/">Home</Link>
              <Link to="/users">Users</Link>
              <Link to="/create-user">Create User</Link>
            </div>
          </div>
        </nav>

        {/* Spinner for loading state */}
        {loading && <div className="spinner"></div>}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList setLoading={setLoading} />} />
          <Route path="/create-user" element={<UserForm setLoading={setLoading} />} />
          <Route path="/edit-user/:id" element={<UserDetailPage setLoading={setLoading} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
