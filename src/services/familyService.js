import API_BASE_URL from "./api";
import { getAuthHeaders } from "./authHeader";

export async function getMyFamilies() {

  const response = await fetch(
    `${API_BASE_URL}/api/family/my-families`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load families"
    );
  }

  return response.json();
}

export async function getFamilyMembers(
  familyId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family/${familyId}/members`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load family members"
    );
  }

  return response.json();
}

export async function createFamily(
  familyName
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family/create-family`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        familyName,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create family"
    );
  }

  return response.json();
}

export async function getMemberTrendSummary(
  familyId,
  userId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family/${familyId}/member/${userId}/trend-summary`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load trend summary"
    );
  }

  return response.json();
}