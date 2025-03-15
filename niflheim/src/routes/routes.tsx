import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthPage from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Footer from "../Components/Footer/Footer";

import AboutUs from "../pages/AboutUs";
import Error from "../pages/Error/Error";
import MobileVerify from "../pages/MobileVerify";
import MobileVerifyWrapper from "../wrapper/MobileVerifyWrapper";
import React from "react";

import CreateProject from "../pages/CreateProject/CreateProject";
import MyProjects from "../pages/MyProjects";

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
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/createproject", element: <CreateProject /> },
  { path: "/myprojects", element: <MyProjects /> },
];

// Private routes (require authentication)
export const privateRoutes = [{ path: "/dashboard", element: <Dashboard /> }];

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
