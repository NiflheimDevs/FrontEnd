import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import {forgetPasswordSendOTP , forgetPasswordVerifyOTP} from "../../API";
import {errorMapper} from "../../pages/Error/Error";
import {useNotification} from "../../Notification/NotificationProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ChangePassSessions,ChangePassPermission } from "../../store/slices/authSlice";

        

const MobileVerifyforgetpass = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const [token, setTokens] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(120); 
    const [isScaled, setIsScaled] = useState(false);
    const SessionID = useSelector((state: RootState) => state.auth.SessionID);
    const Phone = useSelector((state: RootState) => state.auth.Phone);
    const { error: notifyError, success: notifySuccess } = useNotification();

    useEffect(() => {
        if (timeLeft === 0) return; 
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); 
        }, 1000); 

        return () => clearInterval(timerId); 
    }, [timeLeft]);

    
    useEffect(() => {
        if (timeLeft === 0) {
            const intervalId = setInterval(() => {
                setIsScaled((prev) => !prev);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60); 
    const seconds = timeLeft % 60; 

    const handleTimeOut = async () => {
        try {
            const response = await forgetPasswordSendOTP({
                phonenumber: Phone?.toString() ?? ""
            });            
            const sessionData = {
                SessionID: response,
                Phone: Phone
            }
            dispatcher(ChangePassSessions(sessionData));
            notifySuccess(`کد تایید به شماره ${Phone} ارسال شد`);
            setTimeLeft(120);
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
    const handleCompleteClick = async () => {
        try {
            const response = await forgetPasswordVerifyOTP({
                sessionid: SessionID?.toString() ?? "",
                code: token,
            });
            const sessionData = {
                SessionID: response
            }

            notifySuccess(`ورود شما با موفقیت انجام شد`);
            dispatcher(ChangePassPermission(sessionData));
            navigate('/ResetPass');
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
        
    return (
        <div className="flex h-screen w-full text-white flex-col bg-gradient-to-r from-[#18334F] to-[#3674B5] justify-center items-center overflow-hidden">
                <AnimatePresence mode="sync">
                    <div className="flex w-fit h-fit">
                        <motion.div
                            key="verify1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <object
                                data="/src/assets/Otp_B.svg"
                                type="image/svg+xml"
                                className={`md:w-[540px] sm:w-[400px] pointer-events-none w-[330px] h-fit`}
                            />
                        </motion.div>
                    </div>
                    
                    <div className="flex w-fit h-fit ltr mt-20 justify-center">
                        <motion.div
                            key="verify2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <p className="text-white text-center mx-[10px] mb-3 font-[vazirmatn] font-semibold md:text-[24px] sm:text-[22px] text-[20px]">
                                کد تایید پیامک شده را وارد کنید
                            </p>
                            <OtpInput
                                value={token}
                                onChange={setTokens}
                                numInputs={5}
                                containerStyle={"w-full md:mt-5 sm:mt-5 mt-7 justify-center items-center flex"}
                                inputType="tel"
                                inputStyle={"flex md:h-[43px] sm:h-[46px] h-[30px] md:scale-135 sm:scale-135 scale-200 font-[vazirmatn] font-normal md:text-[33px] sm:text-[33px] text-[24px] text-black text-center bg-gray-300 rounded-[18px] border-2 border-gray-300 transition-all ease-in-out duration-300 shadow-md focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg md:mx-[15px] sm:mx-[15px] mx-[17px]"}
                                renderInput={(props) => <input {...props} />}
                            />
                        </motion.div>
                    </div>
                    
                    <div className={`flex w-fit h-fit flex-row md:mt-8 sm:mt-8 mt-10 justify-center ${timeLeft != 0 ? "" : "ring-2 p-2 rounded-2xl"}`}>
                        <motion.div
                            key="verify3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <div className="flex flex-row w-fit h-fit mx-4">
                                {timeLeft != 0 ?
                                <p className={`w-fit text-right md:text-[20px] sm:text-[18px] text-[16px] text-white font-[vazirmatn] font-normal`}>
                                    دریافت مجدد کد
                                </p>
                                :
                                <button className={`cursor-pointer w-fit h-fit`}
                                    onClick={handleTimeOut}>   
                                    <p className={`w-fit text-right md:text-[20px] sm:text-[18px] text-[16px] text-white font-[vazirmatn] font-normal`}>
                                        دریافت مجدد کد
                                    </p>
                                </button>
                                }
                            </div>
                            
                        </motion.div>
                        <motion.div
                            key="verify4"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            
                            <div className="flex w-fit h-fit ml-1.5 text-white font-[vazirmatn] md:text-[20px] sm:text-[18px] text-[16px] font-normal">
                                <div>
                                    {timeLeft != 0 
                                        ? <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
                                        : <h2></h2>
                                    }
                                </div>
                            </div>
                            
                        </motion.div>
                        <motion.div
                            key="verify5"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            
                            <div className={`flex w-fit h-fit transition-all ${isScaled ? "scale-103" : "scale-100"}`}>
                                { timeLeft != 0 ?
                                <object
                                data="/src/assets/Clock.svg"
                                type="image/svg+xml"
                                className="w-6.5 h-6.5 pointer-events-none flex"
                                />
                                : 
                                <button className={`cursor-pointer w-fit h-fit hover:scale-115 transition-all duration-200 ease-in-out ${isScaled ? "scale-110" : "scale-100"}`}
                                    onClick={handleTimeOut}>
                                    <object
                                    data="/src/assets/Clock_B.svg"
                                    type="image/svg+xml"
                                    className="w-6.5 h-6.5 pointer-events-none flex transform origin-center"
                                    tabIndex={-1}
                                    />
                                </button>
                                }
                            </div>
                            
                        </motion.div>
                    </div>

                    <div className="flex w-fit h-fit my-3">
                        <motion.div
                            key="verify6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            
                            <button className={`w-full transition duration-200 ease-in-out rounded-[20px] mt-5 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${!(token.length === 5) ? "opacity-60" : "hover:bg-blue-600  cursor-pointer "}`}
                                disabled={!(token.length === 5) ? true : false}
                                onClick={handleCompleteClick}>
                                <p className="text-white w-80 font-[vazirmatn] font-extralight">
                                    ادامه
                                </p>
                            </button>
                        </motion.div>
                    </div>
                </AnimatePresence>
        </div>
    );
};

export default MobileVerifyforgetpass;


