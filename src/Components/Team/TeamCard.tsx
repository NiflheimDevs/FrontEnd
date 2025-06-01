import React, { useState } from "react";
import { Team } from "./index";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { truncateText } from "../Biders/types";
// import UserPic from "../../assets/User.svg";

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  // console.log("TeamCard", team);
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);
  const [AvatarExists, SetAvatarExist] = useState<boolean>(true);
  return (
    <Link
      to={`/teams/${team.id}`}
      className="relative bg-gradient-to-br from-[#5189CA] to-[#1E3A8A] rounded-3xl w-full min-w-[250px] max-w-[335.06px] flex flex-col glowing-card overflow-hidden mx-auto hover:scale-103 duration-400 transition-all h-full dark:from-[#1C2B48] dark:to-[#0B1226] glowing-shadow hover:shadow-[0px_0px_20px_rgba(81,137,202,0.8)]"
    >
      <div className="group relative w-full max-w-md overflow-hidden rounded-xl border-0 bg-white/10 dark:bg-white/5 bg-gradient-to-br p-1 shadow-xl transition-all duration-300 h-full">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl filter dark:bg-blue-400/10" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl filter dark:bg-blue-300/10" />

        <div className="relative rounded-lg px-6 py-4 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex p-1">
              {team.name}
            </h2>
            <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-white/10 p-2 backdrop-blur-sm dark:bg-white/5">
              {ProfileExists ? (
                <img
                  src={team.profile}
                  alt="Team Profile"
                  className="h-12 w-12 min-w-12 min-h-12 rounded-full"
                  onError={() => SetProfileExist(false)}
                />
              ) : (
                <Layers className="h-10 w-10 text-blue-100 dark:text-blue-200" />
              )}
            </div>
          </div>

          <div className="text-right ">
            <p className="text-sm leading-relaxed text-blue-100 mb-4 dark:text-blue-200">
              {truncateText(team.description, 50)}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex justify-start">
              {team.members.slice(0, 1).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm dark:bg-white/5"
                >
                  <div className="bg-blue-400/30 w-8 h-8 rounded-full flex items-center justify-center dark:bg-blue-400/20">
                    {AvatarExists ? (
                      <img
                        src={member.avatar}
                        alt="Team Profile"
                        className="h-7 min-h-7 min-w-7 w-7 rounded-full flex"
                        onError={() => SetAvatarExist(false)}
                      />
                    ) : (
                      <span className="text-white text-sm text-center font-semibold flex justify-center items-center">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start mr-2">
                    <span className="text-sm font-medium text-white">
                      {member.name}
                    </span>
                    <span className="text-xs text-blue-100 dark:text-blue-200">{member.role}</span>
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
