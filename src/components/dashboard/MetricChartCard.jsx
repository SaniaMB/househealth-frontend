import TrendBadge from "./TrendBadge";

function MetricChartCard({
  title,
  trend,
  latestValue,
  currentAverage,
  previousAverage,
  percentageChange,
  children
}) {

  return (
    <div className={`metric-card ${title.toLowerCase().replaceAll(" ", "-")}`}>

      <div className="metric-card-header">

        <h2>
          {title}
        </h2>

        <TrendBadge
          trend={trend}
        />

      </div>

      <div className="metric-chart">

        {children}

      </div>

      <div className="metric-stats-grid">

        <div className="metric-stat">

          <span className="metric-stat-label">
            Latest
          </span>

          <strong>
            {latestValue}
          </strong>

        </div>

        <div className="metric-stat">

          <span className="metric-stat-label">
            Current Avg
          </span>

          <strong>
            {currentAverage}
          </strong>

        </div>

        <div className="metric-stat">

          <span className="metric-stat-label">
            Previous Avg
          </span>

          <strong>
            {previousAverage}
          </strong>

        </div>

        <div className="metric-stat">

          <span className="metric-stat-label">
            Change
          </span>

          <strong>
            {percentageChange}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default MetricChartCard;