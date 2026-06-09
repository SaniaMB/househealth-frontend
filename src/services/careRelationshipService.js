import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function observeUser(
  trackedUserId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/care-relationships/${trackedUserId}`,
    {
      method: "POST",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create care relationship"
    );
  }
}

export async function stopObserving(
  trackedUserId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/care-relationships/${trackedUserId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to remove care relationship"
    );
  }
}

export async function getUsersIObserve() {

  const response = await fetch(
    `${API_BASE_URL}/api/care-relationships/observing`,
    {
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load care relationships"
    );
  }

  return response.json();
}

export async function getMyObservers() {

  const response = await fetch(
    `${API_BASE_URL}/api/care-relationships/observers`,
    {
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load observers"
    );
  }

  return response.json();
}