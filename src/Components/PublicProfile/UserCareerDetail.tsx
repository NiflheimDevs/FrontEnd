import { useState } from "react";
import { Color, Profile, SkillPageSize } from "./types";
import { Star, MessageSquareText } from "lucide-react";

interface UserCareerDetailProps {
  localprofile: Profile;
  localcolor: Color;
}

const PAGE_SIZE = SkillPageSize;

const UserCareerDetail = ({
  localprofile,
  localcolor,
}: UserCareerDetailProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedSkills = [...(localprofile.skills || [])].sort(
    (a, b) => b.level - a.level
  );

  const totalPages = Math.ceil(sortedSkills.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedSkills = sortedSkills.slice(
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
    <div className="w-full p-4 flex flex-col gap-1 bg-white dark:bg-gray-600 border dark:border-gray-600 box-shadow-custom rounded-2xl transition-all duration-300">
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-lg font-bold text-[#FFD700] font-[vazirmatn]">
            امتیاز کاربر:
          </label>
        </div>
        <div className="flex flex-row gap-1">
          <Star color="#FFD700" />
          <span className="text-lg font-bold text-[#FFD700] font-[vazirmatn]">
            {localprofile.rate?.toString().slice(0, 3)}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-lg font-bold text-[#A6A6A6] font-[vazirmatn]">
            تعداد نظرات:
          </label>
        </div>
        <div className="flex flex-row gap-1">
          <MessageSquareText color="#A6A6A6" />
          <span className="text-lg font-bold text-[#A6A6A6] font-[vazirmatn]">
            {localprofile.comments}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-4">
        {paginatedSkills.length > 0 ? (
          paginatedSkills.map((tag) => (
            <div
              key={tag.id}
              className="flex flex-col items-center gap-2"
              role="region"
              aria-label={`مهارت: ${tag.name}، سطح ${tag.level}`}
            >
              <div
                className="bg-gray-400 dark:bg-gray-500 relative h-10 w-full max-w-md rounded-full box-shadow-custom transition-all overflow-hidden"
                dir="ltr"
              >
                <div
                  className={`bg-${localcolor.color} dark:bg-${localcolor.darkcolor} h-full rounded-full absolute top-0 left-0 transition-all duration-500 ease-out`}
                  style={{ width: `${tag.level * 25}%` }}
                  aria-hidden="true"
                ></div>
                <span
                  className="absolute inset-0 flex items-center justify-center font-[vazirmatn] text-sm text-white pointer-events-none truncate px-2"
                  style={{ zIndex: 10 }}
                >
                  {tag.name}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm pointer-events-none text-gray-500 font-[vazirmatn] text-center">
            هیچ اطلاعاتی یافت نشد.
          </p>
        )}
      </div>
      {sortedSkills.length > PAGE_SIZE && (
        <div className="flex flex-row justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-[vazirmatn] rounded-full transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-300 dark:text-gray-500"
                : `bg-${localcolor.color} dark:bg-${localcolor.darkcolor} text-white cursor-pointer hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover}`
            }`}
            aria-label="صفحه قبلی"
          >
            قبلی
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 bg-${localcolor.color} dark:bg-${localcolor.darkcolor} hover:bg-${localcolor.hover} dark:hover:bg-${localcolor.darkhover}`}
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

export default UserCareerDetail;
