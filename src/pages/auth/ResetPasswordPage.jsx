import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Leaf,
} from "lucide-react";

import { resetPassword } from "../../services/authService";
import { getErrorMessage } from "../../utils/errorUtils";

function ResetPasswordPage() {

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid password reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      await resetPassword(token, password);

      setSuccess(true);

      setPassword("");
      setConfirmPassword("");

    } catch (err) {

      setError(getErrorMessage(err));

    } finally {

      setLoading(false);

    }

  };

  if (success) {

    return (
      <div className="auth-page">
        <div className="auth-content">

            <Link
            to="/login"
            className="back-link"
            >
            ← Back
            </Link>

          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Leaf size={22} />
            </div>

            <h1 className="auth-title">
              House<span>Health</span>
            </h1>
          </div>

          <div className="auth-success">

            <h2>Password Updated</h2>

            <p>
              Your password has been reset successfully.
            </p>

            <Link
              to="/login"
              className="primary-btn auth-submit"
            >
              Continue to Login
            </Link>

          </div>

        </div>
      </div>
    );

  }

  return (
    <div className="auth-page">
      <div className="auth-content">

        <div className="auth-logo">

          <div className="auth-logo-icon">
            <Leaf size={22} />
          </div>

          <h1 className="auth-title">
            House<span>Health</span>
          </h1>

        </div>

        <p className="auth-subtitle">
          Choose a new password for your account.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">

            <label htmlFor="password">
              New Password
            </label>

            <div className="auth-input-wrap">

              <Lock className="auth-input-icon" size={20} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={password}
                autoComplete="new-password"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>

            </div>

          </div>

          <div className="auth-field">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="auth-input-wrap">

              <Lock className="auth-input-icon" size={20} />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Re-enter password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

        </form>

      </div>
    </div>
  );

}

export default ResetPasswordPage;