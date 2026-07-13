import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";

import "../styles/landing.css";

const FEATURES = [
  { icon: <Heart size={18} />, label: "Track health" },
  { icon: <Users size={18} />, label: "Share with family" },
  { icon: <TrendingUp size={18} />, label: "Get insights" },
];

const STEPS = [
  {
    title: "Create your household",
    desc: "Set up your family group and invite members in seconds.",
  },
  {
    title: "Log health updates",
    desc: "Record symptoms, moods, medications, and daily check-ins.",
  },
  {
    title: "Stay in the loop",
    desc: "Get notified when something matters. Never miss a thing.",
  },
];

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-glow" />
      <div className="landing-glow-secondary" />

      {/* ── Hero ── */}
      <div className="landing-content">
        <div className="landing-eyebrow">
          <span className="landing-eyebrow-dot" />
          Family Health Companion
        </div>

        <h1 className="brand-title">
          House<span>Health</span>
        </h1>

        <p className="product-type">Keep up with loved ones.</p>

        <p className="landing-tagline">
          Never miss what matters — track, share, and stay connected with your family's health.
        </p>

        <div className="landing-features">
          {FEATURES.map((f) => (
            <span className="landing-feature-pill" key={f.label}>
              {f.icon}
              {f.label}
            </span>
          ))}
        </div>

        <div className="landing-buttons">
          <Link to="/login">
            <button className="primary-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="secondary-btn">Create Account</button>
          </Link>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="landing-how">
        <p className="landing-how-title">How it works</p>

        <div className="landing-steps">
          {STEPS.map((step, i) => (
            <div className="landing-step" key={i}>
              <div className="landing-step-num">{i + 1}</div>
              <div className="landing-step-text">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;