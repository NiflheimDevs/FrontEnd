import React, { useState, useRef, useEffect } from "react";
import { User } from "./index";
import {
  CreateTeamSearchSelectedMemberCard,
  TeamFilterSearchMemberCard,
} from "./TeamSearchMemberCard";
import { GetUserSerachTeam } from "../../API";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: {
    name: string;
    description: string;
    members: User[];
  }) => void;
  isSubmitting?: boolean;
}

interface APIUser {
  bio: string;
  created_time: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  profile: string;
  username: string;
}

const convertAPIUserToUser = (apiUser: APIUser): User => ({
  id: apiUser.id,
  name: `${apiUser.firstname} ${apiUser.lastname}`,
  email: apiUser.email,
  avatar: apiUser.profile,
  role: "",
  position: "عضو",
});

const searchUsers = async (query: string): Promise<APIUser[]> => {
  try {
    const response = await GetUserSerachTeam(query);
    return response;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search functionality with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim() && isSearching) {
        setIsLoadingSearch(true);
        try {
          const apiUsers = await searchUsers(searchTerm.trim());
          const filteredUsers = apiUsers
            .filter(
              (apiUser) =>
                !selectedMembers.find((member) => member.id === apiUser.id)
            )
            .map(convertAPIUserToUser);
          setSearchResults(filteredUsers);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoadingSearch(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isSearching, selectedMembers]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, members: selectedMembers });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedMembers([]);
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const addMember = (user: User) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchTerm("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const removeMember = (userId: number) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== userId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md max-h-screen overflow-y-auto animate-fadeIn"
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          direction: "rtl",
        }}
      >
        <div className="flex justify-between items-center border-b p-4 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800">
          <h2 className="text-xl font-bold text-white dark:text-gray-200">
            ساخت تیم جدید
          </h2>
          <button
            onClick={onClose}
            className="text-white dark:text-gray-300 cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-800 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200"
            disabled={isSubmitting}
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
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 text-right mb-2 font-medium"
            >
              نام تیم
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              placeholder="نام تیم را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-gray-700 dark:text-gray-300 text-right mb-2 font-medium"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              placeholder="توضیحات تیم را وارد کنید"
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 dark:text-gray-300 text-right mb-2 font-medium">
              اعضای تیم
            </label>
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearching(true);
                }}
                onClick={() => setIsSearching(true)}
                className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="جستجوی کاربران..."
                disabled={isSubmitting}
              />

              <div className="absolute left-3 top-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {isSearching && !isSubmitting && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto animate-fadeIn">
                  {isLoadingSearch ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500"
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
                        در حال جستجو...
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      <TeamFilterSearchMemberCard
                        key={user.id}
                        user={user}
                        addMember={addMember}
                      />
                    ))
                  ) : searchTerm.trim() ? (
                    <div className="p-4 text-center text-gray-500">
                      کاربری یافت نشد
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      نام کاربر را تایپ کنید
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedMembers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-700 text-right mb-3 font-medium">
                اعضای انتخاب شده:
              </h3>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                {selectedMembers.map((member) => (
                  <CreateTeamSearchSelectedMemberCard
                    key={member.id}
                    user={member}
                    isSubmitting={isSubmitting}
                    removeMember={removeMember}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 py-2 px-6 rounded-lg transition-colors duration-200 font-medium dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-6 rounded-lg flex items-center transition-colors duration-200 font-medium ${
                isSubmitting ||
                !name ||
                !description ||
                selectedMembers.length === 0
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !name ||
                !description ||
                selectedMembers.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting && (
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
              {isSubmitting ? "در حال ارسال..." : "ایجاد تیم"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
