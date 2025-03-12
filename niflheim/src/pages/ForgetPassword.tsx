import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PhoneIcon from '/src/assets/Phone.svg';
import LadyPic from '/src/assets/ForgetPass2.svg';

const ForgetPassword = () => 
{
    const [phone, setPhone] = useState("");
    const [isValidPhone, setIsValidPhone] = useState<boolean | null>(null); 

    const validatePhone = (value) => 
    {
        if (!value) 
            {
                return false;
            } 
        else if (!/^09[0-9]{9}$/.test(value)) 
            {
                return false; 
            }
        else 
        {
            return true;
        }
    };
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const value = e.target.value;
        setPhone(value);
        setIsValidPhone(validatePhone(value));
    };


    return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#18334F] to-[#3674B5]">

        <div className="grid grid-cols-1 md:grid-cols-2 h-[100vh] w-[90%] max-w-full items-center p-8">
            {/* Right Side - Text */}

            <div className="flex flex-col justify-center text-center min-w-[100px]">                
                <h1 className="text-center md:w-full sm:w-8/10 text-[#D9D9D9] font-[vazirmatn] mt-8 text-[40px] font-bold text-sm">

                رمزت رو فراموش کردی؟ <br></br>
                برو لینکی که پیامک می‌شه رو دنبال کن 
                </h1>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="تلفن‌همراه"
                        value={phone}
                        onChange={handleChangePhone}
                        className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white  rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]
                            ${isValidPhone === false
                                ? "focus:ring-3 ring-red-500"
                                : isValidPhone === true
                                ? "focus:ring-3 ring-green-500"
                                : "focus:ring-3 ring-gray-300"
                            }`
                        }
                    />
                    <img
                        src={PhoneIcon}
                        alt="image/svg+xml"
                        className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-8 transform -translate-y-1/2"
                    />
                    <button className="w-full transition duration-20 ease-in-out cursor-pointer rounded-[20px] mt-3 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 hover:bg-blue-600">
                        <p className="text-white font-[vazirmatn] font-extralight">
                         تایید و ادامه
                        </p>
                    </button>
                </div>
      
            </div>
        
             {/* Left Side - SVG */}
            <div className="flex w-screen ">
                <object
                    data={LadyPic}
                    type="image/svg+xml" 
                    className={`flex md:w-[500px] sm:w-[440px] pointer-events-none w-[330px] h-fit `}
                />
            </div>
           
        </div>
            
    </div>
    );
};
export default ForgetPassword;
