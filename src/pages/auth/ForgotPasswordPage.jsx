import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Leaf,
} from "lucide-react";

import { forgotPassword } from "../../services/authService";
import { getErrorMessage } from "../../utils/errorUtils";

function ForgotPasswordPage() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);

      setSuccess(true);
      setEmail("");

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

          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Leaf size={22} />
            </div>

            <h1 className="auth-title">
              House<span>Health</span>
            </h1>
          </div>

          <div className="auth-success">

            <h2>Check your email</h2>

            <p>
              If an account exists with that email address,
              we've sent you a password reset link.
            </p>

            <p>
              The link will expire in 30 minutes.
            </p>

            <Link
              to="/login"
              className="primary-btn auth-submit"
            >
              Back to Login
            </Link>

          </div>

        </div>
      </div>
    );
  }

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

        <p className="auth-subtitle">
          Enter your email and we'll send you a password reset link.
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

            <label htmlFor="email">
              Email
            </label>

            <div className="auth-input-wrap">

              <Mail className="auth-input-icon" size={20} />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ForgotPasswordPage;