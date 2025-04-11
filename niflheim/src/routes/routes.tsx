import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../pages/Auth";
import Profile from "../pages/Profile";
import AboutUs from "../pages/AboutUs";
import Error from "../pages/Error/Error";
import MobileVerify from "../pages/MobileVerify";
import MobileVerifyWrapper from "../wrapper/MobileVerifyWrapper";
import MobileVerifyWrapperForgetPass from "../wrapper/MobileVerifyWrapperForgetPass";
import ForgetPassword from "../pages/ForgetPass/ForgetPassword";
import ChangePasswordonForget from "../pages/ForgetPass/ChangePasswordonForget";
import MobileVerifyforgetpass from "../pages/ForgetPass/MobileVerifyForgetPass";
import ChangePasswordManually from "../pages/ForgetPass/ChangePasswordManually";
import Wallet from "../Components/DashboardComp/Wallet";
import Chat from "../pages/Chat";
import DashboardMain from "../pages/Dashboard";
import ProjectCreationConfirmation from '../pages/CreateProject/ProjectCreationConfirmation';
import CreateProject from "../pages/CreateProject/CreateProject";
import EditProject from "../pages/EditProject/EditProject";
import MyProjects from "../pages/MyProjects";
import Biders from "../pages/Biders/Biders";
import HomePage from "../pages/HomePage";
import ProjectDetail from "../pages/ProjectDetail";

// Utility function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // Return true if token exists, false otherwise
};

// Wrapper component to redirect authenticated users away from public routes
const PublicRoute = ({ children }:any) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

// Public routes (no authentication required)
export const publicRoutes = [
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  { path: "/aboutUs", element: <AboutUs /> },
  { path: "/Main", element: <HomePage /> }, // Assuming homepage is public
  { path: "/forgetpassword", element: <ForgetPassword /> },
  {
    path: "/verify",
    element: (
      <MobileVerifyWrapper>
        <MobileVerify />
      </MobileVerifyWrapper>
    ),
  },
  {
    path: "/ForgetPassVerify",
    element: (
      <MobileVerifyWrapperForgetPass>
        <MobileVerifyforgetpass />
      </MobileVerifyWrapperForgetPass>
    ),
  },
  { path: "/Resetpass", element: <ChangePasswordonForget /> },
];

// Private routes (require authentication)
export const privateRoutes = [
  { path: "/dashboard", element: <DashboardMain /> },
  { path: "/profile", element: <Profile /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/Chat", element: <Chat /> },
  { path: "/createproject", element: <CreateProject /> },
  { path: "/myprojects", element: <MyProjects /> },
  { path: "/biders", element: <Biders /> },
  { path: "/ChangePass", element: <ChangePasswordManually /> },
  { path: "/project-created", element: <ProjectCreationConfirmation /> },
  { path: "/edit-project/:projectId", element: <EditProject /> },
  { path: "/detail" , element : <ProjectDetail/>},
];

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Main" replace />, // Default redirect
  },
  ...publicRoutes, // Spread public routes
  {
    element: <ProtectedRoute />, // Wrap private routes with auth check
    children: privateRoutes, // Private routes go here
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <Error />, // 404 or error page
  },
]);