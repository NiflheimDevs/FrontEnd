/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Team/Layout";
import TeamMemberCard from "../../Components/Team/TeamMemberCard";
// import Pagination from './Pagination';
import AddMemberModal from "../../Components/Team/AddMemberModal";
import EditTeamModal from "../../Components/Team/EditTeamModal";
import DeleteTeamModal from "../../Components/Team/DeleteTeamModal"; // Import the DeleteTeamModal component
import {
  getTeam,
  deleteTeam,
  UpdateProfileTeam,
  DeleteProfileTeam,
  // getTeamRole,
} from "../../API";
import {
  User,
  Project,
  projects,
  TeamData,
  Permission,
} from "../../Components/Team/index";

// Define types based on the API response structure
interface TeamMember {
  member_info: {
    userid: number;
    username: string;
    firstname: string;
    lastname: string;
    position: string;
  };
  profile: string;
  role: string;
}

interface TeamInfo {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

interface TeamResponse {
  team_info: TeamInfo;
  members: TeamMember[];
  profile?: string;
  user_id: number;
  permissions: string[];
}

const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"members" | "projects">("members");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for delete modal
  const [isDeleting, setIsDeleting] = useState(false); // Add state for delete loading
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [teamProjects, setTeamProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const membersPerPage = 5;

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    if (!teamData) return false;
    return (teamData.permissions ?? []).includes(permission);
  };

  // Fetch team data from API when component mounts
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response: TeamResponse = await getTeam({}, id);

        // Transform API response to match our component's expected format
        const transformedData: TeamData = {
          id: response.team_info.id,
          name: response.team_info.title,
          description: response.team_info.description,
          members: response.members.map((member: TeamMember) => ({
            id: member.member_info.userid,

            name: `${member.member_info.firstname} ${member.member_info.lastname}`,
            username: member.member_info.username,
            email: "", // Not provided in API response
            avatar: member.profile || "", // Using profile as avatar
            role: member.role,
            position: member.member_info.position || "عضو",
          })),
          memberCount: response.members.length,
          createdAt: response.team_info.created_at,
          profileImage: response.profile,
          permissions: response.permissions as Permission[],
        };

        setTeamData(transformedData);

