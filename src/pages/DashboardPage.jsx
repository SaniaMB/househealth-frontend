import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  getDashboard,
  getBloodPressureHistory,
  getFastingSugarHistory,
  getPostMealSugarHistory,
} from "../services/dashboardService";

import MetricChartCard from "../components/dashboard/MetricChartCard";
import UnlockTrendsCard from "../components/dashboard/UnlockTrendsCard";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-date">
        {new Date(label).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          <strong>{p.name}:</strong> {p.value}
        </p>
      ))}
    </div>
  );
}

function tickDate(value) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  const [bloodPressureHistory, setBloodPressureHistory] =
    useState({ points: [] });

  const [fastingSugarHistory, setFastingSugarHistory] =
    useState({ points: [] });

  const [postMealSugarHistory, setPostMealSugarHistory] =
    useState({ points: [] });

  useEffect(() => {
    async function load() {
      try {
        const [
          dashboardData,
          bpHistory,
          fastingHistory,
          postMealHistory,
        ] = await Promise.all([
          getDashboard(),
          getBloodPressureHistory(),
          getFastingSugarHistory(),
          getPostMealSugarHistory(),
        ]);

        setDashboard(dashboardData);
        setBloodPressureHistory(bpHistory);
        setFastingSugarHistory(fastingHistory);
        setPostMealSugarHistory(postMealHistory);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  if (!dashboard) {
    return (
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Health Snapshot</h1>
          <p>Loading your dashboard…</p>
        </div>
        <div className="dashboard-skeleton">
          {[1, 2, 3].map((i) => <div key={i} className="dashboard-skeleton-card" />)}
        </div>
      </div>
    );
  }

  const bpTrend = dashboard.bloodPressureTrend;
  const fastTrend = dashboard.fastingSugarTrend;
  const postTrend = dashboard.postMealSugarTrend;

  return (
    <div className="page-container">

      <div className="dashboard-header">
        <h1>Health Snapshot</h1>
        <p>Track trends and progress across your metrics.</p>
      </div>

      {/* Blood Pressure */}
      {bpTrend.trendStatus === "INSUFFICIENT_DATA" ? (
          <UnlockTrendsCard
            title="Blood Pressure"
            latestValue={
              dashboard.latestBloodPressure
                ? `${dashboard.latestBloodPressure.systolic} / ${dashboard.latestBloodPressure.diastolic}`
                : "No readings yet"
            }
          />
        ) : (
        <MetricChartCard
          title="Blood Pressure"
          trend={bpTrend.trendStatus}
          latestValue={`${dashboard.latestBloodPressure.systolic} / ${dashboard.latestBloodPressure.diastolic}`}
          currentAverage={`${bpTrend.currentAverageSystolic?.toFixed(1)} / ${bpTrend.currentAverageDiastolic?.toFixed(1)}`}
          previousAverage={`${bpTrend.previousAverageSystolic?.toFixed(1)} / ${bpTrend.previousAverageDiastolic?.toFixed(1)}`}
          percentageChange={`${bpTrend.systolicPercentageChange?.toFixed(1)}%`}
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bloodPressureHistory.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line name="Systolic" type="monotone" dataKey="systolic" stroke="#3db562" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line name="Diastolic" type="monotone" dataKey="diastolic" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </MetricChartCard>
      )}

      {/* Fasting Sugar */}
      {fastTrend.trendStatus === "INSUFFICIENT_DATA" ? (
        <UnlockTrendsCard
          title="Fasting Sugar"
          latestValue={
            dashboard.latestFastingSugar
              ? dashboard.latestFastingSugar.sugarValue
              : "No readings yet"
          }
        />
      ) : (
        <MetricChartCard
          title="Fasting Sugar"
          trend={fastTrend.trendStatus}
          latestValue={dashboard.latestFastingSugar.sugarValue}
          currentAverage={fastTrend.currentAverageSugar?.toFixed(1)}
          previousAverage={fastTrend.previousAverageSugar?.toFixed(1)}
          percentageChange={`${fastTrend.percentageChange?.toFixed(1)}%`}
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={fastingSugarHistory.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line name="Sugar" type="monotone" dataKey="value" stroke="#3db562" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </MetricChartCard>
      )}

      {/* Post Meal Sugar */}
      {postTrend.trendStatus === "INSUFFICIENT_DATA" ? (
        <UnlockTrendsCard
          title="Post Meal Sugar"
          latestValue={
            dashboard.latestPostMealSugar
              ? dashboard.latestPostMealSugar.sugarValue
              : "No readings yet"
          }
        />
      ) : (
        <MetricChartCard
          title="Post Meal Sugar"
          trend={postTrend.trendStatus}
          latestValue={dashboard.latestPostMealSugar.sugarValue}
          currentAverage={postTrend.currentAverageSugar?.toFixed(1)}
          previousAverage={postTrend.previousAverageSugar?.toFixed(1)}
          percentageChange={`${postTrend.percentageChange?.toFixed(1)}%`}
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={postMealSugarHistory.points}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tickFormatter={tickDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line name="Sugar" type="monotone" dataKey="value" stroke="#2a9e4f" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </MetricChartCard>
      )}

    </div>
  );
}

export default DashboardPage;