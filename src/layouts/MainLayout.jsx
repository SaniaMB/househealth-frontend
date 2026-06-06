import { Outlet } from "react-router-dom";

import AppHeader from "../components/navigation/AppHeader";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {
  return (
    <>
      <AppHeader />

      <main className="main-content">
        <Outlet />
      </main>

      <BottomNav />
    </>
  );
}

export default MainLayout;