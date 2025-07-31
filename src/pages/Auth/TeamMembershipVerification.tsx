/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../Components/ui/card";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { RiTeamFill } from "react-icons/ri";
import { Skeleton } from "primereact/skeleton";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Notification/NotificationProvider";
import { getTeam, verifyTeamMembership } from "../../API"; // فرض می‌کنیم این تابع API وجود داره

const TeamMembershipVerification = () => {
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const teamid = searchParams.get("teamid");
  const userid = searchParams.get("userid");
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profileExists, setProfileExists] = useState(true);
  const [isDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // داده‌های موقت تیم (باید از API گرفته بشه)
  const [teamData, setTeamData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const verify = async () => {
      try {
        setIsLoading(true);
        if (!teamid) {
          throw new Error("پارامترهای teamid، userid یا token وجود ندارند");
        }
        const response = await getTeam({}, teamid);
        setTeamData({
          name: response.team_info?.title || "تیم بدون نام",
          image: response.profile || teamData.image,
        });
        setIsSuccess(true);
      } catch (err: any) {
        notifyError(err.message || "خطا در بارگذاری اطلاعات تیم");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [teamid, userid, token, notifyError]);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      if (!teamid || !userid || !token) {
        throw new Error("پارامترهای teamid، userid یا token وجود ندارند");
      }
      const membershipData = {
        team_id: parseInt(teamid),
        token: token,
      };
      await verifyTeamMembership(membershipData);
      notifySuccess("عضویت در تیم با موفقیت تأیید شد!");
      setIsSuccess(true);
      navigate("/");
    } catch (err: any) {
      notifyError(err.message || "خطا در تأیید عضویت");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4"
      dir="rtl"
    >
      <Card className="max-w-md w-full mx-auto items-center text-center dark:bg-gray-700 shadow-lg dark:shadow-xl">
        <div className="flex flex-col items-center justify-center w-full">
          {isLoading ? (
            <Skeleton
              shape="circle"
              size="6.5rem"
              className="shiny-skeleton mb-4 mx-auto border-2 border-gray-200 bg-gray-300 dark:border-gray-600 dark:bg-gray-600"
            />
          ) : profileExists ? (
            <img
              src={teamData.image}
              alt={teamData.name}
              className="w-26 h-26 mb-4 mx-auto rounded-full object-cover"
              onError={() => setProfileExists(false)}
            />
          ) : (
            <RiTeamFill className="text-blue-400 dark:text-blue-500 border border-blue-400 dark:border-blue-500 rounded-full p-1 w-26 h-26 mb-4 object-cover" />
          )}
          <CardTitle className="text-2xl font-bold w-full">
            {isLoading ? (
              <div className="w-full flex justify-center">
                <Skeleton
                  width="60%"
                  height="1.5rem"
                  className="shiny-skeleton bg-gray-300 dark:bg-gray-600"
                />
              </div>
            ) : (
              <span className="text-blue-400 dark:text-blue-500">
                درخواست عضویت در {teamData.name}
              </span>
            )}
          </CardTitle>
        </div>
        <CardContent className="w-full">
          {isLoading ? (
            <div className="space-y-2 sm:w-[90%] w-full mx-auto">
              <Skeleton
                width="100%"
                height="1rem"
                className="shiny-skeleton bg-gray-300 dark:bg-gray-600"
              />
              <Skeleton
                width="75%"
                height="1rem"
                className="shiny-skeleton bg-gray-300 dark:bg-gray-600"
              />
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-base sm:w-[90%] w-full mx-auto">
              {isSuccess ? (
                <>
                  شما یک درخواست برای عضویت در{" "}
                  <span className="font-semibold">{teamData.name}</span> دارید.
                  لطفاً درخواست را تأیید یا رد کنید.
                </>
              ) : (
                "متأسفانه خطایی در بارگذاری اطلاعات تیم رخ داده است. لطفاً دوباره تلاش کنید."
              )}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:justify-center">
          {isLoading ? (
            <div className="flex md:flex-row flex-col gap-4">
              <Skeleton
                width="8rem"
                height="2.5rem"
                className="shiny-skeleton rounded-xl bg-gray-300 dark:bg-gray-600"
              />
              <Skeleton
                width="8rem"
                height="2.5rem"
                className="shiny-skeleton rounded-xl bg-gray-300 dark:bg-gray-600"
              />
            </div>
          ) : (
            <div className="flex md:flex-row flex-col gap-4">
              <button
                onClick={handleConfirm}
                className="group cursor-pointer justify-center whitespace-nowrap bg-green-600 dark:bg-green-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300"
              >
                <CheckCircle
                  className="group-hover:scale-110 transition-transform"
                  size={20}
                />
                تأیید عضویت
              </button>

              <Link to="/" className="mt-2 sm:mt-0 flex">
                <button className="group cursor-pointer whitespace-nowrap bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300">
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                  بازگشت به خانه
                </button>
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeamMembershipVerification;
