// components/OrderSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaLock, FaArrowRight } from 'react-icons/fa';

const OrderSummary = ({ cartItems, subtotal, shipping, discount, total, isFormComplete, onProceed, variants }) => {
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

    const calculateItemTotal = (item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return price * quantity;
    };

    return (
        <motion.div
            className="order-summary"
            variants={variants}
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
                variants={variants}
            >
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <motion.div
                            className="cart-item"
                            key={item.id || index}
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
                                    <span className="item-price">R$ {parseFloat(item.price).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="item-total">
                                R$ {calculateItemTotal(item).toFixed(2)}
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
                    <span>R$ {parseFloat(subtotal).toFixed(2)}</span>
                </div>

                <div className="calc-row shipping">
                    <span>
                        <FaShippingFast className="calc-icon" />
                        Frete:
                    </span>
                    <span>{shipping > 0 ? `R$ ${parseFloat(shipping).toFixed(2)}` : "Grátis"}</span>
                </div>

                {discount > 0 && (
                    <div className="calc-row discount">
                        <span>Desconto:</span>
                        <span className="discount-value">- R$ {parseFloat(discount).toFixed(2)}</span>
                    </div>
                )}

                <div className="calc-row total">
                    <strong>Total:</strong>
                    <strong>R$ {parseFloat(total).toFixed(2)}</strong>
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
                onClick={onProceed}
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
    );
};

export default OrderSummary;