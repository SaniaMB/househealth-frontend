import API_BASE_URL from "./api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getReminderSettings(metricType) {

  const response = await fetch(
    `${API_BASE_URL}/api/reminders/settings?metricType=${metricType}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch reminder settings");
  }

  return response.json();
}

export async function configureReminder(
  metricType,
  frequencyType,
  frequencyInterval,
  notificationsEnabled
) {

  const response = await fetch(
    `${API_BASE_URL}/api/reminders/configure-reminder`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        metricType,
        frequencyType,
        frequencyInterval,
        notificationsEnabled,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save reminder");
  }

  return response.json();
}