import { NavLink } from "react-router-dom";

function BottomNav({ visible }) {

  return (
    <nav
      className={
        visible
          ? "bottom-nav"
          : "bottom-nav hidden"
      }
    >

      <NavLink to="/feed">
        Feed
      </NavLink>

      <NavLink to="/add-log">
        Log
      </NavLink>

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink to="/family">
        Family
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

    </nav>
  );
}

export default BottomNav;