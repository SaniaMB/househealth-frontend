import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

function DashboardPage() {

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data =
          await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadDashboard();

  }, []);

  if (!dashboard) {

    return (
      <div className="page-container">

        <div className="dashboard-header">
          <h1>Health Snapshot</h1>
          <p>
            Loading your health information...
          </p>
        </div>

      </div>
    );

  }

  return (
    <div className="page-container">

      <div className="dashboard-header">

        <h1>
          Health Snapshot
        </h1>

        <p>
          A quick overview of your recent health activity.
        </p>

      </div>

      <div className="dashboard-summary-card">

        <h2>
          Welcome Back
        </h2>

        <p>
          Keep tracking your health consistently to unlock better trend analysis.
        </p>

      </div>

      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <span className="dashboard-label">
            Blood Pressure
          </span>

        </div>

        <div className="dashboard-reading">
          {dashboard.latestBloodPressure.systolic}
          /
          {dashboard.latestBloodPressure.diastolic}
        </div>

        <p className="dashboard-subtext">
          Latest recorded reading
        </p>

        {dashboard.bloodPressureTrend
          .trendStatus ===
          "INSUFFICIENT_DATA" ? (

          <div className="dashboard-message">

            Keep logging readings
            to unlock trends.

          </div>

        ) : (

          <div className="dashboard-trend">

            Trend:
            {" "}
            {
              dashboard
                .bloodPressureTrend
                .trendStatus
            }

          </div>

        )}

      </div>

      <div className="dashboard-card">

        <div className="dashboard-card-header">

          <span className="dashboard-label">
            Fasting Sugar
          </span>

        </div>

        <div className="dashboard-reading">
          {
            dashboard
              .latestFastingSugar
              .sugarValue
          }
        </div>

        <p className="dashboard-subtext">
          Latest recorded reading
        </p>

        {dashboard.fastingSugarTrend
          .trendStatus ===
          "INSUFFICIENT_DATA" ? (

          <div className="dashboard-message">

            Keep logging readings
            to unlock trends.

          </div>

        ) : (

          <div className="dashboard-trend">

            Trend:
            {" "}
            {
              dashboard
                .fastingSugarTrend
                .trendStatus
            }

          </div>

        )}

      </div>

    </div>
  );
}

export default DashboardPage;