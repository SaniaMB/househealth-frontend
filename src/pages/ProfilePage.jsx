import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";
import {
  getUsersIObserve,
  getMyObservers
} from "../services/careRelationshipService";

function ProfilePage() {

  const [profile, setProfile] = useState(null);

  const [peopleUnderMyCare,
      setPeopleUnderMyCare] =
      useState([]);

    const [myObservers,
      setMyObservers] =
      useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    async function loadProfile() {

      try {

        const [
              profileData,
              observedData,
              observerData
            ] = await Promise.all([
              getProfile(),
              getUsersIObserve(),
              getMyObservers()
            ]);

            setProfile(
              profileData
            );

            setPeopleUnderMyCare(
              observedData
            );

            setMyObservers(
              observerData
            );

      } catch (error) {

        console.error(error);

      }

    }

    loadProfile();

  }, []);

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");

  }

  if (!profile) {

    return (
      <div className="page-container">
        Loading...
      </div>
    );

  }

  return (
    <div className="page-container">

      <div className="dashboard-card">

        <div
          className="avatar"
          style={{
            margin: "0 auto"
          }}
        >
          {profile.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <br />

        <h2>{profile.name}</h2>

        <p className="dashboard-subtext">
          {profile.email}
        </p>

      </div>

      <div className="dashboard-card">

        <h3>
          Health
        </h3>

        <br />

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/history")
          }
        >
          View Health History
        </button>

        <br />
        <br />

        <button
          className="secondary-btn"
          onClick={() =>
            navigate("/reminders")
          }
        >
          Reminder Settings
        </button>

      </div>

     <div className="dashboard-card care-circle-card">

        <h3>
          Care Circle
        </h3>

        <div className="care-section">

          <span className="care-section-title">
            People Under My Care
          </span>

          <div className="care-list">

            {
              peopleUnderMyCare.length === 0
                ? (
                    <div className="care-empty">
                      Nobody yet
                    </div>
                  )
                : (
                    peopleUnderMyCare.map(
                      (person) => (
                        <div
                          key={person.userId}
                          className="care-person"
                        >
                          {person.userName}
                        </div>
                      )
                    )
                  )
            }

          </div>

        </div>

        <div className="care-section">

          <span className="care-section-title">
            Caring For You
          </span>

          <div className="care-list">

            {
              myObservers.length === 0
                ? (
                    <div className="care-empty">
                      Nobody yet
                    </div>
                  )
                : (
                    myObservers.map(
                      (person) => (
                        <div
                          key={person.userId}
                          className="care-person"
                        >
                          {person.userName}
                        </div>
                      )
                    )
                  )
            }

          </div>

        </div>

      </div>

      <div className="dashboard-card">

        <button
          className="secondary-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default ProfilePage;