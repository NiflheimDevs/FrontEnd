/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchResultCard";
import FilterDropdown from "./FilterDropdown";
import { GetUserSerachTeam, getTags } from "../../API";

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
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // State for filter dropdowns
  const [, setCategoryOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  // const [] = useState("دسته‌بندی");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("نوع مرتب‌سازی");
  const page = 1;
  const [limit] = useState(10); // Default page size

  // Sample filter options
  // Tags/skills state and search for skills dropdown
  const [skills, setSkills] = useState<string[]>([]);
  const [, setSkillsLoading] = useState(true);
  const [skillsSearch, setSkillsSearch] = useState("");
  const sortOptions = [
    "جدیدترین",
    "قدیمی‌ترین",
    // "بیشترین امتیاز",
    // "کمترین امتیاز",
  ];

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch tags for skills dropdown
  useEffect(() => {
    const fetchTags = async () => {
      setSkillsLoading(true);
      try {
        const tagsData = await getTags();
        if (Array.isArray(tagsData)) {
          if (typeof tagsData[0] === "string") {
            setSkills(tagsData);
          } else if (typeof tagsData[0] === "object" && tagsData[0] !== null) {
            setSkills(tagsData.map((tag: any) => tag.name || tag.title || tag.value || ""));
          } else {
            setSkills([]);
          }
        } else {
          setSkills([]);
        }
      } catch (err: any) {
        setSkills([]);
      }
      setSkillsLoading(false);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      // Only call API if there is a search query or selected skills
      if (!debouncedSearch && (!selectedSkills || selectedSkills.length === 0)) {
        setUsers([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        let sort_by = "";
        let order = "";
        if (selectedSort === "جدیدترین") {
          order = "created_time";
          sort_by = "desc";
        } else if (selectedSort === "قدیمی‌ترین") {
          order = "created_time";
          sort_by = "asc";
        } 
        // else if (selectedSort === "بیشترین امتیاز") {
        //   order = "score";
        //   sort_by = "desc";
        // } else if (selectedSort === "کمترین امتیاز") {
        //   order = "score";
        //   sort_by = "asc";
        // }
        const response = await GetUserSerachTeam(
          debouncedSearch, // query: string
          page,            // page: number
          limit,           // limit: number
          selectedSkills,  // skills: string[]
          order,           // order: string
          sort_by          // sort_by: string
        );
        if (Array.isArray(response)) {
          setUsers(response);
        } else if (response && Array.isArray(response.users)) {
          setUsers(response.users);
        } else {
          setUsers([]);
        }
      } catch (err: any) {
        setTimeout(() => {
          setError(err?.message || "خطا در دریافت کاربران");
          setUsers([]);
        }, 100);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [debouncedSearch, selectedSkills, selectedSort]);

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

  return (
    <div className="flex flex-col w-full py-6 px-4 sm:mt-0 mt-15 bg-gray-100 dark:bg-gray-800">
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
        {/* <FilterDropdown
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
        /> */}
        <FilterDropdown
          isOpen={skillsOpen}
          toggleDropdown={() => {
            setSkillsOpen(!skillsOpen);
            setCategoryOpen(false);
            setSortOpen(false);
          }}
          selectedValue={getSkillsDisplayText()}
          options={skills.filter((skill) => skill.toLowerCase().includes(skillsSearch.toLowerCase()))}
          onSelect={toggleSkill}
          isMultiSelect
          selectedValues={selectedSkills}
          renderSearchBar={() => (
            <input
              type="text"
              value={skillsSearch}
              onChange={(e) => setSkillsSearch(e.target.value)}
              placeholder="جستجوی مهارت..."
              className="w-full py-2 px-3 mb-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
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
        {search.trim() === "" ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-5xl mb-4">🔎</span>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">جستجو کن!</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">برای پیدا کردن کاربران مورد علاقه‌ات، کلمه کلیدی یا مهارت مورد نظر را در نوار جستجو وارد کن.</p>
          </div>
        ) : loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SearchResultCard key={i} type="user" data={{}} loading />
          ))
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">هیچ کاربری یافت نشد</p>
        ) : (
          users.map((user) => (
            <SearchResultCard key={user.user_id} type="user" data={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseUser; 