import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import TeamMemberCard from "./TeamMemberCard";
// import Pagination from './Pagination';
import AddMemberModal from "./AddMemberModal";
import EditTeamModal from "./EditTeamModalProps";
import { teams } from "./staticData";
import { User, Team, Project, projects } from "./index";

const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //const [currentPage, setCurrentPage] = useState(1);
  const [currentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"members" | "projects">("members");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  // Add state to manage the team data
  const [teamData, setTeamData] = useState<Team | undefined>(
    teams.find((team) => team.id === id)
  );
  // Add state to store team's projects
  const [teamProjects, setTeamProjects] = useState<Project[]>([]);

  const membersPerPage = 5;

  // Fetch team's projects when component mounts or team changes
  useEffect(() => {
    if (id) {
      const teamProjectsList = projects.filter(
        (project) => project.teamId === id
      );
      setTeamProjects(teamProjectsList);
    }
  }, [id, projects]);

  if (!teamData) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-700">تیم پیدا نشد</h2>
          <Link
            to="/teams"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
          >
            بازگشت به صفحه تیم
          </Link>
        </div>
      </Layout>
    );
  }

  // Calculate pagination for members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = teamData.members.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  // const totalPages = Math.ceil(teamData.members.length / membersPerPage);

  // Handle adding a new member to the team
  const handleAddMember = (user: User, role: string) => {
    // Create updated user with role
    const updatedUser = { ...user, role };

    // Update team data with new member
    const updatedTeam = {
      ...teamData,
      members: [...teamData.members, updatedUser],
      memberCount: teamData.members.length + 1,
    };

    setTeamData(updatedTeam);
    setIsAddMemberModalOpen(false);
  };

  // Handle updating the team data
  const handleEditTeam = (updatedTeam: Team) => {
    setTeamData(updatedTeam);
    setIsEditTeamModalOpen(false);
  };

  // Handle removing a member from the team
  const handleDeleteMember = (userId: string) => {
    const updatedMembers = teamData.members.filter(
      (member) => member.id !== userId
    );

    const updatedTeam = {
      ...teamData,
      members: updatedMembers,
      memberCount: updatedMembers.length,
    };

    setTeamData(updatedTeam);
  };

  // Navigate to team projects
  const navigateToTeamProjects = () => {
    navigate(`/teams/${id}/projects`);
  };

  // Navigate to add new project page
  const handleAddProject = () => {
    // This would typically navigate to a create project page with the team pre-selected
    navigate(`/projects/new?teamId=${id}`);
  };

  // Get project status badge color
  const getStatusBadgeColor = (status: any) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get formatted status text
  const getStatusText = (status: any) => {
    switch (status) {
      case "completed":
        return "تکمیل شده";
      case "in_progress":
        return "در حال انجام";
      case "planned":
        return "برنامه‌ریزی شده";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              اضافه کردن عضو
            </button>
            <button
              onClick={() => setIsEditTeamModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              ویرایش تیم
            </button>
          </div>
          <h1 className="text-2xl font-bold text-right order-first md:order-first">
            {teamData.name}
          </h1>
        </div>

        <div className="text-right mb-8">
          <p className="text-gray-700">{teamData.description || " "}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center border-b">
            <button
              className={`py-2 px-4 md:px-8 ${activeTab === "projects" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("projects")}
            >
              پروژه
            </button>
            <button
              className={`py-2 px-4 md:px-8 ${activeTab === "members" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("members")}
            >
              اعضاء
            </button>
          </div>
        </div>

        {activeTab === "members" && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-right mb-4">اعضای تیم</h2>
            <p className="text-gray-600 text-right mb-6">
              مدیریت تیم و تقسیم نقش ها بین کاربران
            </p>

            <div className="border rounded-lg overflow-hidden">
              {currentMembers.length > 0 ? (
                currentMembers.map((member: User) => (
                  <TeamMemberCard
                    key={member.id}
                    user={member}
                    onDelete={() => handleDeleteMember(member.id)}
                  />
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  هیچ عضوی یافت نشد
                </div>
              )}
            </div>

            {/* {teamData.members.length > membersPerPage && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage}
              />
            )} */}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-right mb-4">پروژه های تیم</h2>
            <p className="text-gray-600 text-right mb-6">
              پروژه های در حال انجام و اتمام شده
            </p>

            <div className="border rounded-lg overflow-hidden">
              {teamProjects.length > 0 ? (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            نام پروژه
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            وضعیت
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            تاریخ شروع
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            تاریخ پایان
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teamProjects.map((project: any) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {project.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.description &&
                                  project.description.substring(0, 60)}
                                {project.description &&
                                project.description.length > 60
                                  ? "..."
                                  : ""}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(project.status)}`}
                              >
                                {getStatusText(project.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {/* {project.startDate} */} 6/12
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {/* {project.endDate || "-"} */} 12/6
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/detail/${project.id}`}
                                className="text-blue-600 hover:text-blue-900 ml-4"
                              >
                                مشاهده
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-gray-600">
                      {teamProjects.length} پروژه برای این تیم موجود است
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="mt-4 text-gray-600">
                    هیچ پروژه ای برای این تیم ثبت نشده است
                  </p>
                </div>
              )}
              <div className="text-center p-4">
                <button
                  onClick={handleAddProject}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  افزودن پروژه جدید
                </button>
                {teamProjects.length > 0 && (
                  <button
                    onClick={navigateToTeamProjects}
                    className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  >
                    مشاهده همه پروژه ها
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/teams"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition-colors duration-300"
          >
            بازگشت به صفحه تیم
          </Link>
        </div>
      </div>

      {/* Add the modals */}
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onSubmit={handleAddMember}
        existingMemberIds={teamData.members.map((member) => member.id)}
      />

      <EditTeamModal
        isOpen={isEditTeamModalOpen}
        onClose={() => setIsEditTeamModalOpen(false)}
        onSubmit={handleEditTeam}
        team={teamData}
      />
    </Layout>
  );
};

export default TeamDetailPage;
