import { useEffect, useState } from "react";
import { getMyLogs } from "../services/historyService";

function HistoryPage() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    async function loadHistory() {
      try {
        const data = await getMyLogs();
        setLogs(data);
      }
      catch (error) {
        console.error(error);
      }
    }

    loadHistory();

  }, []);

  return (
    <div className="page-container">

      <div className="feed-header">

        <h1>My Health History</h1>

        <p>
          All your recorded health logs.
        </p>

      </div>

      {logs.map((log, index) => (

        <div
          key={index}
          className="dashboard-card"
        >

          {"systolic" in log ? (

            <>
              <span className="dashboard-label">
                Blood Pressure
              </span>

              <div className="dashboard-reading">
                {log.systolic}
                /
                {log.diastolic}
              </div>
            </>

          ) : (

            <>
              <span className="dashboard-label">
                Blood Sugar
              </span>

              <div className="dashboard-reading">
                {log.sugarValue} mg/dL
              </div>

              <div className="dashboard-subtext">
                {log.sugarType}
              </div>
            </>

          )}

          <div className="dashboard-subtext">
            {new Date(
              log.loggedAt
            ).toLocaleString()}
          </div>

        </div>

      ))}

    </div>
  );
}

export default HistoryPage;