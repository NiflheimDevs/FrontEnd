
// import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// // Base URL for your API (use environment variable in production)
// const BASE_URL = "https://103.75.196.227:8080";

// // Interface for JWT token payload (for type safety)
// interface TokenPayload {
//   exp: number;
// }

// // Create an Axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000, 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Check if token is expired (with a 60-second buffer)
// const isTokenExpired = (token: string): boolean => {
//   try {
//     const { exp } = jwtDecode<TokenPayload>(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     return exp - currentTime <= 60; // Refresh if expiring within 60 seconds
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return true; // Assume expired if decoding fails
//   }
// };

// // Refresh token logic
// const refreshToken = async (): Promise<string | null> => {
//   const token = localStorage.getItem("token");
//   const refreshTokenValue = localStorage.getItem("refreshToken"); // Assuming you store a refresh token
//   if (!token || !refreshTokenValue) return null;

//   if (isTokenExpired(token)) {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/token/refresh`, {
//         refresh: refreshTokenValue,
//       });
//       const newToken = response.data.token;
//       localStorage.setItem("token", newToken);
//       return newToken;
//     } catch (error) {
//       console.error("Token refresh failed:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       window.location.href = "/auth"; // Redirect to login
//       return null;
//     }
//   }
//   return token;
// };

// // Request interceptor to attach token and refresh if needed
// api.interceptors.request.use(
//   async (config) => {
//     let token = localStorage.getItem("token");
//     if (token) {
//       token = await refreshToken(); // Refresh if expired
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// // Response interceptor for global error handling
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       window.location.href = "/auth"; // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

// // API service object
// const apiServices = {
//   // Login API
//   async login(email: string, password: string): Promise<any> {
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       const { token, refreshToken } = response.data; // Assuming refresh token is returned
//       localStorage.setItem("token", token);
//       if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Login failed";
//     }
//   },

//   // Signup API
//   async signup(email: string, password: string, phone: string): Promise<any> {
//     try {
//       const response = await api.post("/auth/signup", { email, password, phone });
//       const { token, refreshToken } = response.data;
//       localStorage.setItem("token", token);
//       if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Signup failed";
//     }
//   },

//   // Forgot Password API
//   async forgotPassword(phone: string): Promise<any> {
//     try {
//       const response = await api.post("/auth/forgot-password", { phone });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Failed to send OTP";
//     }
//   },

//   // Verify OTP API
//   async verifyOtp(phone: string, otp: string): Promise<any> {
//     try {
//       const response = await api.post("/auth/verify-otp", { phone, otp });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "OTP verification failed";
//     }
//   },

//   // Change Password API
//   async changePassword(newPassword: string): Promise<any> {
//     try {
//       const response = await api.post("/auth/change-password", { newPassword });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Password change failed";
//     }
//   },

//   // Get User Profile API (with optional query params)
//   async getProfile(params?: Record<string, string>): Promise<any> {
//     try {
//       const response = await api.get("/user/profile", { params });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Failed to fetch profile";
//     }
//   },

//   // Update User Profile API (supports FormData for file uploads)
//   async updateProfile(data: FormData): Promise<any> {
//     try {
//       const response = await api.put("/user/profile", data, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Set for file uploads
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Failed to update profile";
//     }
//   },

//   // Get Projects API (with optional query params)
//   async getProjects(params?: Record<string, string>): Promise<any> {
//     try {
//       const response = await api.get("/projects", { params });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Failed to fetch projects";
//     }
//   },

//   // Create Project API
//   async createProject(title: string, description: string): Promise<any> {
//     try {
//       const response = await api.post("/projects", { title, description });
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || "Failed to create project";
//     }
//   },

//   // Logout
//   logout(): void {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     window.location.href = "/auth";
//   },
// };

// // ارسال داده به بک‌اند با استفاده از createAsyncThunk
// export const createProject = createAsyncThunk(
//   "project/createProject",
//   async (projectData: FormData, { rejectWithValue }) => {
//     try {
//       return await apiServices.createProject(projectData);
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export default apiServices;
















// import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";

// const BASE_URL = "https://103.75.196.227:8080";

// interface TokenPayload {
//   exp: number;
// }

// const apiClient: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
// });

// const getToken = () => localStorage.getItem("token");
// const getRefreshToken = () => localStorage.getItem("refreshToken");
// const setToken = (token: string) => localStorage.setItem("token", token);
// const clearAuthData = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("refreshToken");
//   window.location.href = "/auth";
// };

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const { exp } = jwtDecode<TokenPayload>(token);
//     return exp - Math.floor(Date.now() / 1000) <= 60;
//   } catch {
//     return true;
//   }
// };

// const refreshToken = async (): Promise<string | null> => {
//   const token = getToken();
//   const refreshTokenValue = getRefreshToken();
//   if (!token || !refreshTokenValue || !isTokenExpired(token)) return token;

//   try {
//     const { data } = await axios.post(`${BASE_URL}/auth/token/refresh`, {
//       refresh: refreshTokenValue,
//     });
//     setToken(data.token);
//     return data.token;
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     clearAuthData();
//     return null;
//   }
// };

// apiClient.interceptors.request.use(async (config) => {
//   let token = getToken();
//   if (token) {
//     token = await refreshToken();
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, Promise.reject);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) clearAuthData();
//     return Promise.reject(error);
//   }
// );

// const handleRequest = async (method: string, url: string, data?: any) => {
//   try {
//     const response = await apiClient({ method, url, data });
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || "خطا در ارسال درخواست!";
//   }
// };

// export const signupSendOTP = (userData: { phonenumber: string; username: string; password: string; }) => 
//   handleRequest("post", "/signup/send-otp", userData);

// export const signupVerifyOTP = (userData: { code: string; sessionid: string; }) => 
//   handleRequest("post", "/signup/verify", userData);

// export const forgetPasswordSendOTP = (userData: { phonenumber: string; }) => 
//   handleRequest("post", "/forget-password/send-otp", userData);

// export const forgetPasswordVerifyOTP = (userData: { code: string; sessionid: string; }) => 
//   handleRequest("post", "/forget-password/verify", userData);

// export const forgetPasswordReset = (userData: { sessionid: string; new_password: string; }) => 
//   handleRequest("post", "/forget-password/reset", userData);

// export const Login = (userData: { identifier: string; password: string; }) => 
//   handleRequest("post", "/login", userData);

// export const ChangePass = (userData: { new_password: string; old_password: string; }) => 
//   handleRequest("post", "/change-password", userData);

