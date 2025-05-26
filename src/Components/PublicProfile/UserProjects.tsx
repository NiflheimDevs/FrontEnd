import { ReactElement } from "react";
import { Color, Projects, Skill } from "./types";
import { Link } from "react-router-dom";
import { FaMedal } from "react-icons/fa6";

interface UserProjectsProps {
  project: Projects;
  localcolor: Color;
}

const UserProjects = ({ project, localcolor }: UserProjectsProps) => {
  const getMedalIcon = (label: string): ReactElement => {
    switch (label) {
      case "Urgent":
        return <FaMedal size={22} color="#FFD700" />;
      case "Bold":
        return <FaMedal size={22} color="#A6A6A6" />;
      case "Free":
        return <FaMedal size={22} color="#CD7F32" />;
      default:
        return <FaMedal size={22} color="#A6A6A6" />;
    }
  };
  return (
    <div className="w-full p-6 flex flex-col gap-4 bg-white dark:bg-gray-600 border dark:border-gray-600 rounded-2xl transition-all duration-300 box-shadow-custom">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-300 font-[vazirmatn] flex flex-row gap-1">
        <span>{getMedalIcon(project.label)}</span>
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-[vazirmatn] leading-relaxed">
        {project.description}
      </p>
      <div className="flex md:flex-row gap-4 sm:flex-row flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill: Skill) => (
            <span
              key={skill.id || skill.name}
              className={`flex items-center gap-1 px-2 py-1 h-fit rounded-full bg-${localcolor.color} hover:bg-${localcolor.hover} dark:bg-${localcolor.darkcolor} dark:hover:bg-${localcolor.darkhover} transition-colors duration-200`}
              aria-label={`مهارت: ${skill.name}`}
            >
              <span className="text-white text-xs font-[vazirmatn] pointer-events-none">
                {skill.name}
              </span>
            </span>
          ))}
        </div>
        <Link
          to={`/detail/${project.id}`}
          className="flex items-end"
          key={project.id}
        >
          <button
            className={`flex items-center h-fit cursor-pointer justify-center whitespace-nowrap gap-2 px-4 py-2 bg-${localcolor.color} text-white text-sm font-[vazirmatn] rounded-full shadow-md hover:bg-${localcolor.hover} focus:ring-2 focus:ring-${localcolor.color} dark:bg-${localcolor.darkcolor} dark:hover:bg-${localcolor.darkhover} dark:focus:ring-${localcolor.darkcolor} focus:ring-offset-2 transition-all duration-200`}
            onClick={() =>
              console.log(`Show details for project: ${project.title}`)
            }
            aria-label={`نمایش جزئیات پروژه: ${project.title}`}
          >
            نمایش جزئیات
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProjects;
