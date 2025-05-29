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

const TeamSearchMemberCard: React.FC<TeamSearchMemberCardProps> = ({
  user,
  selectUser,
}) => {
  const [ProfileExists, SetProfileExist] = useState(true);
  return (
    <div
      key={user.id}
      onClick={() => selectUser(user)}
      className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b"
    >
      <div className="flex items-center">
        {ProfileExists && user.avatar ? (
          <img
            src={user.avatar}
            className="w-8 h-8 rounded-full"
            onError={() => SetProfileExist(false)}
          />
        ) : (
          <CgProfile
            color="#707070"
            className="w-8 h-8 rounded-full m-0.5"
            tabIndex={-1}
          />
        )}
        <div className="mr-2 text-right">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="text-gray-500 text-sm">{user.role}</div>
    </div>
  );
};

export const TeamFilterSearchMemberCard: React.FC<
  TeamFilterSearchMemberCardProps
> = ({ user, addMember }) => {
  const [ProfileExists, SetProfileExist] = useState(true);
  return (
    <div
      key={user.id}
      onClick={() => addMember(user)}
      className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer border-b transition-colors duration-150"
    >
      <div className="text-gray-500 text-sm">{user.role}</div>
      <div className="flex items-center">
        <div className="mr-3 text-right">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        {ProfileExists && user.avatar ? (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full border-2 border-gray-200"
            onError={() => SetProfileExist(false)}
          />
        ) : (
          <CgProfile
            color="#707070"
            className="w-10 h-10 rounded-full border-2 border-gray-200 m-0.5"
            tabIndex={-1}
          />
        )}
      </div>
    </div>
  );
};

export const TeamSearchSelectedMemberCard: React.FC<
  TeamSearchSelectedMemberCardProps
> = ({ user }) => {
  const [ProfileExists, SetProfileExist] = useState(true);
  return (
    <div className="mb-5 p-4 rounded-lg">
      <h3 className="text-gray-700 text-right mb-2 font-medium">
        کاربر انتخاب شده:
      </h3>
      <div className="flex items-center justify-start bg-gray-50 rounded-lg">
        {ProfileExists && user.avatar ? (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full"
            onError={() => SetProfileExist(false)}
          />
        ) : (
          <CgProfile
            color="#707070"
            className="w-10 h-10 rounded-full m-0.5"
            tabIndex={-1}
          />
        )}
        <div className="mr-3 text-right">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export const CreateTeamSearchSelectedMemberCard: React.FC<
  CreateTeamSearchSelectedMemberCardProps
> = ({ user, removeMember, isSubmitting }) => {
  const [ProfileExists, SetProfileExist] = useState(true);
  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-150"
    >
      <div className="flex items-center">
        {ProfileExists && user.avatar ? (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full border-2 border-blue-200"
            onError={() => SetProfileExist(false)}
          />
        ) : (
          <CgProfile
            color="#707070"
            className="w-10 h-10 rounded-full border-2 border-blue-200 m-0.5"
            tabIndex={-1}
          />
        )}
        <div className="mr-3 text-right">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>
      <button
        onClick={() => removeMember(user.id)}
        className="text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 p-1 rounded-full transition-colors duration-150"
        type="button"
        disabled={isSubmitting}
      >
        <svg
          className="w-5 h-5"
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
  );
};

export default TeamSearchMemberCard;
