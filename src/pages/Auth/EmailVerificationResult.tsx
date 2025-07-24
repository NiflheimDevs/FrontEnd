import { Link, useParams } from "react-router-dom";
import { Card, CardTitle, CardContent, CardFooter } from "../../Components/ui/card";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const EmailVerificationResult = () => {
  const { token } = useParams();
  const isSuccess = token === "success";
  
  const [isDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4" dir="rtl">
      <Card className="max-w-md w-full mx-auto items-center text-center dark:bg-gray-700 shadow-lg dark:shadow-xl">
        <div className="flex flex-col items-center justify-center w-full">
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28 mb-4 mx-auto text-green-600 dark:text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28 mb-4 mx-auto text-red-600 dark:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <CardTitle className={`text-2xl font-bold ${isSuccess ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
            {isSuccess ? "ایمیل شما با موفقیت تایید شد!" : "تایید ایمیل ناموفق بود"}
          </CardTitle>
        </div>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:w-[90%] w-full mx-auto">
            {isSuccess
              ? "اکنون می‌توانید از تمام امکانات سایت استفاده کنید."
              : "متاسفانه تایید ایمیل شما با خطا مواجه شد. لطفا مجددا تلاش کنید."}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link to="/">
            <button className="group cursor-pointer bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300">
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
              بازگشت به خانه
            </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerificationResult;