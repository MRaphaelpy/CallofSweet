import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome, FaList } from 'react-icons/fa';
import styles from './OrderConfirmationPage.module.css';
import axios from 'axios';
import Confetti from 'react-confetti';

const API_URL = 'http://localhost:8081/api/v1';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showConfetti, setShowConfetti] = useState(true);
    
    const { 
        orderId,
        orderNumber,
        totalAmount,
        customerName,
        customerEmail,
        paymentMethod
    } = location.state || {};

    useEffect(() => {
        
        setTimeout(() => {
            setShowConfetti(false);
        }, 6000);
        
        if (orderId) {
            fetchOrderDetails();
        } else {
            navigate('/');
        }
        
        
        localStorage.removeItem('cart');
    }, [orderId, navigate]);

    const fetchOrderDetails = async () => {
        if (!orderId) return;
        
        setLoading(true);
        try {
            const userData = localStorage.getItem('userData');
            const token = userData ? JSON.parse(userData).token : null;
            
            if (!token) {
                throw new Error('Usuário não autenticado');
            }
            
            const response = await axios.get(`${API_URL}/orders/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do pedido:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPaymentMethod = (method) => {
        switch (method) {
            case 'credit-card':
                return 'Cartão de Crédito';
            case 'pix':
                return 'PIX';
            case 'bank-slip':
                return 'Boleto Bancário';
            default:
                return method;
        }
    };

    if (!orderNumber) {
        return (
            <div className={styles.errorContainer}>
                <h2>Pedido não encontrado</h2>
                <p>Não foi possível encontrar os detalhes do seu pedido.</p>
                <button onClick={() => navigate('/')}>Voltar para a loja</button>
            </div>
        );
    }

    return (
        <div className={styles.confirmationPage}>
            {showConfetti && <Confetti />}
            
            <motion.div 
                className={styles.confirmationContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.successIcon}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        delay: 0.2 
                    }}
                >
                    <FaCheckCircle />
                </motion.div>
                
                <h1 className={styles.confirmationTitle}>Pedido Confirmado!</h1>
                <p className={styles.confirmationMessage}>
                    Obrigado por sua compra, {customerName}!
                </p>
                
                <div className={styles.orderDetails}>
                    <div className={styles.orderDetailRow}>
                        <span>Número do Pedido:</span>
                        <span>#{orderNumber}</span>
                    </div>
                    <div className={styles.orderDetailRow}>
                        <span>Data:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className={styles.orderDetailRow}>
                        <span>Forma de Pagamento:</span>
                        <span>{formatPaymentMethod(paymentMethod)}</span>
                    </div>
                    <div className={styles.orderDetailRow}>
                        <span>Total:</span>
                        <span className={styles.totalAmount}>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(totalAmount)}
                        </span>
                    </div>
                </div>
                
                <div className={styles.confirmationInfo}>
                    <p>
                        Uma confirmação foi enviada para <strong>{customerEmail}</strong>
                    </p>
                    <p>
                        Você pode acompanhar o status do seu pedido na seção "Meus Pedidos".
                    </p>
                </div>
                
                <div className={styles.actions}>
                    <motion.button
                        onClick={() => navigate('/orders')}
                        className={styles.ordersButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaList />
                        Meus Pedidos
                    </motion.button>
                    
                    <motion.button
                        onClick={() => navigate('/')}
                        className={styles.homeButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaHome />
                        Voltar para Loja
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderConfirmationPage;