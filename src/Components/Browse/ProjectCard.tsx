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
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 text-right block dark:bg-black dark:border-[#1A1814]"
    >
      <h2 className="text-blue-600 font-bold text-md">{project.title}</h2>
      <p
        className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2 dark:text-[#B4AA9C]"
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
      <div className="flex flex-col mt-3 text-sm text-gray-700 dark:text-[#C8BEAE]">
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
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
            className="w-4 h-4"
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
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-white border border-[#3E79DE] text-[#3E79DE] text-xs font-semibold px-3 py-1 rounded-full dark:bg-black "
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end mt-4" onClick={(e) => e.stopPropagation()}>
        <button className="px-2 py-1 rounded-xl text-sm border border-[#3E79DE] text-[#3E79DE] hover:bg-[#3E79DE] hover:text-white transition duration-300 cursor-pointer">
          ارسال پیشنهاد
        </button>
      </div>
    </Link>
  );
};

export default ProjectCard;