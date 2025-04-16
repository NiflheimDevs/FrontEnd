import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/slices/authSlice";
import { signupSendOTP } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../../pages/Error/Error";
import { AnimatePresence, motion } from "framer-motion";
import Eye from "../../assets/Eye.svg";
import Eye_Off from "../../assets/Eye_off.svg";
import User from "../../assets/User.svg";
import Phone from "../../assets/Phone.svg";

const SignupForm = () => {
  const navigate = useNavigate();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [phoneErrors, setPhoneErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordRepeatErrors, setPasswordRepeatErrors] = useState<string[]>(
    []
  );
  const dispatcher = useDispatch();

  const handleSignupClick = async () => {
    try {
      const response = await signupSendOTP({
        phonenumber: phone,
        username: username,
        password: password,
      });

      const sessionData = {
        SessionID: response,
        Phone: phone,
        Password: password,
        Username: username,
      };
      dispatcher(authenticate(sessionData));
      notifySuccess(`کد تایید به شماره ${phone} ارسال شد`);
      navigate("/verify");
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

  const validateUsername = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      return errors;
    }
    if (value.length < 2) {
      errors.push("نام کاربری باید حداقل 2 کاراکتر باشد");
    }
    if (value.length > 32) {
      errors.push("نام کاربری نمی‌تواند بیشتر از 32 کاراکتر باشد");
    }
    return errors;
  };

  const validatePhone = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      return errors;
    }
    if (!/^09[0-9]{9}$/.test(value)) {
      errors.push("شماره موبایل باید با 09 شروع شده و 11 رقم باشد");
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

  const validatePasswordRepeat = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      return errors;
    }
    if (value !== password) {
      errors.push("تکرار رمز عبور با رمز عبور مطابقت ندارد");
    }
    return errors;
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameErrors(validateUsername(value));
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setPhone(value);
      setPhoneErrors(validatePhone(value));
    }
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
    // به‌روزرسانی ولیدیشن تکرار رمز عبور
    if (passwordRepeat) {
      setPasswordRepeatErrors(validatePasswordRepeat(passwordRepeat));
    }
  };

  const handleChangePassRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordRepeat(value);
    setPasswordRepeatErrors(validatePasswordRepeat(value));
  };

  return (
    <form
      className="md:w-full sm:w-8/10"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignupClick();
      }}
    >
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">
        ثبت نام
      </div>
      <div className="w-full rounded-2xl h-0.75 bg-green-500 mx-auto mt-2 mb-6"></div>

      <div className="mb-2 relative z-[999999]">
        <AnimatePresence>
          {usernameErrors.length > 0 && (
            <motion.ul
              key="username-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] list-disc pr-4"
            >
              {usernameErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phoneErrors.length > 0 && (
            <motion.ul
              key="phone-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] list-disc pr-4"
            >
              {phoneErrors.map((error, index) => (
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
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] list-disc pr-4"
            >
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {passwordRepeatErrors.length > 0 && (
            <motion.ul
              key="password-repeat-errors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm text-right mt-1 font-[vazirmatn] list-disc pr-4"
            >
              {passwordRepeatErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* فیلد نام کاربری */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={handleChangeUser}
          autoComplete="new-password"
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
            usernameErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : username
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

      {/* فیلد تلفن‌همراه */}
      <div className="relative w-full">
        <input
          type="number"
          placeholder="تلفن‌همراه"
          value={phone}
          maxLength={11}
          onChange={handleChangePhone}
          autoComplete="new-password"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] no-spinner ${
            phoneErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : phone
                ? "focus:ring-3 ring-green-500"
                : "focus:ring-3 ring-gray-300"
          }`}
        />
        <img
          src={Phone}
          className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
        />
      </div>

      {/* فیلد رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"}
          placeholder="رمز عبور"
          value={password}
          onChange={handleChangePass}
          autoComplete="new-password"
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
            passwordErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : password
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

      {/* فیلد تکرار رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword2 ? "text" : "password"}
          placeholder="تکرار رمز عبور"
          value={passwordRepeat}
          onChange={handleChangePassRepeat}
          autoComplete="new-password"
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
            passwordRepeatErrors.length > 0
              ? "focus:ring-3 ring-red-500"
              : passwordRepeat
                ? "focus:ring-3 ring-green-500"
                : "focus:ring-3 ring-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword2(!showPassword2)}
          className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
        >
          <img
            src={showPassword2 ? Eye_Off : Eye}
            className="w-6.5 h-6.5 pointer-events-none"
            tabIndex={-1}
          />
        </button>
      </div>

      {/* دکمه تایید و ادامه */}
      <button
        type="submit"
        className={`w-full transition duration-200 ease-in-out rounded-[20px] mt-5 bg-[#3A7D44] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
          usernameErrors.length > 0 ||
          phoneErrors.length > 0 ||
          passwordErrors.length > 0 ||
          passwordRepeatErrors.length > 0 ||
          !username ||
          !phone ||
          !password ||
          !passwordRepeat
            ? "opacity-60"
            : "hover:bg-green-600 cursor-pointer"
        }`}
        disabled={
          usernameErrors.length > 0 ||
          phoneErrors.length > 0 ||
          passwordErrors.length > 0 ||
          passwordRepeatErrors.length > 0 ||
          !username ||
          !phone ||
          !password ||
          !passwordRepeat
        }
      >
        <p className="text-white font-[vazirmatn] font-extralight">
          تایید و ادامه
        </p>
      </button>
    </form>
  );
};

export default SignupForm;
