import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Team/Layout";
import TeamMemberCard from "../../Components/Team/TeamMemberCard";
import AddMemberModal from "../../Components/Team/AddMemberModal";
import EditTeamModal from "../../Components/Team/EditTeamModal";
import DeleteTeamModal from "../../Components/Team/DeleteTeamModal";
import {
  getTeam,
  deleteTeam,
  UpdateProfileTeam,
  DeleteProfileTeam,
  DeleteTeamMember,
  GetSpecificTeamProject,
} from "../../API";
import { User, TeamData, Permission } from "../../Components/Team/index";

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

interface ProjectLabel {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProjectTag {
  id: number;
  name: string;
}

interface TeamProject {
  project_id: number;
  owner_id: number;
  title: string;
  description: string;
  label: ProjectLabel;
  selected_bid: number;
  status: number;
  tags: ProjectTag[];
  duration: string;
  start_time: string;
  end_time: string;
}

interface ProjectResponse {
  projects: TeamProject[];
  count: number;
}

const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"members" | "projects">("members");
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [teamProjects, setTeamProjects] = useState<TeamProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const membersPerPage = 50;

  const hasPermission = (permission: Permission): boolean => {
    if (!teamData) return false;
    return (teamData.permissions ?? []).includes(permission);
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response: TeamResponse = await getTeam({}, id);

        const transformedData: TeamData = {
          id: response.team_info.id,
          name: response.team_info.title,
          description: response.team_info.description,
          members: response.members.map((member: TeamMember) => ({
            id: member.member_info.userid,
            name: `${member.member_info.firstname} ${member.member_info.lastname}`,
            username: member.member_info.username,
            email: "",
            avatar: member.profile || "",
            role: member.role,
            position: member.member_info.position || "عضو",
          })),
          memberCount: response.members.length,
          createdAt: response.team_info.created_at,
          profileImage: response.profile,
          permissions: response.permissions as Permission[],
        };

        setTeamData(transformedData);

        try {
          const projectResponse: ProjectResponse =
            await GetSpecificTeamProject(id);
          setTeamProjects(projectResponse?.projects || []); // Fallback to empty array if projects is null/undefined
        } catch (projectErr: any) {
          console.error("Error fetching team projects:", projectErr);
          setTeamProjects([]); // Set to empty array on error
          setError(projectErr.message || "خطا در دریافت پروژه‌های تیم");
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "خطا در دریافت اطلاعات");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [id]);

