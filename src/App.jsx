import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import DashboardPage from "./pages/DashboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import AddLogPage from "./pages/AddLogPage";
import HistoryPage from "./pages/HistoryPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>

          <Route path="/feed" element={<FeedPage />} />

          <Route path="/add-log" element={<AddLogPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
          path="/history"
          element={<HistoryPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;