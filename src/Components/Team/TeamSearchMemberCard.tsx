import React, { useState } from "react";
import { User } from "./index";
import { CgProfile } from "react-icons/cg";

interface TeamSearchMemberCardProps {
  user: User;
  selectUser: (user: User) => void;
}

interface TeamFilterSearchMemberCardProps {
  user: User;
  addMember: (user: User) => void;
}

interface TeamSearchSelectedMemberCardProps {
  user: User;
}

interface CreateTeamSearchSelectedMemberCardProps {
  user: User;
  removeMember: (userId: number) => void;
  isSubmitting: boolean;
}

export const TeamSearchMemberCard: React.FC<TeamSearchMemberCardProps> = ({
  user,
  selectUser,
}) => {
  const [profileExists, setProfileExists] = useState(true);
  return (
    <div
      key={user.id}
      onClick={() => selectUser(user)}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-white hover:bg-gray-50 cursor-pointer border-b border-gray-200 rounded-lg transition-colors duration-200 w-full max-w-2xl mx-auto dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center w-full sm:w-auto">
        {profileExists && user.avatar ? (
          <img
            src={user.avatar}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
            onError={() => setProfileExists(false)}
            alt={`${user.name}'s avatar`}
          />
        ) : (
          <CgProfile
            color="#6b7280"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
            tabIndex={-1}
          />
        )}
        <div className="mr-3 text-right flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
          <p className="text-xs text-gray-600 mt-1 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="text-sm bg-blue-50 border border-blue-200 text-blue-400 font-medium px-2 py-1 rounded-md mt-2 sm:mt-0 w-full sm:w-auto text-center sm:text-left dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
        {user.role}
      </div>
    </div>
  );
};

export const TeamFilterSearchMemberCard: React.FC<
  TeamFilterSearchMemberCardProps
> = ({ user, addMember }) => {
  const [profileExists, setProfileExists] = useState(true);
  return (
    <div
      key={user.id}
      onClick={() => addMember(user)}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-2 bg-white hover:bg-blue-50 cursor-pointer border-b border-gray-200 rounded-lg transition-colors duration-200 w-full max-w-2xl mx-auto custom-scrollbar dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg transition-colors duration-200 w-full max-w-2xl mx-auto pl-1">
        <div className="flex items-center w-full sm:w-auto">
          {profileExists && user.avatar ? (
            <img
              src={user.avatar}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
              onError={() => setProfileExists(false)}
              alt={`${user.name}'s avatar`}
            />
          ) : (
            <CgProfile
              color="#6b7280"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
              tabIndex={-1}
            />
          )}
          <div className="mr-0 sm:mr-4 text-right flex-1 pointer-events-none">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="text-xs text-gray-600 mt-1 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="text-sm bg-blue-50 border  pointer-events-none border-blue-200 text-blue-400 font-medium px-2 py-1 rounded-md w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
          {user.role}
        </div>
      </div>
    </div>
  );
};

export const TeamSearchSelectedMemberCard: React.FC<
  TeamSearchSelectedMemberCardProps
> = ({ user }) => {
  const [profileExists, setProfileExists] = useState(true);
  return (
    <div className="mb-6 p-3 sm:p-5 bg-white rounded-xl shadow-md transition-shadow duration-300 w-full max-w-2xl mx-auto dark:bg-gray-900">
      <h3 className="text-gray-800 text-right mb-3 sm:mb-4 font-semibold text-base sm:text-lg dark:text-gray-100">
        کاربر انتخاب شده:
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-1 px-1.5 bg-white border-blue-50 border-2 rounded-lg transition-colors duration-200 w-full max-w-2xl mx-auto dark:bg-gray-900">
        <div className="flex items-center w-full sm:w-auto">
          {profileExists && user.avatar ? (
            <img
              src={user.avatar}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
              onError={() => setProfileExists(false)}
              alt={`${user.name}'s avatar`}
            />
          ) : (
            <CgProfile
              color="#6b7280"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
              tabIndex={-1}
            />
          )}
          <div className="mr-0 sm:mr-4 text-right flex-1 pointer-events-none">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="text-xs text-gray-600 mt-1 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="text-sm bg-blue-50 border  pointer-events-none border-blue-200 text-blue-400 font-medium px-2 py-1 rounded-md w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
          {user.role}
        </div>
      </div>
    </div>
  );
};

export const CreateTeamSearchSelectedMemberCard: React.FC<
  CreateTeamSearchSelectedMemberCardProps
> = ({ user, removeMember, isSubmitting }) => {
  const [profileExists, setProfileExists] = useState(true);
  return (
    <div
      key={user.id}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-2xl mx-auto dark:bg-gray-900"
    >
      <div className="flex flex-row items-center justify-between py-1 px-1.5 bg-white border-2 border-blue-50 rounded-lg transition-colors duration-200 w-full dark:bg-gray-900">
        <div className="flex items-center w-fit">
          <div className="flex items-center w-full sm:w-auto">
            {profileExists && user.avatar ? (
              <img
                src={user.avatar}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                onError={() => setProfileExists(false)}
                alt={`${user.name}'s avatar`}
              />
            ) : (
              <CgProfile
                color="#6b7280"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                tabIndex={-1}
              />
            )}
            <div className="mr-4 text-right flex-1 pointer-events-none">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
              <p className="text-xs text-gray-600 mt-1 dark:text-gray-400">{user.email}</p>
              <div className="text-sm bg-blue-50 border mt-1 flex w-fit  pointer-events-none border-blue-200 text-blue-400 font-medium px-2 py-1 rounded-md text-center sm:text-left mb-2 sm:mb-0 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
                {user.role}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => removeMember(user.id)}
          className={`p-2 rounded-full transition-colors duration-200 w-10 sm:w-12 ${
            isSubmitting
              ? "text-gray-400 cursor-not-allowed bg-gray-100 dark:text-gray-500 dark:bg-gray-800"
              : "text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-800"
          }`}
          type="button"
          disabled={isSubmitting}
          aria-label={`Remove ${user.name}`}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
};
