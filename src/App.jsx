import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import DashboardPage from "./pages/DashboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import AddLogPage from "./pages/AddLogPage";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ReminderSettingsPage from "./pages/ReminderSettingsPage";
import FamilyPage from "./pages/FamilyPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MemberTrendPage from "./pages/MemberTrendPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
            path="/verify"
            element={<VerifyEmailPage />}
          />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/reminders"
            element={<ReminderSettingsPage />}
          />

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

          <Route
            path="/family"
            element={<FamilyPage />}
          />

          <Route
            path="/family"
            element={<FamilyPage />}
          />

          <Route
            path="/family/:familyId/member/:userId"
            element={<MemberTrendPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;