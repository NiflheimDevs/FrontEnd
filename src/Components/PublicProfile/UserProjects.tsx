import { Color, Projects, Skill } from "./types";
import { Link } from "react-router-dom";

interface UserProjectsProps {
  project: Projects;
  localcolor: Color;
}

const UserProjects = ({ project, localcolor }: UserProjectsProps) => {
  return (
    <div className="w-full p-6 flex flex-col gap-4 bg-white rounded-2xl transition-all duration-300 box-shadow-custom">
      <h3 className="text-lg font-bold text-gray-800 font-[vazirmatn]">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 font-[vazirmatn] leading-relaxed">
        {project.description}
      </p>
      <div className="flex md:flex-row gap-4 sm:flex-row flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill: Skill) => (
            <span
              key={skill.id || skill.name}
              className={`flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-full transition-colors duration-200 bg-${localcolor.color} hover:bg-${localcolor.hover} shadow-sm font-[vazirmatn]`}
              aria-label={`مهارت: ${skill.name}`}
            >
              <span className="pointer-events-none">{skill.name}</span>
            </span>
          ))}
        </div>
        <Link to={`/detail/${project.id}`} key={project.id}>
          <button
            className={`flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-${localcolor.color} text-white text-sm font-[vazirmatn] rounded-full shadow-md hover:bg-${localcolor.hover} focus:ring-2 focus:ring-${localcolor.color} focus:ring-offset-2 transition-all duration-200`}
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
