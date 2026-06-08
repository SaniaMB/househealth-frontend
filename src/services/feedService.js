import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getFamilyFeed() {

  const response =
    await fetch(
      `${API_BASE_URL}/api/healthlogs/feed`,
      {
        headers: getAuthHeaders(),
      }
    );

  if (!response.ok) {
    throw new Error(
      "Failed to load feed"
    );
  }

  return response.json();
}