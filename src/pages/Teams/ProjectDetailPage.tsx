import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from './Layout';
import TeamMemberCard from './TeamMemberCard';
// import Pagination from './Pagination';
import { teams } from './staticData';
import { projects,Project, User } from './index';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [team, setTeam] = useState<any>(null);
  //const [currentPage, setCurrentPage] = useState(1);
  const [currentPage] = useState(1);
  //const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  //const [setIsAssignModalOpen] = useState(false);
  //const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //const [setIsEditModalOpen] = useState(false);
  const membersPerPage = 5;
  
  useEffect(() => {
    // Find project by ID
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      
      // Find the team for this project
      const foundTeam = teams.find(t => t.id === foundProject.teamId);
      if (foundTeam) {
        setTeam(foundTeam);
        
        // In a real app, you would fetch assigned users from API
        // For now, we'll just use mock data
        if (foundProject.assignedUsers.length === 0) {
          // Randomly assign some users from the team for demonstration
          const assignedUsers = foundTeam.members.slice(0, Math.floor(Math.random() * (foundTeam.members.length + 1)));
          foundProject.assignedUsers = assignedUsers;
        }
      }
    }
  }, [id]);
  
  if (!project) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-700">پروژه پیدا نشد</h2>
          <Link to="/projects" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
            بازگشت به صفحه پروژه‌ها
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Calculate pagination for assigned members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = project.assignedUsers.slice(indexOfFirstMember, indexOfLastMember);
  // const totalPages = Math.ceil(project.assignedUsers.length / membersPerPage);
  
  // Format date to Persian style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };
  
  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'در انتظار':
        return 'bg-yellow-100 text-yellow-800';
      case 'در حال انجام':
        return 'bg-blue-100 text-blue-800';
      case 'تکمیل شده':
        return 'bg-green-100 text-green-800';
      case 'لغو شده':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // const handleAssignMember = () => {
  //   setIsAssignModalOpen(true);
  // };
  
  // const handleEditProject = () => {
  //   setIsEditModalOpen(true);
  // };
  
  const handleRemoveMember = (userId: string) => {
    if (project) {
      const updatedUsers = project.assignedUsers.filter(user => user.id !== userId);
      setProject({
        ...project,
        assignedUsers: updatedUsers
      });
    }
  };
  
  // const handleStatusChange = (newStatus: "در انتظار" | "در حال انجام" | "تکمیل شده" | "لغو شده") => {
  //   if (project) {
  //     setProject({
  //       ...project,
  //       status: newStatus
  //     });
  //   }
  // };
  
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              //onClick={handleAssignMember}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              اضافه کردن عضو
            </button>
            <button
              //onClick={handleEditProject}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              ویرایش پروژه
            </button>
          </div>
          <h1 className="text-2xl font-bold text-right order-first md:order-last flex items-center">
            {project.title}
            <span className={`mr-2 text-xs rounded-full px-2 py-1 ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </h1>
        </div>
        
        <div className="text-right mb-8">
          <p className="text-gray-700">
            {project.description}
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-bold text-right mb-4">اطلاعات پروژه</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-500">{formatDate(project.deadline)}</span>
                <h4 className="text-gray-700 text-right">:مهلت تحویل</h4>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <button 
                    className="text-lg font-bold text-blue-500 flex items-center"
                    onClick={() => {/* Toggle status dropdown */}}
                  >
                    {project.status}
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Status dropdown would go here */}
                </div>
                <h4 className="text-gray-700 text-right">:وضعیت</h4>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-500">{team?.name || 'بدون تیم'}</span>
                <h4 className="text-gray-700 text-right">:تیم</h4>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-bold text-right mb-4">پیشرفت پروژه</h3>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{`${project.progress}%`}</span>
              <span className="text-gray-700">پیشرفت</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${
                  project.progress < 30 ? 'bg-red-500' : 
                  project.progress < 70 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`} 
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold text-right mb-4">اعضای منتسب به پروژه</h3>
          
          {project.assignedUsers.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              {currentMembers.map((user: User) => (
                <TeamMemberCard 
                  key={user.id} 
                  user={user} 
                  onDelete={handleRemoveMember}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-gray-500">هیچ عضوی به این پروژه اختصاص داده نشده است</p>
              <button
                //onClick={handleAssignMember}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                اختصاص عضو
              </button>
            </div>
          )}
          
          {/* {project.assignedUsers.length > membersPerPage && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
          )} */}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to={team ? `/teams/${team.id}/projects` : "/projects"} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition-colors duration-300"
          >
            بازگشت به لیست پروژه‌ها
          </Link>
        </div>
      </div>
      
      {/* Assign member modal would be implemented here */}
      {/* Edit project modal would be implemented here */}
    </Layout>
  );
};

export default ProjectDetailPage;