import React from 'react';
import {
    Paper,
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
import { motion, AnimatePresence } from 'framer-motion';

const CartItemsList = ({ items, onUpdateQuantity, onRemoveItem }) => {
    return (
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
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
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="quantity-button"
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                                        {item.quantity}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="quantity-button"
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
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
                    </motion.div>
                ))}
            </AnimatePresence>
        </Paper>
    );
};

export default CartItemsList;