import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';
import Sidebar from "../../Components/DashboardComp/Sidebar";
import Header from "../../Components/DashboardComp/Header";

const ProjectCreationConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleViewProjects = () => {
    navigate('/myprojects');
  };

  const handleCreateNewProject = () => {
    navigate('/createproject');
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <div className="container mx-auto md:px-4 sm:px-4 px-0 py-8 mt-15 lg:max-w-4xl">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Header toggleSidebar={toggleSidebar} />

        <div className="bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-400 md:scale-100 sm:scale-[90%] scale-[85%]">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            پروژه شما با موفقیت ایجاد شد
          </h1>

          <p className="text-gray-600 mb-6">
            تبریک! پروژه جدید شما با موفقیت در سیستم ثبت گردید.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <button 
              onClick={handleViewProjects}
              className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaProjectDiagram className="ml-2" />
              مشاهده پروژه‌ها
            </button>

            <button 
              onClick={handleCreateNewProject}
              className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
            >
              ساخت پروژه جدید
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCreationConfirmation;