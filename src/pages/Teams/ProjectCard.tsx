import React from 'react';
import { Project } from './index';

interface ProjectCardProps {
  project: Project;
  onClick?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
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

  // Format date to Persian style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // You might want to use a proper Persian date formatter library here
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 cursor-pointer"
      onClick={() => onClick && onClick(project.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs rounded-full px-2 py-1 ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
        <h3 className="text-lg font-bold text-right">{project.title}</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 text-right h-12 overflow-hidden">
        {project.description}
      </p>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">{`${project.progress}%`}</span>
          <span className="text-gray-700">پیشرفت</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              project.progress < 30 ? 'bg-red-500' : 
              project.progress < 70 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`} 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {formatDate(project.deadline)}
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          مهلت تحویل
        </span>
      </div>
      
      {project.assignedUsers && project.assignedUsers.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-end">
            <div className="flex -space-x-2 overflow-hidden">
              {project.assignedUsers.slice(0, 3).map((user, index) => (
                <img
                  key={user.id}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src={user.avatar}
                  alt={user.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar-placeholder.png";
                  }}
                />
              ))}
              {project.assignedUsers.length > 3 && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs font-medium text-gray-500 ring-2 ring-white">
                  +{project.assignedUsers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;