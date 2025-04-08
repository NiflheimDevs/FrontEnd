import React, { createContext, useContext, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomNotification from "./CustomNotification";

type NotificationContextType = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const success = (message: string) => toast.success(<CustomNotification Message={message} />);
  const error = (message: string) => toast.error(<CustomNotification Message={message} />);
  const info = (message: string) => toast.info(<CustomNotification Message={message} />);
  const warning = (message: string) => toast.warning(<CustomNotification Message={message} />);

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer className={"pl-[8vw] font-[vazirmatn] bg-b"} position="top-right" autoClose={3000} />
    </NotificationContext.Provider>
  );
};

// Custom Hook for easy access
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
