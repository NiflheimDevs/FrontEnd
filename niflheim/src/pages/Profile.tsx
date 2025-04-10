import { useState, useEffect } from "react";
import moment from "moment-jalaali";
import Sidebar from "../Components/DashboardComp/Sidebar";
import Header from "../Components/DashboardComp/Header";
import ProfileForm from "../Components/Profile/ProfileForm";

import { Skeleton } from "primereact/skeleton";

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Simulate an API call or data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);
  const renderSkeleton = () => (
    <div className="animate-pulse justify-center items-center">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg shadow-md justify-center items-center mx-auto mt-10">
        <div className="flex flex-col items-center">
          <Skeleton
            width="160px"
            height="160px"
            className="shiny-skeleton full border rounded-full border-gray-300"
          />
          <Skeleton
            width="200px"
            height="30px"
            className="shiny-skeleton mt-4 bg-gray-200 rounded-2xl"
          />
        </div>
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
        <Skeleton
          width="100%"
          height="45px"
          className="shiny-skeleton my-4 rounded-2xl"
        />
      </div>
    </div>
  );
  return (
    <div className="flex h-fit bg-[#F7F7F7]" dir="rtl">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 pr-0">
        <Header toggleSidebar={toggleSidebar} />
        {isLoading ? renderSkeleton() : <ProfileForm />}
      </main>
    </div>
  );
}

export function persianToEnglishNumber(persianNumber: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return persianNumber
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
}

export function englishToPersianNumber(persianNumber: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return persianNumber
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? persianDigits[index] : char;
    })
    .join("");
}

export function gregorianToPersian(gregorianDate: string): string {
  return moment(gregorianDate).format("jYYYY/jMM/jDD");
}

export function persianToGregorian(persianDate: string): string {
  return moment(persianDate, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
}
