// import React, { useState } from "react";
// import DeleteTeamModal from "./DeleteTeamModal";
// import { deleteTeam } from "../api/teamService";
// import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

// interface Team {
//   id: string;
//   name: string;
//   description: string;
//   members: any[];
// }

// const TeamPage: React.FC = () => {
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleOpenDeleteModal = (team: Team) => {
//     setSelectedTeam(team);
//     setIsDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setSelectedTeam(null);
//   };

//   const handleDeleteTeam = async (teamId: string) => {
//     try {
//       setIsDeleting(true);
//       await deleteTeam(teamId);

//       // Update local state after successful deletion
//       setTeams(teams.filter((team) => team.id !== teamId));

//       toast.success("تیم با موفقیت حذف شد");
//       handleCloseDeleteModal();
//     } catch (error) {
//       toast.error(typeof error === "string" ? error : "خطا در حذف تیم!");
//       console.error("Error deleting team:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto" style={{ direction: "rtl" }}>
//       <h1 className="text-2xl font-bold mb-6">مدیریت تیم‌ها</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {teams.map((team) => (
//           <div
//             key={team.id}
//             className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
//           >
//             <h2 className="text-xl font-bold mb-2">{team.name}</h2>
//             <p className="text-gray-600 mb-4">{team.description}</p>

//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => handleOpenDeleteModal(team)}
//                 className="bg-red-50 text-red-500 hover:bg-red-100 py-2 px-4 rounded-lg flex items-center transition-colors duration-200 text-sm"
//               >
//                 <svg
//                   className="w-4 h-4 ml-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   />
//                 </svg>
//                 حذف تیم
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedTeam && (
//         <DeleteTeamModal
//           isOpen={isDeleteModalOpen}
//           onClose={handleCloseDeleteModal}
//           onConfirm={handleDeleteTeam}
//           teamId={selectedTeam.id}
//           teamName={selectedTeam.name}
//           isDeleting={isDeleting}
//         />
//       )}
//     </div>
//   );
// };

// export default TeamPage;

import React from "react";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (teamId: string) => void;
  teamId: string;
  teamName: string;
  isDeleting: boolean;
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  teamId,
  teamName,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-xs"

      style={{ direction: "rtl" }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  حذف تیم
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    آیا از حذف تیم{" "}
                    <span className="font-bold text-gray-700">{teamName}</span>{" "}
                    اطمینان دارید؟ این عمل غیرقابل بازگشت است و تمام داده‌های
                    مرتبط با این تیم از بین خواهد رفت.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${isDeleting ? "opacity-75 cursor-not-allowed" : ""}`}
              onClick={() => onConfirm(teamId)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  در حال حذف...
                </>
              ) : (
                "حذف تیم"
              )}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              disabled={isDeleting}
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
