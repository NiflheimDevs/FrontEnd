import React from "react";
import {useState} from "react";


const LoginForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  return (
    <div className="md:w-full sm:w-8/10">
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">ورود</div>
      <div className="w-full rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-6"></div>

      <div className="relative w-full">
        <input 
          type="email" 
          placeholder="نام کاربری / ایمیل" 
          className="w-full bg-[#E5E5E5] py-1.75 px-3 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        /> 
        <object
          data="/src/assets/Email.svg"
          type="image/svg+xml"
          className="w-6.5 h-6.5 absolute left-3 top-1/2 transform -translate-y-1/2" 
        />
      </div>
      
      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"} 
          placeholder="رمز عبور"
          className="w-full bg-[#E5E5E5] py-1.75 px-3 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <button onClick={() => setShowPassword1(!showPassword1)} className="cursor-pointer hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2">
          <object
            data={showPassword1 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"} 
            type="image/svg+xml"
            className="w-6.5 h-6.5 pointer-events-none"
          />
        </button>
      </div>
      
      <div className="text-right text-sm mt-5 mb-4">
        <a href="#" className="text-white font-[vazirmatn] font-thin hover:underline">رمز عبور خود را فراموش کردید؟</a>
      </div>
      
      <button className="w-full cursor-pointer rounded-[20px] mt-3 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 hover:bg-blue-600 transition">
        <p className="text-white font-[vazirmatn] font-extralight">
          تایید و ادامه
        </p>
      </button>
    </div>
  );
};

export default LoginForm;

