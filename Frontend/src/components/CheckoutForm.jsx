import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const CheckoutForm = ({ customerInfo, onInfoChange, onSubmit, isFormComplete, variants }) => {
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

                    <div className="form-group">
                        <label htmlFor="zipCode">CEP*</label>
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