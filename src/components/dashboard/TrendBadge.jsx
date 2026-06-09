function TrendBadge({ trend }) {

  const badgeClass =
    trend.toLowerCase();

  return (
    <div
      className={
        `trend-badge ${badgeClass}`
      }
    >
      {trend}
    </div>
  );
}

export default TrendBadge;