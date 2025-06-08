import React from "react";

interface BrowseTeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
    profile: string;
    members: { id: number; name: string; role: string; avatar: string }[];
  };
  loading?: boolean;
}

const BrowseTeamCard: React.FC<BrowseTeamCardProps> = ({ team, loading }) => {
  if (loading) {
    return <div className="shiny-skeleton h-44 rounded-xl w-full" />;
  }
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center w-full max-w-xs mx-auto transition hover:scale-105 duration-200">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-4 border-blue-300 dark:border-blue-900">
        <img src={team.profile} alt={team.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{team.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center line-clamp-2">{team.description}</p>
      {team.members[0] && (
        <div className="flex items-center gap-2 mt-2">
          <img src={team.members[0].avatar} alt={team.members[0].name} className="w-8 h-8 rounded-full border-2 border-blue-400 dark:border-blue-700" />
          <span className="text-xs text-gray-700 dark:text-gray-300">{team.members[0].name}</span>
        </div>
      )}
    </div>
  );
};

export default BrowseTeamCard; 