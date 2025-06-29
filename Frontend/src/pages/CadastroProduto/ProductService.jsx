import axios from 'axios';
import { API_BASE_URL } from '../../config';
const API_URL = 'http://localhost:8081/api/v1/products';

const getAuthToken = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).token : null;
};

const getHeaders = () => {
    const token = getAuthToken();
    return token ? {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produto com ID ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {

        const formattedData = {
            ...productData,
            active: Boolean(productData.active)
        };

        console.log("Dados a serem enviados para API:", formattedData);

        const response = await axios.post(API_URL, formattedData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};


export const updateProduct = async (id, productData) => {
    try {

        const formattedData = {
            ...productData,
            active: Boolean(productData.active) 
        };

        console.log("Dados a serem enviados para API (update):", formattedData);

        const response = await axios.put(`${API_URL}/${id}`, formattedData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar produto com ID ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
    } catch (error) {
        console.error(`Erro ao excluir produto com ID ${id}:`, error);
        throw error;
    }
};