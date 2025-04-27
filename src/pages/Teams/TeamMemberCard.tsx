import React, { useState, useRef, useEffect } from 'react';
import { User } from './index';
import UserPic from '../../assets/User.svg';

interface TeamMemberCardProps {
  user: User;
  onDelete?: (userId: string) => void;
  onRoleChange?: (userId: string, newRole: string) => void;
  isAdmin?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  user, 
  onDelete, 
  onRoleChange,
  isAdmin = true // Default to true to maintain backward compatibility
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  
  const handleRoleChange = (newRole: string) => {
    if (onRoleChange) {
      onRoleChange(user.id, newRole);
    }
    setMenuOpen(false);
  };
  
  return (
    <div className="flex items-center justify-between py-3 px-2 border-b hover:bg-gray-50">
      {/* <div className="flex items-center mr-2 md:mr-4">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="h-8 w-8 rounded-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "../../assets/User.svg"; // Fallback image
          }}
        />
        <div className="mr-2 md:mr-4">
          <p className="text-gray-900 text-sm md:text-base">{user.name}</p>
          <p className="text-gray-500 text-xs md:text-sm hidden sm:block">{user.email}</p>
        </div>
      </div> */}
      <div className="flex items-center mr-2 md:mr-4">
        <img 
          src={ UserPic } 
          className="h-8 w-8 rounded-full"
          />
        <div className="mr-2 md:mr-4">
          <p className="text-gray-900 text-sm md:text-base">{user.name}</p>
          <p className="text-gray-500 text-xs md:text-sm hidden sm:block">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-2">
          <div className="text-gray-700 text-sm md:text-base bg-gray-100 px-2 py-1 rounded-full">{user.role}</div>
        </div>
        {isAdmin && (
          <div className="relative" ref={menuRef}>
            <button 
              className="text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="گزینه های مدیریت"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
            
            {menuOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 text-right">
                <button 
                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleRoleChange('ادمین')}
                >
                  تغییر به ادمین
                </button>
                <button 
                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleRoleChange('طراح')}
                >
                  تغییر به طراح
                </button>
                <button 
                  className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleRoleChange('توسعه دهنده')}
                >
                  تغییر به توسعه دهنده
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => onDelete && onDelete(user.id)}
                >
                  حذف از تیم
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;