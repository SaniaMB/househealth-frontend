import { useEffect, useState } from "react";

import {
  getDashboard,
  getBloodPressureHistory,
  getFastingSugarHistory,
  getPostMealSugarHistory
} from "../services/dashboardService";

import MetricChartCard from
  "../components/dashboard/MetricChartCard";

import UnlockTrendsCard from
  "../components/dashboard/UnlockTrendsCard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function DashboardPage() {

  const [dashboard, setDashboard] =
    useState(null);

  const [
    bloodPressureHistory,
    setBloodPressureHistory
  ] = useState(null);

  const [
    fastingSugarHistory,
    setFastingSugarHistory
  ] = useState(null);

  const [
    postMealSugarHistory,
    setPostMealSugarHistory
  ] = useState(null);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const [
          dashboardData,
          bpHistory,
          fastingHistory,
          postMealHistory
        ] = await Promise.all([
          getDashboard(),
          getBloodPressureHistory(),
          getFastingSugarHistory(),
          getPostMealSugarHistory()
        ]);

        setDashboard(
          dashboardData
        );

        setBloodPressureHistory(
          bpHistory
        );

        setFastingSugarHistory(
          fastingHistory
        );

        setPostMealSugarHistory(
          postMealHistory
        );

      } catch (error) {

        console.error(error);

      }

    }

    loadDashboard();

  }, []);

  if (
    !dashboard ||
    !bloodPressureHistory ||
    !fastingSugarHistory ||
    !postMealSugarHistory
  ) {

    return (
      <div className="page-container">

        <div className="dashboard-header">

          <h1>
            Health Snapshot
          </h1>

          <p>
            Loading dashboard...
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
          Track trends and progress
          across your health metrics.
        </p>

      </div>

      {
  dashboard.bloodPressureTrend.trendStatus ===
  "INSUFFICIENT_DATA" ? (

    <UnlockTrendsCard
      title="Blood Pressure"
      latestValue={
        `${dashboard.latestBloodPressure.systolic}
        /
        ${dashboard.latestBloodPressure.diastolic}`
      }
    />

  ) : (

    <MetricChartCard
      title="Blood Pressure"
      trend={
        dashboard
          .bloodPressureTrend
          .trendStatus
      }
      latestValue={
        `${dashboard
          .latestBloodPressure
          .systolic}
        /
        ${dashboard
          .latestBloodPressure
          .diastolic}`
      }
      currentAverage={
        `${dashboard
          .bloodPressureTrend
          .currentAverageSystolic
          ?.toFixed(1)}
        /
        ${dashboard
          .bloodPressureTrend
          .currentAverageDiastolic
          ?.toFixed(1)}`
      }
      previousAverage={
        `${dashboard
          .bloodPressureTrend
          .previousAverageSystolic
          ?.toFixed(1)}
        /
        ${dashboard
          .bloodPressureTrend
          .previousAverageDiastolic
          ?.toFixed(1)}`
      }
      percentageChange={
        `${dashboard
          .bloodPressureTrend
          .systolicPercentageChange
          ?.toFixed(1)}%`
      }
    >

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={
            bloodPressureHistory
              .points
          }
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric"
                }
              )
            }
          />

          <YAxis />

          <Tooltip />

          <Line
            name="Systolic"
            type="monotone"
            dataKey="systolic"
            stroke="#50B555"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            name="Diastolic"
            type="monotone"
            dataKey="diastolic"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </MetricChartCard>

  )
}

{
  dashboard.fastingSugarTrend.trendStatus ===
  "INSUFFICIENT_DATA" ? (

    <UnlockTrendsCard
      title="Fasting Sugar"
      latestValue={
        dashboard.latestFastingSugar.sugarValue
      }
    />

  ) : (

    <MetricChartCard
      title="Fasting Sugar"
      trend={
        dashboard
          .fastingSugarTrend
          .trendStatus
      }
      latestValue={
        dashboard
          .latestFastingSugar
          .sugarValue
      }
      currentAverage={
        dashboard
          .fastingSugarTrend
          .currentAverageSugar
          ?.toFixed(1)
      }
      previousAverage={
        dashboard
          .fastingSugarTrend
          .previousAverageSugar
          ?.toFixed(1)
      }
      percentageChange={
        `${dashboard
          .fastingSugarTrend
          .percentageChange
          ?.toFixed(1)}%`
      }
    >

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={
            fastingSugarHistory
              .points
          }
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric"
                }
              )
            }
          />

          <YAxis />

          <Tooltip />

          <Line
            name="Sugar"
            type="monotone"
            dataKey="value"
            stroke="#50B555"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </MetricChartCard>

  )
}

      {
  dashboard.postMealSugarTrend.trendStatus ===
  "INSUFFICIENT_DATA" ? (

    <UnlockTrendsCard
      title="Post Meal Sugar"
      latestValue={
        dashboard.latestPostMealSugar.sugarValue
      }
    />

  ) : (

    <MetricChartCard
      title="Post Meal Sugar"
      trend={
        dashboard
          .postMealSugarTrend
          .trendStatus
      }
      latestValue={
        dashboard
          .latestPostMealSugar
          .sugarValue
      }
      currentAverage={
        dashboard
          .postMealSugarTrend
          .currentAverageSugar
          ?.toFixed(1)
      }
      previousAverage={
        dashboard
          .postMealSugarTrend
          .previousAverageSugar
          ?.toFixed(1)
      }
      percentageChange={
        `${dashboard
          .postMealSugarTrend
          .percentageChange
          ?.toFixed(1)}%`
      }
    >

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={
            postMealSugarHistory
              .points
          }
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric"
                }
              )
            }
          />

          <YAxis />

          <Tooltip />

          <Line
            name="Sugar"
            type="monotone"
            dataKey="value"
            stroke="#2e8b57"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </MetricChartCard>

  )
}

    </div>
  );
}

export default DashboardPage;