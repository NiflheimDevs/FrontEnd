import { useState } from "react";
import { Color, Profile } from "./types";
import { Globe } from "lucide-react";

interface UserJobExperienceProps {
  localprofile: Profile;
  localcolor: Color;
}

const PAGE_SIZE = 4; // تعداد سوابق شغلی در هر صفحه

const UserJobExperience = ({
  localprofile,
  localcolor,
}: UserJobExperienceProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // استخراج سوابق شغلی یا آرایه خالی اگر وجود نداشته باشد
  const workExperience = localprofile.workExperience || [];

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(workExperience.length / PAGE_SIZE);

  // استخراج سوابق صفحه فعلی
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedExperience = workExperience.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // هندل کردن دکمه قبلی
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // هندل کردن دکمه بعدی
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 mb-6">
      <h3 className="text-xl font-bold text-gray-800 font-[vazirmatn]">
        سوابق شغلی
      </h3>
      {paginatedExperience.length > 0 ? (
        paginatedExperience.map((experience) => (
          <div
            key={experience.id || experience.companyName + experience.jobTitle}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h4 className="text-lg font-semibold text-gray-800 font-[vazirmatn]">
                  {experience.jobTitle}
                </h4>
                <span className="text-sm text-gray-600 font-[vazirmatn]">
                  {experience.companyName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 font-[vazirmatn]">
                <span>
                  {experience.startDate} -{" "}
                  {experience.isOngoing
                    ? "در حال انجام"
                    : experience.endDate || "نامشخص"}
                </span>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-${localcolor.color} hover:text-${localcolor.hover}`}
                    aria-label={`وب‌سایت ${experience.companyName}`}
                  >
                    <Globe size={14} />
                    وب‌سایت
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {experience.skills.map((skill) => (
                  <div
                    key={skill.id || skill.name}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-${localcolor.color} hover:bg-${localcolor.hover} transition-colors duration-200`}
                    aria-label={`مهارت: ${skill.name}`}
                  >
                    <span className="text-white text-xs font-[vazirmatn] pointer-events-none">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 font-[vazirmatn] text-center">
          سابقه شغلی ثبت نشده است.
        </p>
      )}
      {/* بخش پیجینیشن */}
      {workExperience.length > PAGE_SIZE && (
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
            <span className="text-sm font-[vazirmatn] text-white px-3 py-1.5">
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
  );
};

export default UserJobExperience;
