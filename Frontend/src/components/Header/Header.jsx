

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
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingBasket as CartIcon,
  Favorite as FavoriteIcon,
  PersonOutline as UserIcon,
  Menu as MenuIcon,
  Cake as CakeIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const Header = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const open = Boolean(anchorEl);

  useEffect(() => {
    setShowGreeting(true);
    const timer = setTimeout(() => setShowGreeting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    handleClose();
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    
    localStorage.removeItem('userData');
    
    localStorage.removeItem('cart');
    
    sessionStorage.clear();
    setLogoutDialogOpen(false);
    window.location.href = '/'; 
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const isUserLoggedIn = () => {
    return localStorage.getItem('userData') !== null;
  };

  const getUserName = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.name || user.email || 'Usuário';
    }
    return '';
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky" elevation={4} className="header">
        <Toolbar className="header-toolbar">
          
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

         
          <Box className="header-actions">
            <Tooltip title={isUserLoggedIn() ? "Meu Perfil" : "Entrar"}>
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <IconButton onClick={handleUserIconClick}>
                  {isUserLoggedIn() ? (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                      {getUserInitial()}
                    </Avatar>
                  ) : (
                    <UserIcon />
                  )}
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
                  <Badge badgeContent={cartCount} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </motion.div>
            </Tooltip>
          </Box>
        </Toolbar>


        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
              mt: 1.5,
              borderRadius: 2,
              minWidth: 200,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {isUserLoggedIn() ? [
            <Box key="user-name" sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {getUserName()}
              </Typography>
            </Box>,
            <Divider key="divider-1" />,
            <MenuItem key="profile" onClick={handleProfileClick}>
              <ListItemIcon>
                <UserIcon fontSize="small" />
              </ListItemIcon>
              Meu Perfil
            </MenuItem>,
            <MenuItem key="orders" onClick={() => { handleClose(); navigate('/orders'); }}>
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              Meus Pedidos
            </MenuItem>,
            <MenuItem key="settings" onClick={() => { handleClose(); navigate('/settings'); }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>,
            <Divider key="divider-2" />,
            <MenuItem key="logout" onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Sair da Conta
            </MenuItem>
          ] : [
            <MenuItem key="login" onClick={() => { handleClose(); navigate('/login'); }}>
              <ListItemIcon>
                <UserIcon fontSize="small" />
              </ListItemIcon>
              Entrar
            </MenuItem>,
            <MenuItem key="register" onClick={() => { handleClose(); navigate('/register'); }}>
              <ListItemIcon>
                <UserIcon fontSize="small" />
              </ListItemIcon>
              Cadastrar
            </MenuItem>
          ]}
        </Menu>

      
        <Dialog
          open={logoutDialogOpen}
          onClose={handleLogoutCancel}
          PaperProps={{
            sx: { borderRadius: 3, p: 1 }
          }}
        >
          <DialogTitle>Sair da conta?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja sair? Seus dados de navegação e do carrinho serão removidos deste dispositivo.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleLogoutCancel} sx={{ textTransform: 'none' }}>
              Cancelar
            </Button>
            <Button
              onClick={handleLogoutConfirm}
              variant="contained"
              color="error"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3
              }}
            >
              Sair
            </Button>
          </DialogActions>
        </Dialog>

      </AppBar>
    </Slide>
  );
};

export default Header;