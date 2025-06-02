/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TbCreditCardPay } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { AcceptBid } from "../../API";
import { useNotification } from "../../Notification/NotificationProvider";
import { errorMapper } from "../../pages/Error/Error";

interface UserProfileCardProps {
  bid_id: string;
  title: string;
  prePayment: string;
  total: string;
  deliveryDays: number;
  imageUrl: string;
  description?: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  bid_id,
  title,
  prePayment,
  total,
  deliveryDays,
  imageUrl,
  description,
}) => {
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [ProfileExists, SetProfileExist] = useState<boolean>(true);
  const { projectId } = useParams();
  const handleAccept = async (bid_id: string) => {
    try {
      if (projectId) {
        const APIData = {
          project_id: parseInt(projectId, 0),
        };
        await AcceptBid(bid_id, APIData);
        notifySuccess("پروژه با موفقیت به کارجو واگذار شد.");
      }
    } catch (error: any) {
      const errorData = error;
      if (errorData.tag && errorData.errors?.length > 0) {
        const allErrors = errorData.errors;
        const errorMessages = allErrors.map((err: any) => errorMapper(err));
        notifyError(`${errorMessages.join(" ")}`);
      } else {
        notifyError(`${errorMapper(errorData)}`);
      }
    }
  };
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg border-gray-100 dark:border-gray-600 w-full p-6 box-shadow-custom duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          {ProfileExists ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              onError={() => SetProfileExist(false)}
            />
          ) : (
            <RiTeamFill
              className="text-gray-400 dark:text-gray-300 object-cover p-1 rounded-full border-2 border-gray-200 dark:border-gray-600"
              size={80}
            />
          )}
        </div>

        {/* Info Section */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col w-full">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center md:text-right">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm text-center md:text-right">
                  {truncateText(description, 150)}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full items-center md:items-start space-y-2">
              <div className="flex items-center">
                <TbCreditCardPay
                  size={20}
                  className="text-blue-600 dark:text-blue-400 ml-2"
                />
                <span className="text-gray-700 dark:text-gray-400 text-sm">
                  پیش پرداخت {prePayment} تومان
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-400 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-400 text-sm">
                  مبلغ کل {total} تومان
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-400 text-sm">
                  تحویل در {deliveryDays} روز
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col md:flex-row gap-3 md:gap-4 md:space-x-reverse">
            <button
              className="w-full cursor-pointer bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors flex items-center justify-center text-sm"
              aria-label="چت با کاربر"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              چت
            </button>
            <button
              onClick={() => handleAccept(bid_id)}
              className="w-full cursor-pointer bg-green-500 dark:bg-green-600 text-white py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-500 transition-colors flex items-center justify-center text-sm"
              aria-label="پذیرش پیشنهاد"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              پذیرش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
