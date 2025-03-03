import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">ورود</div>
      <div className="w-82 rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-6"></div>

      <div className="relative w-full">
        <input 
          type="email" 
          placeholder="نام کاربری / ایمیل" 
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        /> 
        <object
          data="/src/assets/Email.svg"
          type="image/svg+xml"
          className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2" 
        />
      </div>
      
      <div className="relative w-full">
        <input 
          type="password" 
          placeholder="رمز عبور" 
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <object
          data="/src/assets/Password.svg"
          type="image/svg+xml"
          className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2" 
        />
      </div>
      
      <div className="text-right text-sm mt-5 mb-4">
        <a href="#" className="text-white font-[vazirmatn] font-thin hover:underline">رمز عبور خود را فراموش کردید؟</a>
      </div>
      
      <button className="w-full rounded-[18px] mt-3 bg-[#3674B5] py-3 hover:bg-blue-600 transition">
        <p className="text-white font-[vazirmatn] font-extralight">
          تایید و ادامه
        </p>
      </button>
    </div>
  );
};

export default LoginForm;

