import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoHome,
  IoAddCircle,
  IoGridOutline,
  IoGrid,
  IoPeopleOutline,
  IoPeople,
  IoPersonOutline,
  IoPerson,
} from "react-icons/io5";

const NAV_LINKS = [
  {
    to: "/feed",
    label: "Feed",
    icon: <IoHomeOutline />,
    iconActive: <IoHome />,
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <IoGridOutline />,
    iconActive: <IoGrid />,
  },
  // FAB placeholder — rendered separately in the center
  null,
  {
    to: "/family",
    label: "Family",
    icon: <IoPeopleOutline />,
    iconActive: <IoPeople />,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: <IoPersonOutline />,
    iconActive: <IoPerson />,
  },
];

const FIRST_LOG_KEY = "hh_fab_tip_seen";

function BottomNav({ visible }) {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(FIRST_LOG_KEY);
    if (!seen) {
      // Small delay so layout settles before tip appears
      const t = setTimeout(() => {
        setShowTip(true);
        localStorage.setItem(FIRST_LOG_KEY, "1");
      }, 1200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <nav className={`bottom-nav${visible ? "" : " hidden"}`}>
      {NAV_LINKS.map((link, i) => {
        // FAB in the center
        if (link === null) {
          return (
            <div key="fab" style={{ position: "relative" }}>
              {showTip && (
                <div className="fab-tooltip">
                  Tap here to log your first entry
                </div>
              )}
              <NavLink to="/add-log" className="nav-fab">
                <div className="nav-fab-circle">
                  <IoAddCircle />
                </div>
                <span className="nav-fab-label">Log</span>
              </NavLink>
            </div>
          );
        }

        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="nav-link-indicator" />
                {isActive ? link.iconActive : link.icon}
                {link.label}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNav;