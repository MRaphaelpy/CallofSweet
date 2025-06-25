
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FormField from '../shared/FormField';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import styles from './PaymentMethods.module.css';

const BankSlipPayment = ({
    customerData,
    onCustomerDataChange,
    onAddressChange,
    onSubmit,
    isProcessing
}) => {
    const [bankSlipCode, setBankSlipCode] = useState('');
    const [bankSlipGenerated, setBankSlipGenerated] = useState(false);
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        const generateBankSlipCode = () => {
            
            let code = '';
            for (let i = 0; i < 10; i++) {
                code += Math.floor(Math.random() * 10).toString();
            }
            code += '.';
            for (let i = 0; i < 10; i++) {
                code += Math.floor(Math.random() * 10).toString();
            }
            code += ' ';
            for (let i = 0; i < 10; i++) {
                code += Math.floor(Math.random() * 10).toString();
            }
            code += '.';
            for (let i = 0; i < 10; i++) {
                code += Math.floor(Math.random() * 10).toString();
            }
            code += ' ';
            for (let i = 0; i < 11; i++) {
                code += Math.floor(Math.random() * 10).toString();
            }
            return code;
        };

        
        setTimeout(() => {
            setBankSlipCode(generateBankSlipCode());
            setBankSlipGenerated(true);
        }, 1500);
    }, []);

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
        }

        if (!customerData.address.zipCode.trim()) {
            newErrors.zipCode = 'CEP é obrigatório';
        }

        if (!customerData.address.street.trim()) {
            newErrors.street = 'Rua é obrigatória';
        }

        if (!customerData.address.number.trim()) {
            newErrors.number = 'Número é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerateBankSlip = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({
                paymentMethod: 'bank-slip',
                customerData,
                bankSlipCode
            });
        }
    };

    const downloadBankSlip = () => {
        
        alert('Ta querendo de mais já né não?');
    };

    const copyBankSlipCode = () => {
        navigator.clipboard.writeText(bankSlipCode);
        alert('Código do boleto copiado para a área de transferência!');
    };

    return (
        <motion.div
            className={styles.bankSlipPayment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.formSection}>
                <h3>Pagar com Boleto Bancário</h3>

                {bankSlipGenerated ? (
                    <motion.div
                        className={styles.bankSlipContainer}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.bankSlipPreview}>
                            <div className={styles.bankSlipHeader}>
                                <div className={styles.bankLogo}>BANCO</div>
                                <div className={styles.bankSlipTitle}>Boleto Bancário</div>
                                <div className={styles.bankSlipInfo}>
                                    <p>Vencimento: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                                    <p>Pagamento para: Nome da Sua Loja</p>
                                </div>
                            </div>

                            <div className={styles.bankSlipBarcode}>
                                <div className={styles.barcode}>
                                    <div className={styles.barcodeLines}></div>
                                </div>
                                <div className={styles.bankSlipCodeDisplay}>{bankSlipCode}</div>
                            </div>

                            <div className={styles.bankSlipActions}>
                                <Button
                                    onClick={downloadBankSlip}
                                    variant="primary"
                                    fullWidth
                                >
                                    Baixar Boleto
                                </Button>
                                <Button
                                    onClick={copyBankSlipCode}
                                    variant="outlined"
                                    fullWidth
                                >
                                    Copiar Código
                                </Button>
                            </div>

                            <div className={styles.bankSlipInstructions}>
                                <h4>Instruções:</h4>
                                <ul>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        Pague este boleto em qualquer banco, casa lotérica ou pelo aplicativo do seu banco.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        O boleto vence em 3 dias úteis.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Após o pagamento, o processamento pode levar até 3 dias úteis.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Seu pedido será processado após a confirmação do pagamento.
                                    </motion.li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isProcessing ? 0.7 : 1 }}
                        className={styles.bankSlipForm}
                    >
                        <div className={styles.fieldGrid}>
                            <FormField
                                label="Nome Completo"
                                error={errors.customerName}
                                fullWidth
                            >
                                <Input
                                    type="text"
                                    value={customerData.name}
                                    onChange={(e) => onCustomerDataChange('name', e.target.value)}
                                    placeholder="Seu nome completo"
                                    disabled={isProcessing}
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
                                />
                            </FormField>
                        </div>

                        <div className={styles.addressFields}>
                            <FormField
                                label="CEP"
                                error={errors.zipCode}
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.zipCode}
                                    onChange={(e) => onAddressChange('zipCode', e.target.value)}
                                    placeholder="00000-000"
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Rua"
                                error={errors.street}
                                fullWidth
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.street}
                                    onChange={(e) => onAddressChange('street', e.target.value)}
                                    placeholder="Nome da rua"
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Número"
                                error={errors.number}
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.number}
                                    onChange={(e) => onAddressChange('number', e.target.value)}
                                    placeholder="123"
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Complemento"
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.complement}
                                    onChange={(e) => onAddressChange('complement', e.target.value)}
                                    placeholder="Apto, Bloco, etc."
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Bairro"
                                error={errors.neighborhood}
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.neighborhood}
                                    onChange={(e) => onAddressChange('neighborhood', e.target.value)}
                                    placeholder="Seu bairro"
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Cidade"
                                error={errors.city}
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.city}
                                    onChange={(e) => onAddressChange('city', e.target.value)}
                                    placeholder="Cidade"
                                    disabled={isProcessing}
                                />
                            </FormField>

                            <FormField
                                label="Estado"
                                error={errors.state}
                            >
                                <Input
                                    type="text"
                                    value={customerData.address.state}
                                    onChange={(e) => onAddressChange('state', e.target.value)}
                                    placeholder="Estado"
                                    disabled={isProcessing}
                                />
                            </FormField>
                        </div>

                        <div className={styles.formActions}>
                            <Button
                                onClick={handleGenerateBankSlip}
                                disabled={isProcessing}
                                fullWidth
                            >
                                {isProcessing ? <Loader size="small" /> : "Gerar Boleto"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>

            {bankSlipGenerated && (
                <div className={styles.formActions}>
                    <Button
                        onClick={handleGenerateBankSlip}
                        disabled={isProcessing}
                        fullWidth
                    >
                        {isProcessing ? <Loader size="small" /> : "Confirmar Pedido"}
                    </Button>
                </div>
            )}
        </motion.div>
    );
};

export default BankSlipPayment;