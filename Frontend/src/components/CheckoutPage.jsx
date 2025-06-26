import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import CheckoutProgress from '../components/CheckoutProgress';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFormComplete, setIsFormComplete] = useState(false);

    const getCheckoutData = () => {
        const storedData = sessionStorage.getItem('checkoutData');
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (error) {
                console.error('Error parsing checkoutData:', error);
            }
        }
        return {};
    };

    const checkoutData = location.state || getCheckoutData();
    const cartItems = checkoutData?.cartItems || [];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    const subtotal = checkoutData?.subtotal !== undefined ?
        checkoutData.subtotal : calculateTotal();
    const shipping = checkoutData?.shipping || 0;
    const discount = checkoutData?.discount || 0;
    const total = checkoutData?.total !== undefined ?
        checkoutData.total : (subtotal + shipping - discount);

    const [customerInfo, setCustomerInfo] = useState(() => {
        const savedInfo = localStorage.getItem('customerInfo');
        return savedInfo ? JSON.parse(savedInfo) : {
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
        };
    });

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    useEffect(() => {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));

        const { name, email, address, city, zipCode, phone, cpf } = customerInfo;
        setIsFormComplete(name && email && address && city && zipCode && phone && cpf);
    }, [customerInfo]);

    const handleCustomerInfoChange = (updatedInfo) => {
        setCustomerInfo(updatedInfo);
    };

    const handleSubmit = () => {
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
            transition: { staggerChildren: 0.1 }
        }
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
                <CheckoutProgress />
            </div>

            <div className="checkout-content">
                <OrderSummary
                    cartItems={cartItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    discount={discount}
                    total={total}
                    isFormComplete={isFormComplete}
                    onProceed={handleSubmit}
                    variants={containerVariants}
                />

                <CheckoutForm
                    customerInfo={customerInfo}
                    onInfoChange={handleCustomerInfoChange}
                    onSubmit={handleSubmit}
                    isFormComplete={isFormComplete}
                    variants={containerVariants}
                />
            </div>
        </motion.div>
    );
};

export default CheckoutPage;