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

          <strong>
            Keep tracking to unlock
            trends and insights
          </strong>

        </div>

      </div>

    </div>
  );
}

export default UnlockTrendsCard;