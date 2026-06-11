// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import { registerUser } from "../../services/authService";

// function RegisterPage() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] =
//     useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await registerUser(
//         name,
//         email,
//         password
//       );

//       alert(
//         "Account created successfully"
//       );

//       navigate("/login");
//     } catch (error) {
//       alert("Registration failed");
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
//           Create Account
//         </p>

//         <form
//           className="auth-form"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) =>
//               setName(e.target.value)
//             }
//           />

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
//             Create Account
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default RegisterPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoLeafOutline,
} from "react-icons/io5";

import { registerUser } from "../../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">

        <Link to="/" className="back-link">← Back</Link>

        <div className="auth-logo">
          <div className="auth-logo-icon">
            <IoLeafOutline />
          </div>
          <h1 className="auth-title">
            House<span>Health</span>
          </h1>
        </div>

        <p className="auth-subtitle">Create your account — it's free.</p>

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
                onClick={() => setShowPassword((v) => !v)}
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
                Creating account…
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