/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Link } from "react-router-dom";
import { FaMedal } from "react-icons/fa6";

type SearchResultType = "user" | "project" | "team";

interface SearchResultCardProps {
  type: SearchResultType;
  data: any;
  loading?: boolean;
}

const getAvatar = (type: SearchResultType, data: any) => {
  if (type === "user")
    return (
      data?.profile ||
      data?.picture ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
  if (type === "project")
    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // generic project icon
  if (type === "team")
    return (
      data?.profile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
};

const getTitle = (type: SearchResultType, data: any) => {
  if (type === "user") {
    const first = data?.firstname || "";
    const last = data?.lastname || "";
    const fullName = `${first} ${last}`.trim();
    if (fullName !== "") return fullName;
    if (data?.name && data.name.trim() !== "") return data.name;
    if (data?.username) return `@${data.username}`;
    return "";
  }
  if (type === "project") return data?.title || "بدون عنوان";
  if (type === "team") return data?.name || "بدون نام تیم";
};

const getUsername = (type: SearchResultType, data: any) => {
  if (type === "user") return data?.username ? `${data.username}` : "";
  return "";
};

const getSubtitle = (type: SearchResultType, data: any) => {
  if (type === "user")
    return data?.bio ? `بیوگرافی: ${data.bio}` : "بیوگرافی: -";
  if (type === "project")
    return data?.description ? `توضیحات: ${data.description}` : "توضیحات: -";
  if (type === "team")
    return data?.description
      ? `توضیحات تیم: ${data.description}`
      : "توضیحات تیم: -";
};

const getAllTags = (type: SearchResultType, data: any) => {
  if (type === "user" && Array.isArray(data?.tags)) {
    return data.tags.map((tag: any) => tag.name || String(tag));
  }
  if (type === "project" && Array.isArray(data?.tags)) {
    return data.tags.map((tag: any) => tag.name || String(tag));
  }
  if (type === "team" && Array.isArray(data?.members)) {
    return data.members
      .filter((member: any) => member?.name)
      .map((member: any) => member.name);
  }
  return [];
};

const getLink = (type: SearchResultType, data: any) => {
  if (type === "user")
    return `/profile/${data?.user_id || data?.id || data?.name || "unknown"}`;
  if (type === "project")
    return `/ProjectDetail/${data?.project_id || data?.id || "unknown"}`;
  if (type === "team") return `/teams/${data?.id || "unknown"}`;
  return "#";
};

const typeColors = {
  user: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-700",
    hover: "hover:bg-green-100/60 dark:hover:bg-green-900/40 duration-300",
    tagBg: "bg-green-100 dark:bg-green-900",
    tagText: "text-green-600 dark:text-green-300",
  },
  project: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-700",
    hover: "hover:bg-blue-100/60 dark:hover:bg-blue-900/40 duration-300",
    tagBg: "bg-blue-100 dark:bg-blue-900",
    tagText: "text-blue-600 dark:text-blue-300",
  },
  team: {
    bg: "bg-orange-100 dark:bg-orange-900",
    border: "border-purple-200 dark:border-purple-700",
    hover: "hover:bg-purple-100/60 dark:hover:bg-purple-900/40 duration-300",
    tagBg: "bg-orange-100 dark:bg-orange-900",
    tagText: "text-orange-600 dark:text-orange-300",
  },
};

const typeLabels = {
  user: "کاربر",
  project: "پروژه",
  team: "تیم",
};

// Medal icon logic for project label
const getMedalIcon = (label: string | number | undefined) => {
  switch (label) {
    case "Urgent":
    case 1:
      return <FaMedal size={44} color="#FFD700" title="Urgent" />;
    case "Bold":
    case 2:
      return <FaMedal size={44} color="#A6A6A6" title="Bold" />;
    case "Free":
    case 3:
      return <FaMedal size={44} color="#CD7F32" title="Free" />;
    default:
      return <FaMedal size={44} color="#A6A6A6" title="Project" />;
  }
};

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  type,
  data,
  loading,
}) => {
  if (loading) {
    return (
      <div
        className="relative flex items-center bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full mb-6 transition-all min-h-[6.5rem] hover:scale-102 hover:shadow-[0_0_24px_0_rgba(59,130,246,0.25)] hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-900/30 duration-200 outline-none focus:ring-2 focus:ring-blue-400"
        style={{ direction: "rtl" }}
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-4 border-blue-200 dark:border-blue-900 ml-6 shiny-skeleton"></div>
        <div className="flex flex-col justify-center flex-grow text-right">
          <h3 className="text-xl font-extrabold mb-2 leading-tight shiny-skeleton h-6 w-1/3 rounded-full"></h3>
          <p className="text-sm mb-2 line-clamp-2 shiny-skeleton h-4 w-2/3 rounded-full"></p>
          <span className="text-sm px-3 py-1 rounded-full font-semibold mt-1 inline-block shiny-skeleton h-5 w-20"></span>
        </div>
      </div>
    );
  }

  const tags = getAllTags(type, data);
  const maxVisibleTags = 3; // Maximum number of tags to show before showing a chip

  return (
    <Link
      to={getLink(type, data)}
      className="relative flex items-center bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full mb-6 transition-all min-h-[6.5rem] hover:scale-102 duration-400 hover:shadow-[0_0_24px_0_rgba(59,130,246,0.25)] hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-900/30 duration-200 outline-none focus:ring-2 focus:ring-blue-400"
      style={{ direction: "rtl" }}
      data-tags={tags.join(",")} // Store all tags for search purposes
    >
      {/* Type Tag */}
      <div
        className={`absolute top-3 left-3 text-sm px-3 py-1 rounded-full ${typeColors[type].tagBg} ${typeColors[type].tagText} font-bold shadow-sm`}
      >
        {typeLabels[type]}
      </div>

      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-4 border-blue-200 dark:border-blue-900 ml-6 flex items-center justify-center bg-blue-50 dark:bg-blue-900">
        {type === "project" ? (
          getMedalIcon(data?.label)
        ) : (
          <img
            src={getAvatar(type, data)}
            alt={getTitle(type, data)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col justify-center flex-grow text-right">
        <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-1 leading-tight">
          {getTitle(type, data)}
        </h3>
        {type === "user" && getUsername(type, data) && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 ltr:text-left rtl:text-right">
            {getUsername(type, data)}
          </div>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
          {getSubtitle(type, data)}
        </p>

        {/* Render tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.slice(0, maxVisibleTags).map((tag: string, idx: number) => (
              <span
                key={idx}
                className={`text-xs ${typeColors[type].tagBg} ${typeColors[type].tagText} px-2 py-1 rounded-full font-semibold inline-block`}
              >
                {tag}
              </span>
            ))}
            {tags.length > maxVisibleTags && (
              <span
                className={`text-xs ${typeColors[type].tagBg} ${typeColors[type].tagText} px-2 py-1 rounded-full font-semibold inline-block`}
              >
                +{tags.length - maxVisibleTags}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SearchResultCard;
