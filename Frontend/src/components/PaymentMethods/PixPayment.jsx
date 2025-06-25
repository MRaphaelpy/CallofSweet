import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormField from '../shared/FormField';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import { FaCopy, FaClock, FaMobileAlt, FaQrcode, FaCheckCircle, FaInfoCircle, FaUser } from 'react-icons/fa';
import styles from './PixPayment.module.css';
import {QRCodeSVG} from 'qrcode.react';

const PixPayment = ({
    amount,
    customerData,
    onCustomerDataChange,
    onSubmit,
    isProcessing
}) => {
    const [pixCode, setPixCode] = useState('');
    const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [countdown, setCountdown] = useState(900); 
    const [copySuccess, setCopySuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('qrcode');

    
    useEffect(() => {
        const generatePixCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 32; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        
        setTimeout(() => {
            setPixCode(generatePixCode());
            setQrCodeLoaded(true);
        }, 1000);
    }, []);

    
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const validateForm = () => {
        const newErrors = {};

        if (!customerData.name.trim()) {
            newErrors.customerName = 'Nome é obrigatório';
        }

        if (!customerData.cpf.trim()) {
            newErrors.cpf = 'CPF é obrigatório';
        }

        if (!customerData.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({
                paymentMethod: 'pix',
                customerData,
                pixCode
            });
        }
    };

    const copyPixCode = () => {
        navigator.clipboard.writeText(pixCode);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
    };

    return (
        <motion.div
            className={styles.pixPayment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.paymentContainer}>
                <div className={styles.tabsContainer}>
                    <motion.button 
                        className={`${styles.tabButton} ${activeTab === 'qrcode' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('qrcode')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaQrcode />
                        <span>QR Code PIX</span>
                    </motion.button>
                    <motion.button 
                        className={`${styles.tabButton} ${activeTab === 'details' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('details')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUser />
                        <span>Seus Dados</span>
                    </motion.button>
                </div>

                <div className={styles.contentContainer}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'qrcode' ? (
                            <motion.div 
                                key="qrcode"
                                className={styles.pixContainer}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.pixHeader}>
                                    <motion.div 
                                        className={styles.amountDisplay}
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <span>Valor total:</span>
                                        <h2>{new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(amount)}</h2>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className={`${styles.countdown} ${countdown < 120 ? styles.expiringSoon : ''}`}
                                        animate={countdown < 120 ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
                                    >
                                        <FaClock className={styles.clockIcon} />
                                        <div className={styles.countdownContent}>
                                            <span>Expira em</span>
                                            <strong>{formatTime(countdown)}</strong>
                                        </div>
                                    </motion.div>
                                </div>

                                {!qrCodeLoaded ? (
                                    <div className={styles.qrLoading}>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <Loader size="large" />
                                        </motion.div>
                                        <p>Gerando QR Code...</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        className={styles.qrContent}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    >
                                        <motion.div 
                                            className={styles.qrCodeWrapper}
                                            whileHover={{ boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className={styles.qrCode}>
                                                <QRCodeSVG value="oiiiiiiiii" />
                                            </div>
                                        </motion.div>

                                        <div className={styles.pixCodeSection}>
                                            <div className={styles.pixCodeHeader}>
                                                <FaMobileAlt className={styles.mobileIcon} />
                                                <span>Código PIX para cópia</span>
                                            </div>
                                            <div className={styles.pixCodeBox}>
                                                <p className={styles.pixCode}>{pixCode}</p>
                                                <motion.button
                                                    className={`${styles.copyButton} ${copySuccess ? styles.copySuccess : ''}`}
                                                    onClick={copyPixCode}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
                                                    animate={copySuccess ? { backgroundColor: "#4CAF50" } : {}}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {copySuccess ? <FaCheckCircle /> : <FaCopy />}
                                                    <span>{copySuccess ? "Copiado!" : "Copiar"}</span>
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div className={styles.instructionsContainer}>
                                            <div className={styles.instructionsHeader}>
                                                <FaInfoCircle className={styles.infoIcon} />
                                                <h4>Como pagar</h4>
                                            </div>
                                            
                                            <ol className={styles.instructions}>
                                                {[
                                                    "Abra o aplicativo do seu banco",
                                                    "Escolha a opção de pagamento via PIX",
                                                    "Escaneie o QR Code ou cole o código",
                                                    "Confirme o valor e finalize o pagamento"
                                                ].map((step, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                                                    >
                                                        <span className={styles.stepNumber}>{index + 1}</span>
                                                        <span>{step}</span>
                                                    </motion.li>
                                                ))}
                                            </ol>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="details"
                                className={styles.customerInfoForm}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.formTitle}>
                                    <FaUser />
                                    <h3>Informações do Comprador</h3>
                                </div>
                                
                                <div className={styles.formFields}>
                                    <FormField
                                        label="Nome Completo"
                                        error={errors.customerName}
                                    >
                                        <Input
                                            type="text"
                                            value={customerData.name}
                                            onChange={(e) => onCustomerDataChange('name', e.target.value)}
                                            placeholder="Seu nome completo"
                                            disabled={isProcessing}
                                            className={styles.inputField}
                                        />
                                    </FormField>

                                    <FormField
                                        label="CPF"
                                        error={errors.cpf}
                                    >
                                        <Input
                                            type="text"
                                            value={customerData.cpf}
                                            onChange={(e) => onCustomerDataChange('cpf', e.target.value)}
                                            placeholder="123.456.789-00"
                                            disabled={isProcessing}
                                            className={styles.inputField}
                                        />
                                    </FormField>

                                    <FormField
                                        label="E-mail"
                                        error={errors.email}
                                    >
                                        <Input
                                            type="email"
                                            value={customerData.email}
                                            onChange={(e) => onCustomerDataChange('email', e.target.value)}
                                            placeholder="seu@email.com"
                                            disabled={isProcessing}
                                            className={styles.inputField}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Telefone"
                                        error={errors.phone}
                                    >
                                        <Input
                                            type="tel"
                                            value={customerData.phone}
                                            onChange={(e) => onCustomerDataChange('phone', e.target.value)}
                                            placeholder="(00) 00000-0000"
                                            disabled={isProcessing}
                                            className={styles.inputField}
                                        />
                                    </FormField>
                                </div>

                                <motion.div 
                                    className={styles.securityInfo}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <motion.div 
                                        className={styles.securityIcon}
                                        animate={{ 
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            repeatDelay: 5 
                                        }}
                                    >
                                        🔒
                                    </motion.div>
                                    <p>Seus dados estão protegidos e não serão compartilhados.</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div 
                    className={styles.actionButtonContainer}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={styles.buttonWrapper}
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={isProcessing || !qrCodeLoaded}
                            fullWidth
                            className={styles.confirmButton}
                        >
                            {isProcessing ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Loader size="small" />
                                </motion.div>
                            ) : (
                                <>
                                    <FaCheckCircle className={styles.confirmIcon} />
                                    <span>Confirmei o Pagamento</span>
                                </>
                            )}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PixPayment;