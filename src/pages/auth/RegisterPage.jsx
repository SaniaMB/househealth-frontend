import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLeafOutline,
} from "react-icons/io5";

import { registerUser } from "../../services/authService";
import { getErrorMessage } from "../../utils/errorUtils";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);

      setRegisteredEmail(email);

      // Clear form after successful registration
      setName("");
      setEmail("");
      setPassword("");

      setRegistrationSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="auth-page">
        <div className="auth-content">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <IoLeafOutline />
            </div>

            <h1 className="auth-title">
              House<span>Health</span>
            </h1>
          </div>

          <div className="auth-success">
            <h2>Email Verification Required</h2>

            <p>Your account has been created successfully.</p>

            <p>We sent a verification link to:</p>

            <strong>{registeredEmail}</strong>

            <p>
              Check your inbox and click the verification link to activate your
              account. After verification, you'll be signed in automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-content">
        <Link to="/" className="back-link">
          ← Back
        </Link>

        <div className="auth-logo">
          <div className="auth-logo-icon">
            <IoLeafOutline />
          </div>

          <h1 className="auth-title">
            House<span>Health</span>
          </h1>
        </div>

        <p className="auth-subtitle">
          Create your account — it's free.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Full Name</label>

            <div className="auth-input-wrap">
              <IoPersonOutline className="auth-input-icon" />

              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-email">Email</label>

            <div className="auth-input-wrap">
              <IoMailOutline className="auth-input-icon" />

              <input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-password">Password</label>

            <div className="auth-input-wrap">
              <IoLockClosedOutline className="auth-input-icon" />

              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="auth-pw-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;