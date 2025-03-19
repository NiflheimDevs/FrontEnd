// import axios from "axios";

// const BASE_URL = "http://103.75.196.227:8080";

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const signupSendOTP = async (userData: {
//   phonenumber: string;
//   username: string;
//   password: string;
// }) => {
//   try {
//     const response = await apiClient.post("/signup/send-otp", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const signupVerifyOTP = async (userData: {
//   code: string;
//   sessionid: string;
// }) => {
//   try {
//     const response = await apiClient.post("/signup/verify", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const forgetPasswordSendOTP = async (userData: {
//   phonenumber: string;
// }) => {
//   try {
//     const response = await apiClient.post("/forget-password/send-otp", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const forgetPasswordVerifyOTP = async (userData: {
//   code: string;
//   sessionid: string;
// }) => {
//   try {
//     const response = await apiClient.post("/forget-password/verify", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const forgetPasswordReset = async (userData: {
//   sessionid: string;
//   new_password: string;
// }) => {
//   try {
//     const response = await apiClient.post("/forget-password/reset", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const Login = async (userData: {
//   identifier: string;
//   password: string;
// }) => {
//   try {
//     const response = await apiClient.post("/login", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const ChangePass = async (userData: {
//   new_password: string;
//   old_password: string;
// }) => {
//   try {
//     const response = await apiClient.post("/change-password", userData);
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };



import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://103.75.196.227:8080";

interface TokenPayload {
  exp: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const getToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setToken = (token: string) => localStorage.setItem("token", token);
const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/auth";
};

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<TokenPayload>(token);
    return exp - Math.floor(Date.now() / 1000) <= 60;
  } catch {
    return true;
  }
};

const refreshToken = async (): Promise<string | null> => {
  const token = getToken();
  const refreshTokenValue = getRefreshToken();
  if (!token || !refreshTokenValue || !isTokenExpired(token)) return token;

  try {
    const { data } = await axios.post(`${BASE_URL}/auth/token/refresh`, {
      refresh: refreshTokenValue,
    });
    setToken(data.token);
    return data.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearAuthData();
    return null;
  }
};

apiClient.interceptors.request.use(async (config) => {
  let token = getToken();
  if (token) {
    token = await refreshToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) clearAuthData();
    return Promise.reject(error);
  }
);

const handleRequest = async (method: string, url: string, data?: any) => {
  try {
    const response = await apiClient({ method, url, data });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const signupSendOTP = (userData: { phonenumber: string; username: string; password: string; }) => 
  handleRequest("post", "/signup/send-otp", userData);

export const signupVerifyOTP = (userData: { code: string; sessionid: string; }) => 
  handleRequest("post", "/signup/verify", userData);

export const forgetPasswordSendOTP = (userData: { phonenumber: string; }) => 
  handleRequest("post", "/forget-password/send-otp", userData);

export const forgetPasswordVerifyOTP = (userData: { code: string; sessionid: string; }) => 
  handleRequest("post", "/forget-password/verify", userData);

export const forgetPasswordReset = (userData: { sessionid: string; new_password: string; }) => 
  handleRequest("post", "/forget-password/reset", userData);

export const Login = (userData: { identifier: string; password: string; }) => 
  handleRequest("post", "/login", userData);

export const ChangePass = (userData: { new_password: string; old_password: string; }) => 
  handleRequest("post", "/change-password", userData);
