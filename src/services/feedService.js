import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getFamilyFeed() {
  const response = await fetch(
    `${API_BASE_URL}/api/healthlogs/family/7`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load family feed");
  }

  return response.json();
}