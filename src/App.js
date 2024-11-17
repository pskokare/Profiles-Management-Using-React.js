
import React, { useState } from "react";
import "./App.css";
import ProfileSummary from "./ProfileSummary";


const initialProfiles = [
  { id: 1, name: "John Doe", description: "Web Developer", address: "1600 Amphitheatre Parkway, Mountain View, CA", image: "/Images/tata.jpeg" },
  { id: 2, name: "Jane Smith", description: "Graphic Designer", address: "1 Infinite Loop, Cupertino, CA", image: "/Images/img2.jpeg" },
  { id: 3, name: "Alice Johnson", description: "Product Manager", address: "500 Terry Ave N, Seattle, WA", image: "/Images/img3.jpeg" },
  { id: 4, name: "Michael Brown", description: "Software Engineer", address: "10 Downing Street, London, UK", image: "/Images/img4.jpeg" },
  { id: 5, name: "Sarah Davis", description: "Data Scientist", address: "77 Massachusetts Ave, Cambridge, MA", image: "/Images/img5.jpeg" },
  { id: 6, name: "David Wilson", description: "UX Designer", address: "345 Park Avenue, New York, NY", image: "/Images/img6.jpeg" },
  { id: 7, name: "Emma Thomas", description: "Marketing Manager", address: "123 Fake Street, Springfield, IL", image: "/Images/img7.jpeg" },
  { id: 8, name: "Olivia Miller", description: "HR Specialist", address: "221B Baker Street, London, UK", image: "/Images/img8.jpeg" },
  { id: 9, name: "Noah Garcia", description: "Cloud Architect", address: "Silicon Valley, CA", image: "/Images/img9.jpeg" },
  { id: 10, name: "Ethan Martinez", description: "AI Specialist", address: "1 Hacker Way, Menlo Park, CA", image: "/Images/img10.jpeg" },
];

function App() {
  const [profiles, setProfiles] = useState(initialProfiles); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleBackToGrid = () => {
    setSelectedProfile(null);
  };

  const openMap = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  const updateProfile = (updatedProfile) => {
 
    const updatedProfiles = profiles.map((profile) =>
      profile.id === updatedProfile.id ? updatedProfile : profile
    );
    setProfiles(updatedProfiles); 
    setSelectedProfile(updatedProfile); 
  };

  const deleteProfile = (profileId) => {
   
    const updatedProfiles = profiles.filter((profile) => profile.id !== profileId);
    setProfiles(updatedProfiles);
    setSelectedProfile(null); 
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Profiles</h1>
      {!selectedProfile ? (
        <>
          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Profile"
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />
          </div>
          <div className="card-grid">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="profile-card">
                <img src={profile.image} alt={profile.name} className="profile-image" />
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-description">{profile.description}</p>
                <p className="profile-address">{profile.address}</p>
                <button className="map-button" onClick={() => openMap(profile.address)}>
                  Open Map
                </button>
                <button
                  className="summary-button"
                  onClick={() => handleProfileClick(profile)}
                >
                  Summary
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ProfileSummary
          profile={selectedProfile}
          handleBackToGrid={handleBackToGrid}
          openMap={openMap}
          updateProfile={updateProfile}
          deleteProfile={deleteProfile}
        />
      )}
    </div>
  );
}

export default App;
