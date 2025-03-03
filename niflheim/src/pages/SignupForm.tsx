import React, {useState} from "react";

const SignupForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <div>
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">
        ثبت نام
      </div>
      <div className="w-82 rounded-2xl h-0.75 bg-green-500 mx-auto mt-2 mb-6"></div>

      {/* فیلد ایمیل */}
      <div className="relative w-full">
        <input
          type="email"
          placeholder="ایمیل"
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <object
          data="/src/assets/Email.svg"
          type="image/svg+xml"
          className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* فیلد نام کاربری */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="نام کاربری"
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <object
          data="/src/assets/User.svg"
          type="image/svg+xml"
          className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* فیلد رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"} 
          placeholder="رمز عبور"
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <button onClick={() => setShowPassword1(!showPassword1)} className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <object
            data={showPassword1 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"} 
            type="image/svg+xml"
            className="w-6 h-6 pointer-events-none"
          />
        </button>
      </div>

      {/* فیلد تکرار رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword2 ? "text" : "password"} 
          placeholder="تکرار رمز عبور"
          className="w-full bg-[#E5E5E5] p-1.75 rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]"
        />
        <button onClick={() => setShowPassword2(!showPassword2)} className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <object
            data={showPassword2 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"} 
            type="image/svg+xml"
            className="w-6 h-6 pointer-events-none"
          />
        </button>
      </div>

      {/* دکمه تایید و ادامه */}
      <button className="w-full rounded-[18px] mt-5 bg-[#3A7D44] py-3 hover:bg-green-600 transition">
        <p className="text-white font-[vazirmatn] font-extralight">
          تایید و ادامه
        </p>
      </button>
    </div>
  );
};

export default SignupForm;