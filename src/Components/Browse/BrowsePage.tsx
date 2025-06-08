import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";
// import { Search } from "lucide-react";
// import SearchBar from "./SearchBar";



const mockUsers = [
  { user_id: 1, name: "علی رضایی", role: "توسعه‌دهنده وب با تجربه در React و Node.js", skill: "React, Node.js, JavaScript", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { user_id: 2, name: "مریم کاظمی", role: "طراح گرافیک متخصص در Photoshop و Illustrator", skill: "Photoshop, Illustrator, طراحی", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { user_id: 3, name: "محمد حسینی", role: "متخصص دیجیتال مارکتینگ با تمرکز بر SEO", skill: "SEO, بازاریابی, محتوا", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { user_id: 4, name: "سارا احمدی", role: "برنامه‌نویس موبایل با تخصص در Flutter و Dart", skill: "Flutter, Dart, موبایل", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
  { user_id: 5, name: "رضا محمدی", role: "متخصص امنیت سایبری و تست نفوذ", skill: "امنیت, تست نفوذ, شبکه", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
  { user_id: 6, name: "نازنین زهرا", role: "طراح تجربه کاربری (UX) و رابط کاربری (UI)", skill: "UX, UI, طراحی", avatar: "https://randomuser.me/api/portraits/women/48.jpg" },
];

const mockProjects = [
  { project_id: 1, title: "بازطراحی وبسایت", description: "بازطراحی یک وبسایت شرکتی.", label: "وب", timeLeft: "10 روز", views: 12, tags: ["React", "UI"] },
  { project_id: 2, title: "بهینه‌سازی سئو", description: "بهبود سئو برای یک فروشگاه اینترنتی.", label: "سئو", timeLeft: "5 روز", views: 8, tags: ["SEO", "Marketing"] },
];

const mockTeams = [
  { id: 1, name: "فرانت‌اند مسترز", description: "تیمی از متخصصان فرانت‌اند.", profile: "https://randomuser.me/api/portraits/men/12.jpg", members: [{ id: 1, name: "پارسا", role: "لید", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }] },
  { id: 2, name: "بک‌اند گوروز", description: "متخصصان سیستم‌های بک‌اند.", profile: "https://randomuser.me/api/portraits/men/13.jpg", members: [{ id: 2, name: "علی", role: "DevOps", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }] },
];

type MixedItem = { type: "user"; data: any } | { type: "project"; data: any } | { type: "team"; data: any };
function shuffleAndMix(users: any[], projects: any[], teams: any[]): MixedItem[] {
  const all: MixedItem[] = [
    ...users.map((u) => ({ type: "user" as const, data: u })),
    ...projects.map((p) => ({ type: "project" as const, data: p })),
    ...teams.map((t) => ({ type: "team" as const, data: t })),
  ];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

const FILTERS = [
  { label: "همه", value: "all", color: "gray" as const },
  { label: "کاربران", value: "user", color: "green" as const },
  { label: "پروژه‌ها", value: "project", color: "blue" as const },
  { label: "تیم‌ها", value: "team", color: "orange" as const },
];

type FilterColor = "gray" | "green" | "blue" | "orange";

const COLOR_MAP: Record<FilterColor, { active: string; inactive: string }> = {
  gray: {
    active: "bg-gray-400 text-white border-gray-400 dark:bg-gray-600 dark:border-gray-600",
    inactive: "bg-white dark:bg-gray-700 text-gray-500 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
  },
  green: {
    active: "bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500",
    inactive: "bg-white dark:bg-gray-700 text-green-600 border-green-400 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900"
  },
  blue: {
    active: "bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600",
    inactive: "bg-white dark:bg-gray-700 text-blue-600 border-blue-500 dark:text-blue-300 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600"
  },
  orange: {
    active: "bg-orange-600 text-white border-orange-600 dark:bg-orange-500 dark:border-orange-500",
    inactive: "bg-white dark:bg-gray-700 text-orange-600 border-orange-300 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900"
  }
};

const BrowsePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mixed, setMixed] = useState<MixedItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMixed(shuffleAndMix(mockUsers, mockProjects, mockTeams));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filtering logic
  const filtered = mixed.filter((item) => {
    if (filter !== "all" && item.type !== filter) return false;
    if (!search) return true;
    const text =
      item.type === "user"
        ? `${item.data.name} ${item.data.role} ${item.data.skill}`
        : item.type === "project"
        ? `${item.data.title} ${item.data.description} ${(item.data.tags || []).join(" ")}`
        : `${item.data.name} ${item.data.description} ${(item.data.members || []).map((m: any) => m.name).join(" ")}`;
    return text.includes(search);
  });

  return (
    <div className="mx-full bg-[#F7F7F7] dark:bg-gray-900 py-10 px-2 sm:px-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 text-center">جستجو</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
         در این بخش، پروژه‌ها ٬ تیم‌ها یا کاربرانی که با عبارت جستجوی شما مطابقت دارند نمایش داده می‌شوند. برای مشاهده جزئیات بیشتر، روی هر نتیجه کلیک کنید.
         </p>
      {/* SearchBar */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو..."
            className="w-full py-3 pr-12 pl-4 text-right bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 text-sm text-gray-700 dark:text-gray-200"
          />
        </div>
        {/* Filter tags */}
        <div className="flex flex-row gap-2 mt-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                filter === f.value
                  ? COLOR_MAP[f.color].active
                  : COLOR_MAP[f.color].inactive
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-0 mt-4">
        {loading
          ? Array.from({ length: 7 }).map((_, i) => (
              <SearchResultCard key={i} type="user" data={{}} loading />
            ))
          : filtered.map((item, i) => (
              <SearchResultCard key={i} type={item.type} data={item.data} />
            ))}
      </div>
    </div>
  );
};

export default BrowsePage; 