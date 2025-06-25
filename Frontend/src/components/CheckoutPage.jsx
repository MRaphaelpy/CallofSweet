import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaCreditCard, FaLock, FaArrowRight, FaShippingFast } from 'react-icons/fa';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFormComplete, setIsFormComplete] = useState(false);

    const cartItems = location.state?.cartItems || [];
    const subtotal = location.state?.subtotal;
    const shipping = location.state?.shipping || 0;
    const discount = location.state?.discount || 0;
    const total = location.state?.total || calculateTotal();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        phone: '',
        cpf: '',
        addressNumber: '',
        complement: '',
        neighborhood: '',
        state: '',
    });

 
    useEffect(() => {
        const { name, email, address, city, zipCode, phone, cpf } = customerInfo;
        setIsFormComplete(name && email && address && city && zipCode && phone && cpf);
    }, [customerInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigateToPayment();
    };

    const handleGoToPayment = () => {
        navigateToPayment();
    };

    const navigateToPayment = () => {
        const customerData = {
            customerName: customerInfo.name,
            customerEmail: customerInfo.email,
            customerCpf: customerInfo.cpf,
            customerPhone: customerInfo.phone,
            shippingAddress: {
                street: customerInfo.address,
                city: customerInfo.city,
                zipCode: customerInfo.zipCode,
                number: customerInfo.addressNumber,
                complement: customerInfo.complement,
                neighborhood: customerInfo.neighborhood,
                state: customerInfo.state,
            }
        };

        navigate('/payment', {
            state: {
                amount: total,
                ...customerData,
                cartItems,
                orderSummary: {
                    subtotal,
                    shipping,
                    discount,
                    total
                }
            }
        });
    };

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div 
            className="checkout-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="checkout-header">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <FaShoppingCart className="checkout-icon" /> 
                    Finalizar Compra
                </motion.h1>
                <div className="checkout-progress">
                    <div className="progress-step active">
                        <span className="step-number">1</span>
                        <span className="step-name">Carrinho</span>
                    </div>
                    <div className="progress-line active"></div>
                    <div className="progress-step active">
                        <span className="step-number">2</span>
                        <span className="step-name">Checkout</span>
                    </div>
                    <div className="progress-line"></div>
                    <div className="progress-step">
                        <span className="step-number">3</span>
                        <span className="step-name">Pagamento</span>
                    </div>
                </div>
            </div>

            <div className="checkout-content">
                <motion.div 
                    className="order-summary"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        className="summary-header"
                        variants={itemVariants}
                    >
                        <h2>Resumo do Pedido</h2>
                    </motion.div>
                    
                    <motion.div 
                        className="cart-items"
                        variants={containerVariants}
                    >
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <motion.div 
                                    className="cart-item" 
                                    key={item.id}
                                    variants={itemVariants}
                                    custom={index}
                                    whileHover={{ backgroundColor: "#f9fafb" }}
                                >
                                    <div className="item-image">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} />
                                        ) : (
                                            <div className="item-placeholder"></div>
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <div className="item-meta">
                                            <span className="item-quantity">{item.quantity}x</span>
                                            <span className="item-price">R$ {item.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        R$ {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                className="empty-cart"
                                variants={itemVariants}
                            >
                                <p>Seu carrinho está vazio</p>
                            </motion.div>
                        )}
                    </motion.div>
                    
                    <motion.div 
                        className="summary-calculations"
                        variants={itemVariants}
                    >
                        <div className="calc-row subtotal">
                            <span>Subtotal:</span>
                            <span>R$ {subtotal ? subtotal.toFixed(2) : calculateTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="calc-row shipping">
                            <span>
                                <FaShippingFast className="calc-icon" />
                                Frete:
                            </span>
                            <span>{shipping > 0 ? `R$ ${shipping.toFixed(2)}` : "Grátis"}</span>
                        </div>
                        
                        {discount > 0 && (
                            <div className="calc-row discount">
                                <span>Desconto:</span>
                                <span className="discount-value">- R$ {discount.toFixed(2)}</span>
                            </div>
                        )}
                        
                        <div className="calc-row total">
                            <strong>Total:</strong>
                            <strong>R$ {total ? total.toFixed(2) : calculateTotal().toFixed(2)}</strong>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="secure-checkout-msg"
                        variants={itemVariants}
                    >
                        <FaLock />
                        <p>Seus dados estão protegidos com criptografia de ponta a ponta.</p>
                    </motion.div>

                    <motion.button
                        className={`payment-button ${!isFormComplete ? "disabled" : ""}`}
                        onClick={handleGoToPayment}
                        type="button"
                        disabled={!isFormComplete}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial="idle"
                    >
                        <span>Ir para Pagamento</span>
                        <FaArrowRight />
                    </motion.button>
                </motion.div>

                <motion.form 
                    className="checkout-form" 
                    onSubmit={handleSubmit}
                    variants={containerVariants}
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
            </div>
        </motion.div>
    );
};

export default CheckoutPage;