import React, { useState, useEffect } from "react";
import ProjectCard from "../../Components/Browse/ProjectCard";
import TeamCard from "../../Components/Team/TeamCard";
// import SearchBar from "../../Components/Browse/SearchBar";

// Simple UserCard for static mockup
const UserCard = ({ user }: { user: any }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 flex flex-col items-center text-center w-full max-w-xs mx-auto">
    <div className="w-20 h-20 rounded-full overflow-hidden mb-3 shiny-skeleton">
      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">{user.name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user.role}</p>
    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">{user.skill}</span>
  </div>
);

const mockUsers = [
  { name: "Parsa A.", role: "Fullstack Developer", skill: "React", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sara B.", role: "UI Designer", skill: "Figma", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Ali C.", role: "Backend Developer", skill: "Node.js", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
];

const mockProjects = [
  { project_id: 1, title: "Website Redesign", description: "Redesign a corporate website.", label: "Web", timeLeft: "10 روز", views: 12, tags: ["React", "UI"] },
  { project_id: 2, title: "SEO Optimization", description: "Improve SEO for an e-commerce site.", label: "SEO", timeLeft: "5 روز", views: 8, tags: ["SEO", "Marketing"] },
];

const mockTeams = [
  { id: 1, name: "Frontend Masters", description: "A team of frontend experts.", profile: "https://randomuser.me/api/portraits/men/12.jpg", members: [{ id: 1, name: "Parsa", role: "Lead", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }] },
  { id: 2, name: "Backend Gurus", description: "Specialists in backend systems.", profile: "https://randomuser.me/api/portraits/men/13.jpg", members: [{ id: 2, name: "Ali", role: "DevOps", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }] },
];

const BrowsePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" w-full bg-[#F7F7F7] dark:bg-gray-900 py-10 px-2 sm:px-8 animate-fadeIn">
      {/* USERS SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">کاربران</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="shiny-skeleton h-44 rounded-lg" />
              ))
            : mockUsers.map((user, i) => <UserCard key={i} user={user} />)}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">پروژه‌ها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-4">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="shiny-skeleton h-44 rounded-lg" />
              ))
            : mockProjects.map((project) => <ProjectCard key={project.project_id} project={project} />)}
        </div>
      </section>

      {/* TEAMS SECTION */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">تیم‌ها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-4">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="shiny-skeleton h-44 rounded-3xl" />
              ))
            : mockTeams.map((team) => <TeamCard key={team.id} team={team} />)}
        </div>
      </section>
    </div>
  );
};

export default BrowsePage; 