import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Stack,
    Divider,
    TextField,
    Button
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
    onCheckout
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
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={onCheckout}
                    className="checkout-button"
                >
                    Finalizar Compra
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

const CouponSection = ({ couponCode, onCouponChange, onApplyCoupon }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
                size="small"
                label="Cupom de desconto"
                variant="outlined"
                value={couponCode}
                onChange={(e) => onCouponChange(e.target.value)}
                sx={{ flexGrow: 1, mr: 1 }}
            />
            <Button
                variant="outlined"
                onClick={() => onApplyCoupon(couponCode)}
            >
                Aplicar
            </Button>
        </Box>
    </Box>
);

export default OrderSummary;