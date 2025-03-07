import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { InputOtp  } from 'primereact/inputotp';
        

const MobileVerify = () => {
    const [token, setTokens] = useState<string>("");
    const customInput = ({ events, props }) => {
        return (
          <input
            {...events} 
            {...props}
            type="text"
            className="custom-otp-input md:md-width sm:sm-width width"
            dir="ltr"
          />
        );
      };
    
    const [timeLeft, setTimeLeft] = useState(120); 

    useEffect(() => {
        if (timeLeft === 0) return; 
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1); 
        }, 1000); 

        return () => clearInterval(timerId); 
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60); 
    const seconds = timeLeft % 60; 

    const handleTimeOut = () => {
        setTimeLeft(120)
    }
        
    return (
        <div className="flex h-screen w-full text-white flex-col bg-gradient-to-r from-[#3A7D44] to-[#172533] justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <div className="flex w-fit h-fit">
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <object
                                data="/src/assets/Otp.svg"
                                type="image/svg+xml"
                                className={`md:w-[540px] sm:w-[400px] pointer-events-none w-[330px] h-fit`}
                            />
                        </motion.div>
                    </div>
                    
                    <div className="flex w-fit h-fit ltr mt-20">
                        <style scoped>
                            {`
                                .md-width{
                                    width: 62px;
                                    height: 70px;
                                }

                                .sm-width{
                                    width: 60px;
                                    height: 65px;
                                }

                                .width{
                                    width: 55px;
                                    height: 60px;
                                }

                                .custom-otp-input {
                                    font-size: 36px;
                                    border: 0 none;
                                    appearance: none;
                                    text-align: center;
                                    color: black;
                                    transition: all 0.2s;
                                    background: #D9D9D9;
                                    margin-left: 10px;
                                    margin-right: 10px;
                                    border-radius: 18px; 
                                    border: 2px solid #d1d5db; 
                                    transition: all 0.3s ease-in-out;
                                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                                    direction: ltr;
                                }

                                .custom-otp-input:focus {
                                    outline: none;
                                    border-color: #3b82f6; 
                                    background: white;
                                    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
                                }
                            `}
                        </style>
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <p className="text-white text-center mx-[10px] mb-3 font-[vazirmatn] font-semibold md:text-[24px] sm:text-[22px] text-[20px]">
                                کد تایید پیامک شده را وارد کنید
                            </p>

                            <InputOtp 
                                value={token} 
                                onChange={(e) => setTokens(e.value?.toString() ?? "")} 
                                inputTemplate={customInput}
                                dir="ltr"
                                integerOnly
                            />
                        </motion.div>
                    </div>
                    
                    <div className="flex w-fit h-fit flex-row mt-5 justify-center">
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            <div className="flex w-fit h-fit mx-4">
                                <p className={`w-fit text-right md:text-[20px] sm:text-[18px] text-[16px] text-white font-[vazirmatn] font-normal`}>
                                    زمان باقی‌مانده تا دریافت مجدد کد
                                </p>
                            </div>
                            
                        </motion.div>
                        <motion.div
                            key="login"
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
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            
                            <div className="flex w-fit h-fit">
                                { timeLeft != 0 ?
                                <object
                                data="/src/assets/Clock.svg"
                                type="image/svg+xml"
                                className="w-6.5 h-6.5 pointer-events-none flex"
                                />
                                : 
                                <button className="cursor-pointer w-fit h-fit hover:scale-115 transition-all duration-200 ease-in-out"
                                    onClick={handleTimeOut}>
                                    <object
                                    data="/src/assets/Clock_G.svg"
                                    type="image/svg+xml"
                                    className="w-6.5 h-6.5 pointer-events-none flex transform origin-center"
                                    />
                                </button>
                                }
                            </div>
                            
                        </motion.div>
                    </div>

                    <div className="flex w-fit h-fit my-4">
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                            
                            <button className="w-full cursor-pointer transition duration-200 ease-in-out rounded-[20px] mt-5 bg-[#3A7D44] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 hover:bg-green-600">
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

export default MobileVerify;
