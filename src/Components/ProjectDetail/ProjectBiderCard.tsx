/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Bider, formatPrice, truncateText } from "../Biders/types";
import { RiTeamFill } from "react-icons/ri";

interface ProjectBiderCardProps {
  bider: Bider;
  color: number;
}

const ProjectBiderCard: React.FC<ProjectBiderCardProps> = ({
  bider,
  color,
}) => {
  const [profileExists, setProfileExists] = useState<boolean>(true);

  return (
    <div
      className={`flex items-center gap-2 w-full justify-between py-3 px-2 rounded-lg shadow-md transition-colors ${
        color === 1 ? "bg-[#9CA3AF]" : "bg-blue-400"
      }`}
    >
      <div className="flex items-center space-x-3 gap-3 space-x-reverse">
        {profileExists ? (
          <img
            className="w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 border border-gray-200 rounded-full flex items-center justify-center"
            alt={bider.title}
            src={bider.profile}
            onError={() => setProfileExists(false)}
          />
        ) : bider.title ? (
          <div className="w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            {bider.title.charAt(0)}
          </div>
        ) : (
          <RiTeamFill className="border-gray-200 border-2 text-gray-600 rounded-full w-8 sm:w-9 h-8 sm:h-9 min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-1" />
        )}
        <div className="text-right">
          <p className="font-semibold text-xs sm:text-sm text-white">
            {bider.title}
          </p>
          <div className="mt-1 flex items-center gap-1 text-gray-100 text-xs">
            {truncateText(bider.description, 50)}
          </div>
        </div>
      </div>
      <p className="text-white text-xs sm:text-sm text-center font-semibold p-2">
        {`${formatPrice(bider.total)} تومان`}
      </p>
    </div>
  );
};

export default ProjectBiderCard;
