// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import { loginUser } from "../../services/authService";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await loginUser(
//         email,
//         password
//       );

//       localStorage.setItem(
//         "token",
//         data.token
//       );

//       navigate("/feed");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-content">

//         <Link to="/" className="back-link">
//           ← Back
//         </Link>

//         <h1 className="auth-title">
//           HouseHealth
//         </h1>

//         <p className="auth-subtitle">
//           Welcome Back
//         </p>

//         <form
//           className="auth-form"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) =>
//               setPassword(e.target.value)
//             }
//           />

//           <button
//             type="submit"
//             className="primary-btn"
//           >
//             Login
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default LoginPage;

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
      navigate("/feed");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">

        {/* Back */}
        <Link to="/" className="back-link">
          ← Back
        </Link>

        {/* Logo + heading */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <IoLeafOutline />
          </div>
          <h1 className="auth-title">
            House<span>Health</span>
          </h1>
        </div>

        <p className="auth-subtitle">Welcome back — good to see you.</p>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <div className="auth-input-wrap">
              <IoMailOutline className="auth-input-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input-wrap">
              <IoLockClosedOutline className="auth-input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                autoComplete="current-password"
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="primary-btn auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Signing in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;