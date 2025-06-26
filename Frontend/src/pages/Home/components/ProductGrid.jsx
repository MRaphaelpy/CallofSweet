import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  CircularProgress
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingBasket as CartIcon,
  LocalCafe as CoffeeIcon,
  AddShoppingCart as AddCartIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../../../contexts/CartContext';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  const { addToCart, loading: cartLoading } = useCart();
  const [addedItemId, setAddedItemId] = useState(null);

  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography>Produto não encontrado</Typography>
      </Box>
    );
  }

  const handleAddToCart = (product) => {
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl ||
        `https://picsum.photos/seed/${product.id || product.name?.replace(/\s+/g, '')}/500/500`
    };

    
    addToCart(cartItem);

    
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 2000);
  };

  return (
    <Grid container spacing={4}>
      {products.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <Card className="product-card">
              <Box position="relative">
                <Box className="top-icons">
                  <div></div>
                  <IconButton className="favorite-button" aria-label="add to favorites">
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                </Box>

                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <CardMedia
                    component="img"
                    image={
                      product.imageUrl ||
                      `https://picsum.photos/seed/${product.id || product.name?.replace(/\s+/g, '')}/500/500`
                    }
                    alt={product.name}
                    className="product-image"
                  />
                </motion.div>
              </Box>

              <CardContent className="product-content">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="product-name"
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="product-description"
                >
                  {product.description}
                </Typography>

                <Box className="rating-container">
                  <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.rating || 0})
                  </Typography>
                </Box>

                {product.brand && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="brand-text"
                  >
                    Marca: {product.brand}
                  </Typography>
                )}

                <Box className="price-category-container">
                  <Typography variant="h6" className="product-price">
                    R$ {product.price.toFixed(2)}
                  </Typography>
                  {product.category && (
                    <Chip
                      label={product.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>

              <CardActions className="card-actions">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%' }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    color={addedItemId === product.id ? "success" : "primary"}
                    disabled={!product.active || (cartLoading && addedItemId === product.id)}
                    startIcon={
                      cartLoading && addedItemId === product.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : addedItemId === product.id ? (
                        <CheckIcon />
                      ) : product.active ? (
                        <AddCartIcon />
                      ) : (
                        <CoffeeIcon />
                      )
                    }
                    className="add-button"
                    onClick={() => product.active && handleAddToCart(product)}
                  >
                    {addedItemId === product.id
                      ? 'Adicionado!'
                      : product.active
                        ? 'Adicionar'
                        : 'Esgotado'
                    }
                  </Button>
                </motion.div>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;