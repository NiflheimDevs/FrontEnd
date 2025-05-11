import React, { useState, useRef, useEffect } from "react";
import { User } from "./index";

interface TeamMemberCardProps {
  user: User;
  onDelete?: (userId: number) => void;
  canDelete?: boolean;
  canEditRole?: boolean;
  canEditNickname?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  user,
  onDelete,
  canDelete = false,
  canEditRole = false,
  canEditNickname = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [AvatarExists, SetAvatarExist] = useState<boolean>(true);
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(user.position || "عضو");
  const menuRef = useRef<HTMLDivElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    // Focus the input when editing nickname
    if (editingNickname && nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  }, [editingNickname]);

  const handleRoleChange = (newRole: string) => {
    // Here you would typically make an API call to update the user's role
    // For now, we'll just update the UI
    if (user) {
      user.role = newRole;
    }
    setMenuOpen(false);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const saveNickname = () => {
    // Here you would typically make an API call to update the user's nickname
    if (user) {
      user.position = nickname;
    }
    setEditingNickname(false);
  };

  const showMenu = canDelete || canEditRole || canEditNickname;
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-50">
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        {AvatarExists ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-8 w-8 min-h-8 min-w-8 rounded-full object-cover"
            onError={() => SetAvatarExist(false)}
          />
        ) : user.username ? (
          <div className="h-8 w-8 min-h-8 min-w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user.username.charAt(0)}
          </div>
        ) : (
          <></>
        )}
        <div className="mr-3">
          <p className="text-gray-900 font-medium">{user.username}</p>
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
              />
              <button
                onClick={saveNickname}
                className="ml-1 text-blue-500 absolute left-0 hover:text-blue-700 cursor-pointer"
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
          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="گزینه های مدیریت"
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
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 text-right">
                {canEditRole && (
                  <>
                    <button
                      className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                      onClick={() => handleRoleChange("مدیر")}
                    >
                      تغییر به مدیر
                    </button>
                    <button
                      className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                      onClick={() => handleRoleChange("طراح")}
                    >
                      تغییر به طراح
                    </button>
                    <button
                      className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                      onClick={() => handleRoleChange("توسعه دهنده")}
                    >
                      تغییر به توسعه دهنده
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                  </>
                )}

                {canEditNickname && !editingNickname && (
                  <button
                    className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                    onClick={() => setEditingNickname(true)}
                  >
                    ویرایش عنوان
                  </button>
                )}

                {canDelete && (
                  <button
                    className="block w-full text-right px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100"
                    onClick={() => onDelete && onDelete(user.id)}
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
