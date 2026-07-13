import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  IoTimeOutline,
  IoNotificationsOutline,
  IoLogOutOutline,
  IoHeartOutline,
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
  IoCreateOutline,
} from "react-icons/io5";

import {
  getUsersIObserve,
  getMyObservers,
} from "../services/careRelationshipService";

import "../styles/profile.css";
import { getProfile, updateName } from "../services/profileService";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [peopleUnderMyCare, setPeopleUnderMyCare] = useState([]);
  const [myObservers, setMyObservers] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [profileData, observedData, observerData] = await Promise.all([
          getProfile(),
          getUsersIObserve(),
          getMyObservers(),
        ]);
        setProfile(profileData);
        setPeopleUnderMyCare(observedData);
        setMyObservers(observerData);
        setProfile(profileData);
        setNewName(profileData.name);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleSaveName() {
    try {
      const updatedProfile = await updateName(newName);

      setProfile(updatedProfile);
      setIsEditingName(false);
    } catch (error) {
      alert(error.message);
    }
  }

  if (!profile) {
    return (
      <div className="page-container">
        <div className="profile-skeleton">
          <div className="profile-skeleton-avatar" />
          <div className="profile-skeleton-line" />
          <div className="profile-skeleton-line short" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Identity card */}
      <div className="profile-hero">
        <div className="profile-avatar-lg">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        {isEditingName ? (
          <div className="profile-name-edit">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="profile-name-input"
            />

            <div className="profile-name-actions">
              <button onClick={handleSaveName}>Save</button>

              <button
                onClick={() => {
                  setNewName(profile.name);
                  setIsEditingName(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="profile-name">{profile.name}</h2>

            <button
              className="edit-name-btn"
              onClick={() => setIsEditingName(true)}
            >
              <IoCreateOutline />
              Edit Name
            </button>
          </>
        )}
        <p className="profile-email">{profile.email}</p>
      </div>

      {/* Care circle */}
      <div className="dashboard-card care-circle-card">
        <div className="care-circle-heading">
          <IoShieldCheckmarkOutline className="care-circle-icon" />
          <h3>Care Circle</h3>
        </div>

        <div className="care-section">
          <span className="care-section-title">People Under My Care</span>
          <div className="care-list">
            {peopleUnderMyCare.length === 0 ? (
              <div className="care-empty">Nobody yet</div>
            ) : (
              peopleUnderMyCare.map((person) => (
                <div key={person.userId} className="care-person">
                  {person.userName}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="care-section">
          <span className="care-section-title">Caring For You</span>
          <div className="care-list">
            {myObservers.length === 0 ? (
              <div className="care-empty">Nobody yet</div>
            ) : (
              myObservers.map((person) => (
                <div key={person.userId} className="care-person">
                  {person.userName}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Health actions */}
      <div className="profile-menu-card">
        <button
          className="profile-menu-item"
          onClick={() => navigate("/history")}
        >
          <div className="profile-menu-left">
            <div className="profile-menu-icon green">
              <IoHeartOutline />
            </div>
            <span>Health History</span>
          </div>
          <IoChevronForwardOutline className="profile-menu-chevron" />
        </button>

        <div className="profile-menu-divider" />

        <button
          className="profile-menu-item"
          onClick={() => navigate("/reminders")}
        >
          <div className="profile-menu-left">
            <div className="profile-menu-icon blue">
              <IoNotificationsOutline />
            </div>
            <span>Reminder Settings</span>
          </div>
          <IoChevronForwardOutline className="profile-menu-chevron" />
        </button>
      </div>

      {/* Logout */}
      <button className="profile-logout-btn" onClick={handleLogout}>
        <IoLogOutOutline />
        Log Out
      </button>

    </div>
  );
}

export default ProfilePage;