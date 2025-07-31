import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, FormBiderData } from "../Biders/types";
import BidEditModalTeams from "./BidModalTeams";
import {
  ApiTeamResponse,
  mapApiTeamResponseToTeam,
} from "../../pages/ProjectDetail/types";

interface BidEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  ids: number[];
  teamData: ApiTeamResponse | undefined;
  formData: FormBiderData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTeamSelect: (team_id: number) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BidEditModal: React.FC<BidEditModalProps> = ({
  isOpen,
  onClose,
  teamData,
  ids,
  formData,
  handleInputChange,
  handleTeamSelect,
  handleSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [profileErrors, setProfileErrors] = useState<{
    [key: number]: boolean;
  }>({});
  const [errors, setErrors] = useState<{
    pre_payment: string[];
    total: string[];
    expected_time: string[];
    team_id: string[];
  }>({
    pre_payment: [],
    total: [],
    expected_time: [],
    team_id: [],
  });

  // ولیدیشن برای ورودی‌های عددی
  const validateNumberInput = (value: string, field: string): string[] => {
    const errors: string[] = [];
    if (!value.trim()) {
      errors.push(`${field} الزامی است.`);
    } else if (!/^\d+$/.test(value)) {
      errors.push(`${field} فقط باید شامل اعداد باشد.`);
    } else if (parseInt(value, 10) <= 0) {
      errors.push(`${field} باید بیشتر از صفر باشد.`);
    }
    return errors;
  };

  // ولیدیشن کلی فرم
  const validateForm = (): boolean => {
    const newErrors = {
      pre_payment: validateNumberInput(
        formData.pre_payment?.toString() || "",
        "پیش پرداخت"
      ),
      total: validateNumberInput(formData.total?.toString() || "", "مبلغ کل"),
      expected_time: validateNumberInput(
        formData.expected_time?.toString() || "",
        "زمان مورد انتظار"
      ),
      team_id: formData.team_id ? [] : ["لطفاً یک تیم انتخاب کنید."],
    };

    setErrors(newErrors);

    // بررسی اینکه آیا خطایی وجود دارد یا خیر
    return (
      newErrors.pre_payment.length === 0 &&
      newErrors.total.length === 0 &&
      newErrors.expected_time.length === 0 &&
      newErrors.team_id.length === 0
    );
  };

  // مدیریت تغییر ورودی‌ها با ولیدیشن
  const handleValidatedInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // فقط اجازه ورود اعداد یا رشته خالی را بده
    if (value && !/^\d*$/.test(value)) {
      return; // از به‌روزرسانی ورودی با کاراکتر غیرعددی جلوگیری کن
    }
    handleInputChange(e);
    if (name !== "description") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateNumberInput(
          value,
          name === "pre_payment"
            ? "پیش پرداخت"
            : name === "total"
              ? "مبلغ کل"
              : "زمان مورد انتظار"
        ),
      }));
    }
  };

  // مدیریت انتخاب تیم با ولیدیشن
  const handleValidatedTeamSelect = (team_id: number) => {
    handleTeamSelect(team_id);
    setErrors((prev) => ({
      ...prev,
      team_id: team_id ? [] : ["لطفاً یک تیم انتخاب کنید."],
    }));
  };

  // مدیریت تغییر فرم
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

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

  // بررسی غیرفعال بودن دکمه سابمیت
  const isSubmitDisabled =
    errors.pre_payment.length > 0 ||
    errors.total.length > 0 ||
    errors.expected_time.length > 0 ||
    errors.team_id.length > 0 ||
    !formData.pre_payment ||
    !formData.total ||
    !formData.expected_time ||
    !formData.team_id;

  if (!isOpen) return null;

  return (
    <form className="fixed px-2 inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 h-screen">
      <motion.div
        ref={modalRef}
        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-xl w-full max-w-md mx-2 sm:mx-auto max-h-[90vh] overflow-y-auto"
        initial={{ scale: 1, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 1, y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "circOut" }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-right mb-4">
          تغییر پیشنهاد
        </h2>
        <div className="space-y-4">
          {/* Team Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-right mb-2">
              انتخاب تیم
            </h3>
            <AnimatePresence>
              {errors.team_id.length > 0 && (
                <motion.ul
                  className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  {errors.team_id.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className="list-disc list-inside"
                    >
                      {error}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <div className="max-h-40 pl-2 overflow-y-auto space-y-2">
              {teamData ? (
                <>
                  {ids.includes(teamData.onemanteamid) ? (
                    <BidEditModalTeams
                      key={teamData.onemanteamid}
                      formData={formData}
                      team={mapApiTeamResponseToTeam(teamData)}
                      handleTeamSelect={handleValidatedTeamSelect}
                      profileExists={!profileErrors[teamData.onemanteamid]}
                      onProfileError={() =>
                        handleProfileError(teamData.onemanteamid)
                      }
                    />
                  ) : (
                    <></>
                  )}
                  {teamData.teams
                    .filter(
                      (team) => team.isValid && ids.includes(team.team_id)
                    )
                    .map((team) => (
                      <BidEditModalTeams
                        key={team.team_id}
                        formData={formData}
                        team={team}
                        handleTeamSelect={handleValidatedTeamSelect}
                        profileExists={!profileErrors[team.team_id]}
                        onProfileError={() => handleProfileError(team.team_id)}
                      />
                    ))}
                  {teamData.teams
                    .filter(
                      (team) => !team.isValid && ids.includes(team.team_id)
                    )
                    .map((team) => (
                      <BidEditModalTeams
                        key={team.team_id}
                        formData={formData}
                        team={team}
                        handleTeamSelect={handleValidatedTeamSelect}
                        profileExists={!profileErrors[team.team_id]}
                        onProfileError={() => handleProfileError(team.team_id)}
                      />
                    ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Form Inputs */}
          <div>
            <label className="flex justify-between items-center text-sm font-medium text-gray-800 dark:text-gray-200 text-right mb-2">
              پیش پرداخت (تومان)
              {formData.pre_payment ? (
                <span className="text-xs text-gray-500 dark:text-gray-300 mt-3 block select-none">
                  {`${formatPrice(formData.pre_payment)} تومان`}
                </span>
              ) : (
                <></>
              )}
            </label>
            <input
              type="text"
              name="pre_payment"
              value={formData.pre_payment || ""}
              onChange={handleValidatedInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 transition-colors no-spinner"
              placeholder="400,000"
            />
            <AnimatePresence>
              {errors.pre_payment.length > 0 && (
                <motion.ul
                  className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-2 rounded-lg py-1 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  {errors.pre_payment.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className="list-disc list-inside"
                    >
                      {error}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium items-center text-gray-800 dark:text-gray-200 text-right mb-2">
              مبلغ کل (تومان)
              {formData.total ? (
                <span className="text-xs text-gray-500 dark:text-gray-300 mt-3 block select-none">
                  {`${formatPrice(formData.total)} تومان`}
                </span>
              ) : (
                <></>
              )}
            </label>
            <input
              type="text"
              name="total"
              value={formData.total || ""}
              onChange={handleValidatedInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 transition-colors no-spinner"
              placeholder="2,000,000"
            />
            <AnimatePresence>
              {errors.total.length > 0 && (
                <motion.ul
                  className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-2 rounded-lg py-1 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  {errors.total.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className="list-disc list-inside"
                    >
                      {error}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 text-right mb-1">
              توضیحات
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
              placeholder="توضیحات پیشنهاد"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 text-right mb-1">
              زمان مورد انتظار (روز)
            </label>
            <input
              type="text"
              name="expected_time"
              value={formData.expected_time || ""}
              onChange={handleValidatedInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-right bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500 transition-colors no-spinner"
              placeholder="7"
            />
            <AnimatePresence>
              {errors.expected_time.length > 0 && (
                <motion.ul
                  className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-2 rounded-lg py-1 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  {errors.expected_time.map((error, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className="list-disc list-inside"
                    >
                      {error}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              onClose();
              setErrors({
                pre_payment: [],
                total: [],
                expected_time: [],
                team_id: [],
              });
            }}
            type="button"
            className="cursor-pointer bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white px-14 py-2 rounded-lg text-sm shadow-md transition-colors"
          >
            لغو
          </button>
          <button
            onClick={onSubmit}
            type="submit"
            disabled={isSubmitDisabled}
            className={`cursor-pointer w-full px-14 py-2 rounded-lg text-sm shadow-md transition-colors ${
              isSubmitDisabled
                ? "bg-blue-300 dark:bg-blue-600 text-white cursor-not-allowed"
                : "bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400 text-white"
            }`}
          >
            تغییر
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default BidEditModal;
