import React from 'react';

const UserProfile = ({ userData, onClose }) => {
  return (
    <div className="user-profile-modal">
      <div className="modal-content">
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userData.phone_number}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserProfile;
