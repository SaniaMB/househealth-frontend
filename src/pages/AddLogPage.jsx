import { useState } from "react";
import {
  Heart,
  Droplet,
  CheckCircle,
} from "lucide-react";

import {
  createBloodPressureLog,
  createBloodSugarLog,
} from "../services/healthLogService";

function AddLogPage() {
  const [selectedType, setSelectedType] = useState("BP");

  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const [sugarValue, setSugarValue] = useState("");
  const [sugarType, setSugarType] = useState("FASTING");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function showSuccess() {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  }

  const handleBloodPressureSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createBloodPressureLog(Number(systolic), Number(diastolic));
      setSystolic("");
      setDiastolic("");
      showSuccess();
    } catch {
      setError("Failed to save blood pressure reading.");
    } finally {
      setLoading(false);
    }
  };

  const handleSugarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createBloodSugarLog(Number(sugarValue), sugarType);
      setSugarValue("");
      showSuccess();
    } catch {
      setError("Failed to save blood sugar reading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Record Health Data</h1>
        <p>Keep your health history up to date.</p>
      </div>

      {/* Type selector */}
      <div className="log-type-selector">
        <button
          className={`log-type-btn${selectedType === "BP" ? " active" : ""}`}
          onClick={() => { setSelectedType("BP"); setError(""); setSuccess(false); }}
        >
          <Heart size={20} className="log-type-icon" />
          Blood Pressure
        </button>

        <button
          className={`log-type-btn${selectedType === "SUGAR" ? " active" : ""}`}
          onClick={() => { setSelectedType("SUGAR"); setError(""); setSuccess(false); }}
        >
          <Droplet size={20} className="log-type-icon" />
          Blood Sugar
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="log-error">{error}</div>
      )}

      {/* Success */}
      {success && (
        <div className="log-success">
          <CheckCircle size={18} />
          Reading saved successfully.
        </div>
      )}

      {/* BP Form */}
      {selectedType === "BP" && (
        <div className="dashboard-card log-card">
          <div className="log-card-label">
            <Heart size={20} />
            Blood Pressure
          </div>

          <div className="log-hint">
            Normal range: Systolic 90–120 · Diastolic 60–80 mmHg
          </div>

          <form onSubmit={handleBloodPressureSubmit}>
            <div className="log-input-row">
              <div className="log-input-group">
                <label htmlFor="systolic">Systolic</label>
                <div className="log-input-wrap">
                  <input
                    id="systolic"
                    type="number"
                    placeholder="120"
                    min="60"
                    max="250"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    required
                  />
                  <span className="log-unit">mmHg</span>
                </div>
              </div>

              <div className="log-input-divider">/</div>

              <div className="log-input-group">
                <label htmlFor="diastolic">Diastolic</label>
                <div className="log-input-wrap">
                  <input
                    id="diastolic"
                    type="number"
                    placeholder="80"
                    min="40"
                    max="150"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    required
                  />
                  <span className="log-unit">mmHg</span>
                </div>
              </div>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? (
                <><span className="auth-spinner" /> Saving…</>
              ) : (
                "Save Reading"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Sugar Form */}
      {selectedType === "SUGAR" && (
        <div className="dashboard-card log-card">
          <div className="log-card-label">
            <Droplet size={20} />
            Blood Sugar
          </div>

          <div className="log-hint">
            Fasting: 70–99 · Post-meal: under 140 mg/dL
          </div>

          <form onSubmit={handleSugarSubmit}>
            <div className="log-sugar-type">
              {["FASTING", "POST_MEAL"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`log-sugar-type-btn${sugarType === t ? " active" : ""}`}
                  onClick={() => setSugarType(t)}
                >
                  {t === "FASTING" ? "Fasting" : "Post Meal"}
                </button>
              ))}
            </div>

            <div className="log-input-group">
              <label htmlFor="sugar">Sugar Value</label>
              <div className="log-input-wrap">
                <input
                  id="sugar"
                  type="number"
                  placeholder="95"
                  min="20"
                  max="600"
                  value={sugarValue}
                  onChange={(e) => setSugarValue(e.target.value)}
                  required
                />
                <span className="log-unit">mg/dL</span>
              </div>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? (
                <><span className="auth-spinner" /> Saving…</>
              ) : (
                "Save Reading"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddLogPage;