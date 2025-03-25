import axios from "axios";

const BASE_URL = "http://103.75.196.227:8080";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    
    // Exclude endpoints that shouldn't have auth tokens
    const publicRoutes = [
      '/login',
      '/signup/send-otp',
      '/signup/verify',
      '/forget-password/send-otp',
      '/forget-password/verify',
      '/forget-password/reset',
      '/refresh-token',
    ];

    if (token && !publicRoutes.includes(config.url || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor to handle token expiry
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // If refresh fails, log out the user
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Adjust based on your routing
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Function to refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await apiClient.post("/refresh-token", { refresh_token: refreshToken });
    const newAccessToken = response.data.access_token;
    if (newAccessToken) {
      localStorage.setItem("authToken", newAccessToken);
      // Optionally, if the refresh token is also updated, store it
      if (response.data.refresh_token) {
        localStorage.setItem("refreshToken", response.data.refresh_token);
      }
    }
    return newAccessToken;
  } catch (error: any) {
    throw error.response?.data || "خطا در تمدید توکن!";
  }
};

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
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    if (accessToken) {
      localStorage.setItem("authToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const ChangePass = async (userData: {
  new_password: string;
  old_password: string;
}) => {
  try {
    const response = await apiClient.post("/change-password", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};


// New API function for Get User Project
export const getUserProject = async (offset: number, limit: number) => {
  try {
    const response = await apiClient.get("/project", {
      params: { offset, limit },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/auth"; // Adjust based on your routing
};

export const getTags = async () => {
  try {
    const response = await apiClient.get("/tags");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "خطا در دریافت تگ‌ها";
  }
};

export const createProject = async (formData: FormData) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');

    // If no token is found, throw an error
    if (!token) {
      throw new Error('توکن احراز هویت یافت نشد');
    }

    // Send the request with the Authorization header
    const response = await apiClient.post('/project/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Add the token to the headers
      }
    });
    return response.data;
  } catch (error: any) {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data || 'خطا در ایجاد پروژه';
    } else if (error.request) {
      // The request was made but no response was received
      throw 'خطا در ارتباط با سرور';
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error.message || 'خطا نامشخص';
    }
  }
};