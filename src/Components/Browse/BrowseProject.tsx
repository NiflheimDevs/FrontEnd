/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { GetLandingProjects } from "../../API";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import ProjectCard from "./ProjectCard";

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

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await GetLandingProjects();
        const formattedProjects: Project[] = response.map((project: any) => ({
          project_id: project.project_id,
          title: project.title || "بدون عنوان",
          description: project.descriptoin || "بدون توضیحات",
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

  return (
    <div className="flex flex-col w-full py-6 px-4 font-vazirmatn">
      <SearchBar />
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
      <div className="space-y-6">
        {loading ? (
          <p className="text-center">در حال بارگذاری...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center">هیچ پروژه‌ای یافت نشد</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseProject;
