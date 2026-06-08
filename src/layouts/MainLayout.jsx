import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import AppHeader from "../components/navigation/AppHeader";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {

  const [navVisible, setNavVisible] =
    useState(true);

  useEffect(() => {

    let lastScrollY = window.scrollY;

    function handleScroll() {

      const currentScrollY =
        window.scrollY;

      if (currentScrollY < 100) {

        setNavVisible(true);

      }
      else if (
        currentScrollY > lastScrollY
      ) {

        setNavVisible(false);

      }
      else {

        setNavVisible(true);

      }

      lastScrollY = currentScrollY;

    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (
    <>

      <AppHeader />

      <main className="main-content">
        <Outlet />
      </main>

      <BottomNav
        visible={navVisible}
      />

    </>
  );
}

export default MainLayout;