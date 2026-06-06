import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getDashboard() {
  const response = await fetch(
    `${API_BASE_URL}/api/dashboard`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }

  return response.json();
}