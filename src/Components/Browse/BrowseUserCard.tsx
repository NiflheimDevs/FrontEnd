import React from "react";

interface BrowseUserCardProps {
  user: {
    name: string;
    role: string;
    skill: string;
    avatar: string;
  };
  loading?: boolean;
}

const BrowseUserCard: React.FC<BrowseUserCardProps> = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="shiny-skeleton h-44 rounded-xl w-full max-w-xs mx-auto" />
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center w-full max-w-xs mx-auto transition hover:scale-105 duration-200">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-blue-200 dark:border-blue-900">
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{user.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user.role}</p>
      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">{user.skill}</span>
    </div>
  );
};

export default BrowseUserCard; 