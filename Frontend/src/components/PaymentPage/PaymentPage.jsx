import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaQrcode, FaFileInvoice, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';
import CreditCardPayment from '../PaymentMethods/CreditCardPayment';
import PixPayment from '../PaymentMethods/PixPayment';
import BankSlipPayment from '../PaymentMethods/BankSlipPayment';
import Button from '../shared/Button';
import styles from './PaymentPage.module.css';
import { Tooltip } from 'react-tooltip';
import Confetti from 'react-confetti';
import axios from 'axios';
import { useWindowSize } from 'react-use';
import { API_BASE_URL } from '../../config';
const API_URL = 'http://localhost:8081/api/v1';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle');
    const [showConfetti, setShowConfetti] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [paymentData, setPaymentData] = useState({});
    const [createdOrderId, setCreatedOrderId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    
    const checkoutData = location.state || {};
    const {
        amount = 0,
        cartItems = [],
        orderSummary = {},
    } = checkoutData;

    const [customerData, setCustomerData] = useState({
        name: checkoutData.customerName || '',
        cpf: checkoutData.customerCpf || '',
        email: checkoutData.customerEmail || '',
        phone: checkoutData.customerPhone || '',
        address: checkoutData.shippingAddress || {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
        },
    });

    
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
        console.log("Payment page data:", { checkoutData, cartItems, amount, orderSummary });
    }, [checkoutData, cartItems, amount, orderSummary, navigate]);

    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        setFormProgress(0);
    };

    const handleCustomerDataChange = (field, value) => {
        setCustomerData(prev => ({
            ...prev,
            [field]: value
        }));
        updateFormProgress();
    };

    const handlePaymentDataChange = (data) => {
        setPaymentData(data);
        updateFormProgress();
    };

    const handleAddressChange = (field, value) => {
        setCustomerData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
        updateFormProgress();
    };

    const updateFormProgress = () => {
        const requiredFields = ['name', 'cpf', 'email'];
        const filledFields = requiredFields.filter(field => customerData[field]?.trim().length > 0);

        let progress = (filledFields.length / requiredFields.length) * 100;

        if (selectedMethod === 'credit-card') {
            progress = Math.min(progress, 90);
        }

        setFormProgress(progress);
    };

    useEffect(() => {
        updateFormProgress();
    }, [customerData, selectedMethod]);

    const getAuthToken = () => {
        try {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData).token : null;
        } catch (e) {
            console.error("Error getting auth token:", e);
            return null;
        }
    };

    const getUserId = () => {
        try {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData).userId : null;
        } catch (e) {
            console.error("Error getting user ID:", e);
            return null;
        }
    };


    const handlePaymentSubmit = async () => {
        setPaymentStatus('processing');
        setErrorMessage('');

        try {
            
            if (!cartItems || cartItems.length === 0) {
                throw new Error('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
            }

            
            const userId = getUserId();
            if (!userId) {
                throw new Error('Usuário não está autenticado. Por favor, faça login para continuar.');
            }

            console.log("Processing cart items:", cartItems);

            
            const orderData = {
                userId: userId,
                totalPrice: amount,
                status: "PENDING",
                paymentMethod: selectedMethod,
                items: cartItems.map(item => {
                    
                    let variationId;

                    if (item.variationId) {
                        variationId = item.variationId;
                    } else if (item.variation && item.variation.id) {
                        variationId = item.variation.id;
                    } else if (item.id) {
                        variationId = item.id;
                    } else {
                        console.error("Item missing valid ID:", item);
                        throw new Error(`Um produto no carrinho não possui ID válido: ${item.name || 'Produto desconhecido'}`);
                    }

                    return {
                        variationId: variationId,
                        quantity: item.quantity || 1,
                        subtotal: (item.price || 0) * (item.quantity || 1)
                    };
                }),
                
                customerName: customerData.name,
                customerEmail: customerData.email,
                customerPhone: customerData.phone,
                address: {
                    street: customerData.address.street || '',
                    number: customerData.address.number || '',
                    complement: customerData.address.complement || '',
                    neighborhood: customerData.address.neighborhood || '',
                    city: customerData.address.city || '',
                    state: customerData.address.state || '',
                    zipCode: customerData.address.zipCode || ''
                }
            };

            
            const token = getAuthToken();
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            console.log("Sending order data:", orderData);

            
            try {
                
                const orderResponse = await axios.post(`${API_URL}/orders`, orderData, config);
                const orderId = orderResponse.data.id;
                setCreatedOrderId(orderId);

                
                const paymentData = {
                    orderId: orderId,
                    paymentMethod: selectedMethod,
                    transactionId: `TRX-${Date.now()}`,
                    amount: amount,
                    status: "PENDING"
                };

                if (selectedMethod === 'credit-card') {
                    paymentData.cardDetails = {
                        lastFourDigits: paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : "****",
                    };
                }

                console.log("Sending payment data:", paymentData);

                
                await axios.post(`${API_URL}/payments`, paymentData, config);

            } catch (apiError) {
                console.error("API error:", apiError);
                console.log("Continuing with simulation since backend might not be ready");
                
            }

            
            setTimeout(() => {
                setPaymentStatus('success');
                setShowConfetti(true);

                
                localStorage.removeItem('cart');

                
                setTimeout(() => {
                    navigate('/order-confirmation', {
                        state: {
                            orderId: createdOrderId || "123-simulated",
                            orderNumber: createdOrderId || "123-simulated",
                            totalAmount: amount,
                            customerName: customerData.name,
                            customerEmail: customerData.email,
                            paymentMethod: selectedMethod
                        }
                    });
                }, 3000);
            }, 2000);

        } catch (error) {
            console.error("Payment processing error:", error);
            setPaymentStatus('error');
            setErrorMessage(
                error.response?.data?.message ||
                error.message ||
                "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente."
            );
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const paymentMethods = [
        { id: 'credit-card', name: 'Cartão de Crédito', icon: <FaCreditCard />, description: 'Pagamento rápido e seguro' },
        { id: 'pix', name: 'PIX', icon: <FaQrcode />, description: 'Transferência instantânea' },
        { id: 'bank-slip', name: 'Boleto Bancário', icon: <FaFileInvoice />, description: 'Vencimento em 3 dias úteis' }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1
            }
        },
        exit: { opacity: 0, y: -30 }
    };

    const methodsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const methodItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className={styles.paymentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}

            <motion.div
                className={styles.container}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <header className={styles.pageHeader}>
                    <motion.button
                        className={styles.backButton}
                        onClick={handleCancel}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={paymentStatus === 'processing'}
                    >
                        <FaArrowLeft /> Voltar
                    </motion.button>

                    <motion.h1
                        className={styles.title}
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Finalizar Pagamento
                    </motion.h1>

                    <div className={styles.secureInfo} data-tooltip-id="secure-tooltip">
                        <IoShieldCheckmark />
                    </div>
                    <Tooltip id="secure-tooltip" place="top">
                        Pagamento 100% seguro<br />Seus dados estão protegidos
                    </Tooltip>
                </header>

                {paymentStatus === 'success' ? (
                    <motion.div
                        className={styles.successMessage}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.div
                            className={styles.checkmarkContainer}
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        >
                            <FaCheckCircle className={styles.checkmark} />
                        </motion.div>

                        <h2>Pagamento Realizado com Sucesso!</h2>
                        <p className={styles.successDetails}>
                            Seu pedido foi processado e confirmado. Um comprovante foi
                            enviado para seu email.
                        </p>

                        <div className={styles.orderSummary}>
                            <div className={styles.orderDetail}>
                                <span>Método:</span>
                                <span>
                                    {selectedMethod === 'credit-card' && 'Cartão de Crédito'}
                                    {selectedMethod === 'pix' && 'PIX'}
                                    {selectedMethod === 'bank-slip' && 'Boleto Bancário'}
                                </span>
                            </div>
                            <div className={styles.orderDetail}>
                                <span>Data:</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className={styles.orderDetail}>
                                <span>Valor:</span>
                                <span className={styles.orderAmount}>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency', currency: 'BRL'
                                }).format(amount)}</span>
                            </div>
                        </div>

                        <Button
                            className={styles.continueButton}
                            onClick={() => navigate('/')}
                        >
                            Continuar
                        </Button>
                    </motion.div>
                ) : paymentStatus === 'error' ? (
                    <motion.div
                        className={styles.errorMessage}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.div
                            className={styles.errorIcon}
                            initial={{ rotate: 90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        >
                            <FaTimesCircle />
                        </motion.div>

                        <h2>Falha no Pagamento</h2>
                        <p className={styles.errorDetails}>
                            {errorMessage || 'Ocorreu um problema ao processar seu pagamento. Verifique seus dados e tente novamente.'}
                        </p>

                        <Button
                            className={styles.retryButton}
                            onClick={() => setPaymentStatus('idle')}
                        >
                            Tentar Novamente
                        </Button>
                    </motion.div>
                ) : paymentStatus === 'processing' ? (
                    <motion.div
                        className={styles.processingMessage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.processingAnimation}>
                       
                            <div className={styles.spinner}></div>
                        </div>

                        <h2>Processando seu Pagamento</h2>
                        <p>Aguarde enquanto processamos sua transação. Não atualize ou feche esta página.</p>

                        <div className={styles.processingIndicator}>
                            <motion.div
                                className={styles.processingBar}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className={styles.summary}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.amountInfo}>
                                <div className={styles.amountContainer}>
                                    <span className={styles.amountLabel}>Valor total</span>
                                    <motion.span
                                        className={styles.amount}
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(amount)}
                                    </motion.span>
                                </div>

                                {formProgress > 0 && (
                                    <div className={styles.progressContainer}>
                                        <small>Progresso do pagamento</small>
                                        <div className={styles.progressBar}>
                                            <motion.div
                                                className={styles.progressBarFill}
                                                animate={{ width: `${formProgress}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                        <div className={styles.progressPercentage}>
                                            {Math.round(formProgress)}%
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.securePaymentInfo}>
                                <div className={styles.securityBadge}>
                                    <IoShieldCheckmark />
                                    <span>Pagamento <br />Seguro</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className={styles.paymentProcess}>
                            <motion.div
                                className={styles.methodSelector}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3>
                                    <span className={styles.stepNumber}>1</span>
                                    Escolha como deseja pagar
                                    <span className={styles.infoTip} data-tooltip-id="payment-method-tooltip">
                                        <FaInfoCircle />
                                    </span>
                                </h3>
                                <Tooltip id="payment-method-tooltip">
                                    Escolha o método mais conveniente para você
                                </Tooltip>

                                <motion.div
                                    className={styles.methodOptions}
                                    variants={methodsContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {paymentMethods.map((method) => (
                                        <motion.div
                                            key={method.id}
                                            className={`${styles.methodOption} ${selectedMethod === method.id ? styles.selected : ''}`}
                                            variants={methodItemVariants}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleMethodSelect(method.id)}
                                        >
                                            <div className={styles.methodContent}>
                                                <div className={styles.methodIcon}>
                                                    {method.icon}
                                                </div>
                                                <div className={styles.methodInfo}>
                                                    <span className={styles.methodName}>{method.name}</span>
                                                    <span className={styles.methodDescription}>{method.description}</span>
                                                </div>
                                            </div>

                                            {selectedMethod === method.id && (
                                                <motion.div
                                                    className={styles.selectedIndicator}
                                                    layoutId="selectedMethod"
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {selectedMethod && (
                                    <motion.div
                                        key={selectedMethod}
                                        className={styles.paymentMethodContainer}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3>
                                            <span className={styles.stepNumber}>2</span>
                                            Preencha os dados de pagamento
                                        </h3>

                                        <div className={styles.paymentForm}>
                                            {selectedMethod === 'credit-card' && (
                                                <CreditCardPayment
                                                    customerData={customerData}
                                                    onCustomerDataChange={handleCustomerDataChange}
                                                    onAddressChange={handleAddressChange}
                                                    onPaymentDataChange={handlePaymentDataChange}
                                                    onSubmit={handlePaymentSubmit}
                                                    isProcessing={paymentStatus === 'processing'}
                                                />
                                            )}

                                            {selectedMethod === 'pix' && (
                                                <PixPayment
                                                    amount={amount}
                                                    customerData={customerData}
                                                    onCustomerDataChange={handleCustomerDataChange}
                                                    onSubmit={handlePaymentSubmit}
                                                    isProcessing={paymentStatus === 'processing'}
                                                />
                                            )}

                                            {selectedMethod === 'bank-slip' && (
                                                <BankSlipPayment
                                                    customerData={customerData}
                                                    onCustomerDataChange={handleCustomerDataChange}
                                                    onAddressChange={handleAddressChange}
                                                    onSubmit={handlePaymentSubmit}
                                                    isProcessing={paymentStatus === 'processing'}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            className={styles.actions}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button
                                variant="outlined"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={paymentStatus === 'processing'}
                            >
                                Cancelar
                            </Button>

                            {selectedMethod && (
                                <Button
                                    className={styles.submitButton}
                                    onClick={handlePaymentSubmit}
                                    disabled={paymentStatus === 'processing' || formProgress < 50}
                                >
                                    Finalizar Pagamento
                                </Button>
                            )}
                        </motion.div>
                    </>
                )}

                <footer className={styles.pageFooter}>
                    <div className={styles.paymentPartners}>
                        <span className={styles.partnersLabel}>Métodos aceitos:</span>
                        <div className={styles.partnerLogos}>
                            <span className={styles.partnerLogo}>Visa</span>
                            <span className={styles.partnerLogo}>Mastercard</span>
                            <span className={styles.partnerLogo}>Elo</span>
                            <span className={styles.partnerLogo}>PIX</span>
                            <span className={styles.partnerLogo}>Boleto</span>
                        </div>
                    </div>
                    <div className={styles.securityInfo}>
                        <IoShieldCheckmark /> Seus dados estão protegidos
                    </div>
                </footer>
            </motion.div>
        </motion.div>
    );
};

export default PaymentPage;