import { useEffect, useState } from "react";
import {
  IoNotificationsOutline,
  IoMailOpenOutline,
  IoCheckmarkDoneOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

import {
  getMyPendingInvitations,
  acceptInvitation,
  declineInvitation,
} from "../services/familyInvitationService";

import "../styles/notification.css";

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso);
  const m = Math.floor(diffMs / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d === 1) return "yesterday";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);
  const [decliningId, setDecliningId] = useState(null);

  async function loadAll() {
    try {
      const [notifData, inviteData] = await Promise.all([
        getNotifications(),
        getMyPendingInvitations(),
      ]);
      setNotifications(notifData);
      setPendingInvitations(inviteData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  async function handleMarkAsRead(notificationId) {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === notificationId ? { ...n, read: true } : n
        )
      );
      window.dispatchEvent(new Event("notificationsUpdated"));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAccept(invitationId) {
    setAcceptingId(invitationId);
    try {
      await acceptInvitation(invitationId);
      await loadAll();
    } catch (error) {
      console.error(error);
    } finally {
      setAcceptingId(null);
    }
  }

  async function handleDecline(invitationId) {
    setDecliningId(invitationId);
    try {
      await declineInvitation(invitationId);
      await loadAll();
    } catch (error) {
      console.error(error);
    } finally {
      setDecliningId(null);
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const isEmpty = notifications.length === 0 && pendingInvitations.length === 0;

  return (
    <div className="page-container">

      <div className="feed-header">
        <div className="notif-header-row">
          <div>
            <h1>Notifications</h1>
            <p>Updates and invitations from your family.</p>
          </div>
          {unreadCount > 0 && (
            <span className="notif-unread-count">{unreadCount} unread</span>
          )}
        </div>
      </div>

      {/* Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="notif-section">
          <div className="notif-section-label">
            <IoPersonAddOutline /> Pending Invitations
          </div>

          {pendingInvitations.map((inv) => (
            <div key={inv.invitationId} className="invitation-card">
              <div className="invitation-header">
                <div className="notif-inv-icon">
                  <IoPersonAddOutline />
                </div>
                <div>
                  <h3>{inv.familyName}</h3>
                  <p>
                    <strong>{inv.invitedByName}</strong> invited you to join this family.
                  </p>
                </div>
              </div>

              <div className="notif-invite-actions">
                <button
                  className="primary-btn"
                  onClick={() => handleAccept(inv.invitationId)}
                  disabled={acceptingId === inv.invitationId}
                >
                  {acceptingId === inv.invitationId ? "Joining…" : "Accept"}
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => handleDecline(inv.invitationId)}
                  disabled={decliningId === inv.invitationId}
                >
                  {decliningId === inv.invitationId ? "Declining…" : "Decline"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notif-section">
          {pendingInvitations.length > 0 && (
            <div className="notif-section-label">
              <IoNotificationsOutline />Activity
            </div>
          )}

          {notifications.map((n) => (
            <div
              key={n.notificationId}
              className={`feed-card notif-card${n.read ? " notif-card--read" : ""}`}
            >
              <div className="notif-card-top">
                <div className="notif-dot-wrap">
                  {!n.read && <span className="notif-dot" />}
                  <div className="notif-icon-wrap">
                    <IoNotificationsOutline />
                  </div>
                </div>
                <div className="notif-card-content">
                  <h3>{n.title}</h3>
                  <p>{n.message}</p>
                  <small>{timeAgo(n.createdAt)}</small>
                </div>
              </div>

              {!n.read && (
                <button
                  className="notif-read-btn"
                  onClick={() => handleMarkAsRead(n.notificationId)}
                >
                  <IoCheckmarkDoneOutline />
                  Mark as read
                </button>
              )}

              {n.read && (
                <div className="notif-read-label">
                  <IoMailOpenOutline /> Read
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && isEmpty && (
        <div className="feed-empty">
          <div className="feed-empty-icon">🔔</div>
          <h3>You're all caught up</h3>
          <p>No notifications or invitations right now.</p>
        </div>
      )}

    </div>
  );
}

export default NotificationsPage;