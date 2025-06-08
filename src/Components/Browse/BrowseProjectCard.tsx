import React from "react";

interface BrowseProjectCardProps {
  project: {
    project_id: number;
    title: string;
    description: string;
    label: string;
    timeLeft?: string;
    views?: number;
    tags?: string[];
  };
  loading?: boolean;
}

const BrowseProjectCard: React.FC<BrowseProjectCardProps> = ({ project, loading }) => {
  if (loading) {
    return <div className="shiny-skeleton h-44 rounded-xl w-full" />;
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col w-full transition hover:scale-105 duration-200">
      <h2 className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">{project.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.tags?.map((tag, i) => (
          <span key={i} className="bg-gray-100 dark:bg-gray-700 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-auto">
        <span>⏰ {project.timeLeft}</span>
      </div>
    </div>
  );
};

export default BrowseProjectCard; 