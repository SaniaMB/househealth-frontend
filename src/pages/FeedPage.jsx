import { useEffect, useState } from "react";
import { getFamilyFeed } from "../services/feedService";

function FeedPage() {

  const [feed, setFeed] = useState([]);

  useEffect(() => {

    async function loadFeed() {
      try {
        const data = await getFamilyFeed();
        setFeed(data);
      }
      catch (error) {
        console.error(error);
      }
    }

    loadFeed();

  }, []);

  return (
    <div className="feed-page">

      <div className="feed-header">

        <h1>Family Feed</h1>

        <p>
          Stay updated with your family's health activity.
        </p>

      </div>

      {feed.length === 0 && (

        <div className="feed-card">

          <h3>No activity yet</h3>

          <p>
            Family health updates will appear here.
          </p>

        </div>

      )}

      {feed.map((item, index) => (

        <div
          key={index}
          className="feed-card"
        >

          <div className="feed-card-header">

            <div className="avatar">
              {item.userName.charAt(0).toUpperCase()}
            </div>

            <div>

              <h3>
                {item.userName}
              </h3>

              <span>
                {new Date(
                  item.loggedAt
                ).toLocaleString()}
              </span>

            </div>

          </div>

          <div className="feed-card-body">

            <p className="activity-type">

              {item.metricType === "BP"
                ? "Blood Pressure Logged"
                : "Blood Sugar Logged"}

            </p>

            <h2 className="activity-value">

              {item.metricType === "BP"
                ? `${item.systolic} / ${item.diastolic}`
                : `${item.sugarValue} mg/dL`}

            </h2>

            <div className="status-badge">

              {item.metricType === "BP"
                ? "Blood Pressure"
                : item.sugarType}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default FeedPage;