import { useState } from "react";
import { Color, Profile, Projects, TogglePageSize, Teams } from "./types";
import UserProjects from "./UserProjects";
import TeamProfileCard from "./TeamProfileCard"; // کامپوننت جدیدی که ساختیم

const PAGE_SIZE = TogglePageSize;

interface UserStateToggleProps {
  localprofile: Profile;
  localcolor: Color;
  setLocalColor: React.Dispatch<React.SetStateAction<Color>>;
}

const UserStateToggle = ({
  localprofile,
  localcolor,
  setLocalColor,
}: UserStateToggleProps) => {
  const [activeTab, setActiveTab] = useState<
    "employer" | "teams" | "jobseeker"
  >("employer");
  const [currentPage, setCurrentPage] = useState(1);

  // داده‌های نمایشی بر اساس تب فعال
  const displayData =
    activeTab === "employer"
      ? localprofile.employerprojects || []
      : activeTab === "jobseeker"
        ? localprofile.freelancerprojects || []
        : localprofile.teams || []; // فرض می‌کنیم teams در localprofile وجود دارد

  const totalPages = Math.ceil(displayData.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = displayData.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTabChange = (tab: "employer" | "teams" | "jobseeker") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setLocalColor({
      color:
        tab === "employer"
          ? "blue-500"
          : tab === "jobseeker"
            ? "green-500"
            : "gray-500",
      hover:
        tab === "employer"
          ? "blue-600"
          : tab === "jobseeker"
            ? "green-600"
            : "gray-600",
      darkhover:
        tab === "employer"
          ? "blue-800"
          : tab === "jobseeker"
            ? "green-800"
            : "gray-800",
      darkcolor:
        tab === "employer"
          ? "blue-700"
          : tab === "jobseeker"
            ? "green-700"
            : "gray-700",
    });
  };

  return (
    <>
      <div className="w-full flex px-4 justify-center mb-6">
        <div className="flex bg-white rounded-full shadow-sm p-1 border border-gray-200 dark:bg-gray-600 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "employer"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} dark:border-${localcolor.darkcolor} dark:text-${localcolor.darkhover} bg-blue-50 dark:bg-gray-400`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`
            }`}
            onClick={() => handleTabChange("employer")}
            aria-selected={activeTab === "employer"}
            role="tab"
          >
            بخش کارفرما
          </button>
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "teams"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} dark:border-${localcolor.darkcolor} dark:text-${localcolor.darkhover} bg-blue-50 dark:bg-gray-400`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`
            }`}
            onClick={() => handleTabChange("teams")}
            aria-selected={activeTab === "teams"}
            role="tab"
          >
            تیم‌های عضو
          </button>
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "jobseeker"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} dark:border-${localcolor.darkcolor} dark:text-${localcolor.darkhover} bg-blue-50 dark:bg-gray-400`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`
            }`}
            onClick={() => handleTabChange("jobseeker")}
            aria-selected={activeTab === "jobseeker"}
            role="tab"
          >
            بخش کارجو
          </button>
        </div>
      </div>

      <div
        className={`w-full md:px-6 sm:px-6 px-4 flex flex-col gap-6 justify-center`}
      >
        {paginatedData.length > 0 ? (
          paginatedData.map((item: Projects | Teams) =>
            activeTab === "teams" ? (
              <TeamProfileCard
                key={item.id}
                data={item as Teams}
                localcolor={localcolor}
              />
            ) : (
              <UserProjects
                key={item.id}
                project={item as Projects}
                localcolor={localcolor}
              />
            )
          )
        ) : (
          <p className="text-sm text-gray-500 pointer-events-none font-[vazirmatn] text-center">
            هیچ اطلاعاتی یافت نشد.
          </p>
        )}

        {/* بخش پیجینیشن */}
        {displayData.length > PAGE_SIZE && (
          <div className="flex flex-row justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-200 dark:bg-gray-300 dark:text-gray-500 text-gray-400 cursor-not-allowed"
                  : `bg-${localcolor.color} text-white cursor-pointer hover:bg-${localcolor.hover} dark:bg-${localcolor.darkcolor} dark:hover:bg-${localcolor.darkhover}`
              }`}
              aria-label="صفحه قبلی"
            >
              قبلی
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all duration-200 bg-${localcolor.color} hover:bg-${localcolor.hover} dark:bg-${localcolor.darkcolor} dark:hover:bg-${localcolor.darkhover}`}
            >
              <span className="text-sm font-[vazirmatn] text-white">
                {currentPage}
              </span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 dark:bg-gray-300 dark:text-gray-500 cursor-not-allowed"
                  : `bg-${localcolor.color} text-white cursor-pointer hover:bg-${localcolor.hover} dark:bg-${localcolor.darkcolor} dark:hover:bg-${localcolor.darkhover}`
              }`}
              aria-label="صفحه بعدی"
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserStateToggle;
