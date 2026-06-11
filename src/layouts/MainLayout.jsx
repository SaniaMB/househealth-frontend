import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import AppHeader from "../components/navigation/AppHeader";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {
  const [navVisible, setNavVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      setHeaderScrolled(currentScrollY > 10);

      if (currentScrollY < 100) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppHeader scrolled={headerScrolled} />

      <main className="main-content">
        <Outlet />
      </main>

      <BottomNav visible={navVisible} />
    </>
  );
}

export default MainLayout;