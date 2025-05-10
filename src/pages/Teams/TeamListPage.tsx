import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import TeamCard from "./TeamCard";
// import Pagination from './Pagination';
import CreateTeamModal from "./CreateTeamModalProps";
import { Team, User } from "./index";
import { getTeams, createTeam } from "../../API";

const TeamListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const teamsPerPage = 6;

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const teamsData = await getTeams();
        // Transform API response to match Team interface
        const transformedTeams: Team[] = teamsData.map((team: any) => ({
          id: team.id,
          name: team.title,
          description: team.description,
          // memberCount: team.owner ? 1 : 0, // Starting with owner count
          members: team.owner
            ? [
                {
                  id: team.owner.userid,
                  name: `${team.owner.member_info.firstname} ${team.owner.member_info.lastname}`,
                  role: team.owner.position || "مالک",
                  avatar: team.owner.profile || "",
                },
              ]
            : [],
          position: team.position || "",
          profile: team.profile || "",
        }));
        // console.log("teamsData", transformedTeams);

        setTeams(transformedTeams);
        setFilteredTeams(transformedTeams);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(typeof err === "string" ? err : "خطا در دریافت تیم‌ها");
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Calculate pagination
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
  // const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  // console.log("currentTeams", currentTeams);
  const handleCreateTeam = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
    setCurrentPage(1);
  };

  const handleTeamSubmit = async (teamData: {
    name: string;
    description: string;
    members: User[];
  }) => {
    try {
      setIsSubmitting(true);

      // Call the API to create a new team
      const response = await createTeam(teamData);

      // Create a new team object from the API response
      const newTeam: Team = {
        id: response.id,
        name: response.title || teamData.name,
        description: response.description || teamData.description,
        // memberCount: teamData.members.length,
        members: teamData.members,
        position: response.position || "",
        profile: response.profile || "",
      };

      // Update state with the new team
      setTeams([newTeam, ...teams]);
      setFilteredTeams([newTeam, ...filteredTeams]);

      // Close the modal
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating team:", err);
      alert(typeof err === "string" ? err : "خطا در ایجاد تیم");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1]"></div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-[#F7F7F7]">
          <div className="w-full md:max-w-md order-2 md:order-1">
            <form onSubmit={handleSearch} className="flex">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-l-none rounded-r cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="جستجوی تیم ها"
                className="w-full border border-gray-300 p-2 rounded-l text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={handleCreateTeam}
            className="w-full md:w-auto flex items-center justify-center order-1 md:order-2 cursor-pointer rounded-full bg-gradient-to-l from-purple-600 to-blue-600 text-white px-6 py-3 md:scale-[100%] sm:scale-100 scale-100 transition-all duration-400 glowing-shadow"
          >
            <svg
              className="w-4 h-4 ml-1"
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
            ساخت تیم
          </button>
        </div>

        {isLoading ? (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-600">در حال بارگذاری تیم‌ها...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              تلاش مجدد
            </button>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-[1vw] lg:justify-start md:justify-start sm:justify-start justify-center">
            {currentTeams.length > 0 ? (
              currentTeams.map((team) => <TeamCard key={team.id} team={team} />)
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-lg text-gray-600">هیچ تیمی یافت نشد</p>
                <button
                  onClick={handleCreateTeam}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  ساخت تیم جدید
                </button>
              </div>
            )}
          </div>
        )}

        {/* {filteredTeams.length > teamsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
        />
      )} */}

        <CreateTeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleTeamSubmit}
          isSubmitting={isSubmitting}
        />
      </Layout>
    </>
  );
};

export default TeamListPage;
