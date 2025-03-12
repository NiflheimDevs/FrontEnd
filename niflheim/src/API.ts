import axios from "axios";

const BASE_URL = "http://103.75.196.227:8080";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupSendOTP = async (userData: {
  phonenumber: string;
  username: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/signup/send-otp", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const signupVerifyOTP = async (userData: {
  code: string;
  sessionid: string;
}) => {
  try {
    const response = await apiClient.post("/signup/verify", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordSendOTP = async (userData: {
  phonenumber: string;
}) => {
  try {
    const response = await apiClient.post("/forget-password/send-otp", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordVerifyOTP = async (userData: {
  code: string;
  sessionid: string;
}) => {
  try {
    const response = await apiClient.post("/forget-password/verify", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordReset = async (userData: {
  sessionid: string;
  new_password: string;
}) => {
  try {
    const response = await apiClient.post("/forget-password/reset", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const Login = async (userData: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/login", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const ChangePassword = async (userData: {
  old_password: string;
  new_password: string;
}) => {
  try {
    const response = await apiClient.post("/change-password", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};