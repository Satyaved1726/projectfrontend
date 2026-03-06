import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './styles/globals.css';

// Pages
import Landing from "./pages/public/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserDashboard from "./pages/user/UserDashboard";
import ReportForm from "./ReportForm";
import Track from "./Track";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import AdminAnalytics from "./AdminAnalytics";
import ReportDetail from "./ReportDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<ProtectedRoute component={UserDashboard} requiredRole={["USER"]} />} />
        <Route path="/submit-report" element={<ProtectedRoute component={ReportForm} requiredRole={["USER"]} />} />
        <Route path="/track-report" element={<Track />} />
        <Route path="/my-reports" element={<ProtectedRoute component={ReportForm} requiredRole={["USER"]} />} />
        <Route path="/notifications" element={<ProtectedRoute component={UserDashboard} requiredRole={["USER"]} />} />
        <Route path="/profile" element={<ProtectedRoute component={UserDashboard} requiredRole={["USER"]} />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute component={AdminDashboard} requiredRole={["ADMIN"]} />} />
        <Route path="/admin/reports" element={<ProtectedRoute component={AdminReports} requiredRole={["ADMIN"]} />} />
        <Route path="/admin/analytics" element={<ProtectedRoute component={AdminAnalytics} requiredRole={["ADMIN"]} />} />
        <Route path="/admin/assign" element={<ProtectedRoute component={AdminReports} requiredRole={["ADMIN"]} />} />
        <Route path="/admin/audit-logs" element={<ProtectedRoute component={AdminReports} requiredRole={["ADMIN"]} />} />
        <Route path="/admin/report/:id" element={<ProtectedRoute component={ReportDetail} requiredRole={["ADMIN"]} />} />

        {/* Backward compatibility - redirect old routes */}
        <Route path="/admin-login" element={<Navigate replace to="/login" />} />
        <Route path="/admin" element={<Navigate replace to="/admin-dashboard" />} />
        <Route path="/reg" element={<Navigate replace to="/signup" />} />
        <Route path="/submit" element={<Navigate replace to="/submit-report" />} />
        <Route path="/track" element={<Navigate replace to="/track-report" />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
