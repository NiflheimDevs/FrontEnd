import React from "react";
import { Link } from "react-router-dom";

interface Project {
  project_id: number;
  title: string;
  description: string;
  label: string;
  timeLeft?: string;
  views?: number;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      to={`/detail/${project.project_id}`}
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 text-right block"
    >
      <h2 className="text-blue-600 dark:text-blue-400 font-bold text-lg">
        {project.title}
      </h2>
      <p
        className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed line-clamp-2"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
        }}
      >
        {project.description}
      </p>
      <div className="flex flex-col mt-3 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{project.timeLeft} زمان باقی‌مانده</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M3 6h18M3 14h18M3 18h18"
            />
          </svg>
          <span>{project.views} پیشنهاد</span>
        </div>
      </div>
      <div className="flex md:flex-row lg:flex-row sm:flex-row flex-col justify-between items-start">
        <div className="flex flex-row flex-wrap gap-2 mt-4 items-center">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-gray-800 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="flex mt-4 px-0 md:px-2 lg:px-2 sm:px-2 md:w-fit lg:w-fit sm:w-fit w-full justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="flex justify-center items-center px-4 py-2 rounded-xl h-fit whitespace-nowrap text-sm border-2 bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600 text-white dark:text-gray-100 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 hover:text-white dark:hover:text-gray-200 transition duration-300 cursor-pointer">
            ارسال پیشنهاد
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