        // Fetch team projects (still using static data for now)
        // You'll need to replace this with an API call later
        const teamProjectsList = projects.filter(
          (project) => project.teamId === id
        );
        setTeamProjects(teamProjectsList);
      } catch (err: any) {
        console.error("Error fetching team data:", err);
        setError(err.message || "خطا در دریافت اطلاعات تیم");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [id]);

  // Handle team deletion
  const handleDeleteTeam = async () => {
    if (!id || !teamData) return;

    try {
      setIsDeleting(true);
      await deleteTeam(id); // Call your API function to delete the team

      // Navigate back to teams page after successful deletion
      navigate("/teams");

      // You could also add a toast notification here if you're using a notification library
      // toast.success("تیم با موفقیت حذف شد");
    } catch (err: any) {
      console.error("Error deleting team:", err);
      setError(err.message || "خطا در حذف تیم");
      // You could also add a toast notification for the error
      // toast.error("خطا در حذف تیم");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  // Calculate pagination for members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers =
    teamData?.members.slice(indexOfFirstMember, indexOfLastMember) || [];
  // const totalPages = Math.ceil((teamData?.members.length || 0) / membersPerPage);

  // Handle adding a new member to the team
  const handleAddMember = (user: User) => {
    if (!teamData) return;

    // Create updated user with role
    const updatedUser = { ...user };

    // Update team data with new member
    const updatedTeam = {
      ...teamData,
      members: [...teamData.members, updatedUser],
      memberCount: teamData.members.length + 1,
    };

    setTeamData(updatedTeam);
    setIsAddMemberModalOpen(false);

    // Here you would also make an API call to update the backend
    // Example: addTeamMember(id, { userId: user.id, role });
  };

  // const handleRoleChange = async (userId: number, newRole: string) => {
  //   if (!id || !teamData) return;

  //   try {
  //     // Call API to update the user's role
  //     await updateTeamMemberRole({
  //       user_id: userId,
  //       role: newRole,
  //       team_id: parseInt(id),
  //     });

  //     // Update the UI with the new role
  //     const updatedMembers = teamData.members.map((member) => {
  //       if (member.id === userId) {
  //         return { ...member, role: newRole };
  //       }
  //       return member;
  //     });

  //     const updatedTeam = {
  //       ...teamData,
  //       members: updatedMembers,
  //     };

  //     setTeamData(updatedTeam);
  //   } catch (error) {
  //     console.error("Error updating team member role:", error);
  //     setError("خطا در به‌روزرسانی نقش عضو تیم");
  //     // You could also add a toast notification for the error
  //   }
  // };

  const handleEditTeam = async (
    updatedTeam: TeamData,
    teamPictureFile: File | null
  ): Promise<void> => {
    try {
      // First update the basic team info
      // Here you would call your API to update the team info
      // Example: await updateTeam(id, { title: updatedTeam.name, description: updatedTeam.description });

      // Handle profile picture update
      if (teamPictureFile) {
        // Upload new profile picture
        const formData = new FormData();
        formData.append("file", teamPictureFile);

        const result = await UpdateProfileTeam(updatedTeam.id, formData);
        // Update the picture URL in the updatedTeam object
        updatedTeam.picture = result?.profile || updatedTeam.picture;
      } else if (updatedTeam.picture === null) {
        // && team.picture !== null
        // Delete profile picture if it was removed
        await DeleteProfileTeam(updatedTeam.id);
      }

      // Update the local state with the updated team
      setTeamData({
        ...updatedTeam,
        permissions: teamData?.permissions || [],
      });

      setIsEditTeamModalOpen(false);
    } catch (error) {
      console.error("Error updating team:", error);
      // Handle error (maybe show an error message)
    }
  };

  // Handle removing a member from the team
  const handleDeleteMember = (userId: number) => {
    if (!teamData || !hasPermission("REMOVE_MEMEBER")) return;

    const updatedMembers = teamData.members.filter(
      (member) => member.id !== userId
    );

    const updatedTeam = {
      ...teamData,
      members: updatedMembers,
      memberCount: updatedMembers.length,
    };

    setTeamData(updatedTeam);

    // Here you would also make an API call to update the backend
    // Example: removeTeamMember(id, userId);
  };

  // Navigate to team projects
  const navigateToTeamProjects = () => {
    navigate(`/Browsproject`);
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

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error || !teamData) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-700">
            {error || "تیم پیدا نشد"}
          </h2>
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

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3 ">
            {ProfileExists ? (
              <img
                src={teamData.profileImage}
                alt={teamData.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500  order-first md:order-first"
                onError={() => SetProfileExist(false)}
              />
            ) : (
              <div className="w-12 h-12 items-center justify-center flex bg-blue-400/30 text-xl font-semibold rounded-full object-cover border-2 border-blue-500  order-first md:order-first">
                {teamData.name.charAt(0)}
              </div>
            )}
            <h1 className="text-2xl font-bold text-right">{teamData.name}</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {hasPermission("ADD_MEMBER") && (
              <button
                onClick={() => setIsAddMemberModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded flex items-center justify-center"
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
            )}
            {hasPermission("EDIT_INFO") && (
              <button
                onClick={() => setIsEditTeamModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded flex items-center justify-center"
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
            )}
          </div>
        </div>

        <div className="text-right mb-8">
          <p className="text-gray-700">{teamData.description || " "}</p>
          {teamData.createdAt && (
            <p className="text-gray-500 text-sm mt-2">
              تاریخ ایجاد:{" "}
              {new Date(teamData.createdAt).toLocaleDateString("fa-IR")}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-center border-b">
            <button
              className={`py-2 px-4 md:px-8 cursor-pointer ${activeTab === "projects" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("projects")}
            >
              پروژه
            </button>
            <button
              className={`py-2 px-4 md:px-8 cursor-pointer ${activeTab === "members" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
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
                    canDelete={hasPermission("REMOVE_MEMEBER")}
                    canEditRole={hasPermission("EDIT_ROLE")}
                    canEditNickname={hasPermission("EDIT_NICKNAME")}
                    teamId={id ? parseInt(id) : undefined} // Pass the team ID
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

          {hasPermission("DELETE_TEAM") && (
            <button
              onClick={() => setIsDeleteModalOpen(true)} // Open the delete modal instead of window.confirm
              className="mr-4 bg-red-500 hover:bg-red-600 cursor-pointer text-white py-2 px-4 rounded transition-colors duration-300"
            >
              حذف تیم
            </button>
          )}
        </div>
      </div>

      {/* Add the modals */}
      {teamData && (
        <>
          <AddMemberModal
            isOpen={isAddMemberModalOpen}
            onClose={() => setIsAddMemberModalOpen(false)}
            onSubmit={handleAddMember}
            existingMemberIds={teamData.members.map((member) => member.id)}
            teamId={0}
          />

          <EditTeamModal
            isOpen={isEditTeamModalOpen}
            onClose={() => setIsEditTeamModalOpen(false)}
            onSubmit={handleEditTeam}
            team={teamData}
          />

          {/* Add the DeleteTeamModal */}
          <DeleteTeamModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => handleDeleteTeam()}
            teamId={teamData.id.toString()}
            teamName={teamData.name}
            isDeleting={isDeleting}
          />
        </>
      )}
    </Layout>
  );
};

export default TeamDetailPage;
