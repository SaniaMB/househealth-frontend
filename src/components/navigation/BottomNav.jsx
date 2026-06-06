import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="bottom-nav">

      <NavLink to="/feed">
        Feed
      </NavLink>

      <NavLink to="/add-log">
        Add Log
      </NavLink>

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink to="/notifications">
        Alerts
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

    </nav>
  );
}

export default BottomNav;