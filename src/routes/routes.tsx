/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../pages/Auth/Auth";
import Profile from "../pages/Profile/Profile";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/FooterPages/ContactUs";
import FAQ from "../pages/FooterPages/FAQ";
import Rules from "../pages/FooterPages/Rules";
import Error from "../pages/Error/Error";
import MobileVerify from "../pages/ForgetPass/MobileVerify";
import MobileVerifyWrapper from "../wrapper/MobileVerifyWrapper";
import MobileVerifyWrapperForgetPass from "../wrapper/MobileVerifyWrapperForgetPass";
import ForgetPassword from "../pages/ForgetPass/ForgetPassword";
import ChangePasswordonForget from "../pages/ForgetPass/ChangePasswordonForget";
import MobileVerifyforgetpass from "../pages/ForgetPass/MobileVerifyForgetPass";
import ChangePasswordManually from "../pages/ForgetPass/ChangePasswordManually";
//import Wallet from "../Components/DashboardComp/Wallet";
import PublicProfile from "../pages/PublicProfile/PublicProfile";
import Wallet from "../pages/Wallet/Wallet";
import Chat from "../pages/Chat/Chat";
import DashboardMain from "../pages/Dashboard/Dashboard";
import ProjectCreationConfirmation from "../Components/CreateProject/ProjectCreationConfirmation";
import CreateProject from "../pages/CreateProject/CreateProject";
import InsufficientBalance from "../Components/DashboardComp/InsufficientBalance";
import EditProject from "../pages/Projects/EditProject";
import MyProjects from "../pages/Projects/MyProjects";
import Biders from "../pages/Biders/Biders";
import HomePage from "../pages/Home/HomePage";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";

import TeamListPage from "../pages/Teams/TeamListPage";
import TeamDetailPage from "../pages/Teams/TeamDetailPage";
import BrowseProjectLayout from "../Components/Browse/BrowseProjectLayout";
import BrowsePageLayout from "../Components/Browse/BrowsePageLayout";
import BrowseTeamLayout from "../Components/Browse/BrowseTeamLayout";
import BrowseUserLayout from "../Components/Browse/BrowseUserLayout";
import EmailVerificationResult from "../pages/Auth/EmailVerificationResult";
import TeamMembershipVerification from "../pages/Auth/TeamMembershipVerification";

// Utility function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // Return true if token exists, false otherwise
};

// Wrapper component to redirect authenticated users away from public routes
const PublicRoute = ({ children }: any) => {
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
  { path: "/ContactUs", element: <ContactUs /> },
  { path: "/FAQ", element: <FAQ /> },
  { path: "/Rules", element: <Rules /> },
  { path: "/", element: <HomePage /> }, // Assuming homepage is public
  { path: "/forgetpassword", element: <ForgetPassword /> },
  {
    path: "/verify",
    element: (
      <MobileVerifyWrapper>
        <MobileVerify />
      </MobileVerifyWrapper>
    ),
  },
  { path: "/profile/:profile_id", element: <PublicProfile /> },
  { path: "/ProjectDetail/:project_id", element: <ProjectDetail /> },
  {
    path: "/ForgetPassVerify",
    element: (
      <MobileVerifyWrapperForgetPass>
        <MobileVerifyforgetpass />
      </MobileVerifyWrapperForgetPass>
    ),
  },
  { path: "/Resetpass", element: <ChangePasswordonForget /> },
  { path: "/Browse", element: <BrowsePageLayout /> },
  { path: "/Browse/Projects", element: <BrowseProjectLayout /> },
  { path: "/Browse/Teams", element: <BrowseTeamLayout /> },
  { path: "/Browse/Users", element: <BrowseUserLayout /> },
  { path: "/ProjectDetail/:project_id", element: <ProjectDetail /> },
  {
    path: "/verify/email",
    element: <EmailVerificationResult />,
  },
  {
    path: "/team/invite",
    element: <TeamMembershipVerification />,
  },
];

// Private routes (require authentication)
export const privateRoutes = [
  { path: "/dashboard", element: <DashboardMain /> },
  { path: "/profile", element: <Profile /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/Chat", element: <Chat /> },
  { path: "/createproject", element: <CreateProject /> },
  { path: "/insufficient-balance", element: <InsufficientBalance /> },
  { path: "/myprojects", element: <MyProjects /> },
  { path: "/biders/:projectId", element: <Biders /> },
  { path: "/ChangePass", element: <ChangePasswordManually /> },
  { path: "/project-created", element: <ProjectCreationConfirmation /> },
  { path: "/edit-project/:projectId", element: <EditProject /> },
  { path: "/teams", element: <TeamListPage /> },
  { path: "/teams/:id", element: <TeamDetailPage /> },
];

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Default redirect
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
