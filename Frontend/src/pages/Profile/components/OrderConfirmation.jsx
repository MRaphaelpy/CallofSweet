import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowLeft, FaPrint, FaEnvelope, FaBox, FaCreditCard, FaQrcode, FaFileInvoice, FaExclamationTriangle } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';
import Button from '../shared/Button';
import styles from './OrderConfirmation.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const [orderData, setOrderData] = useState({
        orderId: '',
        orderNumber: '',
        totalAmount: 0,
        customerName: '',
        customerEmail: '',
        paymentMethod: '',
        date: new Date().toLocaleDateString(),
        estimatedDelivery: '',
        items: []
    });

    
    const calculateEstimatedDelivery = (startDate) => {
        const deliveryDate = new Date(startDate);
        let addedBusinessDays = 0;

        while (addedBusinessDays < 7) {
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            const dayOfWeek = deliveryDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                addedBusinessDays++;
            }
        }

        return deliveryDate.toLocaleDateString();
    };

    
    const fetchOrderData = async (orderId) => {
        setLoading(true);
        setError(null);

        try {
            
            const userData = localStorage.getItem('userData');
            const token = userData ? JSON.parse(userData).token : null;

            if (!token) {
                throw new Error('Usuário não autenticado');
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.get(`${API_URL}/orders/${orderId}`, config);
            const order = response.data;

            setOrderData({
                orderId: order.id,
                orderNumber: `#${order.id}`,
                totalAmount: order.totalPrice,
                customerName: order.userName || 'Cliente',
                customerEmail: '', 
                paymentMethod: order.paymentMethod,
                date: new Date(order.createdAt).toLocaleDateString(),
                estimatedDelivery: calculateEstimatedDelivery(order.createdAt),
                items: order.items,
                status: order.status
            });
        } catch (err) {
            console.error('Erro ao buscar dados do pedido:', err);
            setError(err.response?.data?.message || err.message || 'Erro ao carregar dados do pedido');
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        
        const orderId = searchParams.get('id') || (location.state?.orderId);

        if (orderId) {
            fetchOrderData(orderId);
        } else if (location.state) {
            
            const {
                orderId,
                orderNumber,
                totalAmount,
                customerName,
                customerEmail,
                paymentMethod,
                items = []
            } = location.state;

            setOrderData({
                orderId: orderId || 'N/A',
                orderNumber: orderNumber ? `#${orderNumber}` : 'N/A',
                totalAmount: totalAmount || 0,
                customerName: customerName || 'Cliente',
                customerEmail: customerEmail || '',
                paymentMethod: paymentMethod || 'credit-card',
                date: new Date().toLocaleDateString(),
                estimatedDelivery: calculateEstimatedDelivery(new Date()),
                items: items
            });
        } else {
            
            navigate('/');
        }

        
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [location.state, navigate, searchParams]);

    const handlePrintConfirmation = () => {
        window.print();
    };

    const handleSendEmail = () => {
        alert(`Comprovante enviado para ${orderData.customerEmail || 'seu email'}`);
    };

    const handleTrackOrder = () => {
        navigate('/orders/track', { state: { orderId: orderData.orderId } });
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const getPaymentMethodIcon = () => {
        switch (orderData.paymentMethod) {
            case 'credit-card':
                return <FaCreditCard className={styles.methodIcon} />;
            case 'pix':
                return <FaQrcode className={styles.methodIcon} />;
            case 'bank-slip':
                return <FaFileInvoice className={styles.methodIcon} />;
            default:
                return <FaCreditCard className={styles.methodIcon} />;
        }
    };

    const getPaymentMethodName = () => {
        switch (orderData.paymentMethod) {
            case 'credit-card':
                return 'Cartão de Crédito';
            case 'pix':
                return 'PIX';
            case 'bank-slip':
                return 'Boleto Bancário';
            default:
                return 'Método não reconhecido';
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className={styles.confirmationPage}>
                <div className={`${styles.container} ${styles.loadingContainer}`}>
                    <div className={styles.loading}></div>
                    <p>Carregando informações do pedido...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.confirmationPage}>
                <div className={`${styles.container} ${styles.errorContainer}`}>
                    <FaExclamationTriangle className={styles.errorIcon} />
                    <h2>Erro ao carregar informações</h2>
                    <p>{error}</p>
                    <Button onClick={() => navigate(-1)}>Voltar</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.confirmationPage}>
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />}

            <motion.div
                className={styles.container}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <header className={styles.pageHeader}>
                    <motion.button
                        className={styles.backButton}
                        onClick={handleContinueShopping}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaArrowLeft /> Voltar para a loja
                    </motion.button>

                    <motion.h1
                        className={styles.title}
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Pedido Confirmado!
                    </motion.h1>
                </header>

                <motion.div className={styles.confirmationCard} variants={itemVariants}>
                    <div className={styles.successIconContainer}>
                        <FaCheckCircle className={styles.successIcon} />
                    </div>

                    <h2 className={styles.thankYouMessage}>
                        Obrigado pela sua compra, {orderData.customerName}!
                    </h2>

                    <p className={styles.confirmationMessage}>
                        Seu pedido foi recebido e está sendo processado.
                        {orderData.customerEmail && (
                            <>Um e-mail de confirmação foi enviado para <strong>{orderData.customerEmail}</strong>.</>
                        )}
                    </p>

                    <div className={styles.orderDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Número do Pedido:</span>
                            <span className={styles.detailValue}>{orderData.orderNumber}</span>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Data:</span>
                            <span className={styles.detailValue}>{orderData.date}</span>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Total:</span>
                            <span className={styles.detailValue}>
                                {formatCurrency(orderData.totalAmount)}
                            </span>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Método de Pagamento:</span>
                            <span className={styles.detailValue}>
                                {getPaymentMethodIcon()} {getPaymentMethodName()}
                            </span>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Entrega Estimada:</span>
                            <span className={styles.detailValue}>{orderData.estimatedDelivery}</span>
                        </div>
                    </div>

                    {orderData.items && orderData.items.length > 0 && (
                        <div className={styles.itemsContainer}>
                            <h3>Itens do Pedido</h3>
                            <div className={styles.itemsList}>
                                {orderData.items.map((item, index) => (
                                    <div key={index} className={styles.itemRow}>
                                        <div className={styles.itemQuantity}>
                                            {item.quantity}x
                                        </div>
                                        <div className={styles.itemName}>
                                            {item.productName || `Produto #${item.variationId}`}
                                        </div>
                                        <div className={styles.itemPrice}>
                                            {formatCurrency(item.subtotal)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total:</span>
                                <span className={styles.totalAmount}>
                                    {formatCurrency(orderData.totalAmount)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className={styles.shippingInfo}>
                        <div className={styles.shippingIcon}>
                            <FaBox />
                        </div>
                        <div className={styles.shippingText}>
                            <h3>Informação de Entrega</h3>
                            <p>
                                Seu pedido será preparado e enviado em até 2 dias úteis.
                                Você receberá um e-mail com o código de rastreio assim que seu pedido for despachado.
                            </p>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <motion.div
                            className={styles.actionsRow}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button
                                onClick={handlePrintConfirmation}
                                className={styles.actionButton}
                                variant="outlined"
                            >
                                <FaPrint /> Imprimir
                            </Button>

                            <Button
                                onClick={handleSendEmail}
                                className={styles.actionButton}
                                variant="outlined"
                            >
                                <FaEnvelope /> Enviar por Email
                            </Button>

                            <Button
                                onClick={handleTrackOrder}
                                className={styles.actionButton}
                                variant="outlined"
                            >
                                <FaBox /> Rastrear Pedido
                            </Button>
                        </motion.div>

                        <Button
                            onClick={handleContinueShopping}
                            className={styles.continueShoppingButton}
                        >
                            Continuar Comprando
                        </Button>
                    </div>
                </motion.div>

                <footer className={styles.pageFooter}>
                    <div className={styles.securityInfo}>
                        <IoShieldCheckmark /> Compra segura e protegida
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;