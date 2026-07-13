import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import { getProfile } from "../../services/profileService";
import { getUnreadNotifications } from "../../services/notificationService";

function AppHeader({ scrolled }) {
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
        const notifications = await getUnreadNotifications();
        setUnreadCount(notifications.length);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
    loadUnreadNotifications();

    const interval = setInterval(loadUnreadNotifications, 30000);

    window.addEventListener("notificationsUpdated", loadUnreadNotifications);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notificationsUpdated", loadUnreadNotifications);
    };
  }, []);

  const initial = profile?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className={`app-header${scrolled ? " scrolled" : ""}`}>
      <div className="app-header-brand">
        <h2>HouseHealth</h2>
        {profile?.name && (
          <span className="app-header-sub">Hi, {profile.name.split(" ")[0]} 👋</span>
        )}
      </div>

      <div className="header-actions">
        {/* Notifications */}
        <button
          className="notification-btn"
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="header-avatar"
          onClick={() => navigate("/profile")}
          role="button"
          aria-label="Go to profile"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/profile")}
        >
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name} />
          ) : (
            initial
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;