  const handleDeleteTeam = async () => {
    if (!id || !teamData) return;

    try {
      setIsDeleting(true);
      await deleteTeam(id);
      navigate("/teams");
    } catch (err: any) {
      console.error("Error deleting team:", err);
      setError(err.message || "خطا در حذف تیم");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers =
    teamData?.members.slice(indexOfFirstMember, indexOfLastMember) || [];

  const handleAddMember = (user: User) => {
    if (!teamData) return;

    const updatedUser = { ...user };
    const updatedTeam = {
      ...teamData,
      members: [...teamData.members, updatedUser],
      memberCount: teamData.members.length + 1,
    };

    setTeamData(updatedTeam);
    setIsAddMemberModalOpen(false);
  };

  const handleEditTeam = async (
    updatedTeam: TeamData,
    teamPictureFile: File | null
  ): Promise<void> => {
    try {
      if (teamPictureFile) {
        const formData = new FormData();
        formData.append("file", teamPictureFile);
        const result = await UpdateProfileTeam(updatedTeam.id, formData);
        updatedTeam.picture = result?.profile || updatedTeam.picture;
      } else if (updatedTeam.picture === null) {
        await DeleteProfileTeam(updatedTeam.id);
      }

      setTeamData({
        ...updatedTeam,
        permissions: teamData?.permissions || [],
      });

      setIsEditTeamModalOpen(false);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const handleDeleteMember = async (userId: number) => {
    if (!teamData || !hasPermission("REMOVE_MEMEBER")) return;

    try {
      setIsDeleting(true);
      const UserData = {
        team_id: id ? parseInt(id) : 0,
        members: [userId],
      };
      await DeleteTeamMember(UserData);
      const updatedMembers = teamData.members.filter(
        (member) => member.id !== userId
      );
      const updatedTeam = {
        ...teamData,
        members: updatedMembers,
        memberCount: updatedMembers.length,
      };
      setTeamData(updatedTeam);
    } catch (error: any) {
      console.error("Error deleting team member:", error);
      setError(error.response?.data || "خطا در حذف عضو تیم");
    } finally {
      setIsDeleting(false);
    }
  };

  // const navigateToTeamProjects = () => {
  //   navigate(`/Browsproject`);
  // };

  // const getStatusBadgeColor = (status: number) => {
  //   switch (status) {
  //     case 3:
  //       return "bg-blue-100 text-blue-800";
  //     case 1:
  //       return "bg-green-100 text-green-800";
  //     case 2:
  //       return "bg-yellow-100 text-yellow-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  const getStatusText = (status: number) => {
    switch (status) {
      case 3:
        return "در حال انجام";
      case 1:
        return "تکمیل شده";
      case 2:
        return "برنامه‌ریزی شده";
      default:
        return "نامشخص";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

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
          <div className="flex items-center gap-3">
            {ProfileExists ? (
              <img
                src={teamData.profileImage}
                alt={teamData.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 order-first md:order-first"
                onError={() => SetProfileExist(false)}
              />
            ) : (
              <div className="w-12 h-12 items-center justify-center flex bg-blue-400/30 text-xl font-semibold rounded-full object-cover border-2 border-blue-500 order-first md:order-first">
                {teamData.name.charAt(0)}
              </div>
            )}
            <h1 className="text-2xl font-bold text-right">{teamData.name}</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {hasPermission("ADD_MEMBER") && (
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
            )}
            {hasPermission("EDIT_INFO") && (
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
            <div className="border rounded-lg">
              {currentMembers.length > 0 ? (
                currentMembers.map((member: User) => (
                  <TeamMemberCard
                    key={member.id}
                    user={member}
                    onDelete={() => handleDeleteMember(member.id)}
                    canDelete={hasPermission("REMOVE_MEMEBER")}
                    canEditRole={hasPermission("EDIT_ROLE")}
                    canEditNickname={hasPermission("EDIT_NICKNAME")}
                    teamId={id ? parseInt(id) : undefined}
                  />
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  هیچ عضوی یافت نشد
                </div>
              )}
            </div>
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
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            نام پروژه
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            توضیحات
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            تگ‌ها
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            زمان شروع
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            زمان پایان
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            وضعیت
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teamProjects.map((project: TeamProject) => (
                          <tr
                            key={project.project_id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Link to={`/detail/${project.project_id}`}>
                                <div className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                  {project.title}
                                </div>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {project.description.substring(0, 60)}
                              {project.description.length > 60 ? "..." : ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex flex-wrap gap-1 justify-end">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="px-2 py-1 text-xs rounded-full bg-blue-50 border border-blue-200 text-blue-400"
                                  >
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                              {new Date(project.start_time).toLocaleDateString(
                                "fa-IR"
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                              {project.end_time === "0001-01-01T00:00:00Z"
                                ? "..."
                                : new Date(project.end_time).toLocaleDateString(
                                    "fa-IR"
                                  )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-blue-600">
                              {getStatusText(project.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center p-4">
                    {/* <p className="text-gray-600">
                      {teamProjects.length} پروژه برای این تیم موجود است
                    </p> */}
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

              {/* <div className="text-center p-4">
                {teamProjects.length > 0 && (
                  <button
                    onClick={navigateToTeamProjects}
                    className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  >
                    مشاهده همه پروژه ها
                  </button>
                )}
              </div> */}
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
              onClick={() => setIsDeleteModalOpen(true)}
              className="mr-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300"
            >
              حذف تیم
            </button>
          )}
        </div>

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
      </div>
    </Layout>
  );
};

export default TeamDetailPage;
