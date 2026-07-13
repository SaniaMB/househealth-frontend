import { Lock } from "lucide-react";

function UnlockTrendsCard({
  title,
  latestValue
}) {

  return (
    <div className="metric-card">

      <div className="metric-card-header">

        <h2>
          {title}
        </h2>

      </div>

      <div className="unlock-trends-content">

        <span className="unlock-label">
          Latest Reading
        </span>

        <h3 className="unlock-latest-value">
          {latestValue}
        </h3>

        <div className="unlock-message">

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <Lock size={18} />
            <strong>
              Unlock Trends
            </strong>
          </div>

          <p>
            Keep tracking to unlock trends and insights. Record more readings to see patterns and get personalized health recommendations.
          </p>

        </div>

      </div>

    </div>
  );
}

export default UnlockTrendsCard;