import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

import { getProfile } from "../../services/profileService";

function AppHeader() {

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

  return (
    <header className="app-header">

      <div>

        <h2>HouseHealth</h2>
        
      </div>

      <div className="header-actions">

        <button
          className="notification-btn"
          onClick={() =>
            navigate("/notifications")
          }
        >
          <IoNotificationsOutline />
        </button>

        <div
          className="header-avatar"
          onClick={() =>
            navigate("/profile")
          }
        >
          {
            profile?.name
              ?.charAt(0)
              ?.toUpperCase() || "?"
          }
        </div>

      </div>

    </header>
  );
}

export default AppHeader;