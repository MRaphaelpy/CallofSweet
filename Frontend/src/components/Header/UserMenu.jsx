import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function UserMenu() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    setConfirmLogout(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setConfirmLogout(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setConfirmLogout(false);
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleOrdersClick = () => {
    handleClose();
    navigate('/orders');
  };


  if (!currentUser) {
    return (
      <Button 
        color="inherit" 
        onClick={() => navigate('/login')}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        Login
      </Button>
    );
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Opções da conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.10))',
            mt: 1.5,
            borderRadius: 2,
            width: 220,
            '& .MuiMenu-list': {
              py: 1
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
        <MenuItem sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1 }}>
            <Box sx={{ fontWeight: 500 }}>{currentUser.name || 'Usuário'}</Box>
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{currentUser.email}</Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Meu Perfil
        </MenuItem>
        <MenuItem onClick={handleOrdersClick} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <ShoppingBagIcon fontSize="small" />
          </ListItemIcon>
          Meus Pedidos
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/settings'); }} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick} sx={{ py: 1.5, color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Sair da conta
        </MenuItem>
      </Menu>

      <Dialog
        open={confirmLogout}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 }
        }}
      >
        <DialogTitle id="logout-dialog-title" sx={{ fontWeight: 600 }}>
          Sair da conta?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Tem certeza que deseja sair? Seus dados de navegação e carrinho serão removidos deste dispositivo.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={handleLogoutCancel}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleLogoutConfirm}
            variant="contained" 
            color="error"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 500,
              px: 3,
              borderRadius: 2
            }}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}