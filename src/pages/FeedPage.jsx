import { useEffect, useState } from "react";
import { Heart, Droplet, RotateCw } from "lucide-react";
import { getFamilyFeed } from "../services/feedService";

function formatTime(iso) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function FeedPage() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadFeed(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const data = await getFamilyFeed();
      setFeed(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadFeed(); }, []);

  return (
    <div className="feed-page page-container">

      <div className="feed-header">
        <div className="feed-header-top">
          <div>
            <h1>Family Feed</h1>
            <p>Your family's health activity.</p>
          </div>
          <button
            className="feed-refresh-btn"
            onClick={() => loadFeed(true)}
            disabled={refreshing}
            aria-label="Refresh feed"
          >
            <RotateCw
              size={18}
              style={{
                transform: refreshing ? "rotate(180deg)" : "none",
                transition: "transform 0.5s ease",
              }}
            />
          </button>
        </div>
      </div>

      {loading && (
        <div className="feed-skeleton">
          {[1, 2, 3].map((i) => (
            <div key={i} className="feed-skeleton-card" />
          ))}
        </div>
      )}

      {!loading && feed.length === 0 && (
        <div className="feed-empty">
          <div className="feed-empty-icon">🏠</div>
          <h3>No activity yet</h3>
          <p>Family health updates will appear here once members start logging.</p>
        </div>
      )}

      {!loading && feed.map((item, index) => (
        <div key={index} className="feed-card">
          <div className="feed-card-header">
            <div className="avatar">
              {item.userName.charAt(0).toUpperCase()}
            </div>
            <div className="feed-card-meta">
              <h3>{item.userName}</h3>
              <span>{formatTime(item.loggedAt)}</span>
            </div>
            <div className="feed-metric-icon">
              {item.metricType === "BP"
                ? <Heart size={20} />
                : <Droplet size={20} />}
            </div>
          </div>

          <div className="feed-card-body">
            <p className="activity-type">
              {item.metricType === "BP"
                ? "Blood Pressure"
                : "Blood Sugar"}
            </p>

            <h2 className="activity-value">
              {item.metricType === "BP"
                ? `${item.systolic} / ${item.diastolic}`
                : `${item.sugarValue} mg/dL`}
            </h2>

            <div className="status-badge">
              {item.metricType === "BP"
                ? "mmHg"
                : item.sugarType === "POST_MEAL"
                  ? "Post Meal"
                  : "Fasting"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedPage;