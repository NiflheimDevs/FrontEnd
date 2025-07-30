/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, X } from "lucide-react";
import { Profile, useOtpTimer } from "./types";
import { useNotification } from "../../Notification/NotificationProvider";
import { PutUserName, PutEmail, PutPhoneSendOtp } from "../../API";
import React, { useState, useCallback } from "react";
import OtpSection from "./OtpSection";
import { errorMapper } from "../../pages/Error/Error";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { Area } from "react-easy-crop";
import { BiMailSend } from "react-icons/bi";

// Utility function to resize image before cropping
const resizeImage = (imageSrc: string, maxSize: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement("img");
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = image;

      // Resize if the image is larger than maxSize
      if (width > height && width > maxSize) {
        height = (maxSize / width) * height;
        width = maxSize;
      } else if (height > maxSize) {
        width = (maxSize / height) * width;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("خطا در ایجاد کانتکس کانواس برای تغییر اندازه"));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };

    image.onerror = () => {
      reject(new Error("خطا در بارگذاری تصویر برای تغییر اندازه"));
    };
  });
};

// Utility function to convert cropped image to File
const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement("img");
    image.src = imageSrc;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("خطا در ایجاد کانتکس کانواس برای برش"));
          return;
        }

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File([blob], "profile-picture.jpg", { type: "image/jpeg" })
              );
            } else {
              const dataUrl = canvas.toDataURL("image/jpeg");
              fetch(dataUrl)
                .then((res) => res.blob())
                .then((blob) =>
                  resolve(
                    new File([blob], "profile-picture.jpg", {
                      type: "image/jpeg",
                    })
                  )
                )
                .catch(() => reject(new Error("خطا در تبدیل تصویر به فایل")));
            }
          },
          "image/jpeg",
          0.9
        );
      } catch (error) {
        reject(
          new Error(
            "خطا در پردازش تصویر: " +
              (error instanceof Error ? error.message : String(error))
          )
        );
      }
    };

    image.onerror = () => {
      reject(new Error("خطا در بارگذاری تصویر برای برش"));
    };
  });
};

