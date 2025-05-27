import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });

        localStorage.setItem('jwt_token', response.data.token);

        return response.data.user; // Get user data directly from login
    } catch (error) {
        throw new Error('Login failed. Please check your username and password.');
    }
};

export const registerUser = async ({ username, password }) => {
    await axios.post(`${API_URL}/register`, { username, password });
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/me`);
        return response.data;
    } catch (error) {
        localStorage.removeItem('jwt_token');
        return null;
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
    } finally {
        localStorage.removeItem('jwt_token');
    }
};

export const isAuthenticated = () => {
    return localStorage.getItem('jwt_token') !== null;
};
