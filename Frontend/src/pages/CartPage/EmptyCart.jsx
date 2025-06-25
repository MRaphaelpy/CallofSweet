import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const EmptyCart = ({ onContinueShopping }) => {
    return (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>Seu carrinho está vazio</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Parece que você ainda não adicionou nenhum item ao seu carrinho.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={onContinueShopping}
            >
                Continuar Comprando
            </Button>
        </Paper>
    );
};

export default EmptyCart;