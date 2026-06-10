import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/family.css";

import {
  getMyFamilies,
  getFamilyMembers,
  createFamily,
  removeMember,
  addOwner,
  leaveFamily,
  sendFamilyInvitation,
  renameFamily,
  transferOwnership
} from "../services/familyService";

import {
  getProfile,
} from "../services/profileService";

import {
  observeUser,
  stopObserving,
  getUsersIObserve
} from "../services/careRelationshipService";

function FamilyPage() {

  const navigate = useNavigate();

  const [families, setFamilies] =
    useState([]);

  const [selectedFamily,
    setSelectedFamily] =
    useState(null);

    const [observedUsers,
    setObservedUsers] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [currentUserId,
    setCurrentUserId] =
    useState(null);

  const [showCreateFamily,
    setShowCreateFamily] =
    useState(false);

  const [showInviteMember,
    setShowInviteMember] =
    useState(false);

  const [selectedMember,
    setSelectedMember] =
    useState(null);

  const [familyName,
    setFamilyName] =
    useState("");

  const [inviteEmail,
    setInviteEmail] =
    useState("");

    const [showRenameFamily,
    setShowRenameFamily] =
    useState(false);

    const [newFamilyName,
      setNewFamilyName] =
      useState("");

      const [showTransferOwnership,
      setShowTransferOwnership] =
      useState(false);

      const [newOwnerId,
      setNewOwnerId] =
      useState(null);

      useEffect(() => {

        loadFamilies();

        loadCurrentUser();

        loadObservedUsers();

      }, []);

  async function loadCurrentUser() {

    try {

      const profile =
        await getProfile();

      setCurrentUserId(
        profile.userId
      );

    } catch (error) {

      console.error(error);

    }

  }

  async function loadFamilies() {

    try {

      const data =
        await getMyFamilies();

      setFamilies(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function loadObservedUsers() {

      try {

        const data =
          await getUsersIObserve();

        setObservedUsers(data);

      } catch (error) {

        console.error(error);

      }

    }

    const ownerCount =
      members.filter(
        (member) => member.owner
      ).length;

    function isUnderMyCare(
      userId
    ) {

      return observedUsers.some(
        (user) =>
          user.userId === userId
      );

    }

    async function handleCareToggle(
      userId
    ) {

      try {

        if (
          isUnderMyCare(userId)
        ) {

          await stopObserving(
            userId
          );

        } else {

          await observeUser(
            userId
          );

        }

        await loadObservedUsers();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update care relationship"
        );

      }

    }

  async function handleFamilyClick(
    family
  ) {

    try {

      setSelectedFamily(family);

      setSelectedMember(null);

      const data =
        await getFamilyMembers(
          family.familyId
        );

      setMembers(data);

    } catch (error) {

      console.error(error);

    }
  }

  async function handleCreateFamily() {

    if (!familyName.trim()) {
      return;
    }

    try {

      await createFamily(
        familyName
      );

      setFamilyName("");

      setShowCreateFamily(
        false
      );

      loadFamilies();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create family"
      );

    }
  }

  async function handleInviteMember() {

    if (!inviteEmail.trim()) {
      return;
    }

    try {

      await sendFamilyInvitation(
        selectedFamily.familyId,
        inviteEmail
      );

      setInviteEmail("");

      setShowInviteMember(
        false
      );

      alert(
        "Invitation sent"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to send invitation"
      );

    }
  }

  async function handleRemoveMember(
    userId
  ) {

    try {

        const confirmed =
        window.confirm(
          `Remove ${selectedMember.name} from this family?`
        );

      if (!confirmed) {
        return;
      }

      await removeMember(
        selectedFamily.familyId,
        userId
      );

      const data =
        await getFamilyMembers(
          selectedFamily.familyId
        );

      setMembers(data);

      setSelectedMember(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to remove member"
      );

    }
  }

  async function handleMakeOwner(
    userId
  ) {

    const confirmed =
      window.confirm(
        `${selectedMember.name} will become an owner. Continue?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await addOwner(
        selectedFamily.familyId,
        userId
      );

      const data =
        await getFamilyMembers(
          selectedFamily.familyId
        );

      setMembers(data);

      setSelectedMember(null);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to add owner"
      );

    }
  }

  async function handleRenameFamily() {

  if (!newFamilyName.trim()) {
    return;
  }

  try {

    await renameFamily(
      selectedFamily.familyId,
      newFamilyName
    );

    setSelectedFamily({
      ...selectedFamily,
      familyName: newFamilyName
    });

    setFamilies(
      families.map((family) =>
        family.familyId ===
        selectedFamily.familyId
          ? {
              ...family,
              familyName:
                newFamilyName
            }
          : family
      )
    );

    setNewFamilyName("");

    setShowRenameFamily(
      false
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to rename family"
    );

  }

}

async function handleTransferOwnershipAndLeave() {

  if (!newOwnerId) {

    alert(
      "Select a new owner"
    );

    return;
  }

  try {

    await transferOwnership(
      selectedFamily.familyId,
      newOwnerId
    );

    await leaveFamily(
      selectedFamily.familyId
    );

    setShowTransferOwnership(
      false
    );

    setNewOwnerId(
      null
    );

    setSelectedFamily(
      null
    );

    setMembers([]);

    setSelectedMember(
      null
    );

    loadFamilies();

  } catch (error) {

    console.error(error);

    alert(
      "Failed to transfer ownership"
    );

  }

}

  async function handleLeaveFamily() {

    if (
      selectedFamily.owner &&
      ownerCount === 1 &&
      members.length > 1
    ) {

      setShowTransferOwnership(
        true
      );

      return;
    }
    try {

      const confirmed =
        window.confirm(
          "Leave this family?"
        );

      if (!confirmed) {
        return;
      }

      await leaveFamily(
        selectedFamily.familyId
      );

    setSelectedFamily(
      null
    );

    setMembers([]);

    setSelectedMember(
      null
    );

    loadFamilies();

    } catch (error) {

      console.error(error);

      alert(
        error.message
      );

    }
  }

  return (

    <div className="page-container">

      {!selectedFamily && (

        <>

          <div className="family-header">

            <h1>
              My Families
            </h1>

          </div>

          {families.map((family) => (

            <div
              key={family.familyId}
              className="family-card"
              onClick={() =>
                handleFamilyClick(
                  family
                )
              }
            >

              <h3>
                {family.familyName}
              </h3>

              {family.owner && (

                <span className="owner-badge">
                  Owner
                </span>

              )}

            </div>

          ))}

          {!showCreateFamily && (

            <button
              className="primary-btn"
              onClick={() =>
                setShowCreateFamily(
                  true
                )
              }
            >
              + Create Family
            </button>

          )}

          {showCreateFamily && (

            <div className="family-create-card">

              <input
                type="text"
                placeholder="Family Name"
                value={familyName}
                onChange={(e) =>
                  setFamilyName(
                    e.target.value
                  )
                }
              />

              <button
                className="primary-btn"
                onClick={
                  handleCreateFamily
                }
              >
                Create
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  setShowCreateFamily(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          )}

        </>

      )}

      {selectedFamily && (

        <>
          <div className="family-details-header">

            <h2>
              {selectedFamily.familyName}
            </h2>

            <p>
              {members.length} member
              {members.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

          {showInviteMember && (

            <div
              className="family-create-card"
            >

              <input
                type="email"
                placeholder="Email Address"
                value={inviteEmail}
                onChange={(e) =>
                  setInviteEmail(
                    e.target.value
                  )
                }
              />

              <button
                className="primary-btn"
                onClick={
                  handleInviteMember
                }
              >
                Send Invite
              </button>

            </div>

          )}

          {members.map((member) => (

            <div
              key={member.userId}
              className="family-member-card"
              onClick={() =>
                setSelectedMember(
                  member
                )
              }
            >

              <div className="member-avatar">

                {
                  member.name
                    .charAt(0)
                    .toUpperCase()
                }

              </div>

              <div>

                <h4>

                  {member.name}

                  {member.userId ===
                    currentUserId &&
                    " (You)"}

                </h4>

                {member.owner && (

                  <span className="owner-badge">
                    Owner
                  </span>

                )}

              </div>

            </div>

          ))}

          {showTransferOwnership && (

            <div
              className="family-management-card"
            >

              <h3>
                Transfer Ownership Required
              </h3>

              <p>
                You are the only owner of this
                family. Choose a new owner
                before leaving.
              </p>

              {members
                .filter(
                  (member) =>
                    member.userId !==
                    currentUserId
                )
                .map((member) => (

                  <button
                    key={member.userId}
                    className={
                      newOwnerId ===
                      member.userId
                        ? "primary-btn"
                        : "secondary-btn"
                    }
                    onClick={() =>
                      setNewOwnerId(
                        member.userId
                      )
                    }
                  >
                    {member.name}
                  </button>

                ))}

                <button
                  className="primary-btn"
                  onClick={
                    handleTransferOwnershipAndLeave
                  }
                >
                  Transfer Ownership & Leave
                </button>

            </div>

          )}

          {selectedMember && (

            <div
              className="family-management-card"
            >

              <h3>
                {selectedMember.name}
              </h3>

              {selectedMember.userId !==
                currentUserId && (

                <>

                  <button
                    className="secondary-btn"
                    onClick={() =>
                      navigate(
                        `/family/${selectedFamily.familyId}/member/${selectedMember.userId}`
                      )
                    }
                  >
                    View Trends
                  </button>

                  <button
                    className={
                      isUnderMyCare(
                        selectedMember.userId
                      )
                        ? "primary-btn"
                        : "secondary-btn"
                    }
                    onClick={() =>
                      handleCareToggle(
                        selectedMember.userId
                      )
                    }
                  >
                    {
                      isUnderMyCare(
                        selectedMember.userId
                      )
                        ? "✓ Under My Care"
                        : "Care For Member"
                    }
                  </button>

                </>

              )}

              {selectedFamily.owner &&
                selectedMember.userId !==
                currentUserId && (

                <>

                  {!selectedMember.owner && (

                    <button
                      className="secondary-btn"
                      onClick={() =>
                        handleMakeOwner(
                          selectedMember.userId
                        )
                      }
                    >
                      Make Owner
                    </button>

                  )}

                  {!selectedMember.owner && (

                    <button
                      className="secondary-btn"
                      onClick={() =>
                        handleRemoveMember(
                          selectedMember.userId
                        )
                      }
                    >
                      Remove Member
                    </button>

                  )}

                </>

              )}

            </div>

          )}

          <div className="family-management-card">

            <h3>
              Family Management
            </h3>

            {selectedFamily.owner && (

              <>

                <button
                  className="primary-btn"
                  onClick={() =>
                    setShowInviteMember(
                      !showInviteMember
                    )
                  }
                >
                  Invite Member
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => {

                    setNewFamilyName(
                      selectedFamily.familyName
                    );

                    setShowRenameFamily(
                      !showRenameFamily
                    );

                  }}
                >
                  Rename Family
                </button>

              </>

            )}

              {showRenameFamily && (

              <div
                className="family-create-card"
              >

                <input
                  type="text"
                  placeholder="New Family Name"
                  value={newFamilyName}
                  onChange={(e) =>
                    setNewFamilyName(
                      e.target.value
                    )
                  }
                />

                <button
                  className="primary-btn"
                  onClick={
                    handleRenameFamily
                  }
                >
                  Save Name
                </button>

              </div>

            )}

            <button
              className="secondary-btn"
              onClick={() => {

                setSelectedFamily(null);

                setMembers([]);

                setSelectedMember(null);

              }}
            >
              ← My Families
            </button>

            <button
              className="secondary-btn leave-family-btn"
              onClick={
                handleLeaveFamily
              }
            >
              Leave Family
            </button>

          </div>

        </>

      )}

    </div>

  );

}

export default FamilyPage;