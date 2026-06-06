import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getMyLogs() {

  const response = await fetch(
    `${API_BASE_URL}/api/healthlogs/my-logs`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load history");
  }

  return response.json();
}