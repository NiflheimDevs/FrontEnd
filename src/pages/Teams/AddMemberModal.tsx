import React, { useState, useRef, useEffect } from "react";
import { User } from "./index";
import { addMember } from "../../API";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  existingMemberIds: number[]; // IDs of members already in the team
  teamId: number; // The ID of the team to add members to
}

// Static sample user data (will be replaced with API data later)
const sampleUsers: User[] = [
  {
    id: 1,
    name: "علی محمدی",
    email: "ali@example.com",
    avatar: "/avatars/ali.jpg",
    role: "توسعه دهنده",
    position: "مدیر",
  },
  {
    id: 2,
    name: "سارا احمدی",
    email: "sara@example.com",
    avatar: "/avatars/sara.jpg",
    role: "طراح",
    position: "مدیر",
  },
  {
    id: 3,
    name: "رضا کریمی",
    email: "reza@example.com",
    avatar: "/avatars/reza.jpg",
    role: "مدیر محصول",
    position: "مدیر",
  },
  {
    id: 6,
    name: "مریم حسینی",
    email: "maryam@example.com",
    avatar: "/avatars/maryam.jpg",
    role: "توسعه دهنده",
    position: "مدیر",
  },
  {
    id: 5,
    name: "امیر رضایی",
    email: "amir@example.com",
    avatar: "/avatars/amir.jpg",
    role: "ادمین",
    position: "مدیر",
  },
];

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  existingMemberIds,
  teamId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter out existing members and filter by search term
  const availableUsers = sampleUsers.filter(
    (user) =>
      !existingMemberIds.includes(user.id) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
    setError("");
    setSearchTerm("");
    setSelectedUser(null);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        setLoading(true);
        setError("");

        // Call the addMember API with the required payload structure
        await addMember({
          team_id: teamId,
          members: [selectedUser.id],
        });

        onSubmit(selectedUser);

        resetForm();
        onClose();
      } catch (err) {
        setError("خطا در افزودن عضو. لطفا دوباره تلاش کنید.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("لطفا یک کاربر انتخاب کنید");
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setSearchTerm("");
    setError("");
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSearchTerm(user.name);
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">

      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-screen overflow-y-auto animate-fadeIn"
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          direction: "rtl",
        }}
      >
        <div className="flex justify-between items-center border-b p-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-xl font-bold text-white">افزودن عضو به تیم</h2>

          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200"
            disabled={loading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-5 p-3 bg-red-100 text-red-700 rounded-lg text-right animate-fadeIn">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-gray-700 text-right mb-2 font-medium">
              کاربر
            </label>

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
                className="w-full border border-gray-300 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="جستجوی کاربران..."
                required
                disabled={loading}
              />

              {isSearching && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {availableUsers.length > 0 ? (
                    availableUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => selectUser(user)}
                        className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b"
                      >
                        <div className="text-gray-500 text-sm">{user.role}</div>
                        <div className="flex items-center">
                          <div className="mr-2 text-right">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
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

          {selectedUser && (
            <div className="mb-5 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-gray-700 text-right mb-2 font-medium">
                کاربر انتخاب شده:
              </h3>
              <div className="flex items-center justify-end">
                <div className="mr-3 text-right">
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <p className="text-sm text-gray-600">{selectedUser.role}</p>
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

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg transition-colors duration-200 font-medium"
              disabled={loading}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center transition-colors duration-200 font-medium ${
                loading || !selectedUser ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={!selectedUser || loading}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "در حال افزودن..." : "افزودن به تیم"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
