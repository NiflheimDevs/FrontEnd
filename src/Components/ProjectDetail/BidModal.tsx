import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice, FormBiderData } from "../Biders/types";
import BidModalTeams from "./BidModalTeams";

interface Team {
  team_id: number;
  title: string;
  description: string;
  profile: string;
  isValid: boolean;
}

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  formData: FormBiderData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTeamSelect: (team_id: number) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  teams,
  formData,
  handleInputChange,
  handleTeamSelect,
  handleSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [profileErrors, setProfileErrors] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleProfileError = (teamId: number) => {
    setProfileErrors((prev) => ({ ...prev, [teamId]: true }));
  };

  if (!isOpen) return null;

  return (
    <form className="fixed px-2 inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-xl w-full max-w-md mx-2 sm:mx-auto max-h-[90vh] overflow-y-auto"
        initial={{ scale: 1, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 1, y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "circOut" }}
      >
        <h2 className="text-lg font-semibold text-gray-800 text-right mb-4">
          ارسال پیشنهاد
        </h2>
        <div className="space-y-4">
          {/* Team Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 text-right mb-2">
              انتخاب تیم
            </h3>
            <div className="max-h-40 pl-2 overflow-y-auto space-y-2">
              {teams.map((team) => (
                <BidModalTeams
                  key={team.team_id}
                  formData={formData}
                  team={team}
                  handleTeamSelect={handleTeamSelect}
                  profileExists={!profileErrors[team.team_id]}
                  onProfileError={() => handleProfileError(team.team_id)}
                />
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div>
            <label className="flex justify-between items-center text-sm font-medium text-gray-800 text-right mb-2">
              پیش پرداخت (تومان)
              {formData.pre_payment ? (
                <span className="text-xs text-gray-500 mt-3 block select-none">
                  {`${formatPrice(formData.pre_payment)} تومان`}
                </span>
              ) : (
                <></>
              )}
            </label>
            <input
              type="number"
              name="pre_payment"
              value={formData.pre_payment}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors no-spinner"
              placeholder="400,000"
            />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium items-center text-gray-800 text-right mb-2">
              مبلغ کل (تومان)
              {formData.total ? (
                <span className="text-xs text-gray-500 mt-3 block select-none">
                  {`${formatPrice(formData.total)} تومان`}
                </span>
              ) : (
                <></>
              )}
            </label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors no-spinner"
              placeholder="2,000,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 text-right mb-1">
              توضیحات
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
              placeholder="توضیحات پیشنهاد"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 text-right mb-1">
              زمان مورد انتظار (روز)
            </label>
            <input
              type="number"
              name="expected_time"
              value={formData.expected_time}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors no-spinner"
              placeholder="7"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white px-14 py-2 rounded-lg text-sm shadow-md transition-colors"
          >
            لغو
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="cursor-pointer w-full bg-blue-400 hover:bg-blue-500 text-white px-14 py-2 rounded-lg text-sm shadow-md transition-colors"
          >
            ارسال
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default BidModal;