interface UserInfoSectionProps {
  localProfile: Profile;
  setLocalProfile: React.Dispatch<React.SetStateAction<Profile>>;
  profileFromRedux: Profile;
  profilePictureFile: File | null;
  setProfilePictureFile: React.Dispatch<React.SetStateAction<File | null>>;
  changedPhone: boolean;
  setChangedPhone: React.Dispatch<React.SetStateAction<boolean>>;
  changedEmail: boolean;
  setChangedEmail: React.Dispatch<React.SetStateAction<boolean>>;
  changedUsername: boolean;
  setChangedUsername: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserInfoSection({
  localProfile,
  setLocalProfile,
  profileFromRedux,
  profilePictureFile,
  setProfilePictureFile,
  changedPhone,
  setChangedPhone,
  changedEmail,
  setChangedEmail,
  changedUsername,
  setChangedUsername,
}: UserInfoSectionProps) {
  const { error: notifyError, success: notifySuccess } = useNotification();
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showX, setShowX] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resizedImageSrc, setResizedImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const { timeLeft, setTimeLeft, isScaled, setIsScaled } = useOtpTimer(
    120,
    showOtpSection
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
          notifyError("فقط فرمت‌های jpg، jpeg، png و webp مجاز هستند");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          notifyError("حجم فایل باید کمتر از ۵ مگابایت باشد");
          return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const originalSrc = reader.result as string;
            setImageSrc(originalSrc);

            // Resize the image before cropping
            const resizedSrc = await resizeImage(originalSrc, 1000);
            setResizedImageSrc(resizedSrc);
            setShowCropper(true);
          } catch (error) {
            notifyError(
              "خطا در تغییر اندازه تصویر: " +
                (error instanceof Error ? error.message : String(error))
            );
          }
        };
        reader.onerror = () => {
          notifyError("خطا در خواندن فایل تصویر");
        };
        reader.readAsDataURL(file);
      } else {
        notifyError("هیچ فایلی انتخاب نشد");
      }
    },
    [notifyError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    noDrag: true,
  });

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropConfirm = useCallback(async () => {
    if (!imageSrc) {
      notifyError("هیچ تصویری برای برش انتخاب نشده است");
      return;
    }
    if (!croppedAreaPixels) {
      notifyError("منطقه برش تصویر مشخص نشده است");
      return;
    }

    try {
      const croppedFile = await getCroppedImg(
        resizedImageSrc || imageSrc,
        croppedAreaPixels
      );
      setProfilePictureFile(croppedFile);
      setLocalProfile((prev) => ({
        ...prev,
        high_profile: URL.createObjectURL(croppedFile),
      }));
      setShowCropper(false);
      setImageSrc(null);
      setResizedImageSrc(null);
      notifySuccess("عکس پروفایل با موفقیت انتخاب شد");
    } catch (error) {
      notifyError(
        error instanceof Error
          ? error.message
          : "خطا در برش تصویر: مشکلی رخ داده است"
      );
    }
  }, [
    imageSrc,
    resizedImageSrc,
    croppedAreaPixels,
    setProfilePictureFile,
    setLocalProfile,
    notifyError,
    notifySuccess,
  ]);

  const handleRemoveProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePictureFile(null);
    SetProfileExist(false);
    setLocalProfile((prev) => ({ ...prev, high_profile: "" }));
    notifySuccess("عکس پروفایل با موفقیت حذف شد");
  };

  const handleInputChange = (field: keyof Profile, value: any) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));
  };

  const [ProfileExists, SetProfileExist] = useState<boolean>(true);

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <div
            {...getRootProps()}
            className="w-32 h-32 md:w-36 md:h-36 border-2 border-blue-500 dark:border-blue-600 rounded-full flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400 relative cursor-pointer"
            tabIndex={1}
          >
            <input {...getInputProps()} />
            {profilePictureFile ? (
              <>
                <img
                  src={URL.createObjectURL(profilePictureFile)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover transition-all duration-400 ease-in-out hover:scale-105"
                  onMouseEnter={() => setShowX(true)}
                  onMouseLeave={() => setShowX(false)}
                />
                <button
                  onClick={handleRemoveProfile}
                  className={`absolute bg-black bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-400 ease-in-out cursor-pointer ${showX ? "md:opacity-70 opacity-50" : "md:opacity-0 md:hover:opacity-70 opacity-50"}`}
                  tabIndex={2}
                >
                  <X size={20} color="white" />
                </button>
              </>
            ) : ProfileExists ? (
              <>
                <img
                  src={localProfile.high_profile}
                  alt="Profile"
                  className="w-full h-full object-cover transition-all duration-400 ease-in-out hover:scale-105"
                  onMouseEnter={() => setShowX(true)}
                  onMouseLeave={() => setShowX(false)}
                  onError={() => SetProfileExist(false)}
                />
                <button
                  onClick={handleRemoveProfile}
                  className={`absolute bg-black bg-opacity-50 rounded-full p-1 border-2 border-white transition duration-400 ease-in-out cursor-pointer ${showX ? "md:opacity-70 opacity-50" : "md:opacity-0 md:hover:opacity-70 opacity-50"}`}
                  tabIndex={2}
                >
                  <X size={20} color="white" />
                </button>
              </>
            ) : (
              <Image className="text-gray-500" size={46} />
            )}
          </div>
          <span className="mt-2 font-semibold text-gray-600 dark:text-gray-300">
            پروفایل
          </span>
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-200">
            <div className="relative w-full h-64">
              <Cropper
                image={resizedImageSrc || imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => {
                  setShowCropper(false);
                  setImageSrc(null);
                  setResizedImageSrc(null);
                }}
                tabIndex={3}
              >
                لغو
              </button>
              <button
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg"
                onClick={handleCropConfirm}
                tabIndex={4}
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 dark:text-gray-300 w-24 text-right">
            نام کاربری
          </label>
          <input
            type="text"
            value={localProfile.username}
            onChange={(e) => {
              const value = e.target.value;
              setLocalProfile((prev) => ({ ...prev, username: value }));
              setChangedUsername(value !== profileFromRedux.username);
            }}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right dark:border-gray-500 [direction:rtl]"
            tabIndex={5}
          />
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[160px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] dark:bg-blue-600 py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              changedUsername
                ? "hover:bg-blue-600 focus:bg-blue-600  dark:hover:bg-blue-700 dark:focus:bg-blue-700 focus:shadow-lg cursor-pointer"
                : "opacity-60"
            }`}
            onClick={async () => {
              try {
                const usernameData = { username: localProfile.username };
                await PutUserName(usernameData);
                notifySuccess("نام کاربری با موفقیت تغییر کرد");
              } catch (error: any) {
                const errorData = error;
                if (errorData.tag && errorData.errors?.length > 0) {
                  const allErrors = errorData.errors;
                  const errorMessages = allErrors.map((err: any) =>
                    errorMapper(err)
                  );
                  notifyError(`${errorMessages.join(" ")}`);
                } else {
                  notifyError(`${errorMapper(errorData)}`);
                }
              }
            }}
            tabIndex={6}
            disabled={!changedUsername}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
              />
            </svg>
            <span>تغییر نام کاربری</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 dark:text-gray-300 w-24 text-right">
            ایمیل
          </label>
          <div className="relative w-full sm:flex-1">
            <input
              type="email"
              value={localProfile.email}
              onChange={(e) => {
                const value = e.target.value;
                setLocalProfile((prev) => ({ ...prev, email: value }));
                setChangedEmail(value !== profileFromRedux.email);
              }}
              placeholder="example@gmail.com"
              className="w-full py-2 pr-2 pl-20 border-2 rounded-lg text-right dark:border-gray-500 [direction:rtl]"
              tabIndex={7}
            />
            <span
              className={`group absolute h-full justify-center items-center px-2 rounded-lg shadow-lg ${
                localProfile.is_verified ? `bg-green-500` : `bg-gray-500`
              } flex left-0 top-1/2 transform -translate-y-1/2 text-sm text-white`}
            >
              {localProfile.is_verified ? (
                `تایید شده`
              ) : (
                <>
                  <button className="cursor-pointer flex gap-1 justify-center items-center">
                    <BiMailSend className="flex mr-1" size={20} />
                    تایید نشده
                  </button>
                  <span className="absolute left-full ml-2 top-1/2 transform pointer-events-none whitespace-nowrap -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ارسال مجدد ایمیل
                  </span>
                </>
              )}
            </span>
          </div>
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[160px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] dark:bg-blue-600 py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              changedEmail
                ? "hover:bg-blue-600 focus:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700 focus:shadow-lg cursor-pointer"
                : "opacity-60"
            }`}
            onClick={async () => {
              try {
                const emailData = { email: localProfile.email };
                await PutEmail(emailData);
                notifySuccess("ایمیل با موفقیت تغییر کرد");
              } catch (error: any) {
                const errorData = error;
                if (errorData.tag && errorData.errors?.length > 0) {
                  const allErrors = errorData.errors;
                  const errorMessages = allErrors.map((err: any) =>
                    errorMapper(err)
                  );
                  notifyError(`${errorMessages.join(" ")}`);
                } else {
                  notifyError(`${errorMapper(errorData)}`);
                }
              }
            }}
            tabIndex={8}
            disabled={!changedEmail}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
              />
            </svg>
            <span>تغییر ایمیل</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 dark:text-gray-300 w-24 text-right">
            شماره تماس
          </label>
          <input
            type="tel"
            value={localProfile.phoneNumber}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              const value = e.target.value;
              setLocalProfile((prev) => ({ ...prev, phoneNumber: value }));
              if (value.startsWith("09") && value.length === 11) {
                setChangedPhone(value !== profileFromRedux.phoneNumber);
              } else {
                setChangedPhone(false);
              }
            }}
            placeholder="*********09"
            className="w-full sm:flex-1 p-2 border-2 dark:border-gray-500 rounded-lg text-right [direction:rtl]"
            maxLength={11}
            tabIndex={9}
          />
          <button
            className={`flex items-center gap-2 md:w-[170px] sm:w-[160px] justify-center transition-all duration-200 ease-in-out rounded-[20px] bg-[#3E79DE] dark:bg-blue-600 py-2.5 text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${
              !changedPhone || (showOtpSection && timeLeft > 0)
                ? "opacity-60"
                : "hover:bg-blue-600 focus:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700 focus:shadow-lg cursor-pointer"
            }`}
            tabIndex={10}
            disabled={!changedPhone || (showOtpSection && timeLeft > 0)}
            onClick={async () => {
              if (changedPhone) {
                try {
                  const phoneData = { phone: localProfile.phoneNumber };
                  const codeSession = await PutPhoneSendOtp(phoneData);
                  setLocalProfile((prev) => ({
                    ...prev,
                    SessionID: codeSession,
                  }));
                  setTimeLeft(120);
                  setIsScaled(false);
                  setShowOtpSection(true);
                  notifySuccess("کد تایید ارسال شد");
                } catch (error: any) {
                  const errorData = error;
                  if (errorData.tag && errorData.errors?.length > 0) {
                    const allErrors = errorData.errors;
                    const errorMessages = allErrors.map((err: any) =>
                      errorMapper(err)
                    );
                    notifyError(`${errorMessages.join(" ")}`);
                  } else {
                    notifyError(`${errorMapper(errorData)}`);
                  }
                }
              }
            }}
          >
            {!showOtpSection ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6 21.5H3v-3.5L15.232 5.232z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle-reply-icon lucide-message-circle-reply"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="m10 15-3-3 3-3" />
                <path d="M7 12h7a2 2 0 0 1 2 2v1" />
              </svg>
            )}
            <span>
              {showOtpSection ? "دریافت مجدد کد" : "تغییر شماره تماس"}
            </span>
          </button>
        </div>

        <OtpSection
          isScaled={isScaled}
          setIsScaled={setIsScaled}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          showOtpSection={showOtpSection}
          setShowOtpSection={setShowOtpSection}
          phoneNumber={localProfile.phoneNumber}
          localProfile={localProfile}
          setLocalProfile={setLocalProfile}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right dark:text-gray-300 flex gap-1">
            <span>نام</span>
          </label>
          <input
            type="text"
            value={localProfile.firstName}
            placeholder="نام خود را وارد کنید"
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl] dark:border-gray-500"
            tabIndex={11}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 flex text-gray-600 w-24 text-right gap-1 dark:text-gray-300">
            <span>نام خانوادگی</span>
          </label>
          <input
            type="text"
            value={localProfile.lastName}
            placeholder="نام خانوادگی خود را وارد کنید"
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full sm:flex-1 p-2 border-2 rounded-lg text-right [direction:rtl] dark:border-gray-500"
            tabIndex={12}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <label className="font-semibold mt-2 text-gray-600 w-24 text-right dark:text-gray-300">
            بیوگرافی
          </label>
          <textarea
            value={localProfile.bio}
            placeholder="درباره خودت بنویس..."
            onChange={(e) => handleInputChange("bio", e.target.value)}
            className="w-full sm:flex-1 p-2 min-h-[100px] border-2 rounded-lg text-right [direction:rtl] dark:border-gray-500"
            tabIndex={12}
          />
        </div>
      </div>
    </>
  );
}
