import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      <Link to="/profile">
        <button className="bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition">
          Go to Profile
        </button>
      </Link>

      <button
        onClick={() => dispatch(logout())}
        className="mt-4 bg-red-500 px-6 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
