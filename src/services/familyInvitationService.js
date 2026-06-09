import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getMyPendingInvitations() {
  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/my-pending`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load invitations");
  }

  return response.json();
}

export async function acceptInvitation(
  invitationId
) {
  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/${invitationId}/accept`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to accept invitation");
  }
}

export async function declineInvitation(
  invitationId
) {
  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/${invitationId}/decline`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to decline invitation");
  }
}