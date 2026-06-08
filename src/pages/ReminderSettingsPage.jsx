import { useEffect, useState } from "react";

import {
  configureReminder,
  getReminderSettings,
} from "../services/reminderService";

function ReminderSettingsPage() {

  const [metricType, setMetricType] =
    useState("BP");

  const [frequencyType, setFrequencyType] =
    useState("WEEKLY");

  const [frequencyInterval, setFrequencyInterval] =
    useState(7);

  const [notificationsEnabled,
    setNotificationsEnabled] =
    useState(true);

  async function loadReminderSettings(
    selectedMetric
  ) {

    try {

      const data =
        await getReminderSettings(
          selectedMetric
        );

      if (!data) {

        setFrequencyType("WEEKLY");
        setFrequencyInterval(7);
        setNotificationsEnabled(true);

        return;
      }

      setFrequencyType(
        data.frequencyType
      );

      setFrequencyInterval(
        data.frequencyInterval ?? 7
      );

      setNotificationsEnabled(
        data.notificationsEnabled
      );

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    loadReminderSettings(
      metricType
    );

  }, [metricType]);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await configureReminder(
        metricType,
        frequencyType,
        frequencyType === "CUSTOM"
          ? frequencyInterval
          : null,
        notificationsEnabled
      );

      await loadReminderSettings(
        metricType
      );

      alert(
        "Reminder saved successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save reminder"
      );

    }
  }

  return (
    <div className="page-container">

      <h1>Reminder Settings</h1>

      <div className="dashboard-card">

        <h3>
          Active Reminder
        </h3>

        <p
          style={{
            marginTop: "10px",
            color: "var(--hh-secondary)",
            lineHeight: "1.6"
          }}
        >
          {
            notificationsEnabled
              ? `We'll remind you to log your ${
                  metricType === "BP"
                    ? "Blood Pressure"
                    : "Blood Sugar"
                } ${
                  frequencyType === "DAILY"
                    ? "every day"
                    : frequencyType === "WEEKLY"
                    ? "every week"
                    : frequencyType === "MONTHLY"
                    ? "every month"
                    : `every ${frequencyInterval} days`
                }.`
              : "Notifications are currently turned off."
          }
        </p>

      </div>

      <div className="dashboard-card">

        <form
          className="reminder-form"
          onSubmit={handleSubmit}
        >

          <label>
            Metric
          </label>

          <select
            value={metricType}
            onChange={(e) =>
              setMetricType(
                e.target.value
              )
            }
          >
            <option value="BP">
              Blood Pressure
            </option>

            <option value="SUGAR">
              Blood Sugar
            </option>
          </select>

          <label>
            Frequency
          </label>

          <select
            value={frequencyType}
            onChange={(e) =>
              setFrequencyType(
                e.target.value
              )
            }
          >
            <option value="DAILY">
              Daily
            </option>

            <option value="WEEKLY">
              Weekly
            </option>

            <option value="MONTHLY">
              Monthly
            </option>

            <option value="CUSTOM">
              Custom
            </option>
          </select>

          {frequencyType === "CUSTOM" && (
            <>
              <label>
                Every N Days
              </label>

              <input
                type="number"
                min="1"
                value={frequencyInterval}
                onChange={(e) =>
                  setFrequencyInterval(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </>
          )}

          <label className="checkbox-row">

            <input
              type="checkbox"
              checked={
                notificationsEnabled
              }
              onChange={(e) =>
                setNotificationsEnabled(
                  e.target.checked
                )
              }
            />

            Enable Notifications

          </label>

          <button
            type="submit"
            className="primary-btn"
          >
            Save Reminder
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReminderSettingsPage;