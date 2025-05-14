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
          ? "bg-blue-50 hover:bg-blue-100"
          : "bg-gray-200 opacity-60 cursor-not-allowed"
      } ${formData.team_id === team.team_id ? "border-2 border-blue-400 bg-blue-50" : ""}`}
    >
      {profileExists ? (
        <img
          src={team.profile}
          alt={team.title}
          className="w-10 h-10 rounded-full ml-2 border border-gray-200"
          onError={onProfileError}
        />
      ) : (
        <RiTeamFill className="border-gray-500 border-2 text-gray-500 w-10 h-10 rounded-full ml-2 p-1" />
      )}
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">{team.title}</p>
        <p className="text-xs text-gray-500">{team.description}</p>
      </div>
    </div>
  );
};

export default BidModalTeams;
