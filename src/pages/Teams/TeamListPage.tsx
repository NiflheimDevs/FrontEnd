/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Layout from "../../Components/Team/Layout";
import TeamCard from "../../Components/Team/TeamCard";
// import Pagination from './Pagination';
import CreateTeamModal from "../../Components/Team/CreateTeamModal";
import { Team, User } from "../../Components/Team/index";
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
  const teamsPerPage = 50;

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
        <div className="flex flex-row sm:flex-row md:flex-row justify-between items-center mb-6 gap-4 bg-[#F7F7F7]">
          <div className="w-full md:max-w-md order-2">
            <form
              onSubmit={handleSearch}
              className="flex md:scale-[100%] sm:scale-98 scale-95 transition-all"
            >
              <button
                type="submit"
                className="absolute right-0 top-0 scale-102 bottom-0 bg-blue-600 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-400 text-[#FFFFFF] px-4 rounded-r-lg flex items-center cursor-pointer"
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
                className="w-full border border-gray-300 rounded-lg py-2 pl-2 pr-14 text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={handleCreateTeam}
            className=" whitespace-nowrap w-auto flex items-center justify-center order-2 cursor-pointer rounded-full bg-gradient-to-l from-purple-600 to-blue-600 text-white px-6 py-3 md:scale-[100%] sm:scale-98 scale-95 transition-all duration-400 glowing-shadow"
          >
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
              className="mt-4 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              تلاش مجدد
            </button>
          </div>
        ) : (
          <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 w-full max-w-[1400px] mx-auto">
            {currentTeams.length > 0 ? (
              currentTeams.map((team) => <TeamCard key={team.id} team={team} />)
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-lg text-gray-600">هیچ تیمی یافت نشد</p>
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
