import { useEffect, useState } from "react";
import {
  IoHeartOutline,
  IoWaterOutline,
  IoNotificationsOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

import {
  configureReminder,
  getReminderSettings,
} from "../services/reminderService";

import "../styles/reminders.css";

const METRICS = [
  { value: "BP", label: "Blood Pressure", icon: <IoHeartOutline /> },
  { value: "SUGAR", label: "Blood Sugar", icon: <IoWaterOutline /> },
];

const FREQUENCIES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "CUSTOM", label: "Custom" },
];

function ReminderSettingsPage() {
  const [metricType, setMetricType] = useState("BP");
  const [frequencyType, setFrequencyType] = useState("WEEKLY");
  const [frequencyInterval, setFrequencyInterval] = useState(7);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function loadReminderSettings(selectedMetric) {
    setLoading(true);
    try {
      const data = await getReminderSettings(selectedMetric);
      if (!data) {
        setFrequencyType("WEEKLY");
        setFrequencyInterval(7);
        setNotificationsEnabled(true);
        return;
      }
      setFrequencyType(data.frequencyType);
      setFrequencyInterval(data.frequencyInterval ?? 7);
      setNotificationsEnabled(data.notificationsEnabled);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadReminderSettings(metricType); }, [metricType]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await configureReminder(
        metricType,
        frequencyType,
        frequencyType === "CUSTOM" ? frequencyInterval : null,
        notificationsEnabled
      );
      await loadReminderSettings(metricType);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError("Failed to save reminder. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const activeSummary = notificationsEnabled
    ? `You'll be reminded to log ${
        metricType === "BP" ? "Blood Pressure" : "Blood Sugar"
      } ${
        frequencyType === "DAILY" ? "every day"
        : frequencyType === "WEEKLY" ? "every week"
        : frequencyType === "MONTHLY" ? "every month"
        : `every ${frequencyInterval} days`
      }.`
    : "Notifications are currently off.";

  return (
    <div className="page-container">

      <div className="feed-header">
        <h1>Reminder Settings</h1>
        <p>Stay on top of your health logging.</p>
      </div>

      {/* Active summary */}
      <div className="reminder-summary-card">
        <div className="reminder-summary-icon">
          <IoNotificationsOutline />
        </div>
        <p className="reminder-summary-text">{activeSummary}</p>
      </div>

      {/* Metric toggle */}
      <div className="reminder-metric-toggle">
        {METRICS.map((m) => (
          <button
            key={m.value}
            className={`reminder-metric-btn${metricType === m.value ? " active" : ""}`}
            onClick={() => setMetricType(m.value)}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Form card */}
      <div className="reminder-card">
        {loading ? (
          <div className="reminder-loading">Loading settings…</div>
        ) : (
          <form className="reminder-form" onSubmit={handleSubmit}>

            <div className="reminder-field">
              <label>Frequency</label>
              <div className="reminder-freq-grid">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    className={`reminder-freq-btn${frequencyType === f.value ? " active" : ""}`}
                    onClick={() => setFrequencyType(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {frequencyType === "CUSTOM" && (
              <div className="reminder-field">
                <label htmlFor="interval">Every how many days?</label>
                <div className="log-input-wrap">
                  <input
                    id="interval"
                    type="number"
                    min="1"
                    max="365"
                    value={frequencyInterval}
                    onChange={(e) => setFrequencyInterval(Number(e.target.value))}
                  />
                  <span className="log-unit">days</span>
                </div>
              </div>
            )}

            <div className="reminder-field">
              <label>Notifications</label>
              <div
                className="reminder-toggle-row"
                onClick={() => setNotificationsEnabled((v) => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setNotificationsEnabled((v) => !v)}
              >
                <span>Enable push notifications</span>
                <div className={`reminder-toggle${notificationsEnabled ? " on" : ""}`}>
                  <div className="reminder-toggle-knob" />
                </div>
              </div>
            </div>

            {error && <div className="log-error">{error}</div>}

            {success && (
              <div className="log-success">
                <IoCheckmarkCircle /> Reminder saved.
              </div>
            )}

            <button type="submit" className="primary-btn" disabled={saving}>
              {saving ? (
                <><span className="auth-spinner" /> Saving…</>
              ) : (
                "Save Reminder"
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

export default ReminderSettingsPage;