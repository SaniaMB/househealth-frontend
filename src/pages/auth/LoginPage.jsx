import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/feed");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">

        <Link to="/" className="back-link">
          ← Back
        </Link>

        <h1 className="auth-title">
          HouseHealth
        </h1>

        <p className="auth-subtitle">
          Welcome Back
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;