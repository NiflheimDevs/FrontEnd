import React from 'react';
import { Team } from './index';
import { Link } from 'react-router-dom';
import UserPic from '../../assets/User.svg';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600 mr-1">{team.memberCount}</span>
        </div>
        <h3 className="text-xl font-bold text-right">{team.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-right flex-grow">{team.description}</p>
      
      <div className="mb-4">
        <h4 className="text-gray-800 text-right mb-2">: اعضای تیم</h4>
        <div className="flex justify-end flex-wrap">
          {team.members.slice(0, 3).map((member) => (
            <div key={member.id} className="flex flex-col items-center mr-2 mb-2">
              <div className="flex items-center">
                <span className="text-xs md:text-sm text-gray-700 truncate max-w-20">{member.role}</span>
                {/* <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar-placeholder.png"; // Fallback image
                  }}
                /> */}
                <img 
                  src={UserPic}
                  alt={member.name}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar-placeholder.png"; // Fallback image
                  }}
                />
              </div>
              <span className="text-xs md:text-sm text-gray-700 mt-1 truncate max-w-20">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <Link 
        to={`/teams/${team.id}`} 
        className="block w-full md:w-32 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-auto transition-colors duration-300"
      >
        بیشتر
      </Link>
    </div>
  );
};

export default TeamCard;