import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    return (
        <>
            <Card className="cart-item" sx={{ mb: 0.5, display: 'flex', borderRadius: 0, boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, objectFit: 'cover' }}
                    image={item.image}
                    alt={item.name}
                    className="cart-item-image"
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom className="cart-item-name">
                            {item.name}
                        </Typography>
                        <Typography variant="h6" color="primary" className="cart-item-price">
                            R$ {item.price.toFixed(2)}
                        </Typography>
                    </Box>
                    <QuantityControl
                        quantity={item.quantity}
                        onDecrease={() => onUpdateQuantity(item.id, -1)}
                        onIncrease={() => onUpdateQuantity(item.id, 1)}
                    />
                    <IconButton
                        aria-label="delete"
                        onClick={() => onRemoveItem(item.id)}
                        className="delete-button"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>
            <Divider />
        </>
    );
};


const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <IconButton
            size="small"
            onClick={onDecrease}
            className="quantity-button"
        >
            <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
            {quantity}
        </Typography>
        <IconButton
            size="small"
            onClick={onIncrease}
            className="quantity-button"
        >
            <AddIcon fontSize="small" />
        </IconButton>
    </Box>
);

export default CartItem;