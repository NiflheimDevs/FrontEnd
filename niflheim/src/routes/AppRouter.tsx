import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AuthPage from "../pages/Auth";  
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Redirect to Auth if unknown route */}
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
