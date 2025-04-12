import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { authenticate } from "../store/slices/authSlice";
import LoginForm from "../Components/Auth/LoginForm";
import SignupForm from "../Components/Auth/SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [Bg, setBg] = useState("bg-gradient-to-l from-[#3674B5] to-[#18334F]");
  const [loginImg, setloginImg] = useState("");
  const [SignImg, setSignImg] = useState("hidden");

  const handleSignupClick = () => {
    setIsLogin(false);
    setBg("bg-gradient-to-r from-[#3A7D44] to-[#172533]");
    setSignImg("");
    setloginImg("hidden");
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setBg("bg-gradient-to-r from-[#18334F] to-[#3674B5]");
    setSignImg("hidden");
    setloginImg("");
  };

  return (
    <div className="flex h-screen w-full text-white relative overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isLogin ? "0%" : "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-1/2 h-full absolute top-0"
      ></motion.div>

      {/* Main Authentication Container */}
      <div className={`flex w-full h-full justify-center ${Bg}`}>
        {/* Right Side (Signup) */}
        <div
          className={`md:w-48/100 sm:w-full ${
            isLogin ? "w-0" : "w-full"
          } flex justify-center items-center relative`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="signup1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <object
                data="/src/assets/login.svg"
                type="image/svg+xml"
                className={`md:w-[425px] md:h-[590px] sm:w-[300px] sm:h-[450px] pointer-events-none w-0 h-0  ${loginImg}`}
              />
            </motion.div>
            {!isLogin && (
              <motion.div
                key="signup1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 rounded-lg"
              >
                <SignupForm />
                <div className=" text-center md:w-full sm:w-8/10 text-[#D9D9D9] font-[vazirmatn] mt-8 text-[24px] font-bold text-sm">
                  حساب کاربری دارید؟
                  <button
                    onClick={handleLoginClick}
                    className="text-[#D9D9D9] cursor-pointer font-[vazirmatn] font-extralight text-[24px] px-3 transition duration-200 ease-in-out hover:text-green-600"
                  >
                    ورود
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Left Side (Login) */}
        <div
          className={`md:w-48/100 sm:w-full ${
            !isLogin ? "w-0" : "w-full"
          } flex justify-center items-center relative`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="login1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <object
                data="/src/assets/signup.svg"
                type="image/svg+xml"
                className={`md:w-[480px] md:h-[590px] sm:w-[300px] sm:h-[450px] pointer-events-none w-0 h-0  ${SignImg}`}
              />
            </motion.div>
            {isLogin && (
              <motion.div
                key="login1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-96 p-6 rounded-lg"
              >
                <LoginForm />
                <div className="text-center md:w-full sm:w-8/10 text-[#D9D9D9] font-[vazirmatn] mt-8 text-[24px] font-bold text-sm">
                  حساب کاربری ندارید؟
                  <button
                    onClick={handleSignupClick}
                    className="text-[#D9D9D9] cursor-pointer font-[vazirmatn] font-extralight text-[24px] px-3 transition duration-200 ease-in-out hover:text-blue-600"
                  >
                    ثبت نام
                  </button>
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
