import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const CheckoutForm = ({ customerInfo, onInfoChange, onSubmit, isFormComplete, variants }) => {
    const [isLoadingCep, setIsLoadingCep] = useState(false);
    const [cepError, setCepError] = useState("");
    const [userAddresses, setUserAddresses] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const API_BASE_URL = "http://localhost:8081";

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
        tap: { scale: 0.95 }
    };

    const getUserId = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).userId : null;
    };

    const getAuthToken = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).token : null;
    };

    const parseAddressString = (addressString) => {
        if (!addressString) return {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            complement: '',
            isDefault: true
        };

        try {
            const lines = addressString.split('\n').filter(line => line.trim() !== '');

            let addressName = lines.length > 0 ? lines[0].trim() : 'Endereço';
            let street = '';
            let number = '';

            if (lines.length > 1) {
                const streetLine = lines[1].trim();
                const streetParts = streetLine.split(',');
                street = streetParts[0].trim();
                number = streetParts.length > 1 ? streetParts[1].trim() : '';
            }

            let neighborhood = '';
            let city = '';
            let state = '';

            if (lines.length > 2) {
                const locationLine = lines[2].trim();
                if (locationLine.startsWith(',')) {
                    const cityStatePart = locationLine.substring(1).trim();
                    const cityStateParts = cityStatePart.split('-');

                    city = cityStateParts[0].trim();
                    state = cityStateParts.length > 1 ? cityStateParts[1].trim() : '';
                } else {
                    const locationParts = locationLine.split(',');

                    if (locationParts.length > 0) {
                        neighborhood = locationParts[0].trim();

                        if (locationParts.length > 1) {
                            const cityStatePart = locationParts[1].trim();
                            const cityStateParts = cityStatePart.split('-');

                            city = cityStateParts[0].trim();
                            state = cityStateParts.length > 1 ? cityStateParts[1].trim() : '';
                        }
                    }
                }
            }

            let zipCode = '';

            if (lines.length > 3) {
                const cepLine = lines[3].trim();
                if (cepLine.startsWith('CEP:')) {
                    zipCode = cepLine.replace('CEP:', '').trim();
                }
            }

            return {
                name: addressName,
                street,
                number,
                complement: '',
                neighborhood,
                city,
                state,
                zipCode,
                isDefault: true
            };
        } catch (error) {
            console.error("Error parsing address string:", error);
            return {
                name: 'Endereço',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: true
            };
        }
    };

    useEffect(() => {
        const fetchUserAddresses = async () => {
            const userId = getUserId();
            if (!userId) return;

            setLoadingAddresses(true);
            try {
                const token = getAuthToken();

                const config = token ? {
                    headers: { Authorization: `Bearer ${token}` }
                } : {};

                const response = await axios.get(`${API_BASE_URL}/api/v1/users/${userId}`, config);
                const userData = response.data;

                let addressList = [];

                if (userData && userData.address) {
                    if (typeof userData.address === 'string') {
                        const parsedAddress = parseAddressString(userData.address);

                        const addressObject = {
                            id: userData.id,
                            ...parsedAddress
                        };

                        addressList = [addressObject];
                    } else if (typeof userData.address === 'object') {
                        const addressObject = {
                            id: userData.id,
                            name: userData.address.name || 'Casa',
                            street: userData.address.street || '',
                            number: userData.address.number || '',
                            neighborhood: userData.address.neighborhood || '',
                            city: userData.address.city || '',
                            state: userData.address.state || '',
                            zipCode: userData.address.zipCode || '',
                            complement: userData.address.complement || '',
                            isDefault: true
                        };

                        addressList = [addressObject];
                    }
                } else if (userData && userData.addresses && userData.addresses.length > 0) {
                    addressList = userData.addresses.map(addr => {
                        if (typeof addr === 'string') {
                            const parsedAddress = parseAddressString(addr);
                            return {
                                id: Math.random().toString(36).substr(2, 9),
                                ...parsedAddress
                            };
                        }
                        return {
                            id: addr.id || Math.random().toString(36).substr(2, 9),
                            name: addr.name || 'Endereço',
                            street: addr.street || '',
                            number: addr.number || '',
                            neighborhood: addr.neighborhood || '',
                            city: addr.city || '',
                            state: addr.state || '',
                            zipCode: addr.zipCode || '',
                            complement: addr.complement || '',
                            isDefault: addr.isDefault || false
                        };
                    });
                }

                setUserAddresses(addressList);

                const defaultAddress = addressList.find(addr => addr.isDefault) || (addressList.length > 0 ? addressList[0] : null);
                if (defaultAddress) {
                    onInfoChange({
                        ...customerInfo,
                        address: defaultAddress.street || '',
                        addressNumber: defaultAddress.number || '',
                        neighborhood: defaultAddress.neighborhood || '',
                        city: defaultAddress.city || '',
                        state: defaultAddress.state || '',
                        zipCode: defaultAddress.zipCode || '',
                        complement: defaultAddress.complement || '',
                    });
                }
            } catch (err) {
                console.error("Falha ao buscar endereços do usuário:", err);

                try {
                    const storedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
                    if (storedAddresses.length > 0) {
                        setUserAddresses(storedAddresses);

                        const defaultAddress = storedAddresses.find(addr => addr.isDefault) || storedAddresses[0];
                        if (defaultAddress) {
                            onInfoChange({
                                ...customerInfo,
                                address: defaultAddress.street || '',
                                addressNumber: defaultAddress.number || '',
                                neighborhood: defaultAddress.neighborhood || '',
                                city: defaultAddress.city || '',
                                state: defaultAddress.state || '',
                                zipCode: defaultAddress.zipCode || '',
                                complement: defaultAddress.complement || '',
                            });
                        }
                    }
                } catch (localErr) {
                    console.error("Erro ao carregar endereços locais:", localErr);
                }
            } finally {
                setLoadingAddresses(false);
            }
        };

        fetchUserAddresses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onInfoChange({
            ...customerInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };


    return (
        <motion.form
            className="checkout-form"
            onSubmit={handleSubmit}
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="form-header"
                variants={itemVariants}
            >
                <FaUser className="form-icon" />
                <h2>Informações do Cliente</h2>
            </motion.div>

            <motion.div className="form-section" variants={itemVariants}>
                <div className="form-section-title">
                    <FaUser className="section-icon" />
                    <h3>Dados Pessoais</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nome Completo*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            required
                            placeholder="seu.email@exemplo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Telefone*</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="cpf">CPF*</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={customerInfo.cpf}
                        onChange={handleInputChange}
                        required
                        placeholder="000.000.000-00"
                    />
                </div>
            </motion.div>

            <motion.div className="form-section" variants={itemVariants}>
                <div className="form-section-title">
                    <FaMapMarkerAlt className="section-icon" />
                    <h3>Endereço de Entrega</h3>
                </div>

                <div className="form-row">
                    <div className="form-group grow-2">
                        <label htmlFor="zipCode">CEP*</label>
                        <div className="input-with-button">
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={customerInfo.zipCode}
                                onChange={handleInputChange}
                                required
                                placeholder="00000-000"
                            />
                        </div>
                        {cepError && <p className="error-message">{cepError}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group grow-2">
                        <label htmlFor="address">Rua/Avenida*</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Rua exemplo"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressNumber">Número*</label>
                        <input
                            type="text"
                            id="addressNumber"
                            name="addressNumber"
                            value={customerInfo.addressNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="complement">Complemento</label>
                        <input
                            type="text"
                            id="complement"
                            name="complement"
                            value={customerInfo.complement}
                            onChange={handleInputChange}
                            placeholder="Apto, Bloco, etc."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="neighborhood">Bairro*</label>
                        <input
                            type="text"
                            id="neighborhood"
                            name="neighborhood"
                            value={customerInfo.neighborhood}
                            onChange={handleInputChange}
                            required
                            placeholder="Seu bairro"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group grow-2">
                        <label htmlFor="city">Cidade*</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={customerInfo.city}
                            onChange={handleInputChange}
                            required
                            placeholder="Sua cidade"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">Estado*</label>
                        <select
                            id="state"
                            name="state"
                            value={customerInfo.state}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            <motion.button
                type="submit"
                className={`checkout-btn ${!isFormComplete ? "disabled" : ""}`}
                disabled={!isFormComplete}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial="idle"
            >
                <FaCreditCard />
                <span>Continuar para Pagamento</span>
            </motion.button>
        </motion.form>
    );
};

export default CheckoutForm;