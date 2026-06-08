import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";

function ProfilePage() {

  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    async function loadProfile() {

      try {

        const data = await getProfile();

        setProfile(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadProfile();

  }, []);

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");

  }

  if (!profile) {

    return (
      <div className="page-container">
        Loading...
      </div>
    );

  }

  return (
    <div className="page-container">

      <div className="dashboard-card">

        <div
          className="avatar"
          style={{
            margin: "0 auto"
          }}
        >
          {profile.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <br />

        <h2>{profile.name}</h2>

        <p className="dashboard-subtext">
          {profile.email}
        </p>

      </div>

      <div className="dashboard-card">

        <h3>
          Health
        </h3>

        <br />

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/history")
          }
        >
          View Health History
        </button>

        <br />
        <br />

        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/reminders")
          }
        >
          Reminder Settings
        </button>

      </div>

      <div className="dashboard-card">

        <button
          className="secondary-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default ProfilePage;