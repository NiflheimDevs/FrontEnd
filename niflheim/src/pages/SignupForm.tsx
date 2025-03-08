import React from "react";
import {useState} from "react";

const SignupForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  
  const [showPassword2, setShowPassword2] = useState(false);

  const [isValidUser, setIsValidUser] = useState<boolean | null>(null); 
  const [isValidPhone, setIsValidPhone] = useState<boolean | null>(null); 
  const [isValidPass, setIsValidPass] = useState<boolean | null>(null); 
  const [isValidPassRepeat, setIsValidPassRepeat] = useState<boolean | null>(null); 
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const validateUsername = (value) => {
    if (!value) {
      return false;
    } else if (value.length < 8) {
      return false;
    } else if (value.length > 16) {
      return false;
    }  else if (!/\d/.test(value)) {
      return false;
    } else if (!/[A-Z]/.test(value)) {
      return false;
    } else if (!/[a-z]/.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  
  const validatePassword = (value) => {
    if (!value) {
      return false;
    } else if (value.length < 8) {
      return false;
    } else if (!/\d/.test(value)) {
      return false;
    } else if (!/[A-Z]/.test(value)) {
      return false;
    } else if (!/[a-z]/.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const validatePasswordRepeat = (value) => {
    if (value != password) {
      return false;
    } else {
      return true;
    }
  };

  const validatePhone = (value) => {
    if (!value) {
      return false;
    } else if (!/^09[0-9]{9}$/.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPass(validatePassword(value));
  };

  const handleChangePassRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordRepeat(value);
    setIsValidPassRepeat(validatePasswordRepeat(value));
  };
  
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setIsValidUser(validateUsername(value));
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setIsValidPhone(validatePhone(value));
  };

  return (
    <div className="md:w-full sm:w-8/10">
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">
        ثبت نام
      </div>
      <div className="w-full rounded-2xl h-0.75 bg-green-500 mx-auto mt-2 mb-6"></div>

      {/* فیلد نام کاربری */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={handleChangeUser}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${isValidUser === false
            ? "focus:ring-3 ring-red-500"
            : isValidUser === true
            ? "focus:ring-3 ring-green-500"
            : "focus:ring-3 ring-gray-300"
            }`}
        />
        <object
          data="/src/assets/User.svg"
          type="image/svg+xml"
          className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* فیلد تلفن‌همراه */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="تلفن‌همراه"
          value={phone}
          onChange={handleChangePhone}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${isValidPhone === false
            ? "focus:ring-3 ring-red-500"
            : isValidPhone === true
            ? "focus:ring-3 ring-green-500"
            : "focus:ring-3 ring-gray-300"
            }`}
        />
        <object
          data="/src/assets/Phone.svg"
          type="image/svg+xml"
          className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* فیلد رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"} 
          placeholder="رمز عبور"
          value={password}
          onChange={handleChangePass}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${isValidPass === false
            ? "focus:ring-3 ring-red-500"
            : isValidPass === true
            ? "focus:ring-3 ring-green-500"
            : "focus:ring-3 ring-gray-300"
            }`}
        />
        <button onClick={() => setShowPassword1(!showPassword1)} className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2">
          <object
            data={showPassword1 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"} 
            type="image/svg+xml"
            className="w-6.5 h-6.5 pointer-events-none"
          />
        </button>
      </div>

      {/* فیلد تکرار رمز عبور */}
      <div className="relative w-full">
        <input
          type={showPassword2 ? "text" : "password"} 
          placeholder="تکرار رمز عبور"
          value={passwordRepeat}
          onChange={handleChangePassRepeat}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-3 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${isValidPassRepeat === false
            ? "focus:ring-3 ring-red-500"
            : isValidPassRepeat === true
            ? "focus:ring-3 ring-green-500"
            : "focus:ring-3 ring-gray-300"
            }`}
        />
        <button onClick={() => setShowPassword2(!showPassword2)} className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2">
          <object
            data={showPassword2 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"} 
            type="image/svg+xml"
            className="w-6.5 h-6.5 pointer-events-none"
          />
        </button>
      </div>

      {/* دکمه تایید و ادامه */}
      <button className="w-full cursor-pointer transition duration-200 ease-in-out rounded-[20px] mt-5 bg-[#3A7D44] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 hover:bg-green-600">
        <p className="text-white font-[vazirmatn] font-extralight">
          تایید و ادامه
        </p>
      </button>
    </div>
  );
};

export default SignupForm;