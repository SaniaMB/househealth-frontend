import API_BASE_URL from "./api";

export async function downloadHealthReport() {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/reports/health`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate report.");
  }

  return response.blob();
}