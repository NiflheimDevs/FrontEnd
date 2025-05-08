import { Color, Teams } from "./types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import { RiTeamFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

interface TeamProfileCardProps {
  data: Teams;
  localcolor: Color;
}

const TeamProfileCard = ({ data, localcolor }: TeamProfileCardProps) => {
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);
  const [OwnerProfileExists, SetOwnerProfileExist] = useState<boolean>(true);
  return (
    <div className="w-full p-5 flex flex-col gap-4 box-shadow-custom rounded-2xl transition-all duration-300 transform">
      {/* Header */}
      <div className="flex items-center md:justify-between sm:justify-between justify-center md:flex-row sm:flex-row flex-col gap-3">
        {/* Team Image */}
        <div className="flex flex-row rounded-4xl box-shadow-custom border-2 min-w-47">
          <div className="relative w-14 h-14 border-2 shadow-sm rounded-full flex justify-center items-center">
            {ProfileExists ? (
              <>
                <img
                  src={data.profile}
                  alt={`پروفایل تیم`}
                  className={clsx(
                    "w-full h-full rounded-full object-cover border-2 shadow-sm",
                    `border-${localcolor.color}/30`
                  )}
                  onError={() => SetProfileExist(false)}
                />
                <span
                  className={clsx(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                    `bg-${localcolor.color}`
                  )}
                ></span>
              </>
            ) : (
              <RiTeamFill className="text-gray-400" size={36} />
            )}
          </div>
          {/* Title & Position */}
          <div className="flex-1 text-center px-4">
            <h3 className="text-lg font-bold text-gray-900 font-[vazirmatn] tracking-tight">
              {data.title}
            </h3>
            <p className="text-xs text-gray-500 font-[vazirmatn] mt-1">
              {data.position || ""}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1 rounded-4xl box-shadow-custom border-2 px-2 py-1 min-w-35">
          {/* Owner Image */}
          {OwnerProfileExists ? (
            <img
              src={data.owner.profile}
              alt={`${data.owner.member_info.firstname} ${data.owner.member_info.lastname}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              onError={() => SetOwnerProfileExist(false)}
            />
          ) : (
            <CgProfile className="text-gray-400" size={36} />
          )}
          {/* Owner Info */}
          <div className="flex items-center flex-col">
            <div className="flex items-center justify-center">
              <p className="text-sm font-semibold text-gray-800 font-[vazirmatn]">
                {data.owner.member_info.firstname}{" "}
                {data.owner.member_info.lastname}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span
                className={clsx(
                  "w-1.5 h-1.5 rounded-full",
                  `bg-${localcolor.color}`
                )}
              ></span>
              <p className="text-xs text-gray-500 font-[vazirmatn]">
                {data.owner.member_info.position || "مالک"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        {/* Description */}
        <p className="text-sm flex w-6/10 text-gray-600 font-[vazirmatn] md:text-right sm:text-right text-center">
          {data.description}
        </p>

        {/* View Details Button */}
        <Link
          to={`/team/${data.id}`}
          aria-label={`نمایش جزئیات تیم: ${data.title}`}
          className={clsx("flex items-center w-4/10 justify-end gap-2")}
        >
          <button
            className={`w-fit cursor-pointer bg-${localcolor.color} px-4 py-2 hover:bg-${localcolor.hover} focus:ring-2 focus:ring-${localcolor.color} focus:ring-offset-2 text-white text-sm font-[vazirmatn] rounded-full shadow-md transition-all duration-200`}
          >
            نمایش جزئیات
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TeamProfileCard;
