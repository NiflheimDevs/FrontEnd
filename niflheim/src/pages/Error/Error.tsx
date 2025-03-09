import React from "react";
import { useLocation } from "react-router-dom";

const errorMessages = {
  EMAIL_TAKEN: "این ایمیل قبلاً استفاده شده است.",
  EMAIL_INVALID: "ایمیل وارد شده معتبر نیست.",
  USERNAME_TAKEN: "نام کاربری قبلاً استفاده شده است.",
  USERNAME_INVALID: "نام کاربری معتبر نیست.",
  PHONE_INVALID: "شماره تلفن معتبر نیست.",
  PHONE_TAKEN: "این شماره تلفن قبلاً استفاده شده است.",
  PASSWORD_INVALID: "رمز عبور معتبر نیست.",
  PASSWORD_TOO_SHORT: "رمز عبور خیلی کوتاه است.",
  PASSWORD_TOO_LONG: "رمز عبور خیلی بلند است.",
  PASSWORD_NO_DIGIT: "رمز عبور باید شامل حداقل یک عدد باشد.",
  PASSWORD_NO_CAPITAL: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد.",
  OTP_INVALID: "کد تأیید نامعتبر است.",
  OTP_EXPIRED: "کد تأیید منقضی شده است.",
  SYS_DATABASE_ERROR: "خطای پایگاه داده رخ داده است.",
  SYS_MICROSERVICE_ERROR: "خطای میکروسرویس رخ داده است.",
  SYS_SERVICE_UNAVAILABLE: "سرویس در دسترس نیست.",
  AUTH_INVALID_CREDENTIALS: "نام کاربری یا رمز عبور نادرست است.",
  AUTH_TOKEN_EXPIRED: "توکن احراز هویت منقضی شده است.",
  AUTH_ACCESS_DENIED: "دسترسی غیرمجاز.",
  MISSING_REQUIRED_FIELD: "برخی از فیلدهای ضروری مقداردهی نشده‌اند.",
  VALIDATION_ERROR: "خطای اعتبارسنجی رخ داده است.",
  INTERNAL_ERROR: "خطای داخلی سرور.",
  NOT_FOUND: "موردی یافت نشد.",
  error_404: "صفحه مورد نظر پیدا نشد"
};

const Error = () => {
  const location = useLocation();
  const { errorCode, title = "خطا" } = location.state || { errorCode:"error_404", title:"404 خطا" };
  const description = errorMessages[errorCode] || "مشکلی پیش آمده است.";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#DA1E30] to-[#74101A] px-10 text-center">
      <div className="text-white text-4xl font-bold space-y-4">
        <h1>{title}</h1>
        <h2 className="text-2xl">{description}</h2>
      </div>
      <object
        data="/src/assets/Error.svg"
        type="image/svg+xml"
        className="w-[300px] h-[300px] sm:w-[300px] sm:h-[450px] md:w-[480px] md:h-[590px]"
      />
    </div>
  );
};

export default Error;
