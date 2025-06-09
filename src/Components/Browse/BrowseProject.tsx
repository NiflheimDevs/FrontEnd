/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { GetLandingProjects } from "../../API";
// import SearchBar from "./SearchBar";
import SearchResultCard from "./SearchResultCard";
import FilterDropdown from "./FilterDropdown";

interface Project {
  project_id: number;
  title: string;
  description: string;
  label: string;
  timeLeft?: string;
  views?: number;
  tags?: string[];
}

const BrowseProject: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
 // State for filter dropdowns
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("دسته‌بندی");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("نوع مرتب‌سازی");

  // Sample filter options
  const categories = ["همه", "توسعه وب", "طراحی گرافیک", "دیجیتال مارکتینگ"];
  const skills = ["React", "Node.js", "Photoshop", "SEO"];
  const sortOptions = [
    "جدیدترین",
    "قدیمی‌ترین",
    "بیشترین پیشنهاد",
    "کمترین پیشنهاد",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await GetLandingProjects();
        const formattedProjects: Project[] = response.map((project: any) => ({
          project_id: project.project_id,
          title: project.title || "بدون عنوان",
          description: project.descriptoin || "بدون توضیحات", // Note: 'descriptoin' typo in API response
          label: project.label,
          timeLeft: "14 روز و 23 ساعت",
          views: 42,
          tags: [
            "SEO",
            "Photoshop",
            "Freelancing",
            "eCommerce",
            "Social Media",
          ],
        }));
        setProjects(formattedProjects);
      } catch (err) {
        setError("خطا در دریافت پروژه‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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

  const filtered = projects.filter((project) => {
    if (!search) return true;
    const text = `${project.title} ${project.description} ${(project.tags || []).join(" ")}`;
    return text.includes(search);
  });

  return (
    <div className="flex flex-col w-full min-h-screen py-6 px-4 sm:mt-0 mt-15 bg-gray-100 dark:bg-gray-900">
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
            <SearchResultCard key={i} type="project" data={{}} loading />
          ))
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">هیچ پروژه‌ای یافت نشد</p>
        ) : (
          filtered.map((project) => (
            <SearchResultCard key={project.project_id} type="project" data={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseProject;
