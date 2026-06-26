import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLeafOutline,
} from "react-icons/io5";

import { loginUser } from "../../services/authService";
import { getErrorMessage } from "../../utils/errorUtils";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      // Optional cleanup
      setEmail("");
      setPassword("");

      navigate("/feed");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

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
          Welcome back — good to see you.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <div className="auth-input-wrap">
              <IoMailOutline className="auth-input-icon" />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <div className="auth-input-wrap">
              <IoLockClosedOutline className="auth-input-icon" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="auth-pw-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <div className="auth-forgot-password">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
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
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;