
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from '../shared/FormField';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import { validateCreditCard, validateExpiryDate, validateCvv } from '../../utils/validators';
import { formatCreditCard, formatExpiryDate } from '../../utils/formatters';
import styles from './PaymentMethods.module.css';

const CreditCardPayment = ({
    customerData,
    onCustomerDataChange,
    onAddressChange,
    onSubmit,
    isProcessing
}) => {
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        installments: '1'
    });
    const [errors, setErrors] = useState({});

    const handleCardDataChange = (field, value) => {
        let formattedValue = value;

        if (field === 'number') {
            formattedValue = formatCreditCard(value);
        } else if (field === 'expiry') {
            formattedValue = formatExpiryDate(value);
        }

        setCardData(prev => ({
            ...prev,
            [field]: formattedValue
        }));


        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validateCreditCard(cardData.number)) {
            newErrors.number = 'Número de cartão inválido';
        }

        if (!cardData.name.trim()) {
            newErrors.name = 'Nome do titular é obrigatório';
        }

        if (!validateExpiryDate(cardData.expiry)) {
            newErrors.expiry = 'Data de validade inválida';
        }

        if (!validateCvv(cardData.cvv)) {
            newErrors.cvv = 'Código de segurança inválido';
        }

        if (!customerData.name.trim()) {
            newErrors.customerName = 'Nome é obrigatório';
        }

        if (!customerData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit({
                paymentMethod: 'credit-card',
                customerData,
                cardData: {
                    ...cardData,
                    number: cardData.number.replace(/\D/g, '')
                }
            });
        }
    };

    const installmentOptions = [
        { value: '1', label: '1x (sem juros)' },
        { value: '2', label: '2x (sem juros)' },
        { value: '3', label: '3x (sem juros)' },
        { value: '4', label: '4x (sem juros)' },
        { value: '5', label: '5x (sem juros)' },
        { value: '6', label: '6x (sem juros)' },
        { value: '7', label: '7x (com juros)' },
        { value: '8', label: '8x (com juros)' },
        { value: '9', label: '9x (com juros)' },
        { value: '10', label: '10x (com juros)' },
        { value: '11', label: '11x (com juros)' },
        { value: '12', label: '12x (com juros)' },
    ];

    return (
        <motion.div
            className={styles.creditCardPayment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <form onSubmit={handleSubmit}>
                <div className={styles.formSection}>
                    <h3>Informações do Cartão</h3>

                    <div className={styles.cardContainer}>
                        <motion.div
                            className={styles.creditCard}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: cardData.cvv ? 180 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.cardFront}>
                                <div className={styles.cardBrand}></div>
                                <div className={styles.cardNumber}>
                                    {cardData.number || '•••• •••• •••• ••••'}
                                </div>
                                <div className={styles.cardDetails}>
                                    <div className={styles.cardHolder}>
                                        <span>TITULAR</span>
                                        <div>{cardData.name || 'SEU NOME'}</div>
                                    </div>
                                    <div className={styles.cardExpiry}>
                                        <span>VALIDADE</span>
                                        <div>{cardData.expiry || 'MM/AA'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardBack}>
                                <div className={styles.cardStrip}></div>
                                <div className={styles.cardCvv}>
                                    <div className={styles.cvvTitle}>CVV</div>
                                    <div className={styles.cvvBand}>
                                        <div className={styles.cvvText}>{cardData.cvv || '•••'}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className={styles.fieldGrid}>
                        <FormField
                            label="Número do Cartão"
                            error={errors.number}
                            fullWidth
                        >
                            <Input
                                type="text"
                                value={cardData.number}
                                onChange={(e) => handleCardDataChange('number', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                disabled={isProcessing}
                            />
                        </FormField>

                        <FormField
                            label="Nome do Titular"
                            error={errors.name}
                            fullWidth
                        >
                            <Input
                                type="text"
                                value={cardData.name}
                                onChange={(e) => handleCardDataChange('name', e.target.value)}
                                placeholder="Nome como aparece no cartão"
                                disabled={isProcessing}
                            />
                        </FormField>

                        <FormField
                            label="Data de Validade"
                            error={errors.expiry}
                        >
                            <Input
                                type="text"
                                value={cardData.expiry}
                                onChange={(e) => handleCardDataChange('expiry', e.target.value)}
                                placeholder="MM/AA"
                                maxLength={5}
                                disabled={isProcessing}
                            />
                        </FormField>

                        <FormField
                            label="Código de Segurança (CVV)"
                            error={errors.cvv}
                        >
                            <Input
                                type="text"
                                value={cardData.cvv}
                                onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                                placeholder="123"
                                maxLength={4}
                                onFocus={() => handleCardDataChange('cvvFocus', true)}
                                onBlur={() => handleCardDataChange('cvvFocus', false)}
                                disabled={isProcessing}
                            />
                        </FormField>

                        <FormField
                            label="Parcelas"
                            fullWidth
                        >
                            <Select
                                value={cardData.installments}
                                onChange={(e) => handleCardDataChange('installments', e.target.value)}
                                options={installmentOptions}
                                disabled={isProcessing}
                            />
                        </FormField>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h3>Informações de Cobrança</h3>

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
                            label="Email"
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
                </div>

                <div className={styles.formActions}>
                    <Button
                        type="submit"
                        disabled={isProcessing}
                        fullWidth
                    >
                        {isProcessing ? <Loader size="small" /> : "Pagar Agora"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default CreditCardPayment;