/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";
import FilterDropdown from "./FilterDropdown";

interface User {
  user_id: number;
  name: string;
  role: string;
  skill: string;
  avatar: string;
}

const BrowseUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  // State for filter dropdowns
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("دسته‌بندی");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("نوع مرتب‌سازی");

  // Sample filter options
  const categories = ["همه", "توسعه‌دهندگان", "طراحان", "بازاریابان"];
  const skills = ["React", "Node.js", "Photoshop", "SEO"];
  const sortOptions = [
    "جدیدترین",
    "قدیمی‌ترین",
    "بیشترین امتیاز",
    "کمترین امتیاز",
  ];

  useEffect(() => {
    // Mock data for users since API is not available
    const mockUsers: User[] = [
        { user_id: 1, name: "علی رضایی", role: "توسعه‌دهنده وب با تجربه در React و Node.js", skill: "React, Node.js, JavaScript", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { user_id: 2, name: "مریم کاظمی", role: "طراح گرافیک متخصص در Photoshop و Illustrator", skill: "Photoshop, Illustrator, طراحی", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { user_id: 3, name: "محمد حسینی", role: "متخصص دیجیتال مارکتینگ با تمرکز بر SEO", skill: "SEO, بازاریابی, محتوا", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
        { user_id: 4, name: "سارا احمدی", role: "برنامه‌نویس موبایل با تخصص در Flutter و Dart", skill: "Flutter, Dart, موبایل", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
        { user_id: 5, name: "رضا محمدی", role: "متخصص امنیت سایبری و تست نفوذ", skill: "امنیت, تست نفوذ, شبکه", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
        { user_id: 6, name: "نازنین زهرا", role: "طراح تجربه کاربری (UX) و رابط کاربری (UI)", skill: "UX, UI, طراحی", avatar: "https://randomuser.me/api/portraits/women/48.jpg" },
    ];
    // Simulate loading delay of 2 seconds
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 2000);
  }, []);

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Display text for skills dropdown
  const getSkillsDisplayText = () => {
    if (selectedSkills.length === 0) return "مهارت‌ها";
    if (selectedSkills.length === 1) return selectedSkills[0];
    return `${selectedSkills[0]} +${selectedSkills.length - 1}`;
  };

  const filtered = users.filter((user) => {
    if (!search) return true;
    const text = `${user.name} ${user.role} ${user.skill ? user.skill.split(',').join(' ') : ''}`;
    return text.includes(search);
  });

  return (
    <div className="flex flex-col w-full py-6 px-4 sm:mt-0 mt-15 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 text-center">جستجوی کاربران</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">در این بخش می‌توانید کاربران مختلف را جستجو و مشاهده کنید.</p>
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی کاربر..."
            className="w-full py-3 pr-12 pl-4 text-right bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400 text-sm text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="relative flex justify-center gap-8 mb-6 flex-wrap">
        <FilterDropdown
          isOpen={categoryOpen}
          toggleDropdown={() => {
            setCategoryOpen(!categoryOpen);
            setSkillsOpen(false);
            setSortOpen(false);
          }}
          selectedValue={selectedCategory}
          options={categories}
          onSelect={(value) => {
            setSelectedCategory(value);
            setCategoryOpen(false);
          }}
        />
        <FilterDropdown
          isOpen={skillsOpen}
          toggleDropdown={() => {
            setSkillsOpen(!skillsOpen);
            setCategoryOpen(false);
            setSortOpen(false);
          }}
          selectedValue={getSkillsDisplayText()}
          options={skills}
          onSelect={toggleSkill}
          isMultiSelect
          selectedValues={selectedSkills}
        />
        <FilterDropdown
          isOpen={sortOpen}
          toggleDropdown={() => {
            setSortOpen(!sortOpen);
            setCategoryOpen(false);
            setSkillsOpen(false);
          }}
          selectedValue={selectedSort}
          options={sortOptions}
          onSelect={(value) => {
            setSelectedSort(value);
            setSortOpen(false);
          }}
        />
      </div>
      <div className="flex flex-col gap-0 mt-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SearchResultCard key={i} type="user" data={{}} loading />
          ))
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">هیچ کاربری یافت نشد</p>
        ) : (
          filtered.map((user) => (
            <SearchResultCard key={user.user_id} type="user" data={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseUser; 