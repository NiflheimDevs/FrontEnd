// import { Color, Teams } from "./types";
// import { Link } from "react-router-dom";
// import clsx from "clsx";
// import { useState } from "react";
// import { RiTeamFill } from "react-icons/ri";
// import { CgProfile } from "react-icons/cg";

// interface TeamProfileCardProps {
//   data: Teams;
//   localcolor: Color;
// }

// const TeamProfileCard = ({ data, localcolor }: TeamProfileCardProps) => {
//   const [ProfileExists, SetProfileExist] = useState(true);
//   const [OwnerProfileExists, SetOwnerProfileExist] = useState(true);

//   return (
//     <div className="w-full p-6 flex flex-col gap-5 rounded-2xl box-shadow-custom  duration-200 bg-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//         {/* Team Section */}
//         <div className="flex items-center  gap-4">
//           <div className="relative w-16 h-16 border-2 shadow-sm rounded-full flex justify-center items-center">
//             {ProfileExists ? (
//               <>
//                 <img
//                   src={data.profile}
//                   alt="پروفایل تیم"
//                   className={clsx(
//                     "w-full h-full rounded-full object-cover border-2 shadow-sm",
//                     `border-${localcolor.color}/30`
//                   )}
//                   onError={() => SetProfileExist(false)}
//                 />
//                 <span
//                   className={clsx(
//                     "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
//                     `bg-${localcolor.color}`
//                   )}
//                 ></span>
//               </>
//             ) : (
//               <RiTeamFill className="text-gray-400" size={40} />
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 font-[vazirmatn]">
//               {data.title}
//             </h3>
//             <p className="text-sm text-gray-500 font-[vazirmatn]">
//               {data.position || ""}
//             </p>
//           </div>
//         </div>

//         {/* Owner Section */}
//         <div className="flex items-center gap-3 border-2 rounded-xl px-3 py-2 shadow-sm">
//           {OwnerProfileExists ? (
//             <img
//               src={data.owner.profile}
//               alt={`${data.owner.member_info.firstname} ${data.owner.member_info.lastname}`}
//               className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
//               onError={() => SetOwnerProfileExist(false)}
//             />
//           ) : (
//             <CgProfile className="text-gray-400" size={36} />
//           )}
//           <div className="text-center">
//             <p className="text-sm font-semibold text-gray-800 font-[vazirmatn]">
//               {data.owner.member_info.firstname} {data.owner.member_info.lastname}
//             </p>
//             <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-[vazirmatn]">
//               <span
//                 className={clsx("w-2 h-2 rounded-full", `bg-${localcolor.color}`)}
//               ></span>
//               <span>{data.owner.member_info.position || "مالک"}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Description & CTA */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-gray-600 font-[vazirmatn] sm:text-right text-center sm:w-3/5">
//           {data.description}
//         </p>
//         <Link
//           to={`/team/${data.id}`}
//           aria-label={`نمایش جزئیات تیم: ${data.title}`}
//           className="w-full sm:w-auto flex justify-center sm:justify-end"
//         >
//           <button
//             className={clsx(
//               `bg-${localcolor.color}`,
//               `hover:bg-${localcolor.hover}`,
//               `focus:ring-${localcolor.color}`,
//               "text-white text-sm cursor-pointer px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-2"
//             )}
//           >
//             نمایش جزئیات
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default TeamProfileCard;
import { Color, Teams } from "./types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { RiTeamFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

interface TeamProfileCardProps {
  data: Teams;
  localcolor: Color;
}

const TeamProfileCard = ({ data, localcolor }: TeamProfileCardProps) => {
  const [ProfileExists, SetProfileExist] = useState(true);
  const [OwnerProfileExists, SetOwnerProfileExist] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Open modal with the clicked image
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Handle Escape key to close modal and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-5 rounded-2xl box-shadow-custom duration-200 bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Team Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 border-2 shadow-sm rounded-full flex justify-center items-center">
              {ProfileExists ? (
                <>
                  <img
                    src={data.profile}
                    alt="پروفایل تیم"
                    className={clsx(
                      "w-full h-full rounded-full object-cover border-2 shadow-sm cursor-pointer",
                      `border-${localcolor.color}/30`
                    )}
                    onError={() => SetProfileExist(false)}
                    onClick={() => openModal(data.profile)}
                  />
                </>
              ) : (
                <RiTeamFill className="text-gray-400" size={40} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-[vazirmatn]">
                {data.title}
              </h3>
              <p className="text-sm text-gray-500 font-[vazirmatn]">
                {data.position || ""}
              </p>
            </div>
          </div>

          {/* Owner Section */}
          <div className="flex items-center gap-3 border-2 rounded-3xl box-shadow-custom px-3 py-2">
            {OwnerProfileExists ? (
              <img
                src={data.owner.profile}
                alt={`${data.owner.member_info.firstname} ${data.owner.member_info.lastname}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                onError={() => SetOwnerProfileExist(false)}
                onClick={() => openModal(data.owner.profile)}
              />
            ) : (
              <CgProfile className="text-gray-400" size={36} />
            )}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800 font-[vazirmatn]">
                {data.owner.member_info.firstname}{" "}
                {data.owner.member_info.lastname}
              </p>
              <div className="flex items-center justify-start gap-2 text-xs text-gray-500 font-[vazirmatn]">
                <span
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    `bg-${localcolor.color}`
                  )}
                ></span>
                <span>{data.owner.member_info.position || "مالک"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 font-[vazirmatn] sm:text-right text-center sm:w-3/5">
            {data.description}
          </p>
          <Link
            to={`/team/${data.id}`}
            aria-label={`نمایش جزئیات تیم: ${data.title}`}
            className="w-full sm:w-auto flex justify-center sm:justify-end"
          >
            <button
              className={clsx(
                `bg-${localcolor.color}`,
                `hover:bg-${localcolor.hover}`,
                `focus:ring-${localcolor.color}`,
                "text-white text-sm cursor-pointer px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-2"
              )}
            >
              نمایش جزئیات
            </button>
          </Link>
        </div>
      </div>

      {/* Improved Image Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closeModal}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className="relative w-fit py-2 px-4 transform transition-transform duration-300 scale-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer top-[1rem] right-[1.5rem] text-gray-200 hover:text-white bg-gray-800 rounded-full p-2 shadow-md md:scale-100 sm:scale-95 scale-90 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={closeModal}
              aria-label="بستن تصویر"
            >
              <IoClose size={24} />
            </button>
            <h2 id="modal-title" className="sr-only">
              تصویر بزرگ‌شده
            </h2>
            <img
              src={selectedImage}
              alt="تصویر بزرگ‌شده"
              className="w-full h-auto max-h-[70vh] rounded-lg object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TeamProfileCard;