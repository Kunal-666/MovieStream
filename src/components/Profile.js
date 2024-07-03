import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, logOut } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-heading">Profile</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {currentUser?.email}</p>
          {/* Add more user details as needed */}
        </div>
        <button className="logout-button" onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
