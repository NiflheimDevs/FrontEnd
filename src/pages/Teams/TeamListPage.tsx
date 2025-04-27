import React, { useState } from 'react';
import Layout from './Layout';
import TeamCard from './TeamCard';
// import Pagination from './Pagination';
import CreateTeamModal from './CreateTeamModalProps';
import { teams } from './staticData';
import { Team, User } from './index';

const TeamListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>(teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const teamsPerPage = 6;
  
  // Calculate pagination
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
  // const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  
  const handleCreateTeam = () => {
    setIsModalOpen(true);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = teams.filter(team => 
      team.name.includes(searchTerm) || 
      team.description.includes(searchTerm)
    );
    setFilteredTeams(results);
    setCurrentPage(1);
  };
  
  const handleTeamSubmit = (teamData: { name: string; description: string; members: User[] }) => {
    console.log('New team created:', teamData);
    
    // In a real app, you would send this to your API
    // For now, we'll just add it to our local state
    const newTeam: Team = {
      id: `${Date.now()}`, // Generate a temporary ID
      name: teamData.name,
      description: teamData.description,
      memberCount: teamData.members.length,
      members: teamData.members
    };
    
    setFilteredTeams([newTeam, ...filteredTeams]);
    setIsModalOpen(false);
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
              placeholder="جستجوی تیم ها"
              className="w-full border border-gray-300 p-2 rounded-l text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <button
          onClick={handleCreateTeam}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center order-1 md:order-2"
        >
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          ساخت تیم
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentTeams.length > 0 ? (
          currentTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))
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
      />
    </Layout>
  );
};

export default TeamListPage;