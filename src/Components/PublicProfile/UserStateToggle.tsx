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
            : "gray-500", // رنگ متفاوت برای تب تیم‌ها
      hover:
        tab === "employer"
          ? "blue-600"
          : tab === "jobseeker"
            ? "green-600"
            : "gray-600", // رنگ hover متفاوت
    });
  };

  return (
    <>
      <div className="w-full flex px-4 justify-center mb-6">
        <div className="flex bg-white rounded-full shadow-sm p-1 border border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
              activeTab === "employer"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} bg-blue-50`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100`
            }`}
            onClick={() => handleTabChange("employer")}
            aria-selected={activeTab === "employer"}
            role="tab"
          >
            بخش کارفرما
          </button>
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
              activeTab === "teams"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} bg-blue-50`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100`
            }`}
            onClick={() => handleTabChange("teams")}
            aria-selected={activeTab === "teams"}
            role="tab"
          >
            تیم‌های عضو
          </button>
          <button
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
              activeTab === "jobseeker"
                ? `border-2 border-${localcolor.color} text-${localcolor.hover} bg-blue-50`
                : `border-2 border-transparent text-gray-600 hover:bg-gray-100`
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
          <p className="text-sm text-gray-500 font-[vazirmatn] text-center">
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
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : `bg-${localcolor.color} text-white cursor-pointer hover:bg-${localcolor.hover}`
              }`}
              aria-label="صفحه قبلی"
            >
              قبلی
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all duration-200 bg-${localcolor.color} hover:bg-${localcolor.hover}`}
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
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : `bg-${localcolor.color} text-white cursor-pointer hover:bg-${localcolor.hover}`
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
