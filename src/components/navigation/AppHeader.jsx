import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";

import { getProfile } from "../../services/profileService";
import { getUnreadNotifications } from "../../services/notificationService";

function AppHeader() {

  const [profile, setProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

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


async function loadUnreadNotifications() {

      try {

        const notifications =
          await getUnreadNotifications();

        setUnreadCount(notifications.length);

      } catch (error) {

        console.error(error);

      }

    }

    loadProfile();
    loadUnreadNotifications();

    const interval =
    setInterval(
      loadUnreadNotifications,
      30000
    );

    window.addEventListener(
      "notificationsUpdated",
      loadUnreadNotifications
    );

    return () => {

      clearInterval(interval);

      window.removeEventListener(
        "notificationsUpdated",
        loadUnreadNotifications
      );

    };


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

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

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