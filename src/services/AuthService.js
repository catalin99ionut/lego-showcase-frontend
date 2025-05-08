import axios from "axios";

const API_URL = "http://localhost:8080";

const apiClient = axios.create({
    baseURL: API_URL
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(new Error(error.message || "Request failed"));
    }
);

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
            window.location.href = "/login";
        }
        return Promise.reject(new Error(error.response?.data?.message || error.message || "Request failed"));
    }
);

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || error.message || 'Login failed'
        );
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || error.message || 'Registration failed'
        );
    }
};

const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
}

export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            await apiClient.post(`${API_URL}/users/logout`);
        }
    } catch (error) {
        console.error("Error during logout: ", error);
    } finally {
        clearAuthData();
    }
};

export const isAuthenticated = () => {
    return localStorage.getItem("authenticated") === "true" &&
        localStorage.getItem("token") !== null;
};

export default apiClient;
