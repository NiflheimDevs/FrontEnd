import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "react-otp-input";
import { useNotification } from "../../Notification/NotificationProvider";
import { PutPhoneVerifyOtp, PutPhoneSendOtp } from "../../API";
import { Profile } from "./types";
import { useState } from "react";
import React from "react";
import Clock from "../../assets/Clock.svg";
import Clock_B from "../../assets/Clock_B.svg";
import { errorMapper } from "../../pages/Error/Error";

interface OtpSectionProps {
  isScaled: boolean;
  setIsScaled: React.Dispatch<React.SetStateAction<boolean>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  showOtpSection: boolean;
  setShowOtpSection: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber: string;
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export default function OtpSection({
  showOtpSection,
  setShowOtpSection,
  phoneNumber,
  localProfile,
  setLocalProfile,
  timeLeft,
  setTimeLeft,
  isScaled,
  setIsScaled,
}: OtpSectionProps) {
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [token, setTokens] = useState<string>("");

  const HandleVerify = async () => {
    try {
      const phoneData = {
        code: token,
        sessionid: localProfile.SessionID,
      };
      await PutPhoneVerifyOtp(phoneData);
      notifySuccess(`شماره تماس شما با موفقیت تغییر کرد.`);
      setShowOtpSection(false);
      setTimeLeft(120);
      setTokens("");
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

  const handleTimeOut = async () => {
    try {
      const phoneData = {
        phone: phoneNumber,
      };
      const codeSession = await PutPhoneSendOtp(phoneData);
      setLocalProfile((prev) => ({ ...prev, SessionID: codeSession }));
      setTimeLeft(120);
      setIsScaled(false);
      notifySuccess("کد تایید ارسال شد");
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const otpSectionVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {showOtpSection && (
        <motion.div
          variants={otpSectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col sm:flex-row items-center my-4 w-full"
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <OtpInput
              value={token}
              onChange={setTokens}
              numInputs={5}
              containerStyle={
                "flex flex-wrap justify-center items-center w-full ltr"
              }
              inputType="tel"
              inputStyle={
                "flex md:h-[40px] sm:h-[35px] h-[35px] md:scale-139 sm:scale-135 scale-160 font-[vazirmatn] font-normal md:text-[28px] sm:text-[28px] text-[24px] text-black text-center bg-gray-300 rounded-[18px] border-2 border-gray-300 transition-all ease-in-out duration-300 shadow-md focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg md:mx-[15px] sm:mx-[15px] mx-[17px]"
              }
              renderInput={(props) => <input {...props} />}
            />
            <div
              className={`flex w-fit h-fit justify-center items-center transition-all mt-2`}
            >
              {timeLeft !== 0 ? (
                <img
                  src={Clock}
                  className="w-6.5 h-6.5 pointer-events-none flex"
                />
              ) : (
                <button
                  className={`cursor-pointer flex w-fit h-fit justify-center items-center hover:scale-105 transition-all duration-200 ease-in-out rounded-full
                  }`}
                  onClick={handleTimeOut}
                  tabIndex={9}
                >
                  <img
                    src={Clock_B}
                    className={`pointer-events-none flex transform duration-200 ease-in-out origin-center ${isScaled ? "scale-[85%]" : "scale-75"}`}
                  />
                </button>
              )}
              {timeLeft > 0 ? (
                <span className="text-gray-600 font-[vazirmatn] mr-2">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
              ) : (
                <></>
              )}
            </div>
            <button
              className={`w-[160px] max-w-xs flex gap-2 flex-row justify-center items-center transition duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
                token.length !== 5
                  ? "opacity-60"
                  : "hover:bg-blue-600 cursor-pointer"
              }`}
              disabled={token.length !== 5}
              onClick={HandleVerify}
              tabIndex={10}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-check-big"
              >
                <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <p className="text-white font-[vazirmatn] font-extralight">
                تغییر شماره
              </p>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
