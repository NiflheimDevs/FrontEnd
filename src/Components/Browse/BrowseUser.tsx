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

// --- CHANGE: Use a constant for the limit ---
const LIMIT = 6;

const BrowseUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [, setCategoryOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("نوع مرتب‌سازی");
  const [skills, setSkills] = useState<string[]>([]);
  const [, setSkillsLoading] = useState(true);
  const [skillsSearch, setSkillsSearch] = useState("");
  const sortOptions = ["جدیدترین", "قدیمی‌ترین"];

  // --- CHANGE: Added state for pagination and total count ---
  const [page, setPage] = useState(1);
  const [, setTotalCount] = useState(0);

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // --- CHANGE: Added effect to reset page when filters change ---
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSkills, selectedSort]);

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

  // --- CHANGE: Modified fetching logic ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      // This logic no longer prevents fetching on an empty search bar.
      try {
        let sort_by = "";
        let order = "";
        if (selectedSort === "جدیدترین") {
          order = "created_time";
          sort_by = "desc";
        } else if (selectedSort === "قدیمی‌ترین") {
          order = "created_time";
          sort_by = "asc";
        }
        const response = await GetUserSerachTeam(
          debouncedSearch, // query
          page,            // page (now from state)
          LIMIT,           // limit (now a constant)
          selectedSkills,  // skills
          order,
          sort_by
        );
        
        // Handle response consistently
        const usersArr = response?.users || response || [];
        setTotalCount(response?.count || usersArr.length);
        setUsers(usersArr);

      } catch (err: any) {
        setError(err?.message || "خطا در دریافت کاربران");
        setUsers([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [debouncedSearch, selectedSkills, selectedSort, page]); // --- CHANGE: Added `page` to dependency array

  // --- CHANGE: Added pagination handlers ---
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

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
    <div className="flex flex-col w-full min-h-screen py-6 px-4 sm:mt-0 mt-15 bg-gray-100 dark:bg-gray-800">
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

      {/* --- CHANGE: Removed special case for empty search --- */}
      <div className="flex flex-col gap-0 mt-4">
        {loading ? (
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

      {/* --- CHANGE: Added pagination controls --- */}
 {/* --- CHANGE: Added bottom margin `mb-8` --- */}
 <div className="flex justify-center items-center gap-2 my-4 mb-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="px-3 py-1 rounded border bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
          {page}
        </span>
        <button
          onClick={handleNext}
          disabled={users.length < LIMIT}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
      </div>
  );
};

export default BrowseUser;