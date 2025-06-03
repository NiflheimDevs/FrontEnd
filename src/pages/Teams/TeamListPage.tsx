<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
>>>>>>> develop
import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../Components/Team/Layout";
import TeamCard from "../../Components/Team/TeamCard";
import CreateTeamModal from "../../Components/Team/CreateTeamModal";
import { Team, User } from "../../Components/Team/index";
import { getTeams, createTeam } from "../../API";

<<<<<<< HEAD
=======

>>>>>>> develop
// Empty State Component - Memoized for performance
const EmptyState = React.memo<{ onCreateTeam: () => void }>(
  ({ onCreateTeam }) => {
    return (
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 relative">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white animate-bounce"
=======
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 relative bg-[#F7F7F7] dark:bg-gray-900">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse dark:from-[#1C2B48] dark:to-[#0B1226] dark:bg-gradient-to-br">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg dark:from-[#1C2B48] dark:to-[#0B1226] dark:bg-gradient-to-br">
              <svg
                className="w-12 h-12 text-white animate-bounce dark:text-gray-200"
>>>>>>> develop
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>

          {/* Floating Elements */}
          <div
<<<<<<< HEAD
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"
            style={{ animationDelay: "300ms" }}
          />
          <div
            className="absolute top-8 -left-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse"
=======
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75 dark:opacity-40"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75 dark:opacity-40"
            style={{ animationDelay: "300ms" }}
          />
          <div
            className="absolute top-8 -left-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse dark:opacity-40"
>>>>>>> develop
            style={{ animationDelay: "500ms" }}
          />
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mb-8">
<<<<<<< HEAD
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🚀 آماده برای شروع هستید؟
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            هنوز هیچ تیمی ندارید! اولین تیم خود را بسازید و سفر همکاری را آغاز
            کنید.
=======
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-[#E0D6C8]">
            🚀 آماده برای شروع هستید؟
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed dark:text-[#B4AA9C]">
            هنوز هیچ تیمی ندارید! اولین تیم خود را بسازید و سفر همکاری را آغاز کنید.
>>>>>>> develop
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
            {[
              { color: "bg-blue-500", text: "مدیریت پروژه‌ها" },
              { color: "bg-green-500", text: "همکاری تیمی" },
              { color: "bg-purple-500", text: "تعیین اهداف" },
              { color: "bg-orange-500", text: "پیگیری پیشرفت" },
            ].map((item, index) => (
              <div
                key={index}
<<<<<<< HEAD
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-700"
              >
                <div className={`w-2 h-2 ${item.color} rounded-full`} />
=======
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <div className={`w-2 h-2 ${item.color} rounded-full dark:opacity-80`} />
>>>>>>> develop
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={onCreateTeam}
            type="button"
<<<<<<< HEAD
            className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
=======
            className="flex-1 group relative overflow-hidden cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-600 text-white dark:text-gray-200 font-semibold py-4 px-8 rounded-full transition-all duration-300 glowing-shadow hover:shadow-[0px_0px_20px_rgba(81,137,202,0.8)] active:scale-95"
          >
            <div className="absolute inset-0 bg-white dark:bg-gray-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
>>>>>>> develop
            <div className="relative flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>ساخت اولین تیم</span>
            </div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div
<<<<<<< HEAD
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1000ms" }}
        />
        <div
          className="absolute top-1/2 left-5 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-pulse"
=======
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse dark:opacity-40"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse dark:opacity-40"
          style={{ animationDelay: "1000ms" }}
        />
        <div
          className="absolute top-1/2 left-5 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-pulse dark:opacity-40"
>>>>>>> develop
          style={{ animationDelay: "2000ms" }}
        />
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

// Loading Skeleton Component - Memoized
const LoadingSkeleton = React.memo(() => (
  <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 w-full max-w-[1400px] mx-auto">
    {Array.from({ length: 4 }, (_, index) => (
      <div
        key={`loading-${index}`}
<<<<<<< HEAD
        className="relative bg-gradient-to-br from-blue-500 to-blue-800 rounded-3xl w-full min-w-[250px] max-w-[335.06px] h-fit min-h-[285px] flex flex-col p-6 overflow-hidden mx-auto animate-pulse"
=======
        className="relative bg-gradient-to-br from-blue-500 to-blue-800 rounded-3xl w-full min-w-[250px] max-w-[335.06px] h-fit min-h-[285px] flex flex-col p-6 overflow-hidden mx-auto animate-pulse dark:from-[#1C2B48] dark:to-[#0B1226]"
>>>>>>> develop
      >
        <div className="flex flex-col justify-between flex-grow z-10">
          <div>
            <div className="flex flex-row justify-between gap-1">
<<<<<<< HEAD
              <div className="w-30 h-10 bg-white/50 rounded-full mb-4 mt-4" />
              <div className="w-[70px] h-[70px] bg-white/50 rounded-full mb-4" />
            </div>
            <div className="w-3/4 h-6 bg-white/70 rounded-full mt-3 mb-3" />
            <div className="w-full h-4 bg-white/50 rounded-full mt-2 mb-2" />
            <div className="w-full h-4 bg-white/50 rounded-full mt-2 mb-2" />
          </div>
          <div className="flex flex-wrap w-3/4 gap-2 mt-3">
            <div className="w-30 h-10 bg-white/30 rounded-full" />
=======
              <div className="w-30 h-10 bg-white/50 rounded-full mb-4 mt-4 shiny-skeleton dark:bg-gray-700" />
              <div className="w-[70px] h-[70px] bg-white/50 rounded-full mb-4 shiny-skeleton dark:bg-gray-700" />
            </div>
            <div className="w-3/4 h-6 bg-white/70 rounded-full mt-3 mb-3 shiny-skeleton dark:bg-gray-700" />
            <div className="w-full h-4 bg-white/50 rounded-full mt-2 mb-2 shiny-skeleton dark:bg-gray-700" />
            <div className="w-full h-4 bg-white/50 rounded-full mt-2 mb-2 shiny-skeleton dark:bg-gray-700" />
          </div>
          <div className="flex flex-wrap w-3/4 gap-2 mt-3">
            <div className="w-30 h-10 bg-white/30 rounded-full shiny-skeleton dark:bg-gray-700" />
>>>>>>> develop
          </div>
        </div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

const TeamListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized handlers
  const handleCreateTeam = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchTerm.trim()) {
        setFilteredTeams(teams);
        return;
      }

      const results = teams.filter(
        (team) =>
          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(results);
    },
    [searchTerm, teams]
  );

  const handleTeamSubmit = useCallback(
    async (teamData: {
      name: string;
      description: string;
      members: User[];
    }) => {
      try {
        setIsSubmitting(true);

        const response = await createTeam(teamData);

        const newTeam: Team = {
          id: response.id,
          name: response.title || teamData.name,
          description: response.description || teamData.description,
          members: teamData.members,
          position: response.position || "",
          profile: response.profile || "",
        };

        setTeams((prevTeams) => [newTeam, ...prevTeams]);
        setFilteredTeams((prevFiltered) => [newTeam, ...prevFiltered]);
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error creating team:", err);
        const errorMessage = typeof err === "string" ? err : "خطا در ایجاد تیم";
        alert(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // Fetch teams from API
  useEffect(() => {
    let isMounted = true;

    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const teamsData = await getTeams();

        if (!isMounted) return;

        // Check if teamsData is null, undefined, or not an array
        if (!teamsData || !Array.isArray(teamsData)) {
          console.log("No teams data received or invalid format");
          setTeams([]);
          setFilteredTeams([]);
          setIsLoading(false);
          return;
        }

        // Transform API response to match Team interface
        const transformedTeams: Team[] = teamsData.map((team: any) => ({
          id: team.id,
          name: team.title || "",
          description: team.description || "",
          members: team.owner
            ? [
                {
                  id: team.owner.userid,
                  name: `${team.owner.member_info?.firstname || ""} ${team.owner.member_info?.lastname || ""}`.trim(),
                  role: team.owner.position || "مالک",
                  avatar: team.owner.profile || "",
                },
              ]
            : [],
          position: team.position || "",
          profile: team.profile || "",
        }));

        setTeams(transformedTeams);
        setFilteredTeams(transformedTeams);
      } catch (err) {
        if (!isMounted) return;

        console.error("Error fetching teams:", err);
        const errorMessage =
          typeof err === "string" ? err : "خطا در دریافت تیم‌ها";
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTeams(teams);
    }
  }, [searchTerm, teams]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
<<<<<<< HEAD
    <>
      <div className="fixed inset-0 bg-gray-50 z-[-1]" />
      <Layout>
        <div className="flex flex-row sm:flex-row md:flex-row justify-between items-center mb-6 gap-4 bg-gray-50">
          {/* <div className="w-full md:max-w-md order-2 relative">
=======
    <div className="dark:bg-gray-800">
      <div className="fixed inset-0 bg-[#F7F7F7] z-[-1] dark:bg-gray-800" />
      <Layout>
        <div className="flex flex-row sm:flex-row md:flex-row justify-between items-center mb-6 gap-4 bg-[#F7F7F7] dark:bg-gray-800">
          <div className="w-full md:max-w-md order-1 relative">
>>>>>>> develop
            <form
              onSubmit={handleSearch}
              className="flex md:scale-100 sm:scale-95 scale-90 transition-all"
            >
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 text-white px-4 rounded-r-lg flex items-center cursor-pointer z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
<<<<<<< HEAD
                className="w-full border border-gray-300 rounded-lg py-2 pl-2 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
=======
                className="w-full border border-gray-300 rounded-lg py-2 pl-2 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white dark:border-gray-700"
>>>>>>> develop
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={handleCreateTeam}
            type="button"
<<<<<<< HEAD
            className="whitespace-nowrap w-auto flex items justify-center order-1 cursor-pointer rounded-full bg-gradient-to-l from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 md:scale-100 sm:scale-95 scale-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ساخت تیم
          </button>
        </div> */}
          <div className="w-full md:max-w-md order-1 relative">
            <form
              onSubmit={handleSearch}
              className="flex md:scale-100 sm:scale-95 scale-90 transition-all"
            >
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 text-white px-4 rounded-r-lg flex items-center cursor-pointer z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="w-full border border-gray-300 rounded-lg py-2 pl-2 pr-14 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={handleCreateTeam}
            type="button"
=======
>>>>>>> develop
            className="whitespace-nowrap w-auto flex items justify-center order-2 cursor-pointer rounded-full bg-gradient-to-l from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 md:scale-100 sm:scale-95 scale-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ساخت تیم
          </button>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
<<<<<<< HEAD
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
=======
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-red-900">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
>>>>>>> develop
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
<<<<<<< HEAD
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                خطا در بارگذاری
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleRetry}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer transition-colors duration-200"
=======
              <p className="text-xl font-bold mb-2 text-gray-800 dark:text-[#E0D6C8]">خطا</p>
              <p className="text-gray-600 mb-6 dark:text-[#B4AA9C]">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>>>>>>> develop
              >
                تلاش مجدد
              </button>
            </div>
          </div>
<<<<<<< HEAD
        ) : filteredTeams && filteredTeams.length > 0 ? (
          <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 w-full max-w-[1400px] mx-auto">
=======
        ) : filteredTeams.length === 0 ? (
          <EmptyState onCreateTeam={handleCreateTeam} />
        ) : (
          <div className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 w-full max-w-[1400px] mx-auto ">
>>>>>>> develop
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
<<<<<<< HEAD
        ) : (
          <EmptyState onCreateTeam={handleCreateTeam} />
        )}

=======
        )}
>>>>>>> develop
        <CreateTeamModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleTeamSubmit}
          isSubmitting={isSubmitting}
        />
      </Layout>
    </div>
  );
};

export default TeamListPage;
