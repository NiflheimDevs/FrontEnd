import { FormBiderData, Team } from "../Biders/types";
import { RiTeamFill } from "react-icons/ri";

interface BidModalTeamsProps {
  formData: FormBiderData;
  team: Team;
  handleTeamSelect: (team_id: number) => void;
  profileExists: boolean;
  onProfileError: () => void;
}

const BidModalTeams: React.FC<BidModalTeamsProps> = ({
  team,
  formData,
  handleTeamSelect,
  profileExists,
  onProfileError,
}) => {
  return (
    <div
      onClick={() => team.isValid && handleTeamSelect(team.team_id)}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
        team.isValid
          ? "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800/50"
          : "bg-gray-200 dark:bg-gray-600 opacity-60 cursor-not-allowed"
      } ${
        formData.team_id === team.team_id
          ? "border-2 border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30"
          : ""
      }`}
    >
      {profileExists ? (
        <img
          src={team.profile}
          alt={team.title}
          className="w-10 h-10 rounded-full ml-2 border border-gray-200 dark:border-gray-600"
          onError={onProfileError}
        />
      ) : (
        <RiTeamFill className="border-gray-500 dark:border-gray-600 border-2 text-gray-500 dark:text-gray-300 w-10 h-10 rounded-full ml-2 p-1" />
      )}
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {team.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-300">
          {team.description}
        </p>
      </div>
    </div>
  );
};

export default BidModalTeams;
