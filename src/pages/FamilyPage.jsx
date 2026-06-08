import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/family.css";

import {
  getMyFamilies,
  getFamilyMembers,
  createFamily,
} from "../services/familyService";

import {
  getProfile,
} from "../services/profileService";

function FamilyPage() {

  const navigate = useNavigate();

  const [families, setFamilies] =
    useState([]);

  const [selectedFamily,
    setSelectedFamily] =
    useState(null);

  const [members, setMembers] =
    useState([]);

  const [currentUserId,
    setCurrentUserId] =
    useState(null);

  const [familyName,
    setFamilyName] =
    useState("");

  useEffect(() => {

    loadFamilies();

    loadCurrentUser();

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

  async function handleFamilyClick(
    family
  ) {

    try {

      setSelectedFamily(family);

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

      loadFamilies();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create family"
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

          <div className="family-create-card">

            <input
              type="text"
              placeholder="Family name"
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
              Create Family
            </button>

          </div>

        </>

      )}

      {selectedFamily && (

        <>

          <button
            className="secondary-btn"
            onClick={() => {

              setSelectedFamily(
                null
              );

              setMembers([]);

            }}
          >
            Back
          </button>

          <div className="family-details-header">

            <h2>
              {selectedFamily.familyName}
            </h2>

          </div>

          {members.map((member) => (

            <div
              key={member.userId}
              className="family-member-card"
              onClick={() => {

                if (
                  member.userId === currentUserId
                ) {
                  return;
                }

                navigate(
                  `/family/${selectedFamily.familyId}/member/${member.userId}`
                );

              }}
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

                  {member.userId === currentUserId &&
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

        </>

      )}

    </div>

  );

}

export default FamilyPage;