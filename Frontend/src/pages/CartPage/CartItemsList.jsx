import React from 'react';
import {
    Paper,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Divider,
    CircularProgress,
    Badge
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const CartItemsList = ({ items, onUpdateQuantity, onRemoveItem, loading }) => {
    const [loadingItem, setLoadingItem] = React.useState(null);

    const handleUpdateQuantity = (id, change) => {
        setLoadingItem(id);
        onUpdateQuantity(id, change).finally(() => {
            setTimeout(() => setLoadingItem(null), 300);
        });
    };

    const handleRemoveItem = (id) => {
        setLoadingItem(id);
        onRemoveItem(id);
    };

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
                        <Card className="cart-item" sx={{ mb: 0.5, display: 'flex', borderRadius: 0, boxShadow: 'none', position: 'relative' }}>
                            {(loading || loadingItem === item.id) && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        zIndex: 1
                                    }}
                                >
                                    <CircularProgress size={24} />
                                </Box>
                            )}

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
                                        onClick={() => handleUpdateQuantity(item.id, -1)}
                                        className="quantity-button"
                                        disabled={loading || loadingItem === item.id || item.quantity <= 1}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Badge
                                        badgeContent={item.quantity}
                                        color="primary"
                                        sx={{ '& .MuiBadge-badge': { position: 'static', transform: 'none' } }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleUpdateQuantity(item.id, 1)}
                                        className="quantity-button"
                                        disabled={loading || loadingItem === item.id}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="delete-button"
                                    disabled={loading || loadingItem === item.id}
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