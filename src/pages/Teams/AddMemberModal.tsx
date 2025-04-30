import React, { useState, useRef, useEffect } from 'react';
import { User } from './index';
import { users } from './staticData';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User, role: string) => void;
  existingMemberIds: string[]; // IDs of members already in the team
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  existingMemberIds 
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRole, setSelectedRole] = useState('توسعه دهنده');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Filter out existing members and filter by search term
  const availableUsers = users.filter(user => 
    !existingMemberIds.includes(user.id) &&
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

  // Reset error when modal opens/closes
  useEffect(() => {
    setError('');
  }, [isOpen]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        setLoading(true);
        setError('');
        
        // In a real app, you might have an API call here
        // For now, simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onSubmit({ ...selectedUser, role: selectedRole }, selectedRole);
        resetForm();
      } catch (err) {
        setError('خطا در افزودن عضو. لطفا دوباره تلاش کنید.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setSelectedUser(null);
    setSearchTerm('');
    setSelectedRole('توسعه دهنده');
    setError('');
  };
  
  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSearchTerm(user.name);
    setIsSearching(false);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md" 
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">افزودن عضو به تیم</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-right">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-right mb-2">کاربر</label>
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedUser(null);
                  setIsSearching(true);
                }}
                onClick={() => setIsSearching(true)}
                className="w-full border border-gray-300 p-2 rounded text-right"
                placeholder="جستجوی کاربران..."
                required
              />
              
              {isSearching && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {availableUsers.length > 0 ? (
                    availableUsers.map(user => (
                      <div 
                        key={user.id}
                        onClick={() => selectUser(user)}
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
          
          <div className="mb-4">
            <label className="block text-gray-700 text-right mb-2">نقش</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-right"
              required
            >
              <option value="ادمین">ادمین</option>
              <option value="طراح">طراح</option>
              <option value="توسعه دهنده">توسعه دهنده</option>
            </select>
          </div>
          
          {selectedUser && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <h3 className="text-gray-700 text-right mb-2">کاربر انتخاب شده:</h3>
              <div className="flex items-center justify-end">
                <div className="mr-3 text-right">
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/avatar-placeholder.png";
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={!selectedUser || loading}
            >
              {loading ? 'در حال افزودن...' : 'افزودن به تیم'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;