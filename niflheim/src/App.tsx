import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React from "react";

function App() {
  const notify = () => toast("nigga fuck that child!");

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <button
          className="bg-gray-800 text-white w-20 h-10 rounded-2xl font-bold hover:bg-gray-700"
          onClick={notify}
        >
          Notify!
        </button>
        <ToastContainer theme="dark" />
      </div>
    </>
  );
}

export default App;
