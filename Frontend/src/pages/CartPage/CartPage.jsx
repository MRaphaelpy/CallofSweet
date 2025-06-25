import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CartItemsList from './CartItemsList';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Torta de Chocolate',
      price: 29.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    },
    {
      id: 2,
      name: 'Cupcake de Morango',
      price: 8.50,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      id: 3,
      name: 'Milkshake de Baunilha',
      price: 12.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  ]);

  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (code) => {
    
    console.log("Applying coupon:", code);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        cartItems: cartItems,
        subtotal: subtotal,
        shipping: shipping,
        discount: discount,
        total: total
      } 
    });
  };

  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const discount = 0; 
  const total = subtotal + shipping - discount;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ mr: 2 }}
            className="back-button"
          >
            Voltar para loja
          </Button>
          <Typography variant="h4" component="h1" className="cart-title">
            Carrinho de Compras
          </Typography>
        </Box>

        {cartItems.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <CartItemsList 
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                couponCode={couponCode}
                onCouponChange={setCouponCode}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
              />
            </Grid>
          </Grid>
        ) : (
          <EmptyCart onContinueShopping={handleGoBack} />
        )}
      </motion.div>
    </Container>
  );
};

export default CartPage;