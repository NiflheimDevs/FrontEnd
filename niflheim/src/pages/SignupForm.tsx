import React from "react";

const SignupForm = () => {
  return (
    <div>
      <div className="text-2xl font-semibold text-center mb-4">ثبت نام</div>
      <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-6"></div>
      
      <input 
        type="text" 
        placeholder="نام کاربری" 
        className="w-full bg-gray-700 p-2 rounded-md mb-4 placeholder-gray-300 text-white"
      />
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
      
      <button className="w-full bg-green-500 py-2 rounded-md hover:bg-green-600 transition">
        ثبت نام
      </button>
    </div>
  );
};

export default SignupForm;