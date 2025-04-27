import React, { useState, useRef, useEffect } from 'react';
import { User, Team } from './index';
import { users } from './staticData';

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: Team) => void;
  team: Team;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ isOpen, onClose, onSubmit, team }) => {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([...team.members]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Reset form when team changes
  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
    setSelectedMembers([...team.members]);
  }, [team]);
  
  // Filter users based on search term and exclude already selected members
  const filteredUsers = users.filter(user => 
    !selectedMembers.find(member => member.id === user.id) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Handle click outside to close search dropdown
  useEffect(() => {
    function handleClickOutsideSearch(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }
    
    if (isSearching) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [isSearching]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      setError('لطفا همه فیلدهای ضروری را پر کنید');
      return;
    }
    
    if (selectedMembers.length === 0) {
      setError('تیم باید حداقل یک عضو داشته باشد');
      return;
    }
    
    // Update team with new data
    const updatedTeam: Team = {
      ...team,
      name,
      description,
      members: selectedMembers,
      memberCount: selectedMembers.length
    };
    
    onSubmit(updatedTeam);
    setError('');
  };
  
  const addMember = (user: User) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchTerm('');
    setIsSearching(false);
  };
  
  const removeMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto" 
      >
        <div className="flex justify-between items-center border-b p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold">ویرایش تیم</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-right">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-right mb-2">نام تیم</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-right"
              placeholder="نام تیم را وارد کنید"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-right mb-2">توضیحات</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-right"
              placeholder="توضیحات تیم را وارد کنید"
              rows={3}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-right mb-2">اعضای تیم</label>
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearching(true);
                }}
                onClick={() => setIsSearching(true)}
                className="w-full border border-gray-300 p-2 rounded text-right"
                placeholder="جستجوی کاربران..."
              />
              
              {isSearching && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div 
                        key={user.id}
                        onClick={() => addMember(user)}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer border-b"
                      >
                        <div className="text-gray-500 text-sm">{user.role}</div>
                        <div className="flex items-center">
                          <div className="mr-2 text-right">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/avatar-placeholder.png";
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      کاربری یافت نشد
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {selectedMembers.length > 0 && (
            <div className="mb-4">
              <h3 className="text-gray-700 text-right mb-2">اعضای انتخاب شده:</h3>
              <div className="border rounded-lg overflow-hidden">
                {selectedMembers.map(member => (
                  <div 
                    key={member.id}
                    className="flex items-center justify-between p-2 border-b last:border-b-0"
                  >
                    <button
                      onClick={() => removeMember(member.id)}
                      className="text-red-500 hover:text-red-700"
                      type="button"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="flex items-center">
                      <div className="mr-2 text-right">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-8 h-8 rounded-full" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/avatar-placeholder.png";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              disabled={!name || !description || selectedMembers.length === 0}
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamModal;