import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import LadyPic from "/src/assets/Changepass.svg";
import React from "react";
import { ChangePass, logout } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../Error/Error";
import { RootState } from "../../store/store";

const ChangePasswordManually = () => {
	const { error: notifyError, success: notifySuccess } = useNotification();
	const [ispic, _setIspic] = useState(true);
	const navigate = useNavigate();
	const [showPassword0, setShowPassword0] = useState(false); 
	const [showPassword1, setShowPassword1] = useState(false); 
	const [showPassword2, setShowPassword2] = useState(false); 
	const [isValidPass, setIsValidPass] = useState<boolean | null>(null); 
	const [isValidPassRepeat, setIsValidPassRepeat] = useState<boolean | null>(null); 
	const [passwordold, setPasswordold] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const SessionID = useSelector((state: RootState) => state.auth.SessionID);

	const validatePassword = (value:any) => {
	  if (!value) {
      return false;
    } else if (value.length < 8) {
      return false;
    } else if (!/\d/.test(value)) {
      return false;
    } else if (!/[A-Z]/.test(value)) {
      return false;
    } else if (!/[a-z]/.test(value)) {
      return false;
    } else {
      return true;
    }
  };
	const validatePasswordRepeat = (value:any) => {
    if (value != password) {
      return false;
    } else {
      return true;
    }
  };
	const handleChangePassOld = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordold(value);
    setIsValidPass(validatePassword(value));
  };
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPass(validatePassword(value));
  };
  const handleChangePassRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordRepeat(value);
    setIsValidPassRepeat(validatePasswordRepeat(value));
  };
	const handleCompleteClick = async () => {
        try {
            await ChangePass({
              bearer: SessionID?.toString() ?? "", 
              new_password: password,
              old_password: passwordold
            });            
            notifySuccess(`رمز عبور شما با موفقیت تغییر کرد`);
            logout();
            navigate('/auth');
          } 
          catch (error:any) {
            const errorData = error;
          if (errorData.tag && errorData.errors?.length > 0) {
            const allErrors = errorData.errors; 
            const errorMessages = allErrors.map((err:any) => errorMapper(err));
            notifyError(`${errorMessages.join(" ")}`);
          } 
          else {
            notifyError(`${errorMapper(errorData)}`);
          }
        }
    };
	const handleCancelClick = () => {
        navigate('/dashboard', { state: { referrer: 'ChangePasswordManually' } });
    };
	
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="w-screen h-screen p-8 gap-[10vw] flex flex-col sm:py-100 md:py-0 py-0 md:flex-row justify-center items-center bg-gradient-to-r from-[#3674B5] to-[#18334F]"
      >
        {/* Form Container */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`${
            !ispic ? "w-0" : "w-full"
          } flex justify-center items-center relative`}
        >
          <div className="flex flex-col justify-center items-center text-center w-full max-w-[400px] md:w-[80%] relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4 text-[#D9D9D9]">
                رمز جدیدت رو وارد کن
              </div>
              <div className="w-full rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-6"></div>
            </motion.div>

            {/* فیلد رمز عبور قدیمی */}
            <div className="relative w-full">
              <input
                type={showPassword0 ? "text" : "password"}
                tabIndex={1}
                placeholder="رمز عبور قدیمی"
                value={passwordold}
                onChange={handleChangePassOld}
                className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${
                  isValidPass === false
                    ? "focus:ring-3 ring-red-500"
                    : isValidPass === true
                    ? "focus:ring-3 ring-green-500"
                    : "focus:ring-3 ring-gray-300"
                }`}
              />
              <button
                onClick={() => setShowPassword0(!showPassword0)}
                className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <object
                  data={
                    showPassword0
                      ? "/src/assets/Eye_off.svg"
                      : "/src/assets/Eye.svg"
                  }
                  type="image/svg+xml"
                  className="w-6.5 h-6.5 pointer-events-none"
                />
              </button>
            </div>

            {/* فیلد رمز عبور */}
            <div className="relative w-full">
              <input
                type={showPassword1 ? "text" : "password"}
                tabIndex={2}
                placeholder="رمز عبور"
                value={password}
                onChange={handleChangePass}
                className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${
                  isValidPass === false
                    ? "focus:ring-3 ring-red-500"
                    : isValidPass === true
                    ? "focus:ring-3 ring-green-500"
                    : "focus:ring-3 ring-gray-300"
                }`}
              />
              <button
                onClick={() => setShowPassword1(!showPassword1)}
                className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <object
                  data={
                    showPassword1
                      ? "/src/assets/Eye_off.svg"
                      : "/src/assets/Eye.svg"
                  }
                  type="image/svg+xml"
                  className="w-6.5 h-6.5 pointer-events-none"
                />
              </button>
            </div>

            {/* فیلد تکرار رمز عبور */}
            <div className="relative w-full">
              <input
                type={showPassword2 ? "text" : "password"}
                tabIndex={3}
                placeholder="تکرار رمز عبور"
                value={passwordRepeat}
                onChange={handleChangePassRepeat}
                className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${
                  isValidPassRepeat === false
                    ? "focus:ring-3 ring-red-500"
                    : isValidPassRepeat === true
                    ? "focus:ring-3 ring-green-500"
                    : "focus:ring-3 ring-gray-300"
                }`}
              />
              <button
                onClick={() => setShowPassword2(!showPassword2)}
                className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <object
                  data={
                    showPassword2
                      ? "/src/assets/Eye_off.svg"
                      : "/src/assets/Eye.svg"
                  }
                  type="image/svg+xml"
                  className="w-6.5 h-6.5 pointer-events-none"
                />
              </button>
            </div>
            <div className="flex w-full justify-between mt-6">
              <button 
                className="w-[40%] max-w-[150px] transition duration-200 ease-in-out cursor-pointer rounded-[20px] bg-[#D9D9D9] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-2 hover:bg-gray-400 focus:bg-gray-400"
                tabIndex={5}
                onClick={handleCancelClick}
              >
                <p className="text-black font-[vazirmatn] font-medium">
                  بازگشت
                </p>
              </button>
              <button 
                className={`w-[60%] max-w-[250px] transition duration-200 ease-in-out cursor-pointer rounded-[20px] bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-4 ${!(isValidPassRepeat === true && isValidPass === true) ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600 focus:bg-blue-600"}`}
                disabled={!(isValidPassRepeat === true && isValidPass === true)}
                tabIndex={4}
                onClick={handleCompleteClick}
              >
                <p className="text-white font-[vazirmatn] font-medium">
                  تایید و ادامه
                </p>
              </button>
            </div>
        </div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center w-1/2 items-center mt-8 md:mt-0 md:ml-15"
        >
          <object
            data={LadyPic}
            type="image/svg+xml"
            className="pointer-events-none items-center md:h-auto w-[350px] sm:h-[200px] md:flex sm:flex hidden"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ChangePasswordManually;
