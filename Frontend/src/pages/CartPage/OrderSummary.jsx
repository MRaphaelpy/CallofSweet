
import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Stack,
    Divider,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';

const OrderSummary = ({
    subtotal,
    shipping,
    discount,
    total,
    couponCode,
    onCouponChange,
    onApplyCoupon,
    onCheckout,
    loading = false
}) => {
    return (
        <Paper elevation={3} className="order-summary" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Resumo do Pedido
            </Typography>

            <Box sx={{ mb: 2 }}>
                <SummaryRow label="Subtotal" value={subtotal} />
                <SummaryRow label="Entrega" value={shipping} />

                {discount > 0 && (
                    <SummaryRow
                        label="Desconto"
                        value={-discount}
                        isDiscount={true}
                    />
                )}

                <Divider sx={{ my: 2 }} />

                <SummaryRow
                    label="Total"
                    value={total}
                    variant="h6"
                    color="primary"
                />
            </Box>

            <CouponSection
                couponCode={couponCode}
                onCouponChange={onCouponChange}
                onApplyCoupon={onApplyCoupon}
                loading={loading}
            />

            <motion.div whileHover={{ scale: loading ? 1.0 : 1.02 }} whileTap={{ scale: loading ? 1.0 : 0.98 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={onCheckout}
                    className="checkout-button"
                    disabled={loading || subtotal <= 0}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? "Processando..." : "Finalizar Compra"}
                </Button>
            </motion.div>
        </Paper>
    );
};


const SummaryRow = ({ label, value, variant = "body1", color = "textPrimary", isDiscount = false }) => (
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant={variant}>{label}</Typography>
        <Typography variant={variant} color={isDiscount ? "secondary" : color}>
            {isDiscount ? '- ' : ''}R$ {Math.abs(value).toFixed(2)}
        </Typography>
    </Stack>
);

const CouponSection = ({ 
  couponCode, 
  onCouponChange, 
  onApplyCoupon, 
  loading,
  appliedCoupon 
}) => (
  <Box sx={{ mb: 3 }}>
    {appliedCoupon ? (
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 2,
          bgcolor: 'success.light',
          color: 'success.contrastText',
          mb: 2
        }}
      >
        <Typography variant="body2" fontWeight="500">
          Cupom {appliedCoupon} aplicado!
        </Typography>
        <Button
          size="small"
          onClick={() => {
            onCouponChange('');
            onApplyCoupon(''); 
          }}
          sx={{
            color: 'inherit',
            textTransform: 'none',
            fontSize: '0.75rem'
          }}
        >
          Remover
        </Button>
      </Paper>
    ) : (
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          size="small"
          label="Cupom de desconto"
          variant="outlined"
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value)}
          sx={{ flexGrow: 1, mr: 1 }}
          disabled={loading}
          placeholder="Ex: MARCINHO"
        />
        <Button
          variant="outlined"
          onClick={() => onApplyCoupon(couponCode)}
          disabled={loading || !couponCode.trim()}
        >
          Aplicar
        </Button>
      </Box>
    )}
  </Box>
);

export default OrderSummary;