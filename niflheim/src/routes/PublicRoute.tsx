import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    toast.info("Welcome to the website!", { theme: "dark" });
  }, []);

  // useEffect(() => {
  //   if (!sessionStorage.getItem("welcomeToastShown")) {
  //     toast.info("Welcome to the website!", { theme: "dark" });
  //     sessionStorage.setItem("welcomeToastShown", "true");
  //   }
  // }, []);
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
