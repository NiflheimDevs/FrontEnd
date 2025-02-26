import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("You are logged in!", { theme: "colored" });
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (isAuthenticated && !sessionStorage.getItem("loginToastShown")) {
  //     toast.success("You are logged in!", { theme: "colored" });
  //     sessionStorage.setItem("loginToastShown", "true");
  //   }
  // }, [isAuthenticated]);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
