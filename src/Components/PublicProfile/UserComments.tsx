import { useState } from "react";
import { Color, Comment, commentsPageSize, Projects } from "./types";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface UserCommentsProps {
  comments: Comment[];
  projects: Projects[] | undefined;
  localcolor: Color;
}

const PAGE_SIZE = commentsPageSize;

const UserComments = ({
  comments,
  localcolor,
  projects,
}: UserCommentsProps) => {
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
            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-600 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-[vazirmatn]">
                  {`${comment.first_name} ${comment.last_name}`}
                </h4>
                <div className="flex flex-row items-center gap-3">
                  <Link
                    to={`/ProjectDetail/${comment.project_id}`}
                    className={`text-sm font-medium text-${localcolor.color} dark:text-${localcolor.darkcolor} hover:text-${localcolor.hover} dark:hover:text-${localcolor.darkhover} font-[vazirmatn] px-2 py-1 rounded-md`}
                  >
                    {projects?.find((p) => p.id === comment.project_id)
                      ?.title || "پروژه نامشخص"}
                  </Link>
                  <span className="text-gray-400 dark:text-gray-500">|</span>
                  <Link to={`/profile/${comment.user_id}`}>
                    <span
                      className={`text-sm font-medium text-${localcolor.color} dark:text-${localcolor.darkcolor} hover:text-${localcolor.hover} dark:hover:text-${localcolor.darkhover} transition-colors`}
                    >
                      {comment.username}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex justify-start items-center gap-1 mb-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <FaStar
                      key={starValue}
                      size={18}
                      className="transition-colors"
                      color={
                        starValue <= comment.rating ? "#ffc107" : "#d1d5db"
                      }
                    />
                  );
                })}
              </div>

              <div className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 font-[vazirmatn] text-sm leading-relaxed">
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
