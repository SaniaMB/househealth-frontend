import { useState } from "react";
import {
  createBloodPressureLog,
  createBloodSugarLog,
} from "../services/healthLogService";

function AddLogPage() {
  const [selectedType, setSelectedType] =
    useState("BP");

  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const [sugarValue, setSugarValue] = useState("");
  const [sugarType, setSugarType] =
    useState("FASTING");

  const handleBloodPressureSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBloodPressureLog(
        Number(systolic),
        Number(diastolic)
      );

      alert("Blood pressure logged");

      setSystolic("");
      setDiastolic("");
    } catch (error) {
      alert("Failed to log blood pressure");
    }
  };

  const handleSugarSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBloodSugarLog(
        Number(sugarValue),
        sugarType
      );

      alert("Blood sugar logged");

      setSugarValue("");
    } catch (error) {
      alert("Failed to log blood sugar");
    }
  };

  return (
    <div className="page-container">

      <div className="dashboard-header">
        <h1>Record Health Data</h1>

        <p>
          Keep your health history up to date.
        </p>
      </div>

      <div className="log-type-selector">

        <button
          className={
            selectedType === "BP"
              ? "log-type-btn active"
              : "log-type-btn"
          }
          onClick={() => setSelectedType("BP")}
        >
          Blood Pressure
        </button>

        <button
          className={
            selectedType === "SUGAR"
              ? "log-type-btn active"
              : "log-type-btn"
          }
          onClick={() => setSelectedType("SUGAR")}
        >
          Blood Sugar
        </button>

      </div>

      {selectedType === "BP" && (
        <div className="dashboard-card">

          <h2>Blood Pressure</h2>

          <form onSubmit={handleBloodPressureSubmit}>

            <input
              type="number"
              placeholder="Systolic"
              value={systolic}
              onChange={(e) =>
                setSystolic(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Diastolic"
              value={diastolic}
              onChange={(e) =>
                setDiastolic(e.target.value)
              }
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Save Reading
            </button>

          </form>

        </div>
      )}

      {selectedType === "SUGAR" && (
        <div className="dashboard-card">

          <h2>Blood Sugar</h2>

          <form onSubmit={handleSugarSubmit}>

            <input
              type="number"
              placeholder="Sugar Value"
              value={sugarValue}
              onChange={(e) =>
                setSugarValue(e.target.value)
              }
            />

            <select
              value={sugarType}
              onChange={(e) =>
                setSugarType(e.target.value)
              }
            >
              <option value="FASTING">
                Fasting
              </option>

              <option value="POST_MEAL">
                Post Meal
              </option>
            </select>

            <button
              type="submit"
              className="primary-btn"
            >
              Save Reading
            </button>

          </form>

        </div>
      )}

    </div>
  );
}

export default AddLogPage;