import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowLeft, FaPrint, FaEnvelope, FaBox, FaCreditCard, FaQrcode, FaFileInvoice } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';
import Button from '../shared/Button';
import styles from './OrderConfirmation.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);
    
    
    const [orderData, setOrderData] = useState({
        orderId: '',
        orderNumber: '',
        totalAmount: 0,
        customerName: '',
        customerEmail: '',
        paymentMethod: '',
        date: new Date().toLocaleDateString(),
        estimatedDelivery: '',
    });
    
    
    useEffect(() => {
        
        if (location.state) {
            const { 
                orderId, 
                orderNumber, 
                totalAmount, 
                customerName, 
                customerEmail,
                paymentMethod
            } = location.state;
            
            
            const deliveryDate = new Date();
            let addedBusinessDays = 0;
            
            while (addedBusinessDays < 7) {
                deliveryDate.setDate(deliveryDate.getDate() + 1);
                const dayOfWeek = deliveryDate.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    addedBusinessDays++;
                }
            }
            
            setOrderData({
                orderId: orderId || 'N/A',
                orderNumber: orderNumber || 'N/A',
                totalAmount: totalAmount || 0,
                customerName: customerName || 'Cliente',
                customerEmail: customerEmail || '',
                paymentMethod: paymentMethod || 'credit-card',
                date: new Date().toLocaleDateString(),
                estimatedDelivery: deliveryDate.toLocaleDateString(),
            });
        } else {
            
            navigate('/');
        }
        
        
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [location.state, navigate]);
    
    const handlePrintConfirmation = () => {
        window.print();
    };
    
    const handleSendEmail = () => {
        alert(`Comprovante enviado para ${orderData.customerEmail}`);
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
                        Um e-mail de confirmação foi enviado para <strong>{orderData.customerEmail}</strong>.
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
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(orderData.totalAmount)}
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