// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Badge,
  Avatar,
  useScrollTrigger,
  Slide,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingBasket as CartIcon,
  Favorite as FavoriteIcon,
  PersonOutline as UserIcon,
  Menu as MenuIcon,
  Cake as CakeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = ({ toggleDrawer, cartItems = 3 }) => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

  useEffect(() => {
    setShowGreeting(true);
    const timer = setTimeout(() => setShowGreeting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky" elevation={4} className="header">
        <Toolbar className="header-toolbar">
          {/* Menu + Logo */}
          <Box className="logo-container">
            <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={toggleDrawer(true)} className="menu-button">
                <MenuIcon />
              </IconButton>
            </motion.div>

            <motion.div
              className="header-logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              <Avatar className="header-avatar">
                <CakeIcon fontSize="medium" />
              </Avatar>
              <Box>
                <Typography variant="h5">Call of Sweet</Typography>
                <AnimatePresence>
                  {showGreeting && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Typography variant="caption" className="header-greeting">
                        Doces delícias esperam por você!
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          </Box>

          {/* Search */}
          <motion.div
            className={`search-field ${isSearchFocused ? 'focused' : ''}`}
            initial={{ width: 280 }}
            animate={{ width: isSearchFocused ? 340 : 280 }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar doces, bolos, cookies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchValue('')}>
                      <Typography variant="caption">limpar</Typography>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </motion.div>

          {/* Ações */}
          <Box className="header-actions">
            <Tooltip title="Meu Perfil">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <IconButton onClick={() => navigate('/profile')}>
                  <UserIcon />
                </IconButton>
              </motion.div>
            </Tooltip>

            <Tooltip title="Favoritos">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <IconButton onClick={() => navigate('/favorites')}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </motion.div>
            </Tooltip>

            <Tooltip title="Carrinho">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <IconButton onClick={() => navigate('/cart')}>
                  <Badge badgeContent={cartItems} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </motion.div>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
