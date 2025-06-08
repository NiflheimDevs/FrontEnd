import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";
import Header from "../MainContent/Header";

const mockTeams = [
  { id: 1, name: "فرانت‌اند مسترز", description: "تیمی از متخصصان فرانت‌اند.", profile: "https://randomuser.me/api/portraits/men/12.jpg", members: [{ id: 1, name: "پارسا", role: "لید", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }] },
  { id: 2, name: "بک‌اند گوروز", description: "متخصصان سیستم‌های بک‌اند.", profile: "https://randomuser.me/api/portraits/men/13.jpg", members: [{ id: 2, name: "علی", role: "DevOps", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }] },
];

const browseteamlayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState<typeof mockTeams>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTeams(mockTeams);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = teams.filter((team) => {
    if (!search) return true;
    const text = `${team.name} ${team.description} ${(team.members || []).map((m: any) => m.name).join(" ")}`;
    return text.includes(search);
  });

  return (
    <div>
    <Header showSearch={false} />
    <div className="w-screen max-auto mx-auto h-screen bg-[#F7F7F7] dark:bg-gray-900 py-10 px-2 sm:px-8 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 text-center">جستجوی تیم‌ها</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">در این بخش می‌توانید تیم‌های مختلف را جستجو و مشاهده کنید.</p>
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی تیم..."
            className="w-full py-3 pr-12 pl-4 text-right bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 text-sm text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-0 mt-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SearchResultCard key={i} type="team" data={{}} loading />
            ))
          : filtered.map((team, i) => (
              <SearchResultCard key={i} type="team" data={team} />
            ))}
      </div>
    </div>
    </div>
  );
};

export default browseteamlayout; 