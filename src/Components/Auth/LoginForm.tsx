import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../../pages/Error/Error";
import Eye from "../../assets/Eye.svg";
import Eye_Off from "../../assets/Eye_off.svg";
import User from "../../assets/User.svg";
import { AnimatePresence, motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [showPassword1, setShowPassword1] = useState(false);
  const [Password, setPassword] = useState("");
  const [Identifier, setIdentifier] = useState("");
  const [identifierErrors, setIdentifierErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleLogin = async () => {
    try {
      await Login({
        identifier: Identifier,
        password: Password,
      });
      notifySuccess(`ورود شما با موفقیت انجام شد`);
      navigate("/dashboard");
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        const allErrors = errorData.errors;
        const errorMessages = allErrors.map((err: any) => errorMapper(err));
        notifyError(`${errorMessages.join(" ")}`);
      } else {
        notifyError(`${errorMapper(errorData)}`);
      }
    }
  };

  const validateIdentifier = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      return errors;
    }
    if (value.length < 2) {
      errors.push("نام کاربری یا تلفن باید حداقل 2 کاراکتر باشد");
    }
    if (value.length > 32) {
      errors.push("نام کاربری یا تلفن نمی‌تواند بیشتر از 32 کاراکتر باشد");
    }
    return errors;
  };

  const validatePassword = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      return errors;
    }
    if (value.length < 8) {
      errors.push("رمز عبور باید حداقل 8 کاراکتر باشد");
    }
    if (!/\d/.test(value)) {
      errors.push("رمز عبور باید شامل حداقل یک عدد باشد");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("رمز عبور باید شامل حداقل یک حرف بزرگ باشد");
    }
    if (!/[a-z]/.test(value)) {
      errors.push("رمز عبور باید شامل حداقل یک حرف کوچک باشد");
    }
    return errors;
  };

  const handleChangeIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    setIdentifierErrors(validateIdentifier(value));
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
  };

  return (
    <form
      className="md:w-full sm:w-8/10"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">
        ورود
      </div>
      <div className="w-full rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-3"></div>
      <div className="mb-2">
        <AnimatePresence>
          {identifierErrors.length > 0 && (
            <motion.ul
              key="identifier-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
            >
              {identifierErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {passwordErrors.length > 0 && (
            <motion.ul
              key="password-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn]"
            >
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="نام کاربری / تلفن‌همراه"
          value={Identifier}
          onChange={handleChangeIdentifier}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
            identifierErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : Identifier
                ? "focus:ring-3 ring-green-500"
                : "focus:ring-3 ring-gray-300"
          }`}
        />
        <img
          src={User}
          className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
        />
      </div>

      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"}
          placeholder="رمز عبور"
          value={Password}
          onChange={handleChangePass}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
            passwordErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : Password
                ? "focus:ring-3 ring-green-500"
                : "focus:ring-3 ring-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword1(!showPassword1)}
          className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
        >
          <img
            src={showPassword1 ? Eye_Off : Eye}
            className="w-6.5 h-6.5 pointer-events-none"
            tabIndex={-1}
          />
        </button>
      </div>

      <div className="text-right text-sm mt-5 mb-4">
        <Link
          to="/forgetpassword"
          className="text-white font-[vazirmatn] font-thin transition duration-200 ease-in-out hover:underline"
        >
          رمز عبور خود را فراموش کردید؟
        </Link>
      </div>

      <button
        className={`w-full transition duration-200 ease-in-out rounded-[20px] mt-3 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
          identifierErrors.length > 0 ||
          passwordErrors.length > 0 ||
          !Identifier ||
          !Password
            ? "opacity-60"
            : "hover:bg-blue-600 cursor-pointer"
        }`}
        type="submit"
        disabled={
          identifierErrors.length > 0 ||
          passwordErrors.length > 0 ||
          !Identifier ||
          !Password
        }
      >
        <p className="text-white font-[vazirmatn] font-extralight" tabIndex={0}>
          تایید و ادامه
        </p>
      </button>
    </form>
  );
};

export default LoginForm;
