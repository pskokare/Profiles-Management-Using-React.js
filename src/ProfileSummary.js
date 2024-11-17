
import React, { useState } from "react";
import "./ProfileSummary.css";

const ProfileSummary = ({ profile, handleBackToGrid, openMap, updateProfile, deleteProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteProfile(profile.id);
  };

  return (
    <div className="profile-detail">
      <button onClick={handleBackToGrid} className="back-button">⬅ </button>
      <img
        src={updatedProfile.image}
        alt={profile.name}
        className="detail-image"
      />
      {isEditing ? (
        <>
          <textarea
            name="image"
            placeholder="Enter image URL"
            value={updatedProfile.image}
            onChange={handleEditChange}
            className="edit-input"
          />
          <textarea
            name="description"
            placeholder="Enter description"
            value={updatedProfile.description}
            onChange={handleEditChange}
            className="edit-input"
          />
          <textarea
            name="address"
            placeholder="Enter address"
            value={updatedProfile.address}
            onChange={handleEditChange}
            className="edit-input"
          />
          <button onClick={handleSave} className="save-button">Save</button>
        </>
      ) : (
        <>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
          <p>{profile.address}</p>
          <button
            className="map-button"
            onClick={() => openMap(profile.address)}
          >
            Open Map
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Edit Profile
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileSummary;
