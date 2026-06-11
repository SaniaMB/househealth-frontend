import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoAddOutline,
  IoChevronForwardOutline,
  IoPersonOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
  IoMailOutline,
  IoCreateOutline,
  IoHeartOutline,
  IoExitOutline,
  IoChevronBackOutline,
} from "react-icons/io5";

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
  transferOwnership,
} from "../services/familyService";

import { getProfile } from "../services/profileService";
import {
  observeUser,
  stopObserving,
  getUsersIObserve,
} from "../services/careRelationshipService";

function FamilyPage() {
  const navigate = useNavigate();

  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [observedUsers, setObservedUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [showCreateFamily, setShowCreateFamily] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);
  const [showRenameFamily, setShowRenameFamily] = useState(false);
  const [showTransferOwnership, setShowTransferOwnership] = useState(false);

  const [familyName, setFamilyName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [newFamilyName, setNewFamilyName] = useState("");
  const [newOwnerId, setNewOwnerId] = useState(null);

  const [actionLoading, setActionLoading] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    loadFamilies();
    loadCurrentUser();
    loadObservedUsers();
  }, []);

  async function loadCurrentUser() {
    try {
      const profile = await getProfile();
      setCurrentUserId(profile.userId);
    } catch (e) { console.error(e); }
  }

  async function loadFamilies() {
    try {
      const data = await getMyFamilies();
      setFamilies(data);
    } catch (e) { console.error(e); }
  }

  async function loadObservedUsers() {
    try {
      const data = await getUsersIObserve();
      setObservedUsers(data);
    } catch (e) { console.error(e); }
  }

  const ownerCount = members.filter((m) => m.owner).length;

  function isUnderMyCare(userId) {
    return observedUsers.some((u) => u.userId === userId);
  }

  async function handleCareToggle(userId) {
    try {
      if (isUnderMyCare(userId)) {
        await stopObserving(userId);
      } else {
        await observeUser(userId);
      }
      await loadObservedUsers();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleFamilyClick(family) {
    try {
      setSelectedFamily(family);
      setSelectedMember(null);
      const data = await getFamilyMembers(family.familyId);
      setMembers(data);
    } catch (e) { console.error(e); }
  }

  async function handleCreateFamily() {
    if (!familyName.trim()) return;
    setActionLoading("create");
    try {
      await createFamily(familyName);
      setFamilyName("");
      setShowCreateFamily(false);
      loadFamilies();
    } catch (e) { console.error(e); }
    finally { setActionLoading(""); }
  }

  async function handleInviteMember() {
    if (!inviteEmail.trim()) return;
    setActionLoading("invite");
    try {
      await sendFamilyInvitation(selectedFamily.familyId, inviteEmail);
      setInviteEmail("");
      setShowInviteMember(false);
      setInviteSent(true);
      setTimeout(() => setInviteSent(false), 3000);
    } catch (e) { console.error(e); }
    finally { setActionLoading(""); }
  }

  async function handleRemoveMember(userId) {
    if (!window.confirm(`Remove ${selectedMember.name} from this family?`)) return;
    try {
      await removeMember(selectedFamily.familyId, userId);
      const data = await getFamilyMembers(selectedFamily.familyId);
      setMembers(data);
      setSelectedMember(null);
    } catch (e) { console.error(e); }
  }

  async function handleMakeOwner(userId) {
    if (!window.confirm(`${selectedMember.name} will become an owner. Continue?`)) return;
    try {
      await addOwner(selectedFamily.familyId, userId);
      const data = await getFamilyMembers(selectedFamily.familyId);
      setMembers(data);
      setSelectedMember(null);
    } catch (e) { console.error(e); }
  }

  async function handleRenameFamily() {
    if (!newFamilyName.trim()) return;
    setActionLoading("rename");
    try {
      await renameFamily(selectedFamily.familyId, newFamilyName);
      setSelectedFamily({ ...selectedFamily, familyName: newFamilyName });
      setFamilies(families.map((f) =>
        f.familyId === selectedFamily.familyId
          ? { ...f, familyName: newFamilyName }
          : f
      ));
      setNewFamilyName("");
      setShowRenameFamily(false);
    } catch (e) { console.error(e); }
    finally { setActionLoading(""); }
  }

  async function handleTransferOwnershipAndLeave() {
    if (!newOwnerId) return;
    setActionLoading("transfer");
    try {
      await transferOwnership(selectedFamily.familyId, newOwnerId);
      await leaveFamily(selectedFamily.familyId);
      setShowTransferOwnership(false);
      setNewOwnerId(null);
      setSelectedFamily(null);
      setMembers([]);
      setSelectedMember(null);
      loadFamilies();
    } catch (e) { console.error(e); }
    finally { setActionLoading(""); }
  }

  async function handleLeaveFamily() {
    if (selectedFamily.owner && ownerCount === 1 && members.length > 1) {
      setShowTransferOwnership(true);
      return;
    }
    if (!window.confirm("Leave this family?")) return;
    try {
      await leaveFamily(selectedFamily.familyId);
      setSelectedFamily(null);
      setMembers([]);
      setSelectedMember(null);
      loadFamilies();
    } catch (e) { console.error(e.message); }
  }

  function goBack() {
    setSelectedFamily(null);
    setMembers([]);
    setSelectedMember(null);
    setShowInviteMember(false);
    setShowRenameFamily(false);
    setShowTransferOwnership(false);
  }

  // ── Family list view ──────────────────────────────────────────────
  if (!selectedFamily) {
    return (
      <div className="page-container">
        <div className="family-header">
          <h1>My Families</h1>
          <p>Manage your family groups and members.</p>
        </div>

        {families.length === 0 && !showCreateFamily && (
          <div className="feed-empty">
            <div className="feed-empty-icon">👨‍👩‍👧</div>
            <h3>No families yet</h3>
            <p>Create one to start sharing health updates with loved ones.</p>
          </div>
        )}

        {families.map((family) => (
          <div
            key={family.familyId}
            className="family-card"
            onClick={() => handleFamilyClick(family)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleFamilyClick(family)}
          >
            <div className="family-card-inner">
              <div className="family-card-icon">
                <IoPeopleOutline />
              </div>
              <div>
                <h3>{family.familyName}</h3>
                {family.owner && (
                  <span className="owner-badge">
                    <IoShieldCheckmarkOutline /> Owner
                  </span>
                )}
              </div>
            </div>
            <IoChevronForwardOutline className="family-card-chevron" />
          </div>
        ))}

        {!showCreateFamily ? (
          <button
            className="primary-btn"
            style={{ marginTop: "8px" }}
            onClick={() => setShowCreateFamily(true)}
          >
            <IoAddOutline style={{ marginRight: 6 }} />
            Create Family
          </button>
        ) : (
          <div className="family-create-card">
            <p className="family-create-title">New Family</p>
            <input
              type="text"
              placeholder="Family name (e.g. The Patels)"
              value={familyName}
              autoFocus
              onChange={(e) => setFamilyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFamily()}
            />
            <button
              className="primary-btn"
              onClick={handleCreateFamily}
              disabled={actionLoading === "create"}
            >
              {actionLoading === "create" ? "Creating…" : "Create"}
            </button>
            <button className="secondary-btn" onClick={() => setShowCreateFamily(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Family detail view ────────────────────────────────────────────
  return (
    <div className="page-container">

      {/* Header */}
      <div className="family-details-header">
        <button className="family-back-btn" onClick={goBack}>
          <IoChevronBackOutline /> My Families
        </button>
        <h2>{selectedFamily.familyName}</h2>
        <p>{members.length} member{members.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Invite success */}
      {inviteSent && (
        <div className="log-success" style={{ marginBottom: 16 }}>
          Invitation sent successfully.
        </div>
      )}

      {/* Invite form */}
      {showInviteMember && (
        <div className="family-create-card">
          <p className="family-create-title">Invite by email</p>
          <input
            type="email"
            placeholder="member@example.com"
            value={inviteEmail}
            autoFocus
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInviteMember()}
          />
          <button
            className="primary-btn"
            onClick={handleInviteMember}
            disabled={actionLoading === "invite"}
          >
            {actionLoading === "invite" ? "Sending…" : "Send Invite"}
          </button>
          <button className="secondary-btn" onClick={() => setShowInviteMember(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Members */}
      <div className="family-members-section">
        <p className="family-section-label">Members</p>
        {members.map((member) => (
          <div
            key={member.userId}
            className={`family-member-card${selectedMember?.userId === member.userId ? " selected" : ""}`}
            onClick={() =>
              setSelectedMember(
                selectedMember?.userId === member.userId ? null : member
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && setSelectedMember(
                selectedMember?.userId === member.userId ? null : member
              )
            }
          >
            <div className="member-avatar">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div className="family-member-info">
              <h4>
                {member.name}
                {member.userId === currentUserId && (
                  <span className="member-you"> (You)</span>
                )}
              </h4>
              <div className="member-badges">
                {member.owner && (
                  <span className="owner-badge">
                    <IoShieldCheckmarkOutline /> Owner
                  </span>
                )}
                {isUnderMyCare(member.userId) && member.userId !== currentUserId && (
                  <span className="care-badge">
                    <IoHeartOutline /> In my care
                  </span>
                )}
              </div>
            </div>
            <IoChevronForwardOutline className="family-card-chevron" />
          </div>
        ))}
      </div>

      {/* Selected member actions */}
      {selectedMember && selectedMember.userId !== currentUserId && (
        <div className="family-management-card">
          <h3>{selectedMember.name}</h3>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate(`/family/${selectedFamily.familyId}/member/${selectedMember.userId}`)
            }
          >
            <IoChevronForwardOutline /> View Trends
          </button>

          <button
            className={isUnderMyCare(selectedMember.userId) ? "primary-btn" : "secondary-btn"}
            onClick={() => handleCareToggle(selectedMember.userId)}
          >
            <IoHeartOutline />
            {isUnderMyCare(selectedMember.userId) ? "Under My Care ✓" : "Add to My Care"}
          </button>

          {selectedFamily.owner && !selectedMember.owner && (
            <>
              <button
                className="secondary-btn"
                onClick={() => handleMakeOwner(selectedMember.userId)}
              >
                <IoShieldCheckmarkOutline /> Make Owner
              </button>

              <button
                className="secondary-btn family-danger-btn"
                onClick={() => handleRemoveMember(selectedMember.userId)}
              >
                <IoTrashOutline /> Remove Member
              </button>
            </>
          )}
        </div>
      )}

      {/* Transfer ownership */}
      {showTransferOwnership && (
        <div className="family-management-card">
          <h3>Transfer Ownership</h3>
          <p style={{ color: "var(--hh-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
            You're the only owner. Choose a new owner before leaving.
          </p>
          {members
            .filter((m) => m.userId !== currentUserId)
            .map((member) => (
              <button
                key={member.userId}
                className={newOwnerId === member.userId ? "primary-btn" : "secondary-btn"}
                onClick={() => setNewOwnerId(member.userId)}
              >
                <IoPersonOutline /> {member.name}
              </button>
            ))}
          <button
            className="primary-btn"
            disabled={!newOwnerId || actionLoading === "transfer"}
            onClick={handleTransferOwnershipAndLeave}
          >
            {actionLoading === "transfer" ? "Processing…" : "Transfer & Leave"}
          </button>
        </div>
      )}

      {/* Rename */}
      {showRenameFamily && (
        <div className="family-create-card">
          <p className="family-create-title">Rename family</p>
          <input
            type="text"
            placeholder="New name"
            value={newFamilyName}
            autoFocus
            onChange={(e) => setNewFamilyName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRenameFamily()}
          />
          <button
            className="primary-btn"
            onClick={handleRenameFamily}
            disabled={actionLoading === "rename"}
          >
            {actionLoading === "rename" ? "Saving…" : "Save Name"}
          </button>
          <button className="secondary-btn" onClick={() => setShowRenameFamily(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Management */}
      <div className="family-management-card">
        <h3>Family Management</h3>

        {selectedFamily.owner && (
          <>
            <button
              className="secondary-btn"
              onClick={() => setShowInviteMember(!showInviteMember)}
            >
              <IoMailOutline /> Invite Member
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                setNewFamilyName(selectedFamily.familyName);
                setShowRenameFamily(!showRenameFamily);
              }}
            >
              <IoCreateOutline /> Rename Family
            </button>
          </>
        )}

        <button
          className="secondary-btn family-danger-btn"
          onClick={handleLeaveFamily}
        >
          <IoExitOutline /> Leave Family
        </button>
      </div>

    </div>
  );
}

export default FamilyPage;