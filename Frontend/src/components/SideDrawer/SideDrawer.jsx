import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import {
  CakeOutlined as CakeIcon,
  HomeOutlined as HomeIcon,
  CategoryOutlined as CategoryIcon,
  LocalOfferOutlined as OffersIcon,
  ShoppingBasketOutlined as OrdersIcon,
  FavoriteBorderOutlined as WishlistIcon,
  PersonOutlined as AccountIcon,
  InfoOutlined as InfoIcon,
  ContactSupportOutlined as ContactIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './SideDrawer.css';
import AddIcon from '@mui/icons-material/Add';
const SideDrawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleNavigation = (path) => {
    navigate(path);
    toggleDrawer(false)();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      className="side-drawer"
    >
      <Box
        className="drawer-container"
        role="presentation"
      >
        <Box className="drawer-header">
          <Box className="drawer-logo" onClick={() => handleNavigation('/')}>
            <CakeIcon fontSize="large" />
            <Typography variant="h5">Doce Sabor</Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <List>
            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/')}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/categories')}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="Categorias" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/offers')}>
                <ListItemIcon><OffersIcon /></ListItemIcon>
                <ListItemText primary="Ofertas" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/about')}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="Sobre Nós" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/CadastroProduto')}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Cadastrar Produto" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/contact')}>
                <ListItemIcon><ContactIcon /></ListItemIcon>
                <ListItemText primary="Contato" />
              </ListItem>
            </motion.div>
          </List>

          <Divider />

          <List>
            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/profile')}>
                <ListItemIcon><AccountIcon /></ListItemIcon>
                <ListItemText primary="Minha Conta" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/cart')}>
                <ListItemIcon><OrdersIcon /></ListItemIcon>
                <ListItemText primary="Pedidos" />
              </ListItem>
            </motion.div>

            <motion.div variants={item}>
              <ListItem button className="drawer-item" onClick={() => handleNavigation('/favorites')}>
                <ListItemIcon><WishlistIcon /></ListItemIcon>
                <ListItemText primary="Favoritos" />
              </ListItem>
            </motion.div>
          </List>
        </motion.div>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;