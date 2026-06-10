import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

import {
  getMyPendingInvitations,
  acceptInvitation,
  declineInvitation,
} from "../services/familyInvitationService";

import "../styles/global.css";


function NotificationsPage() {

  const [notifications, setNotifications] =
    useState([]);

  const [pendingInvitations, setPendingInvitations] =
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

    async function loadInvitations() {
      try {
        const data =
          await getMyPendingInvitations();

          console.log("Pending invitations:", data);

        setPendingInvitations(data);
      } catch (error) {
        console.error(error);
      }
}

  useEffect(() => {
  loadNotifications();
  loadInvitations();
}, []);

  async function handleMarkAsRead(
    notificationId
  ) {
    try {
      await markNotificationAsRead(
        notificationId
      );

      loadNotifications();

      window.dispatchEvent(
        new Event("notificationsUpdated")
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAcceptInvitation(
  invitationId
) {
  try {
    await acceptInvitation(
      invitationId
    );

    loadInvitations();
    loadNotifications();
  } catch (error) {
    console.error(error);
  }
}

async function handleDeclineInvitation(
  invitationId
) {
  try {
    await declineInvitation(
      invitationId
    );

    loadInvitations();
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

      {pendingInvitations.length > 0 && (
  <>
    <h2>Pending Invitations</h2>
    <><br /></>

    {pendingInvitations.map(
      (invitation) => (
        <div
          key={invitation.invitationId}
          className="invitation-card"
        >
          <div className="invitation-header">

        <div>

          <h3>
            {invitation.familyName}
          </h3>

          <p>
            {invitation.invitedByName}
            {" "}invited you to join
            this family.
          </p>

        </div>

      </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            <button
              className="primary-btn"
              onClick={() =>
                handleAcceptInvitation(
                  invitation.invitationId
                )
              }
            >
              Accept
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                handleDeclineInvitation(
                  invitation.invitationId
                )
              }
            >
              Decline
            </button>
          </div>
        </div>
      )
    )}
  </>
)}

          {notifications.length === 0 &&
      pendingInvitations.length === 0 ? (
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