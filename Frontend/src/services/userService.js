import axios from "axios";
const API_URL = "http://localhost:8081/api/users";
const AUTH_URL = "http://localhost:8081/auth";

const validateUserData = (userData) => {
    const { name, email, password } = userData;
    if (!name || typeof name !== 'string' || name.length < 3) {
        throw new Error("Invalid name. It must be at least 3 characters long.");
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Invalid email format.");
    }
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
    }
};

export const createUser = async (userData) => {
    validateUserData(userData);
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to create user. Please try again.",
            }
        );
    }
};

export const getUserById = async (id) => {
    if (!id) {
        throw new Error("User ID is required.");
    }
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Failed to fetch user data.",
            }
        );
    }
};

export const registerUser = async (userData) => {
    validateUserData(userData);
    try {
        const response = await axios.post(`${AUTH_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Registration failed. Please try again.",
            }
        );
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, credentials);
        if (response.data && response.data.token) {
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: response.data.userId,
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                })
            );
        }
        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                message: "Login failed. Please check your credentials and try again.",
            }
        );
    }
};

export const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
};

export const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
};

export const getCurrentUser = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

export const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

const API_URL2 = "http://localhost:8081/api/v1";

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL2}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL2}/products/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [
            { id: "CHOCOLATE", name: "Chocolates", icon: "🍫" },
            { id: "CANDY", name: "Doces", icon: "🍬" },
            { id: "BISCUIT", name: "Biscoitos", icon: "🍪" },
            { id: "DESSERT", name: "Sobremesas", icon: "🍰" },
            { id: "DRINK", name: "Bebidas", icon: "☕" },
            { id: "OTHER", name: "Outros", icon: "🧁" },
        ];
    }
};