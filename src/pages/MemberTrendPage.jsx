import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getMemberTrendSummary,
} from "../services/familyService";

function formatTrend(trend) {

  if (trend === "INSUFFICIENT_DATA") {
    return "Trend not available yet";
  }

  if (trend === "IMPROVING") {
    return "Improving";
  }

  if (trend === "WORSENING") {
    return "Needs attention";
  }

  return "Stable";
}

function MemberTrendPage() {

  const {
    familyId,
    userId,
  } = useParams();

  const [summary, setSummary] =
    useState(null);

  useEffect(() => {

    async function loadSummary() {

      try {

        const data =
          await getMemberTrendSummary(
            familyId,
            userId
          );

        setSummary(data);

      }
      catch (error) {
        console.error(error);
      }

    }

    loadSummary();

  }, [familyId, userId]);

  if (!summary) {

    return (
      <div className="page-container">
        Loading...
      </div>
    );

  }

  return (

    <div className="page-container">

      <h1>
        {summary.userName}
      </h1>

      <div className="dashboard-card">

        <h3>
          Blood Pressure
        </h3>

        <p>
          {formatTrend(
            summary.bloodPressureTrend
          )}
        </p>

      </div>

      <div className="dashboard-card">

        <h3>
          Fasting Sugar
        </h3>

        <p>
          {formatTrend(
            summary.fastingSugarTrend
          )}
        </p>

      </div>

      <div className="dashboard-card">

        <h3>
          Post Meal Sugar
        </h3>

        <p>
          {formatTrend(
            summary.postMealSugarTrend
          )}
        </p>

      </div>

    </div>

  );

}

export default MemberTrendPage;