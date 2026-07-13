import { TrendingUp, TrendingDown, AlertCircle, Clock } from "lucide-react";

function TrendBadge({ trend }) {
  const badgeClass = trend.toLowerCase();
  
  const getIcon = () => {
    switch (badgeClass) {
      case "improving":
        return <TrendingUp size={16} />;
      case "worsening":
        return <TrendingDown size={16} />;
      case "insufficient":
        return <Clock size={16} />;
      case "stable":
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className={`trend-badge ${badgeClass}`}>
      {getIcon()}
      {trend}
    </div>
  );
}

export default TrendBadge;