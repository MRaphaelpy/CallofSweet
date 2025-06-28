import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './UserRegistrationForm.css';
import InputField from '../common/InputField';
import Button from '../common/Button';

const UserRegistrationForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthday: '',
        role: 'CUSTOMER'
    });

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [addressSaving, setAddressSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'password') {
            calculatePasswordStrength(value);
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        setPasswordStrength(strength);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';

        if (!formData.password) newErrors.password = 'Senha é obrigatória';
        else if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
        else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Digite um número de telefone válido';
        }

        if (!formData.birthday) newErrors.birthday = 'Data de nascimento é obrigatória';
        else {
            const birthday = new Date(formData.birthday);
            const today = new Date();
            const age = today.getFullYear() - birthday.getFullYear() -
                (today.getMonth() < birthday.getMonth() ||
                    (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()) ? 1 : 0);

            if (age < 18) newErrors.birthday = 'Você deve ter pelo menos 18 anos';
        }

        return newErrors;
    };

    const validateStep = (step) => {
        const newErrors = {};
        
        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
            if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
            if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
            else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
                newErrors.phone = 'Digite um número de telefone válido';
            }
        } else if (step === 2) {
            if (!formData.birthday) newErrors.birthday = 'Data de nascimento é obrigatória';
            else {
                const birthday = new Date(formData.birthday);
                const today = new Date();
                const age = today.getFullYear() - birthday.getFullYear() -
                    (today.getMonth() < birthday.getMonth() ||
                        (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()) ? 1 : 0);

                if (age < 18) newErrors.birthday = 'Você deve ter pelo menos 18 anos';
            }
            
            if (!formData.password) newErrors.password = 'Senha é obrigatória';
            else if (formData.password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'As senhas não coincidem';
            }
        }
        
        return newErrors;
    };

    const nextStep = () => {
        const stepErrors = validateStep(currentStep);
        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(currentStep + 1);
            setErrors({});
        } else {
            setErrors(stepErrors);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            birthday: formData.birthday,
            role: 'CUSTOMER'
        };

        await onSubmit(userData);
    };

    const formatPhone = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) {
            return numbers;
        }
        if (numbers.length <= 6) {
            return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
        }
        if (numbers.length <= 10) {
            return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6)}`;
        }
        return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formattedPhone = formatPhone(value);
        setFormData(prev => ({
            ...prev,
            phone: formattedPhone
        }));
        if (errors.phone) {
            setErrors(prev => ({
                ...prev,
                phone: ''
            }));
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    const getStrengthText = () => {
        switch(passwordStrength) {
            case 0: return 'Muito fraca';
            case 1: return 'Fraca';
            case 2: return 'Média';
            case 3: return 'Forte';
            case 4: return 'Muito forte';
            default: return '';
        }
    };

    const getStrengthColor = () => {
        switch(passwordStrength) {
            case 0: return '#ff4d4d';
            case 1: return '#ff8c1a';
            case 2: return '#ffcc00';
            case 3: return '#80cc28'; 
            case 4: return '#2eb82e'; 
            default: return '#e0e0e0';
        }
    };

    return (
        <div className="user-registration-form-container">
            <div className="form-steps">
                <div className={`form-step ${currentStep >= 1 ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Informações Pessoais</div>
                </div>
                <div className="step-connector"></div>
                <div className={`form-step ${currentStep >= 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Segurança</div>
                </div>
                <div className="step-connector"></div>
                <div className={`form-step ${currentStep >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Confirmação</div>
                </div>
            </div>

            <form className="user-registration-form" onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div className="form-step-content" key="step1">
                        <h2>Informações Pessoais</h2>
                        <p className="form-subtitle">Por favor, preencha seus dados pessoais</p>

                        <InputField
                            label="Nome Completo"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder="Digite seu nome completo"
                            icon="user"
                            required
                        />

                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="Digite seu email"
                            icon="envelope"
                            required
                        />

                        <InputField
                            label="Telefone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            error={errors.phone}
                            placeholder="(00) 00000-0000"
                            icon="phone"
                            required
                        />

                        <div className="form-nav-buttons">
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="next-button"
                                label="Próximo"
                                primary
                                iconRight="arrow-right"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="form-step-content" key="step2">
                        <h2>Informações de Segurança</h2>
                        <p className="form-subtitle">Configure sua data de nascimento e senha</p>

                        <InputField
                            label="Data de Nascimento"
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            error={errors.birthday}
                            icon="calendar"
                            required
                        />

                        <InputField
                            label="Senha"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="Crie uma senha"
                            icon="lock"
                            required
                        />
                        
                        {formData.password && (
                            <div className="password-strength">
                                <div className="strength-bars">
                                    {[...Array(4)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`strength-bar ${i < passwordStrength ? 'filled' : ''}`}
                                            style={{ backgroundColor: i < passwordStrength ? getStrengthColor() : '' }}
                                        ></div>
                                    ))}
                                </div>
                                <span className="strength-text" style={{ color: getStrengthColor() }}>
                                    {getStrengthText()}
                                </span>
                            </div>
                        )}

                        <InputField
                            label="Confirmar Senha"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            placeholder="Confirme sua senha"
                            icon="lock-check"
                            required
                        />

                        <div className="form-nav-buttons">
                            <Button
                                type="button"
                                onClick={prevStep}
                                className="back-button"
                                label="Voltar"
                                outline
                                iconLeft="arrow-left"
                            />
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="next-button"
                                label="Próximo"
                                primary
                                iconRight="arrow-right"
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="form-step-content" key="step3">
                        <h2>Confirmar Dados</h2>
                        <p className="form-subtitle">Verifique se todas as informações estão corretas</p>

                        <div className="confirmation-card">
                            <div className="confirmation-item">
                                <span className="confirmation-label">Nome:</span>
                                <span className="confirmation-value">{formData.name}</span>
                            </div>
                            <div className="confirmation-item">
                                <span className="confirmation-label">Email:</span>
                                <span className="confirmation-value">{formData.email}</span>
                            </div>
                            <div className="confirmation-item">
                                <span className="confirmation-label">Telefone:</span>
                                <span className="confirmation-value">{formData.phone}</span>
                            </div>
                            <div className="confirmation-item">
                                <span className="confirmation-label">Data de Nascimento:</span>
                                <span className="confirmation-value">
                                    {formData.birthday && new Date(formData.birthday).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>

                        <div className="terms-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                Li e aceito os <a href="#" className="terms-link">Termos de Uso</a> e a <a href="#" className="terms-link">Política de Privacidade</a>
                            </label>
                        </div>

                        <div className="form-nav-buttons">
                            <Button
                                type="button"
                                onClick={prevStep}
                                className="back-button"
                                label="Voltar"
                                outline
                                iconLeft="arrow-left"
                            />
                            <Button
                                type="submit"
                                className="submit-button"
                                label={loading ? "Criando conta..." : "Finalizar Cadastro"}
                                disabled={loading}
                                primary
                                iconRight={loading ? "spinner" : "check"}
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserRegistrationForm;