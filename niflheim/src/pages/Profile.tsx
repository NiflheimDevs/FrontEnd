import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      
      <Link to="/dashboard">
        <button className="bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default Profile;
