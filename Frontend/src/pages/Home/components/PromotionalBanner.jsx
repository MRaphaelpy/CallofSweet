import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import './PromotionalBanner.css';

const PromotionalBanner = () => {
  return (
    <Box className="promotional-banner">
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h4" component="h2" gutterBottom className="promo-title">
                Novidades Doces
              </Typography>
              <Typography variant="body1" paragraph className="promo-text">
                Experimente nossas novas criações com ingredientes especiais e sabores surpreendentes que irão adoçar o seu dia!
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="contained" color="primary" size="large" className="promo-button">
                  Descobrir Agora
                </Button>
              </motion.div>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                rotate: 2,
                scale: 1.03,
                boxShadow: '0 15px 30px rgba(156, 39, 176, 0.2)'
              }}
            >
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop"
                alt="Novos doces"
                className="promo-image"
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PromotionalBanner;