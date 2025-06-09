import React from "react";
import { Link } from "react-router-dom";

type SearchResultType = "user" | "project" | "team";

interface SearchResultCardProps {
  type: SearchResultType;
  data: any;
  loading?: boolean;
}

const getAvatar = (type: SearchResultType, data: any) => {
  if (type === "user") return data.avatar;
  if (type === "project") return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // generic project icon
  if (type === "team") return data.profile;
};

const getTitle = (type: SearchResultType, data: any) => {
  if (type === "user") return data.name;
  if (type === "project") return data.title;
  if (type === "team") return data.name;
};

const getSubtitle = (type: SearchResultType, data: any) => {
  if (type === "user") return `نقش: ${data.role}`;
  if (type === "project") return `توضیحات: ${data.description}`;
  if (type === "team") return `توضیحات تیم: ${data.description}`;
};

const getTag = (type: SearchResultType, data: any) => {
  if (type === "user") return `مهارت: ${data.skill}`;
  if (type === "project") return data.tags?.length ? `تگ: ${data.tags[0]}` : "";
  if (type === "team") return data.members?.[0]?.name ? `عضو: ${data.members[0].name}` : "";
};

const getLink = (type: SearchResultType, data: any) => {
  if (type === "user") return `/profile/${data.id || data.name}`;
  if (type === "project") return `/detail/${data.project_id}`;
  if (type === "team") return `/teams/${data.id}`;
  return "#";
};

const typeColors = {
  user: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-700",
    hover: "hover:bg-green-100/60 dark:hover:bg-green-900/40 duration-300",
    tagBg: "bg-green-100 dark:bg-green-900",
    tagText: "text-green-600 dark:text-green-300"
  },
  project: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-700",
    hover: "hover:bg-blue-100/60 dark:hover:bg-blue-900/40 duration-300",
    tagBg: "bg-blue-100 dark:bg-blue-900",
    tagText: "text-blue-600 dark:text-blue-300"
  },
  team: {
    bg: "bg-orange-100 dark:bg-orange-900",
    border: "border-purple-200 dark:border-purple-700",
    hover: "hover:bg-purple-100/60 dark:hover:bg-purple-900/40 duration-300",
    tagBg: "bg-orange-100 dark:bg-orange-900",
    tagText: "text-orange-600 dark:text-orange-300"
  }
};

const typeLabels = {
  user: "کاربر",
  project: "پروژه",
  team: "تیم"
};

const SearchResultCard: React.FC<SearchResultCardProps> = ({ type, data, loading }) => {
  if (loading) {
    return (
      <div className="relative flex items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full mb-6 transition-all min-h-[6.5rem] hover:scale-102 hover:shadow-[0_0_24px_0_rgba(59,130,246,0.25)] hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-900/30 duration-200 outline-none focus:ring-2 focus:ring-blue-400" style={{ direction: 'rtl' }}>
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-4 border-blue-200 dark:border-blue-900 ml-6 shiny-skeleton"></div>
        <div className="flex flex-col justify-center flex-grow text-right">
          <h3 className="text-xl font-extrabold mb-2 leading-tight shiny-skeleton h-6 w-1/3 rounded-full"></h3>
            <p className="text-sm mb-2 line-clamp-2 shiny-skeleton h-4 w-2/3 rounded-full"></p>
            {/* <p className="text-sm mb-2 line-clamp-2 shiny-skeleton h-4 w-1/2 rounded-full"></p> */}
            <span className="text-sm px-3 py-1 rounded-full font-semibold mt-1 inline-block shiny-skeleton h-5 w-20 "></span>
      </div>
    </div>
  );
  }
  return (
    <Link
      to={getLink(type, data)}
      className="relative flex items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full mb-6 transition-all min-h-[6.5rem] hover:scale-102 duration-300 hover:shadow-[0_0_24px_0_rgba(59,130,246,0.25)] hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-900/30 duration-200 outline-none focus:ring-2 focus:ring-blue-400"
      style={{ direction: 'rtl' }}
    >
      {/* Type Tag */}
      <div className={`absolute top-3 left-3 text-sm px-3 py-1 rounded-full ${typeColors[type].tagBg} ${typeColors[type].tagText} font-bold shadow-sm`}>{typeLabels[type]}</div>
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-4 border-blue-200 dark:border-blue-900 ml-6">
        <img src={getAvatar(type, data)} alt={getTitle(type, data)} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center flex-grow text-right">
        <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 leading-tight">{getTitle(type, data)}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{getSubtitle(type, data)}</p>
        {getTag(type, data) && (
          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full w-fit font-semibold mt-1 inline-block">{getTag(type, data)}</span>
        )}
      </div>
    </Link>
  );
};

export default SearchResultCard; 