import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChangePassSessions } from "../../store/slices/authSlice";
import PhoneIcon from "/src/assets/Phone.svg";
import LadyPic from "/src/assets/ForgetPass.svg";
import React from "react";
import { forgetPasswordSendOTP } from "../../API";
import { errorMapper } from "../../pages/Error/Error";
import { useNotification } from "../../Notification/NotificationProvider";

const ForgetPassword = () => {
  const [phone, setPhone] = useState("");
  const [phoneErrors, setPhoneErrors] = useState<string[]>([]);
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [ispic, _setIspic] = useState(true);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^[0-9]*$/.test(value) && value.length <= 11)) {
      setPhone(value);
      setPhoneErrors(validatePhone(value));
    }
  };

  const handleCompleteClick = async () => {
    try {
      const response = await forgetPasswordSendOTP({
        phonenumber: phone,
      });
      const sessionData = {
        Phone: phone,
        SessionID: response,
      };
      notifySuccess(`کد تایید به شماره ${phone} ارسال شد`);
      dispatcher(ChangePassSessions(sessionData));
      navigate("/ForgetPassVerify");
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

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-r from-[#18334F] to-[#3674B5] z-[-1]"></div>
      <div className="w-screen h-screen p-8 gap-[10vw] flex flex-col sm:py-100 md:py-0 py-0 md:flex-row justify-center items-center bg-gradient-to-r from-[#18334F] to-[#3674B5]">
        {/* Form Container */}
        <div
          className={`${!ispic ? "w-0" : "w-full"} flex justify-center items-center relative`}
        >
          <AnimatePresence mode="wait">
            {ispic && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCompleteClick();
                }}
                className="flex flex-col justify-center items-center text-center w-full max-w-[400px] md:w-[80%] relative"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4 text-[#D9D9D9]">
                    رمزت رو فراموش کردی؟ <br />
                    شمارت رو وارد کن تا کمکت کنم
                  </div>
                  <div className="w-full rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-6"></div>
                </motion.div>

                <div className="mb-2 relative z-[999999]">
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
                </div>

                <div className="relative w-full max-w-[400px]">
                  <input
                    type="tel"
                    placeholder="تلفن‌همراه"
                    value={phone}
                    onChange={handleChangePhone}
                    autoComplete="new-password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn] ${
                      phoneErrors.length > 0
                        ? "ring-red-500"
                        : phone
                          ? "ring-green-500"
                          : "ring-gray-300"
                    }`}
                  />
                  <img
                    src={PhoneIcon}
                    className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2"
                    tabIndex={-1}
                  />
                </div>

                <button
                  className={`w-full max-w-[400px] transition duration-200 ease-in-out rounded-[20px] mt-3 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
                    phoneErrors.length > 0 || !phone
                      ? "opacity-60"
                      : "hover:bg-blue-600 cursor-pointer"
                  }`}
                  disabled={phoneErrors.length > 0 || !phone}
                  onClick={handleCompleteClick}
                >
                  <p className="text-white font-[vazirmatn] font-extralight">
                    تایید و ادامه
                  </p>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center w-6/10 items-center mt-8 md:mt-0"
        >
          <img
            src={LadyPic}
            className="pointer-events-none md:h-[480px] w-auto sm:h-[400px] md:flex sm:flex hidden"
          />
        </motion.div>
      </div>
    </>
  );
};

export default ForgetPassword;
