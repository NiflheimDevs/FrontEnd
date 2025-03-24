import axios from 'axios';

// Function to get the authentication token
export const getAuthToken = () => {
  // Try to get token from localStorage
  const token = localStorage.getItem('authToken');
  
  // If no token in storage, return a default one (for development only)
  return token || 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI5MDg1MjUsImlhdCI6MTc0MjgyMjEyNSwiaXNzIjoiYmlkbGFuY2VyIiwic3ViIjo1fQ.omoxt1DMLGEfDtSKRKIZjHK9k6l9Vzw3vUUvRYiHJeY3jGqptKsxPUc3x8rQ29oDSauhWHyb7XfsMBDk15VTUj3FPdO8OLosGkfwVYgO4lAXyYm2n-uBEskiqe5gYRji08CqRC8figfeZD92wvrXEoP6gpaGqTIlGKs3G92FxuWJNNyOhRqJNwZU0XSmvIhGM0xIyAjO_p_0U4g9jxWGHjfVeoMbiFHnhRJAGS2enSB_o36Vvfl_l5f6pkxD_2YCHM3LTEL3hC0WfZDOBd8gBQlyk8vKW7tk-bkCOUL5FO15kEQ8DagSLbwZn_ESimXi3jetkkGb3QLQQOcLKGaB7A';
};

// Create an axios instance with default authentication headers
export const authAxios = axios.create({
  baseURL: 'http://103.75.196.227:8080'
});

// Add a request interceptor to attach the token to all requests
authAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common error cases
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - could trigger a logout or token refresh
      localStorage.removeItem('authToken');
      // You might want to redirect to login page here
    }
    return Promise.reject(error);
  }
);