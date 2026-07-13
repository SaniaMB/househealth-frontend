import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getProfile() {

  const response = await fetch(
    `${API_BASE_URL}/api/users/me/profile`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}

export async function updateName(name) {
  const response = await fetch(
    `${API_BASE_URL}/api/users/me/name`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}