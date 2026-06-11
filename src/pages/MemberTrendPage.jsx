import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoHeartOutline,
  IoWaterOutline,
  IoTrendingUpOutline,
  IoTrendingDownOutline,
  IoRemoveOutline,
  IoChevronBackOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";

import { getMemberTrendSummary } from "../services/familyService";

const TREND_CONFIG = {
  IMPROVING: {
    label: "Improving",
    icon: <IoTrendingUpOutline />,
    className: "improving",
  },
  WORSENING: {
    label: "Needs attention",
    icon: <IoTrendingDownOutline />,
    className: "worsening",
  },
  STABLE: {
    label: "Stable",
    icon: <IoRemoveOutline />,
    className: "stable",
  },
  INSUFFICIENT_DATA: {
    label: "Not enough data yet",
    icon: <IoAlertCircleOutline />,
    className: "insufficient",
  },
};

function TrendRow({ icon, title, trendStatus }) {
  const config = TREND_CONFIG[trendStatus] || TREND_CONFIG.INSUFFICIENT_DATA;

  return (
    <div className="trend-row">
      <div className="trend-row-left">
        <div className="trend-row-icon">{icon}</div>
        <span className="trend-row-title">{title}</span>
      </div>
      <span className={`trend-badge ${config.className}`}>
        {config.icon}
        {config.label}
      </span>
    </div>
  );
}

function MemberTrendPage() {
  const { familyId, userId } = useParams();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMemberTrendSummary(familyId, userId);
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, [familyId, userId]);

  if (!summary) {
    return (
      <div className="page-container">
        <div className="dashboard-skeleton">
          {[1, 2, 3].map((i) => <div key={i} className="dashboard-skeleton-card" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">

      <button
        className="family-back-btn"
        style={{ marginBottom: 20 }}
        onClick={() => navigate(-1)}
      >
        <IoChevronBackOutline /> Back
      </button>

      {/* Member hero */}
      <div className="profile-hero" style={{ marginBottom: 24 }}>
        <div className="profile-avatar-lg">
          {summary.userName.charAt(0).toUpperCase()}
        </div>
        <h2 className="profile-name">{summary.userName}</h2>
        <p className="profile-email">Health Trends</p>
      </div>

      {/* Trend cards */}
      <div className="dashboard-card trend-summary-card">
        <h3 style={{ marginBottom: 16 }}>Current Trends</h3>

        <TrendRow
          icon={<IoHeartOutline />}
          title="Blood Pressure"
          trendStatus={summary.bloodPressureTrend}
        />

        <div className="trend-row-divider" />

        <TrendRow
          icon={<IoWaterOutline />}
          title="Fasting Sugar"
          trendStatus={summary.fastingSugarTrend}
        />

        <div className="trend-row-divider" />

        <TrendRow
          icon={<IoWaterOutline />}
          title="Post Meal Sugar"
          trendStatus={summary.postMealSugarTrend}
        />
      </div>

    </div>
  );
}

export default MemberTrendPage;