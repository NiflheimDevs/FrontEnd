import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice"; 
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginBg, setLoginBg] = useState("#1B1B1B"); 
  const [signupBg, setSignupBg] = useState("#3674B5"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login()); 
    navigate("/dashboard"); 
  };

  
  const handleSignupClick = () => {
    setIsLogin(false);
    setLoginBg("#3A7D44");
    setSignupBg("#1B1B1B");
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setLoginBg("#1B1B1B"); 
    setSignupBg("#3674B5");
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
        <div
          className="w-1/2 z-0 flex justify-center bg-[#1B1B1B] items-center relative"
          style={{ backgroundColor: loginBg }} 
        >
          <AnimatePresence mode="wait">
            {isLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 rounded-lg"
              >
                <LoginForm />
                <div className="text-center font-inter mt-8 text-[24px] font-normal text-sm">
                  <button
                    onClick={handleSignupClick} 
                    className="text-[#3674B5] font-inter font-normal text-[24px] px-3 hover:text-blue-600"
                  >
                    ثبت نام
                  </button>
                  حساب کاربری ندارید؟
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side (Signup) */}
        <div
          className="w-1/2 flex justify-center items-center relative"
          style={{ backgroundColor: signupBg }} 
        >
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 rounded-lg"
              >
                <SignupForm />
                <div className="text-center font-inter mt-8 text-[24px] font-normal text-sm">
                  <button
                    onClick={handleLoginClick} 
                    className="text-[#3A7D44] font-inter font-normal text-[24px] px-3 hover:text-green-600"
                  >
                    ورود
                  </button>
                  حساب کاربری دارید؟
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;