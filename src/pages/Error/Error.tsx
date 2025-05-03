import { Link, useLocation } from "react-router-dom";
import ErrorSVG from "../../assets/err.svg";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Define the possible error codes as a union type
type ErrorCode = keyof typeof errorMessages;

// Define the errorMessages object with an explicit type
const errorMessages = {
  EMAIL_TAKEN: "این ایمیل قبلاً استفاده شده است.",
  EMAIL_INVALID: "ایمیل وارد شده معتبر نیست.",
  USERNAME_TAKEN: "نام کاربری قبلاً استفاده شده است.",
  USERNAME_TOO_SHORT: "نام کاربری خیلی کوتاه است.",
  USERNAME_TOO_LONG: "نام کاربری خیلی بلند است.",
  PHONE_INVALID: "شماره تلفن معتبر نیست.",
  PHONE_TAKEN: "این شماره تلفن قبلاً استفاده شده است.",
  USERNAME_PASSWORD_WRONG: "نام کاربری یا رمز عبور اشتباه است.",
  PASSWORD_INVALID: "رمز عبور معتبر نیست.",
  PASSWORD_TOO_SHORT: "رمز عبور خیلی کوتاه است.",
  PASSWORD_TOO_LONG: "رمز عبور خیلی بلند است.",
  PASSWORD_NO_DIGIT: "رمز عبور باید حداقل یک عدد داشته باشد.",
  PASSWORD_NO_CAPITAL: "رمز عبور باید حداقل یک حرف بزرگ داشته باشد.",
  PASSWORD_NO_SMALL: "رمز عبور باید حداقل یک حرف کوچک داشته باشد.",
  OTP_INVALID: "کد تأیید نامعتبر است.",
  OTP_EXPIRED_OR_BAD_SESSION: "کد تأیید منقضی شده یا نشست نامعتبر است.",
  BAD_SESSION: "نشست نامعتبر است.",
  DATABASE_ERROR: "خطای پایگاه داده رخ داده است.",
  CACHE_ERROR: "خطای حافظه پنهان رخ داده است.",
  MICROSERVICE_ERROR: "خطای میکروسرویس رخ داده است.",
  SERVICE_UNAVAILABLE: "سرویس در دسترس نیست.",
  AUTH_INVALID_CREDENTIALS: "نام کاربری یا رمز عبور نادرست است.",
  AUTH_TOKEN_EXPIRED: "توکن احراز هویت منقضی شده است.",
  AUTH_ACCESS_DENIED: "دسترسی غیرمجاز.",
  AUTH_GENERATE_TOKEN_ERROR: "خطا در تولید توکن احراز هویت.",
  MISSING_REQUIRED_FIELD: "برخی از فیلدهای ضروری مقداردهی نشده‌اند.",
  MISSING_FILE: "فایل مورد نیاز ارسال نشده است.",
  CAST_ERROR: "خطای تبدیل داده رخ داده است.",
  USER_NOT_FOUND: "کاربر یافت نشد.",
  AUTHENTICATION_ERROR: "خطای احراز هویت رخ داده است.",
  VALIDATION_ERROR: "خطای اعتبارسنجی رخ داده است.",
  INTERNAL_ERROR: "خطای داخلی سرور.",
  NOT_FOUND: "موردی یافت نشد.",
  BAD_REQUEST: "درخواست نامعتبر است.",
  LIMIT_EXCEED: "محدودیت درخواست‌ها بیش از حد مجاز است.",
  error_404: "صفحه مورد نظر پیدا نشد.",
} as const;

// Type the errorMapper function
const errorMapper = (errorCode: ErrorCode): string => {
  return errorMessages[errorCode] || "مشکلی پیش آمده است.";
};

const Error = () => {
  const location = useLocation();
  // Type the location.state and handle undefined errorCode
  const { errorCode, title = "خطا" } = (location.state as
    | { errorCode?: ErrorCode; title?: string }
    | undefined) || {
    errorCode: "error_404" as const, // Explicitly type as ErrorCode
    title: "خطا 404",
  };

  // Ensure errorCode is always ErrorCode by providing a fallback
  const safeErrorCode: ErrorCode = errorCode ?? "error_404";
  const description = errorMapper(safeErrorCode);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl box-shadow-custom max-w-5xl w-full flex flex-col justify-between md:flex-row items-center overflow-hidden"
      >
        <div className="w-fit flex md:hidden">
          <img
            src={ErrorSVG}
            alt="Error Illustration"
            className="w-full h-full object-cover max-w-[570px] max-h-[570px]"
          />
        </div>
        {/* Constrain text div size and reduce padding on small screens */}
        <div className="flex p-6 md:py-12 md:pr-10 pl-8 md:text-right text-center space-y-4 max-w-[90%] md:max-w-[50%] flex-col">
          {/* Reduced padding to p-6 on small screens and constrained max-width */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-800"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl text-gray-600 leading-relaxed"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/">
              <button className="group bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
                بازگشت به خانه
              </button>
            </Link>
          </motion.div>
        </div>
        <div className="w-fit hidden md:flex">
          <img
            src={ErrorSVG}
            alt="Error Illustration"
            className="w-full h-full object-cover max-w-[570px] max-h-[570px]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Error;
export { errorMapper, errorMessages };
