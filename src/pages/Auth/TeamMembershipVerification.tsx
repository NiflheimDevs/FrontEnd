import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../Components/ui/card";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { RiTeamFill } from "react-icons/ri";

const TeamMembershipVerification = () => {
  const [ProfileExists, SetProfileExist] = useState(true);
  const { groupId } = useParams();
  const [isDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // Mock group data (replace with actual data fetching logic)
  const groupData = {
    name: "گروه برنامه‌نویسان حرفه‌ای",
    image:
      "https://www.effectory.com/wp-content/uploads/the-difference-between-a-group-and-a-team.jpg", // Placeholder image
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleConfirm = () => {
    // Logic for confirming membership (e.g., API call)
    console.log("Membership confirmed for group:", groupId);
  };

  const handleReject = () => {
    // Logic for rejecting membership (e.g., API call)
    console.log("Membership rejected for group:", groupId);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4"
      dir="rtl"
    >
      <Card className="max-w-md w-full mx-auto items-center text-center dark:bg-gray-700 shadow-lg dark:shadow-xl">
        <div className="flex flex-col items-center justify-center w-full">
          {ProfileExists ? (
            <>
              <img
                src={groupData.image}
                alt={groupData.name}
                className="w-26 h-26 mb-4 mx-auto rounded-full object-cover"
                onError={() => SetProfileExist(false)}
              />
            </>
          ) : (
            <RiTeamFill className="text-blue-400 dark:text-blue-500 border border-blue-400 dark:border-blue-500 rounded-full p-1 w-26 h-26 mb-4 object-cover" />
          )}
          <CardTitle className="text-2xl font-bold text-blue-400 dark:text-blue-500">
            درخواست عضویت در {groupData.name}
          </CardTitle>
        </div>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:w-[90%] w-full mx-auto">
            شما یک درخواست برای عضویت در{" "}
            <span className="font-semibold">{groupData.name}</span> دارید. لطفاً
            درخواست را تأیید یا رد کنید.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:justify-center">
          <div className="flex md:flex-row flex-col gap-4">
            <button
              onClick={handleConfirm}
              className="group cursor-pointer whitespace-nowrap bg-green-600 dark:bg-green-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300"
            >
              <CheckCircle
                className="group-hover:scale-110 transition-transform"
                size={20}
              />
              تأیید عضویت
            </button>
            <button
              onClick={handleReject}
              className="group cursor-pointer whitespace-nowrap bg-red-600 dark:bg-red-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-300"
            >
              <XCircle
                className="group-hover:scale-110 transition-transform"
                size={20}
              />
              رد عضویت
            </button>
          </div>
          <Link to="/" className="mt-2 sm:mt-0 flex">
            <button className="group cursor-pointer whitespace-nowrap bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-base md:text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300">
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

export default TeamMembershipVerification;
