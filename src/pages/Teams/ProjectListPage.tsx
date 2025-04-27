import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ProjectCard from './ProjectCard';
// import Pagination from './Pagination';
import { projects } from './staticData';
import { Project, Team } from './index';
import { useParams, Link } from 'react-router-dom';
import { teams } from './staticData';

const ProjectListPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const projectsPerPage = 6;
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  
  // Get team data and filter projects by team
  useEffect(() => {
    if (teamId) {
      const team = teams.find(t => t.id === teamId);
      if (team) {
        setCurrentTeam(team);
        const teamProjects = projects.filter(project => project.teamId === teamId);
        setFilteredProjects(teamProjects);
      }
    } else {
      // If no teamId, show all projects
      setFilteredProjects(projects);
    }
  }, [teamId]);

  // Handle search
  useEffect(() => {
    if (teamId) {
      const teamProjects = projects.filter(project => 
        project.teamId === teamId && (
          project.title.includes(searchTerm) || 
          project.description.includes(searchTerm) ||
          project.status.includes(searchTerm)
        )
      );
      setFilteredProjects(teamProjects);
    } else {
      const results = projects.filter(project => 
        project.title.includes(searchTerm) || 
        project.description.includes(searchTerm) ||
        project.status.includes(searchTerm)
      );
      setFilteredProjects(results);
    }
    setCurrentPage(1);
  }, [searchTerm, teamId]);
  
  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };
  
  const handleProjectClick = (projectId: string) => {
    // Navigate to project details
    // This would be implemented with react-router in a real app
    console.log(`Navigate to project ${projectId}`);
    window.location.href = `/projects/${projectId}`;
  };
  
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:max-w-md order-2 md:order-1">
          <form onSubmit={handleSearch} className="flex">
            <button 
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-l-none rounded-r"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="جستجوی پروژه ها"
              className="w-full border border-gray-300 p-2 rounded-l text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        
        <div className="w-full md:w-auto flex justify-between order-1 md:order-2">
          {currentTeam && (
            <Link 
              to={`/teams/${currentTeam.id}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2"
            >
              بازگشت به تیم
            </Link>
          )}
          
          <button
            onClick={handleCreateProject}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            پروژه جدید
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleProjectClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-600">هیچ پروژه‌ای یافت نشد</p>
            <button
              onClick={handleCreateProject}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              ایجاد پروژه جدید
            </button>
          </div>
        )}
      </div>
      
      {filteredProjects.length > projectsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
        />
      )}
      
      {/* Project creation modal would be implemented here */}
      {/* Similar to CreateTeamModal */}
    </Layout>
  );
};

export default ProjectListPage;