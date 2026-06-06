import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function createBloodPressureLog(
  systolic,
  diastolic
) {
  const response = await fetch(
    `${API_BASE_URL}/api/healthlogs/blood-pressure`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        systolic,
        diastolic,
      }),
    }
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export async function createBloodSugarLog(
  sugarValue,
  sugarType
) {
  const response = await fetch(
    `${API_BASE_URL}/api/healthlogs/blood-sugar`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        sugarValue,
        sugarType,
      }),
    }
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}