import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoTimeOutline,
  IoNotificationsOutline,
  IoLogOutOutline,
  IoHeartOutline,
  IoChevronForwardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

import { getProfile } from "../services/profileService";
import {
  getUsersIObserve,
  getMyObservers,
} from "../services/careRelationshipService";

import "../styles/profile.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [peopleUnderMyCare, setPeopleUnderMyCare] = useState([]);
  const [myObservers, setMyObservers] = useState([]);

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
        <h2 className="profile-name">{profile.name}</h2>
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