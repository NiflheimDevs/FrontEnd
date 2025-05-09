import React, { useState, useRef, useEffect } from "react";
import { Team, TeamData } from "./index";
// import { updateTeamInfo } from "../../API";

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: TeamData) => void;
  team: TeamData;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  team,
}) => {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when team changes
  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
  }, [team]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      setError("لطفا همه فیلدهای ضروری را پر کنید");
      return;
    }

    // Create data object to send to backend
    const teamData = {
      title: name,
      description: description,
      id: team.id,
    };
    console.log("teamData", teamData);
    try {
      setIsSubmitting(true);

      // Send data to backend
      // const result = await updateTeamInfo(teamData);

      // Update team with new data (for frontend state)
      const updatedTeam: Team = {
        ...team,
        name,
        description,
      };

      // Call parent onSubmit function
      onSubmit(updatedTeam);
      setError("");
      onClose();
    } catch (error: any) {
      console.error("Update team error:", error);
      setError(typeof error === "string" ? error : "خطا در بروزرسانی تیم");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
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
          <h2 className="text-xl font-bold text-white">ویرایش تیم</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200"
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
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-right animate-fadeIn">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 text-right mb-2 font-medium"
            >
              نام تیم
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="نام تیم را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-gray-700 text-right mb-2 font-medium"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="توضیحات تیم را وارد کنید"
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg transition-colors duration-200 font-medium"
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center transition-colors duration-200 font-medium ${
                isSubmitting || !name || !description
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              disabled={!name || !description || isSubmitting}
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
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamModal;
