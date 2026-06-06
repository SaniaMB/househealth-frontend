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
        <h1>Profile</h1>
        <p>Loading...</p>
      </div>
    );

  }

  return (
    <div className="page-container">

      <div className="dashboard-card">

        <div className="avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <br />

        <h2>{profile.name}</h2>

        <p className="dashboard-subtext">
          {profile.email}
        </p>

        <p className="dashboard-subtext">
          Member since{" "}
          {new Date(
            profile.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

      <div className="dashboard-card">

        <button
          className="primary-btn"
          onClick={() => navigate("/history")}
        >
          View Health History
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