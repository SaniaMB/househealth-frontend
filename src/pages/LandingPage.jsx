import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">

      <div className="landing-glow"></div>

      <div className="landing-content">

          <h1 className="brand-title">
            HouseHealth
          </h1>

          <p className="product-type">
            Family Health Companion
          </p>

          <p className="landing-tagline">
            Keep up with loved ones and never miss what matters.
          </p>

        <div className="landing-buttons">
          <Link to="/login">
            <button className="primary-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="secondary-btn">
              Create Account
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default LandingPage;