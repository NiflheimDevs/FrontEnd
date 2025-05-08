import React from "react";
import { Team } from "./index";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
// import UserPic from "../../assets/User.svg";

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  // console.log("TeamCard", team);
  return (
    <Link to={`/teams/${team.id}`} className="flex min-w-[400px]">

      <div className="group relative w-full max-w-md overflow-hidden rounded-xl border-0 bg-gradient-to-br from-blue-600 to-blue-800 p-1 shadow-xl transition-all duration-300 hover:shadow-blue-500/20">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl filter" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl filter" />

        <div className="relative rounded-lg bg-blue-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-start justify-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 p-2 backdrop-blur-sm">
              {team.profile == "" ? (
                <Layers className="h-7 w-7 text-blue-100" />
              ) : (
                <img
                  src={team.profile}
                  alt="Team Profile"
                  className="h-7 w-7 rounded-full"
                />
              )}

            </div>
          </div>

          <div className="space-y-4 text-right">
            <h2 className="text-2xl font-bold text-white">{team.name}</h2>
            <p className="text-sm leading-relaxed text-blue-100 mb-4">
              {team.description}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex justify-start">

              {team.members.slice(0, 1).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-start">

                    <span className="text-sm font-medium text-white">
                      {member.name}
                    </span>
                    <span className="text-xs text-blue-100">{member.role}</span>
                  </div>
                  <div className="bg-blue-400/30 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-sm font-bold">
                      {member.avatar === "" ? (
                        member.name.charAt(0)
                      ) : (
                        <img
                          src={member.avatar}
                          alt="Team Profile"
                          className="h-7 w-7 rounded-full"
                        />
                      )}

                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
