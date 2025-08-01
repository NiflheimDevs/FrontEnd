/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { searchProjects, getTags } from "../../API";
// import SearchBar from "./SearchBar";it
import SearchResultCard from "./SearchResultCard";
import FilterDropdown from "./FilterDropdown";

interface Project {
  project_id: number;
  title: string;
  description: string;
  label: number;
  // timeLeft?: string;
  // views?: number;
  // tags?: string[];
}

const LIMIT = 6;

const BrowseProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("نوع مرتب‌سازی");
  const [tags, setTags] = useState<string[]>([]);
  const [, setTagsLoading] = useState(true);
  const [, setTagsError] = useState<string | null>(null);
  const [tagsSearch, setTagsSearch] = useState("");
  const sortOptions = ["جدیدترین", "قدیمی‌ترین"];
  const [page, setPage] = useState(1);
  const [, setTotalCount] = useState(0);

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset page to 1 when search or filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSkills, selectedSort]);

  // Fetch tags for skills dropdown
  useEffect(() => {
    const fetchTags = async () => {
      setTagsLoading(true);
      setTagsError(null);
      try {
        const tagsData = await getTags();
        if (Array.isArray(tagsData)) {
          if (typeof tagsData[0] === "string") {
            setTags(tagsData);
          } else if (typeof tagsData[0] === "object" && tagsData[0] !== null) {
            setTags(tagsData.map((tag: any) => tag.name || tag.title || tag.value || ""));
          } else {
            setTags([]);
          }
        } else {
          setTags([]);
        }
      } catch (err: any) {
        setTagsError(err?.message || "خطا در دریافت تگ‌ها");
        setTags([]);
      }
      setTagsLoading(false);
    };
    fetchTags();
  }, []);

  // Always use searchProjects, even if search is empty
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        let sort_by = "";
        let order = "";
        if (selectedSort === "جدیدترین") {
          sort_by = "created_time";
          order = "desc";
        } else if (selectedSort === "قدیمی‌ترین") {
          sort_by = "created_time";
          order = "asc";
        }
        const response = await searchProjects(
          debouncedSearch, // query (can be empty string)
          selectedSkills,   // tags
          page,             // page
          LIMIT,            // limit
          order,
          sort_by
        );
        const projectsArr = response?.projects || response || [];
        setTotalCount(response?.count || projectsArr.length);
        const formattedProjects: Project[] = projectsArr.map((project: any) => ({
          project_id: project.project_id || project.id || "unknown",
          title: project.title || "بدون عنوان",
          description: project.description || project.descriptoin || "بدون توضیحات",
          label: typeof project.label === 'number' ? project.label : Number(project.label ?? ""),
          tags: Array.isArray(project.tags) ? project.tags : [],
        }));
        setProjects(formattedProjects);
      } catch (err) {
        setError("خطا در دریافت پروژه‌ها");
        setProjects([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [debouncedSearch, selectedSkills, selectedSort, page]);

  // Remove totalPages and page number buttons
  // Pagination controls
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
      if (selectedSkills.length === 0) return "تگ‌ها";
      if (selectedSkills.length === 1) return selectedSkills[0];
      return `${selectedSkills[0]} +${selectedSkills.length - 1}`;
    };

  return (
    <div className="flex flex-col w-full min-h-screen py-6 px-4 sm:mt-0 mt-15 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 text-center">جستجوی پروژه‌ها</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">در این بخش می‌توانید پروژه‌های مختلف را جستجو و مشاهده کنید.</p>
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی پروژه..."
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
            // setCategoryOpen(false); // Removed as per new_code
            setSortOpen(false);
          }}
          selectedValue={getSkillsDisplayText()}
          options={tags.filter((tag) => tag.toLowerCase().includes(tagsSearch.toLowerCase()))}
          onSelect={toggleSkill}
          isMultiSelect
          selectedValues={selectedSkills}
          renderSearchBar={() => (
            <input
              type="text"
              value={tagsSearch}
              onChange={(e) => setTagsSearch(e.target.value)}
              placeholder="جستجوی تگ..."
              className="w-full py-2 px-3 mb-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        <FilterDropdown
          isOpen={sortOpen}
          toggleDropdown={() => {
            setSortOpen(!sortOpen);
            // setCategoryOpen(false); // Removed as per new_code
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
            <SearchResultCard key={i} type="project" data={{}} loading />
          ))
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">هیچ پروژه‌ای یافت نشد</p>
        ) : (
          projects.map((project) => (
            <SearchResultCard key={project.project_id} type="project" data={project} />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
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
    disabled={projects.length < LIMIT}
    className="px-3 py-1 rounded border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
  >
    بعدی
  </button>
  </div>
  </div>
);
};

export default BrowseProject;
