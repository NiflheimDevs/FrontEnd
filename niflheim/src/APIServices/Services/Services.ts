import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Base URL for your API (replace with your actual backend URL)
const BASE_URL = "http://your-api-url.com/api";

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized: Token might be expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/auth"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Define the API service object
const apiServices = {
  // Login API
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in localStorage
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Login failed";
    }
  },

  // Signup API
  async signup(email: string, password: string, phone: string): Promise<any> {
    try {
      const response = await api.post("/auth/signup", {
        email,
        password,
        phone,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Signup failed";
    }
  },

  // Forgot Password API (Send phone number to get OTP)
  async forgotPassword(phone: string): Promise<any> {
    try {
      const response = await api.post("/auth/forgot-password", { phone });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Failed to send OTP";
    }
  },

  // Verify OTP API
  async verifyOtp(phone: string, otp: string): Promise<any> {
    try {
      const response = await api.post("/auth/verify-otp", { phone, otp });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "OTP verification failed";
    }
  },

  // Change Password API
  async changePassword(newPassword: string): Promise<any> {
    try {
      const response = await api.post("/auth/change-password", { newPassword });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Password change failed";
    }
  },

  // Get User Profile API
  async getProfile(): Promise<any> {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Failed to fetch profile";
    }
  },

  // Update User Profile API
  async updateProfile(data: any): Promise<any> {
    try {
      const response = await api.put("/user/profile", data);
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Failed to update profile";
    }
  },

  // Get Projects API
  async getProjects(): Promise<any> {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Failed to fetch projects";
    }
  },

  // Create Project API
  async createProject(title: string, description: string): Promise<any> {
    try {
      const response = await api.post("/projects", { title, description });
      return response.data;
    } catch (error:any) {
      throw error.response?.data || "Failed to create project";
    }
  },

  // Logout (optional: clear token and redirect)
  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  },
};

export default apiServices;
