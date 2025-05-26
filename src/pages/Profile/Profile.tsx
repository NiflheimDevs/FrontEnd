/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import moment from "moment-jalaali";
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Header from "../../Components/DashboardComp/Header";
import ProfileForm from "../../Components/Profile/ProfileForm";

export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-fit bg-[#F7F7F7] dark:bg-gray-800" dir="rtl">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 flex flex-col pt-16 md:pr-24 sm:pr-24 pr-0">
        <Header toggleSidebar={toggleSidebar} />

        <ProfileForm />
      </main>
    </div>
  );
}

export function persianToEnglishNumber({
  persianNumber,
}: {
  persianNumber: string;
}): string {
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
