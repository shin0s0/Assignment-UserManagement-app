import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css'; // Import the CSS file for styling

/**
 * HomePage component that provides navigation to the user management features.
 */
const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>User Management App</h1>
        <p>Manage your users effortlessly with our user-friendly interface.</p>
        <Link to="/users" className="btn-primary">View Users</Link>
        <Link to="/create-user" className="btn-secondary">Create User</Link>
      </header>
      <section className="homepage-features">
        <div className="feature-card">
          <h2>Easy Management</h2>
          <p>Quickly add, update, and delete user information.</p>
        </div>
        <div className="feature-card">
          <h2>Responsive Design</h2>
          <p>Access the app from any device, whether mobile or desktop.</p>
        </div>
        <div className="feature-card">
          <h2>Intuitive Interface</h2>
          <p>Simple navigation and user-friendly forms for smooth interactions.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
