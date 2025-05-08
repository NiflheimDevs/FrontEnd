import React, { useState, useRef, useEffect } from "react";
import { Team, TeamData } from "./index";
import { updateTeamInfo } from "../../API";

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

    try {
      setIsSubmitting(true);
      console.log("Sending team update:", teamData);

      // Send data to backend
      const result = await updateTeamInfo(teamData);
      console.log("Update response:", result);

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
          <h2 className="text-xl font-bold">ویرایش تیم</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-right">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-right mb-2"
            >
              نام تیم
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-right"
              placeholder="نام تیم را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-right mb-2"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-right"
              placeholder="توضیحات تیم را وارد کنید"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              disabled={isSubmitting || !name || !description}
            >
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeamModal;
