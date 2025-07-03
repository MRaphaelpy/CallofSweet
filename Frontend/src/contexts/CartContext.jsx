import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

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

    const getUserId = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).userId : null;
    };

    useEffect(() => {
        const initializeCart = async () => {
            const userId = getUserId();
            if (!userId) {
                const localCart = localStorage.getItem('cart');
                if (localCart) {
                    const parsedCart = JSON.parse(localCart);
                    setCart(parsedCart.cart || null);
                    setCartItems(parsedCart.items || []);
                }
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/carts/user/${userId}`, {
                    headers: getHeaders()
                });
                setCart(response.data);
                if (response.data && response.data.id) {
                    fetchCartItems(response.data.id);
                }
            } catch (err) {
                console.error("Failed to fetch cart:", err);
                setError("Não foi possível carregar o carrinho.");
            } finally {
                setLoading(false);
            }
        };

        initializeCart();
    }, []);

    const fetchCartItems = async (cartId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/cart-items/cart/${cartId}`, {
                headers: getHeaders()
            });
            setCartItems(response.data || []);
        } catch (err) {
            console.error("Failed to fetch cart items:", err);
        }
    };

    useEffect(() => {
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
        if (!getUserId() && cart) {
            localStorage.setItem('cart', JSON.stringify({
                cart: cart,
                items: cartItems
            }));
        }
    }, [cartItems, cart]);

    const createCart = async () => {
        const userId = getUserId();
        if (!userId) return null;

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/carts`, {
                userId: userId,
                totalPrice: 0
            }, {
                headers: getHeaders()
            });
            setCart(response.data);
            return response.data;
        } catch (err) {
            console.error("Failed to create cart:", err);
            setError("Não foi possível criar um novo carrinho.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product) => {
        const userId = getUserId();

        if (!userId) {
            sessionStorage.setItem('pendingCartItem', JSON.stringify(product));
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
            sessionStorage.setItem('loginMessage', "Faça login para adicionar itens ao carrinho");
            window.location.href = '/login';
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let currentCart = cart;

            if (!currentCart) {
                currentCart = await createCart();
                if (!currentCart) {
                    setError("Não foi possível criar um carrinho. Tente novamente.");
                    setLoading(false);
                    return;
                }
            }

            const existingItem = cartItems.find(item => item.productId === product.id);

            if (existingItem) {
                try {
                    const updatedItem = await axios.put(
                        `${API_BASE_URL}/api/v1/cart-items/${existingItem.id}`,
                        {
                            id: existingItem.id,
                            cartId: currentCart.id,
                            quantity: existingItem.quantity + 1,
                            price: existingItem.price || product.price
                        },
                        { headers: getHeaders() }
                    );

                    const updatedData = {
                        ...updatedItem.data,
                        name: updatedItem.data.name || existingItem.name || product.name,
                        image: updatedItem.data.image || existingItem.image || product.image || getDefaultImage(product)
                    };

                    setCartItems(prevItems => prevItems.map(item => item.id === existingItem.id ? updatedData : item));
                    setSuccessMessage("Produto adicionado ao carrinho!");
                } catch (err) {
                    console.error("Erro ao atualizar item:", err);
                    setError("Erro ao atualizar item no carrinho.");
                }
            } else {
                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/api/v1/cart-items`,
                        {
                            cartId: currentCart.id,
                            productId: product.id,
                            quantity: 1,
                            price: product.price
                        },
                        { headers: getHeaders() }
                    );

                    const newItem = {
                        ...response.data,
                        name: response.data.name || response.data.productName || product.name,
                        image: response.data.image || product.image || getDefaultImage(product)
                    };

                    setCartItems(prevItems => [...prevItems, newItem]);
                    setSuccessMessage("Produto adicionado ao carrinho!");
                } catch (err) {
                    console.error("Failed to add new item to cart:", err);
                    setError("Erro ao adicionar item ao carrinho.");
                }
            }
        } catch (err) {
            console.error("Failed to add item to cart:", err);
            setError("Não foi possível adicionar o item ao carrinho.");
        } finally {
            setLoading(false);
        }
    };

    const getDefaultImage = (product) => {
        return `https://source.unsplash.com/500x500/?dessert,${encodeURIComponent(
            (product.category || product.name || 'cake').split(' ').slice(0, 2).join(',')
        )}`;
    };

    const updateQuantity = async (id, change) => {
        const itemToUpdate = cartItems.find(item => item.id === id);
        if (!itemToUpdate) return;

        const newQuantity = Math.max(1, itemToUpdate.quantity + change);

        if (!getUserId()) {
            setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
            return;
        }

        setLoading(true);
        try {
            const updatedItem = await axios.put(
                `${API_BASE_URL}/api/v1/cart-items/${id}`,
                {
                    ...itemToUpdate,
                    quantity: newQuantity
                },
                { headers: getHeaders() }
            );

            setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...updatedItem.data, name: item.name, image: item.image } : item));
        } catch (err) {
            console.error("Failed to update item quantity:", err);
            setError("Não foi possível atualizar a quantidade.");
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        if (!getUserId()) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/api/v1/cart-items/${id}`, {
                headers: getHeaders()
            });

            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (err) {
            console.error("Failed to remove item from cart:", err);
            setError("Não foi possível remover o item do carrinho.");
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!getUserId()) {
            setCartItems([]);
            return;
        }

        setLoading(true);
        try {
            const deletePromises = cartItems.map(item =>
                axios.delete(`${API_BASE_URL}/api/v1/cart-items/${item.id}`, {
                    headers: getHeaders()
                })
            );

            await Promise.all(deletePromises);
            setCartItems([]);
        } catch (err) {
            console.error("Failed to clear cart:", err);
            setError("Não foi possível limpar o carrinho.");
        } finally {
            setLoading(false);
        }
    };

    const getSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const value = {
        cart,
        cartItems,
        cartCount,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getSubtotal
    };

    const renderSuccessMessage = () => {
        if (!successMessage) return null;

        return (
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 15px',
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '4px',
                zIndex: 1000
            }}>
                {successMessage}
            </div>
        );
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            {renderSuccessMessage()}
        </CartContext.Provider>
    );
};