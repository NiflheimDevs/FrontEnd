import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div className="text-2xl font-semibold text-center mb-4">ورود</div>
      <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 mb-6"></div>
      
      <input 
        type="email" 
        placeholder="ایمیل" 
        className="w-full bg-gray-700 p-2 rounded-md mb-4 placeholder-gray-300 text-white"
      />
      <input 
        type="password" 
        placeholder="رمز عبور" 
        className="w-full bg-gray-700 p-2 rounded-md mb-4 placeholder-gray-300 text-white"
      />
      
      <div className="text-center text-sm mb-4">
        <a href="#" className="text-blue-400 hover:underline">فراموشی رمز عبور؟</a>
      </div>
      
      <button className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 transition">
        ورود
      </button>
    </div>
  );
};

export default LoginForm;

