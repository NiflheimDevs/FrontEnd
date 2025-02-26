import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice"; // Import login action
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login()); // Simulate login
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white relative overflow-hidden">
      {/* Dark Background Section */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isLogin ? "0%" : "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-1/2 h-full bg-black absolute top-0"
      ></motion.div>

      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 bg-[#1f2737] px-4 py-2 rounded-lg hover:bg-[#364052] transition"
      >
        Home
      </button>

      {/* Main Authentication Container */}
      <div className="flex w-full h-full">
        {/* Left Side (Login) */}
        <div className="w-1/2 flex justify-center items-center relative">
          <AnimatePresence mode="wait">
            {isLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg"
              >
                <LoginForm />
                <div className="text-center mt-4 text-sm">
                  حساب کاربری ندارید؟
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-green-400 ml-1 hover:underline"
                  >
                    ثبت نام
                  </button>
                </div>

                {/* Redirect to Dashboard Button */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-yellow-500 py-2 rounded-md hover:bg-yellow-600 transition mt-4"
                >
                  Go to Dashboard (Manually)
                </button>

                {/* Simulated Login Button */}
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 transition mt-4"
                >
                  ورود (Login & Redirect)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side (Signup) */}
        <div className="w-1/2 flex justify-center items-center relative">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg"
              >
                <SignupForm />
                <div className="text-center mt-4 text-sm">
                  حساب کاربری دارید؟
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-400 ml-1 hover:underline"
                  >
                    ورود
                  </button>
                </div>

                {/* Redirect to Dashboard Button */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-yellow-500 py-2 rounded-md hover:bg-yellow-600 transition mt-4"
                >
                  Go to Dashboard (Manually)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
