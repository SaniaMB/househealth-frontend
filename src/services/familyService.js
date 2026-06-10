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

export async function removeMember(
  familyId,
  targetUserId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-membership/${familyId}/remove-member/${targetUserId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to remove member"
    );
  }

  return response.text();
}

export async function leaveFamily(
  familyId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-membership/${familyId}/leave-family`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to leave family"
    );
  }

  return response.text();
}

export async function addOwner(
  familyId,
  targetUserId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-membership/${familyId}/add-owner/${targetUserId}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to add owner"
    );
  }

  return response.text();
}

export async function transferOwnership(
  familyId,
  targetUserId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-membership/${familyId}/transfer-ownership/${targetUserId}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to transfer ownership"
    );
  }

  return response.text();
}

export async function sendFamilyInvitation(
  familyId,
  email
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/${familyId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send invitation"
    );
  }

  return response.text();
}

export async function getPendingInvitations() {

  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/my-pending`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load invitations"
    );
  }

  return response.json();
}

export async function acceptInvitation(
  invitationId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/${invitationId}/accept`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to accept invitation"
    );
  }

  return response.text();
}

export async function declineInvitation(
  invitationId
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family-invitations/${invitationId}/decline`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to decline invitation"
    );
  }

  return response.text();
}

export async function renameFamily(
  familyId,
  familyName
) {

  const response = await fetch(
    `${API_BASE_URL}/api/family/${familyId}/rename-family`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        familyName,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to rename family"
    );
  }

  return response.text();
}