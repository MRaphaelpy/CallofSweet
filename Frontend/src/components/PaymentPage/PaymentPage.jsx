import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FaCreditCard, FaQrcode, FaFileInvoice, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { IoShieldCheckmark } from 'react-icons/io5';
import CreditCardPayment from '../PaymentMethods/CreditCardPayment';
import PixPayment from '../PaymentMethods/PixPayment';
import BankSlipPayment from '../PaymentMethods/BankSlipPayment';
import Button from '../shared/Button';
import styles from './PaymentPage.module.css';
import { Tooltip } from 'react-tooltip';
import Confetti from 'react-confetti';
import Lottie from 'react-lottie';
import { useWindowSize } from 'react-use';





const PaymentPage = ({ onComplete = () => { }, onCancel = () => { } }) => {
    const location = useLocation();
    const { width, height } = useWindowSize();
    
    const { 
        amount = 10,
        customerName = '',
        customerCpf = '',
        customerEmail = '',
        customerPhone = '',
        shippingAddress = {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
        },
    } = location.state || {};

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('idle');
    const [showConfetti, setShowConfetti] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [customerData, setCustomerData] = useState({
        name: customerName,
        cpf: customerCpf,
        email: customerEmail,
        phone: customerPhone,
        address: shippingAddress,
    });

    
    const processingLottieOptions = {
        loop: true,
        autoplay: true,
        
        
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const secureLottieOptions = {
        loop: true,
        autoplay: true,
        
        
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

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

    const handlePaymentSubmit = () => {
        setPaymentStatus('processing');

        
        setTimeout(() => {
            const success = Math.random() > 0.1; 
            setPaymentStatus(success ? 'success' : 'error');

            if (success) {
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    onComplete({
                        method: selectedMethod,
                        customerData,
                        amount,
                        timestamp: new Date().toISOString()
                    });
                }, 4000);
            }
        }, 2500);
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
                        onClick={onCancel}
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
                            onClick={() => onComplete()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                            Ocorreu um problema ao processar seu pagamento. Verifique seus dados e tente novamente.
                        </p>
                        
                        <div className={styles.errorTips}>
                            <h4>Possíveis causas:</h4>
                            <ul>
                                <li>Dados do cartão incorretos</li>
                                <li>Saldo insuficiente</li>
                                <li>Cartão expirado ou bloqueado</li>
                                <li>Problemas de conexão</li>
                            </ul>
                        </div>
                        
                        <Button 
                            className={styles.retryButton}
                            onClick={() => setPaymentStatus('idle')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                            <Lottie options={processingLottieOptions} height={200} width={200} />
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
                                    <div className={styles.securityAnimation}>
                                        <Lottie 
                                            options={secureLottieOptions}
                                            height={50} 
                                            width={50}
                                            isStopped={false}
                                            isPaused={false}
                                        />
                                    </div>
                                    <span>Pagamento <br/>Seguro</span>
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
                                onClick={onCancel}
                                disabled={paymentStatus === 'processing'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancelar
                            </Button>
                            
                            {selectedMethod && (
                                <Button
                                    className={styles.submitButton}
                                    onClick={handlePaymentSubmit}
                                    disabled={paymentStatus === 'processing' || formProgress < 50}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
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