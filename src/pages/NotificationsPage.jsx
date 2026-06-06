import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

function NotificationsPage() {

  const [notifications, setNotifications] =
    useState([]);

  async function loadNotifications() {
    try {
      const data =
        await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function handleMarkAsRead(
    notificationId
  ) {
    try {
      await markNotificationAsRead(
        notificationId
      );

      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="page-container">

      <div className="feed-header">
        <h1>Notifications</h1>

        <p>
          Health reminders and updates.
        </p>
      </div>

      {notifications.length === 0 ? (
        <div className="dashboard-card">
          <p>
            No notifications yet.
          </p>
        </div>
      ) : (
        notifications.map(
          (notification) => (
            <div
              key={
                notification.notificationId
              }
              className="feed-card"
            >
              <h3>
                {notification.title}
              </h3>

              <p>
                {notification.message}
              </p>

              <br />

              <small>
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </small>

              {!notification.read && (
                <div
                  style={{
                    marginTop: "12px",
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={() =>
                      handleMarkAsRead(
                        notification.notificationId
                      )
                    }
                  >
                    Mark as Read
                  </button>
                </div>
              )}
            </div>
          )
        )
      )}

    </div>
  );
}

export default NotificationsPage;