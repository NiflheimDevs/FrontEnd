import React, { useState, useRef, useEffect } from "react";
import { TeamData } from "./index";
import { updateTeamInfo } from "../../API";

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: TeamData, teamPictureFile: File | null) => void;
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
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);
  const [teamPictureFile, setTeamPictureFile] = useState<File | null>(null);
  const [teamPicturePreview, setTeamPicturePreview] = useState<string | null>(
    team.picture || null
  );
  // const [removePicture, setRemovePicture] = useState(false);
  const [, setRemovePicture] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when team changes
  useEffect(() => {
    setName(team.name);
    setDescription(team.description);
    setTeamPicturePreview(team.picture || null);
    setTeamPictureFile(null);
    setRemovePicture(false);
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

  // Handle picture file selection
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTeamPictureFile(file);
      setTeamPicturePreview(URL.createObjectURL(file));
      setRemovePicture(false);
    }
  };

  // Trigger file input click
  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  // Remove picture
  const handleRemovePicture = () => {
    setTeamPictureFile(null);
    setTeamPicturePreview(null);
    setRemovePicture(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      setError("لطفا همه فیلدهای ضروری را پر کنید");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Prepare the payload for backend API
      const updatePayload = {
        title: name, // Backend expects 'title' instead of 'name'
        description: description,
        id: team.id,
      };

      await updateTeamInfo(updatePayload);

      // Create updated team data object for frontend state
      const updatedTeam: TeamData = {
        ...team,
        name: name,
        description: description,
        picture: teamPicturePreview || team.picture,
      };

      // Call parent onSubmit function with updated team data and picture file
      onSubmit(updatedTeam, teamPictureFile);

      onClose();
    } catch (error: any) {
      console.error("Update team error:", error);
      setError(
        error?.message ||
          error?.response?.data?.message ||
          typeof error === "string"
          ? error
          : "خطا در بروزرسانی تیم"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-screen overflow-y-auto animate-fadeIn dark:bg-gray-900"
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          direction: "rtl",
        }}
      >
        <div className="flex justify-between items-center border-b p-4 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-800 dark:to-blue-900">
          <h2 className="text-xl font-bold text-white">ویرایش تیم</h2>

          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 hover:bg-opacity-30 p-2 cursor-pointer rounded-full transition-all duration-200 dark:hover:bg-blue-800"
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
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-right animate-fadeIn dark:bg-red-900 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Team Picture Section */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <div
                className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2 border-4 border-white shadow-lg cursor-pointer dark:bg-gray-800 dark:border-gray-900"
                onClick={handlePictureClick}
              >
                {ProfileExists && teamPicturePreview ? (
                  <img
                    src={teamPicturePreview}
                    alt="تصویر تیم"
                    className="w-full h-full object-cover"
                    onError={() => SetProfileExist(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                )}
              </div>

              {teamPicturePreview && (
                <button
                  type="button"
                  onClick={handleRemovePicture}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full cursor-pointer p-1 shadow-md hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePictureChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              onClick={handlePictureClick}
              className="text-blue-500 text-sm mt-2 cursor-pointer hover:text-blue-600 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
            >
              {teamPicturePreview ? "تغییر تصویر تیم" : "افزودن تصویر تیم"}
            </button>
          </div>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 text-right mb-2 font-medium dark:text-gray-200"
            >
              نام تیم
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              placeholder="نام تیم را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-gray-700 text-right mb-2 font-medium dark:text-gray-200"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
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
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 py-2 px-6 rounded-lg transition-colors duration-200 font-medium dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-6 rounded-lg flex items-center transition-colors duration-200 font-medium dark:bg-blue-700 dark:hover:bg-blue-800 ${
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
