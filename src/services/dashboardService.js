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

export async function getBloodPressureHistory() {

  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/history/blood-pressure`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load blood pressure history"
    );
  }

  return response.json();
}

export async function getFastingSugarHistory() {

  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/history/fasting-sugar`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load fasting sugar history"
    );
  }

  return response.json();
}

export async function getPostMealSugarHistory() {

  const response = await fetch(
    `${API_BASE_URL}/api/dashboard/history/post-meal-sugar`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load post meal sugar history"
    );
  }

  return response.json();
}