import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Paper,
  Divider,
  Badge,
  useTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingBag as ShoppingBagIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CartItemsList from './CartItemsList';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';
import Confetti from 'react-confetti';
import useWindowSize from '../../hooks/useWindowSize';
import './CartPage.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const {
    cartItems,
    updateQuantity,
    removeItem,
    getSubtotal,
    loading,
    error: cartError,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [runConfetti, setRunConfetti] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [error, setError] = React.useState(null);

  const subtotal = getSubtotal();
  const shipping = cartItems.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = (code) => {
    console.log("Cupom aplicado:", code);

    if (code.toLowerCase() === 'marcinho') {
      setDiscount(subtotal * 0.9);
      setSuccessMessage("Cupom MARCINHO aplicado! Você ganhou 90% de desconto! 🎉");
      setAppliedCoupon('MARCINHO');
    } else if (code) {
      setError("Cupom inválido ou expirado");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };


  const handleCheckout = () => {

    navigate('/checkout', {
      state: {
        cartItems,
        subtotal,
        shipping,
        discount,
        total
      }
    });

    sessionStorage.setItem('checkoutData', JSON.stringify({
      cartItems,
      subtotal,
      shipping,
      discount,
      total
    }));
  };



  const handleClearCartConfirm = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClearCartConfirmed = () => {
    clearCart();
    setOpenDialog(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderCartContent = () => {
    if (loading && cartItems.length === 0) {
      return (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          py: 12
        }}>
          <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 500, color: theme.palette.text.secondary }}>
            Carregando seu carrinho...
          </Typography>
        </Box>
      );
    }

    if (cartItems.length === 0) {
      return <EmptyCart onContinueShopping={handleGoBack} />;
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              background: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{
              fontWeight: 600,
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <ShoppingBagIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              Seus Produtos
              
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <CartItemsList
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              loading={loading}
            />

            {cartItems.length > 0 && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearCartConfirm}
                  disabled={loading}
                  startIcon={<DeleteIcon />}
                  sx={{
                    marginRight:2,
                    borderRadius: 0.5,
                    textTransform: 'none',
                    py: 1,
                    px: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  Esvaziar Carrinho
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleGoBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderRadius: 0.5,
                    textTransform: 'none',
                    py: 1,
                    px: 3,
                    borderWidth: 2,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  Continuar Comprando
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onCheckout={handleCheckout}
              loading={loading}
              appliedCoupon={appliedCoupon}
            />
          </motion.div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {runConfetti && <Confetti width={width} height={height} recycle={false} />}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              width: "auto",
              maxWidth: "90%"
            }}
          >
            <Paper
              elevation={6}
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                backgroundColor: "#4caf50",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6">
                ✓ Carrinho esvaziado com sucesso!
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderRadius: 4,
            background: 'linear-gradient(145deg, #f9f1fe, #ffffff)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            background: 'url(https://www.transparenttextures.com/patterns/cubes.png)'
          }} />

          <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                mr: 3,
                mb: { xs: 2, sm: 0 },
                color: theme.palette.primary.dark,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: 'rgba(74, 21, 75, 0.05)'
                }
              }}
              className="back-button"
            >
              Voltar para loja
            </Button>

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                className="cart-title"
                sx={{
                  background: 'linear-gradient(45deg, #4a154b, #9c27b0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700
                }}
              >
                Seu Carrinho de Compras
              </Typography>
              {cartItems.length > 0 && (
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
                  Você tem {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {cartItems.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'itens'} no seu carrinho
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '24px' }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffebee",
                border: '1px solid #ef5350'
              }}
            >
              <Typography color="error" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>⚠️</Box>
                {error}
              </Typography>
            </Paper>
          </motion.div>
        )}

        {renderCartContent()}
      </motion.div>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 1
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: theme.palette.error.main }}>
          {"Esvaziar o carrinho?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Você tem certeza que deseja remover todos os itens do seu carrinho? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 3
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleClearCartConfirmed}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              borderRadius: 2
            }}
          >
            Sim, esvaziar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


export default CartPage;