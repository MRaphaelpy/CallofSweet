import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <Box className="hero-banner">
      <Container maxWidth="md" className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography variant="h3" component="h1" className="hero-title">
            Delícias Artesanais
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Typography variant="h5" component="h2" className="hero-subtitle">
            Doces feitos com amor e ingredientes selecionados
          </Typography>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="hero-button"
          >
            Experimentar Agora
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroBanner;
