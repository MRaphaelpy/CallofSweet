import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://localhost:8081/api/v1/auth'; // URL do backend para autenticação

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            const userData = response.data;
            localStorage.setItem('userData', JSON.stringify(userData));
            setCurrentUser(userData);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const isAuthenticated = () => {
        return currentUser !== null;
    };

    const logout = () => {
        localStorage.removeItem('userData');
        sessionStorage.clear();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        login,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};