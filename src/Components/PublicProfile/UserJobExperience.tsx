import { useState } from "react";
import { Color, JobPageSize, Profile } from "./types";
import { Globe } from "lucide-react";

interface UserJobExperienceProps {
  localprofile: Profile;
  localcolor: Color;
}

const PAGE_SIZE = JobPageSize;

const UserJobExperience = ({
  localprofile,
  localcolor,
}: UserJobExperienceProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const workExperience = localprofile.workExperience || [];

  const totalPages = Math.ceil(workExperience.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedExperience = workExperience.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

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

  return (
    <div className="flex flex-col gap-4 px-4 mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-[vazirmatn]">
        سوابق شغلی
      </h3>
      {paginatedExperience.length > 0 ? (
        paginatedExperience.map((experience) => (
          <div
            key={experience.id || experience.companyName + experience.jobTitle}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 dark:bg-gray-600 dark:border-gray-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-300 font-[vazirmatn]">
                  {experience.jobTitle}
                </h4>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-[vazirmatn]">
                  {experience.companyName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-300 font-[vazirmatn]">
                <span>
                  {experience.startDate} -{" "}
                  {experience.isOngoing
                    ? "در حال انجام"
                    : experience.endDate || "نامشخص"}
                </span>
                {experience.website && (
                  <a
                    href={
                      experience.website.startsWith("http")
                        ? experience.website
                        : `https://${experience.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-${localcolor.color} dark:text-${localcolor.darkcolor} hover:text-${localcolor.hover} dark:hover:text-${localcolor.darkhover}`}
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
                    className={`flex items-center gap-1 px-2 py-1 rounded-full bg-${localcolor.color} dark:bg-${localcolor.darkcolor} hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover} transition-colors duration-200`}
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
        <p className="text-sm text-gray-500 pointer-events-none font-[vazirmatn] text-center">
          سابقه شغلی ثبت نشده است.
        </p>
      )}
      {workExperience.length > PAGE_SIZE && (
        <div className="flex flex-row justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 dark:bg-gray-300 dark:text-gray-500 cursor-not-allowed"
                : `bg-${localcolor.color} dark:bg-${localcolor.darkcolor} text-white cursor-pointer hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover}`
            }`}
            aria-label="صفحه قبلی"
          >
            قبلی
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 bg-${localcolor.color} dark:bg-${localcolor.darkcolor} hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover}`}
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
                ? "bg-gray-200 text-gray-400 dark:bg-gray-300 dark:text-gray-500 cursor-not-allowed"
                : `bg-${localcolor.color} dark:bg-${localcolor.darkcolor} text-white cursor-pointer hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover}`
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
