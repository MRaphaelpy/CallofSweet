import React, { useState } from 'react';
import axios from 'axios';
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
    const [addressSaving, setAddressSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
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

    return (
        <form className="user-registration-form" onSubmit={handleSubmit}>
            <h2>Criar Conta</h2>

            <InputField
                label="Nome Completo"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Digite seu nome completo"
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
                required
            />

            <InputField
                label="Data de Nascimento"
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                error={errors.birthday}
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
                required
            />

            <InputField
                label="Confirmar Senha"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirme sua senha"
                required
            />

            <Button
                type="submit"
                label={loading ? "Criando conta..." : "Registrar"}
                disabled={loading}
                primary
            />
        </form>
    );
};

export default UserRegistrationForm;