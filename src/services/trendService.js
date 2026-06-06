import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getBloodPressureTrend() {
  const response = await fetch(
    `${API_BASE_URL}/api/trends/blood-pressure?trendPeriod=MONTH`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load BP trend");
  }

  return response.json();
}

export async function getFastingSugarTrend() {
  const response = await fetch(
    `${API_BASE_URL}/api/trends/fasting-sugar?trendPeriod=MONTH`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load sugar trend");
  }

  return response.json();
}