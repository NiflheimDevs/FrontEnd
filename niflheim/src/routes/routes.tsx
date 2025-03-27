import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../pages/Auth";
import Profile from "../pages/Profile";
import Footer from "../Components/Footer/Footer";

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
import React from "react";

import ProjectCreationConfirmation from '../pages/CreateProject/ProjectCreationConfirmation';
import CreateProject from "../pages/CreateProject/CreateProject";
import MyProjects from "../pages/MyProjects";
import Biders from "../pages/Biders/Biders";
import path from "path";

// Public routes (accessible by anyone)
export const publicRoutes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/footer", element: <Footer /> },
  { path: "/aboutUs", element: <AboutUs /> },
  {
    path: "/verify",
    element: (
      <MobileVerifyWrapper>
        <MobileVerify />
      </MobileVerifyWrapper>
    ),
  },

  { path: "/error", element: <Error /> },
  { path: "/createproject", element: <CreateProject /> },
  { path: "/project-created", element: <ProjectCreationConfirmation /> },
  { path: "/myprojects", element: <MyProjects /> },
  { path: "/biders", element: <Biders /> },
  { path: "/forgetpassword", element: <ForgetPassword /> },
  { path: "/Resetpass", element: <ChangePasswordonForget /> },
  {
    path: "/ForgetPassVerify",
    element: (
      <MobileVerifyWrapperForgetPass>
        <MobileVerifyforgetpass />
      </MobileVerifyWrapperForgetPass>
    ),
  },
  { path: "/ChangePass", element: <ChangePasswordManually /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/Chat", element: <Chat /> },
  { path: "/dashboard", element: <DashboardMain /> },
];

// Private routes (require authentication)
export const privateRoutes = [];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  ...publicRoutes, // Spread public routes
  {
    element: <ProtectedRoute />, // Wrap private routes with auth check
    children: privateRoutes,
  },
  {
    path: "*",
    element: <Error />, // error page
  },
]);

/*
How to Add New Pages?
Public pages: Add them to publicRoutes.
Private pages: Add them to privateRoutes.
Example:
If you want to add a Settings page that is private and a Contact page that is public, you just update:

tsx
Copy
Edit
const publicRoutes = [
  { path: "/auth", element: <AuthPage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/contact", element: <ContactPage /> },  // New public page
];

const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/settings", element: <SettingsPage /> },  // New private page
];
*/
