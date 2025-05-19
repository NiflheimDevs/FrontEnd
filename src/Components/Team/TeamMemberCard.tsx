import React, { useState, useRef, useEffect } from "react";
import { User } from "./index";
import { updateTeamMemberRole, updateTeamMemberPosition } from "../../API"; // Import the API functions

interface TeamMemberCardProps {
  user: User;
  onDelete?: (userId: number) => void;
  canDelete?: boolean;
  canEditRole?: boolean;
  canEditNickname?: boolean;
  teamId?: number; // Add teamId prop
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  user,
  onDelete,
  canDelete = false,
  canEditRole = false,
  canEditNickname = false,
  teamId, // Add teamId parameter
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [AvatarExists, SetAvatarExist] = useState<boolean>(true);
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(user.position || "عضو");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  // Available roles from the API
  const availableRoles = [
    "TEAM_OWNER",
    "TEAM_ADMIN",
    "TEAM_CRAWLER",
    "TEAM_MAINTAINER",
    "TEAM_NEWBIE",
  ];

  // Function to get a readable role name for display
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "TEAM_OWNER":
        return "مالک تیم";
      case "TEAM_ADMIN":
        return "مدیر تیم";
      case "TEAM_CRAWLER":
        return "جمع آور";
      case "TEAM_MAINTAINER":
        return "نگهدارنده";
      case "TEAM_NEWBIE":
        return "عضو جدید";
      default:
        return role;
    }
  };

  // Function to navigate to user profile
  const navigateToProfile = () => {
    if (user.id) {
      window.location.href = `https://bidlancer.ir/profile/${user.id}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    // Focus the input when editing nickname
    if (editingNickname && nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  }, [editingNickname]);

  const handleRoleChange = async (newRole: string) => {
    if (!teamId || !user.id) {
      console.error("Team ID or User ID is missing");
      return;
    }

    try {
      setIsUpdatingRole(true);

      // Call the API to update the role
      await updateTeamMemberRole({
        user_id: user.id,
        role: newRole,
        team_id: teamId,
      });

      // Update the UI with the new role
      if (user) {
        user.role = newRole;
      }
    } catch (error) {
      console.error("Error updating team member role:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsUpdatingRole(false);
      setMenuOpen(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const saveNickname = async () => {
    if (!teamId || !user.id) {
      console.error("Team ID or User ID is missing");
      return;
    }

    try {
      setIsUpdatingPosition(true);

      // Call the API to update the position
      await updateTeamMemberPosition({
        user_id: user.id,
        position: nickname,
        team_id: teamId,
      });

      // Update the UI with the new position
      if (user) {
        user.position = nickname;
      }
    } catch (error) {
      console.error("Error updating team member position:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsUpdatingPosition(false);
      setEditingNickname(false);
    }
  };

  const showMenu = canDelete || canEditRole || canEditNickname;

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-50">
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        {AvatarExists ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-8 w-8 min-h-8 min-w-8 rounded-full object-cover cursor-pointer"
            onError={() => SetAvatarExist(false)}
            onClick={navigateToProfile}
          />
        ) : user.username ? (
          <div
            className="h-8 w-8 min-h-8 min-w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer"
            onClick={navigateToProfile}
          >
            {user.username.charAt(0)}
          </div>
        ) : (
          <></>
        )}
        <div className="mr-3">
          <p
            className="text-gray-900 font-medium cursor-pointer hover:text-blue-600"
            onClick={navigateToProfile}
          >
            {user.username}
          </p>
          <p className="text-gray-500 text-sm">{user.name || "عضو"}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-2">
          {editingNickname ? (
            <div className="flex items-center relative">
              <input
                ref={nicknameInputRef}
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className="border border-gray-300 rounded pr-2 pl-5 py-1 text-sm w-24"
                onBlur={saveNickname}
                onKeyPress={(e) => e.key === "Enter" && saveNickname()}
                disabled={isUpdatingPosition}
              />
              <button
                onClick={saveNickname}
                className="ml-1 text-blue-500 absolute left-0 hover:text-blue-700 cursor-pointer"
                disabled={isUpdatingPosition}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div
              className={`bg-blue-50 border border-blue-200 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${canEditNickname ? "cursor-pointer hover:bg-blue-50" : ""}`}
              onClick={() => canEditNickname && setEditingNickname(true)}
            >
              {user.position || "عضو"}
            </div>
          )}
        </div>
        {showMenu && (
          <div className="relative inline-block text-left" ref={menuRef}>
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="گزینه های مدیریت"
              disabled={isUpdatingRole || isUpdatingPosition}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl z-50 text-right">
                {canEditRole && (
                  <>
                    {availableRoles.map((role) => (
                      <button
                        key={role}
                        className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                        onClick={() => handleRoleChange(role)}
                        disabled={isUpdatingRole || isUpdatingPosition}
                      >
                        تغییر به {getRoleDisplayName(role)}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 my-1"></div>
                  </>
                )}
                {canEditNickname && !editingNickname && (
                  <button
                    className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                    onClick={() => setEditingNickname(true)}
                    disabled={isUpdatingPosition}
                  >
                    ویرایش عنوان
                  </button>
                )}

                {canDelete && (
                  <button
                    className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100"
                    onClick={() => onDelete && onDelete(user.id)}
                    disabled={isUpdatingRole || isUpdatingPosition}
                  >
                    حذف از تیم
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
