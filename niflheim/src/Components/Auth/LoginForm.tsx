import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../../pages/Error/Error";

const LoginForm = () => {
  const navigate = useNavigate();
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [showPassword1, setShowPassword1] = useState(false);
  const [Password, setPassword] = useState("");
  const [Identifier, setIdentifier] = useState("");
  const [isValidIdentifier, setIsValidIdentifier] = useState<boolean | null>(
    null
  );
  const [isValidPass, setIsValidPass] = useState<boolean | null>(null);

  const handleLogin = async () => {
    try {
      await Login({
        identifier: Identifier,
        password: Password,
      });
      notifySuccess(`ورود شما با موفقیت انجام شد`);
      navigate("/dashboard");
    } catch (error:any) {
      const errorData = error;
      // console.log();
      if (errorData.tag && errorData.errors?.length > 0) {
        const allErrors = errorData.errors;

        const errorMessages = allErrors.map((err:any) => errorMapper(err));
        notifyError(`${errorMessages.join(" ")}`);
      } else {
        notifyError(`${errorMapper(errorData)}`);
      }
    }
  };

  const handleChangeIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    setIsValidIdentifier(validateIdentifier(value));
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsValidPass(validatePassword(value));
  };

  const validatePassword = (value:any) => {
    if (!value) {
      return null;
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

  const validateIdentifier = (value:any) => {
    if (!value) {
      return null;
    } else if (value.length < 2) {
      return false;
    } else if (value.length > 32) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="md:w-full sm:w-8/10">
      <div className="text-2xl font-semibold font-[vazirmatn] text-center mb-4">
        ورود
      </div>
      <div className="w-full rounded-2xl h-0.75 bg-blue-500 mx-auto mt-2 mb-6"></div>

      <div className="relative w-full">
        <input
          type="phone or username"
          placeholder="نام کاربری / تلفن‌همراه"
          value={Identifier}
          onChange={handleChangeIdentifier}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${
            isValidIdentifier === false
              ? "focus:ring-3 ring-red-500"
              : isValidIdentifier === true
              ? "focus:ring-3 ring-green-500"
              : "focus:ring-3 ring-gray-300"
          }`}
        />
        <object
          data="/src/assets/User.svg"
          type="image/svg+xml"
          className="w-6.5 h-6.5 pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 "
          tabIndex={-1}
        />
      </div>

      <div className="relative w-full">
        <input
          type={showPassword1 ? "text" : "password"}
          placeholder="رمز عبور"
          value={Password}
          onChange={handleChangePass}
          className={`w-full bg-[#E5E5E5] py-1.75 px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:bg-white hover:bg-white transition duration-200 ease-in-out rounded-[18px] my-2 placeholder-black text-right text-[20px] text-black font-[vazirmatn]${
            isValidPass === false
              ? "focus:ring-3 ring-red-500"
              : isValidPass === true
              ? "focus:ring-3 ring-green-500"
              : "focus:ring-3 ring-gray-300"
          }`}
        />
        <button onClick={() => setShowPassword1(!showPassword1)} className="cursor-pointer transition duration-200 ease-in-out hover:scale-110 absolute left-3 top-1/2 transform -translate-y-1/2"tabIndex={-1}>
          <object
            data={
              showPassword1 ? "/src/assets/Eye_off.svg" : "/src/assets/Eye.svg"
            }
            type="image/svg+xml"
            className="w-6.5 h-6.5 pointer-events-none"
            tabIndex={-1}
          />
        </button>
      </div>

      <div className="text-right text-sm mt-5 mb-4">
        <Link
          to="/forgetpassword"
          className="text-white font-[vazirmatn] font-thin transition duration-200 ease-in-out hover:underline"
        >
          &nbsp;رمز عبور خود را فراموش کردید؟
        </Link>
      </div>

      <button
        className={`w-full transition duration-200 ease-in-out rounded-[20px] mt-3 bg-[#3E79DE] shadow-[0_4px_10px_rgba(0,0,0,0.2)] py-3 ${
          !(
            isValidPass === true &&
            isValidPass === true &&
            isValidIdentifier === true
          )
            ? "opacity-60"
            : "hover:bg-blue-600  cursor-pointer "
        }`}
        onClick={handleLogin}
        disabled={!(isValidIdentifier === true && isValidPass === true) ? true : false}>
        <p className="text-white font-[vazirmatn] font-extralight"tabIndex={0}>
          تایید و ادامه
        </p>
      </button>
    </div>
  );
};

export default LoginForm;
