import { useLocation } from "react-router-dom";

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
  const { errorCode, title = "خطا" } = (location.state as { errorCode?: ErrorCode; title?: string } | undefined) || {
    errorCode: "error_404" as const, // Explicitly type as ErrorCode
    title: "404 خطا",
  };
  
  // Ensure errorCode is always ErrorCode by providing a fallback
  const safeErrorCode: ErrorCode = errorCode ?? "error_404";
  const description = errorMapper(safeErrorCode);

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
export { errorMapper, errorMessages };