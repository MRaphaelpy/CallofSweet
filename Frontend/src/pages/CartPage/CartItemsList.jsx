import React, { useState } from 'react';
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
  const [loadingItem, setLoadingItem] = useState(null);

  const handleUpdateQuantity = (id, change) => {
    setLoadingItem(id);
    Promise.resolve(onUpdateQuantity(id, change)).finally(() => {
      setTimeout(() => setLoadingItem(null), 300);
    });
  };

  const handleRemoveItem = (id) => {
    setLoadingItem(id);
    Promise.resolve(onRemoveItem(id)).finally(() => {
      setTimeout(() => setLoadingItem(null), 300);
    });
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
            <Card
              sx={{
                mb: 0.5,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 0,
                boxShadow: 'none',
                position: 'relative'
              }}
            >
              {(loading || loadingItem === item.id) && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
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
                image={item.image}
                alt={item.name}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover'
                }}
              />

              <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R$ {item.price.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    disabled={loading || loadingItem === item.id || item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Badge
                    badgeContent={item.quantity}
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        position: 'static',
                        transform: 'none'
                      }
                    }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    disabled={loading || loadingItem === item.id}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveItem(item.id)}
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
