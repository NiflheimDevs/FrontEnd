import React, { createContext, useContext, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NotificationContextType = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const info = (message: string) => toast.info(message);
  const warning = (message: string) => toast.warning(message);

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
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
