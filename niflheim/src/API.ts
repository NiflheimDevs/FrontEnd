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
      "/login",
      "/signup/send-otp",
      "/signup/verify",
      "/forget-password/send-otp",
      "/forget-password/verify",
      "/forget-password/reset",
      "/refresh-token",
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
        window.location.href = "/auth"; // Adjust based on your routing
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
    const response = await apiClient.post("/refresh-token", {
      refresh_token: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    if (newAccessToken) {
      localStorage.setItem("authToken", newAccessToken);
      // Optionally, if the refresh token is also updated, store it
      if (response.data.refresh_token) {
        localStorage.setItem("refreshToken", response.data.refresh_token);
      }
    }
    return newAccessToken;
  } catch (error:any) {
    throw error.response?.data || "خطا در تمدید توکن!";
  }
};

export const signupSendOTP = async (userData:any) => {
  try {
    const response = await apiClient.post("/signup/send-otp", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const signupVerifyOTP = async (userData:any) => {
  try {
    const response = await apiClient.post("/signup/verify", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordSendOTP = async (userData:any) => {
  try {
    const response = await apiClient.post("/forget-password/send-otp", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordVerifyOTP = async (userData:any) => {
  try {
    const response = await apiClient.post("/forget-password/verify", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const forgetPasswordReset = async (userData:any) => {
  try {
    const response = await apiClient.post("/forget-password/reset", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const Login = async (userData:any) => {
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
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const ChangePass = async (userData:any) => {
  try {
    const response = await apiClient.post("/change-password", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const GetUser = async () => {
  try {
    const response = await apiClient.get("/user/0?include=career&include=info&include=tag");
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutCareer = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/career", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutTag = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/tag", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutUser = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/update-info", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutEmail = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/update-email", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutUserName = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/update-username", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutPhoneSendOtp = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/update-phone/send-otp", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const PutPhoneVerifyOtp = async (userData:any) => {
  try {
    const response = await apiClient.put("/user/update-phone/verify", userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const getUserProject = async (offset:any, limit:any) => {
  try {
    const response = await apiClient.get("/project", {
      params: { 
        offset: 0, // Fetch all projects
        limit: 1000 // Set a high limit
      }
    });

    // console.log("API Response:", response.data);
          
    const projects = response.data.projects || [];
    const total = projects.length; // Use the length of all projects

    // Simulate pagination client-side
    const paginatedProjects = projects.slice(offset, offset + limit);

    return { projects: paginatedProjects, total };
  } catch (error:any) {
    throw error.response?.data || "خطا در ارسال درخواست!";
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/auth"; // Adjust based on your routing
};

export const getLabels = async () => {
  try {
    const response = await apiClient.get("/labels");
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در دریافت برچسب‌ها";
  }
};

export const getTags = async () => {
  try {
    const response = await apiClient.get("/tags");
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در دریافت تگ‌ها";
  }
};

export const createProject = async (projectData:any) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("توکن احراز هویت یافت نشد");
    }

    const response = await apiClient.post("/project/create", projectData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در ایجاد پروژه";
  }
};

export const updateProject = async (projectId:any, projectData:any) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("توکن احراز هویت یافت نشد");
    }
    
    const response = await apiClient.put(`/project/${projectId}`, projectData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در بروزرسانی پروژه";
  }
};

export const deleteProject = async (projectId:any) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("توکن احراز هویت یافت نشد");
    }

    const response = await apiClient.delete(`/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data || "خطا در حذف پروژه";
  }
};