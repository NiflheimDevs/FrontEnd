import { useState } from "react";
import { Color, Comment, commentsPageSize } from "./types";
import { FaStar } from "react-icons/fa";

interface UserCommentsProps {
  comments: Comment[];
  localcolor: Color;
}

const PAGE_SIZE = commentsPageSize;

const UserComments = ({ comments, localcolor }: UserCommentsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedComments = comments.slice(startIndex, startIndex + PAGE_SIZE);

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
        نظرات کاربران
      </h3>
      {paginatedComments.length > 0 ? (
        paginatedComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 dark:bg-gray-600 dark:border-gray-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-300 font-[vazirmatn]">
                  {`${comment.first_name} ${comment.last_name}`}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-[vazirmatn]">
                  @{comment.username}
                </span>
              </div>
              <div className="flex justify-start items-center gap-2 mb-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <FaStar
                      key={starValue}
                      size={20}
                      color={
                        starValue <= comment.rating ? "#ffc107" : "#e4e5e9"
                      }
                    />
                  );
                })}
              </div>
              <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white font-[vazirmatn] text-sm">
                {comment.content || "هیچ نظری ثبت نشده است..."}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500 pointer-events-none font-[vazirmatn] text-center">
          نظری ثبت نشده است.
        </p>
      )}
      {comments.length > PAGE_SIZE && (
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

export default UserComments;
