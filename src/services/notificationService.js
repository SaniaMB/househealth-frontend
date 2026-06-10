import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getNotifications() {
  const response = await fetch(
    `${API_BASE_URL}/api/notifications`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load notifications");
  }

  return response.json();
}

export async function markNotificationAsRead(
  notificationId
) {
  const response = await fetch(
    `${API_BASE_URL}/api/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }
}

export async function getUnreadNotifications() {

  const response = await fetch(
    `${API_BASE_URL}/api/notifications/unread`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load unread notifications");
  }

  return response.json();
}