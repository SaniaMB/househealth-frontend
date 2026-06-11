import { useEffect, useState } from "react";
import { IoHeartOutline, IoWaterOutline, IoFunnelOutline } from "react-icons/io5";
import { getMyLogs } from "../services/historyService";

import "../styles/history.css";



function HistoryPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getMyLogs();
        setLogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filtered = filter === "ALL"
    ? logs
    : filter === "BP"
      ? logs.filter((l) => "systolic" in l)
      : logs.filter((l) => "sugarValue" in l);

  return (
    <div className="page-container">

      <div className="feed-header">
        <h1>Health History</h1>
        <p>All your recorded readings.</p>
      </div>

      {/* Filter */}
      <div className="history-filter">
        <IoFunnelOutline className="history-filter-icon" />
        {["ALL", "BP", "SUGAR"].map((f) => (
          <button
            key={f}
            className={`history-filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All" : f === "BP" ? "Blood Pressure" : "Blood Sugar"}
          </button>
        ))}
      </div>

      {loading && (
        <div className="feed-skeleton">
          {[1, 2, 3].map((i) => (
            <div key={i} className="feed-skeleton-card" />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="feed-empty">
          <div className="feed-empty-icon">📋</div>
          <h3>No logs yet</h3>
          <p>Start recording your readings and they'll appear here.</p>
        </div>
      )}

      {!loading && filtered.map((log, index) => (
        <div key={index} className="history-card">

          {"systolic" in log ? (
            <>
              <div className="history-card-icon bp">
                <IoHeartOutline />
              </div>
              <div className="history-card-body">
                <span className="dashboard-label">Blood Pressure</span>
                <div className="dashboard-reading">
                  {log.systolic}<span className="history-sep">/</span>{log.diastolic}
                  <span className="history-unit">mmHg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="history-card-icon sugar">
                <IoWaterOutline />
              </div>
              <div className="history-card-body">
                <span className="dashboard-label">
                  Blood Sugar · {log.sugarType === "POST_MEAL" ? "Post Meal" : "Fasting"}
                </span>
                <div className="dashboard-reading">
                  {log.sugarValue}
                  <span className="history-unit">mg/dL</span>
                </div>
              </div>
            </>
          )}

          <div className="history-card-time">
            {new Date(log.loggedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            <br />
            <span>
              {new Date(log.loggedAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
}

export default HistoryPage;