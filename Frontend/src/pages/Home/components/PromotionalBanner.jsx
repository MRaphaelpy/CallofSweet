import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './PromotionalBanner.css';

const PromotionalBanner = ({ promotionTitle = "Novidades Doces", 
                            promotionText = "Experimente nossas novas criações com ingredientes especiais e sabores surpreendentes que irão adoçar o seu dia!", 
                            buttonText = "Descobrir Agora", 
                            imageSrc = "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop", 
                            imageAlt = "Novos doces",
                            discount = "20% OFF"
                          }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    if (hasBeenVisible) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newSeconds = prev.seconds - 1;
          if (newSeconds < 0) {
            const newMinutes = prev.minutes - 1;
            if (newMinutes < 0) {
              const newHours = prev.hours - 1;
              if (newHours < 0) {
                clearInterval(timer);
                return { hours: 0, minutes: 0, seconds: 0 };
              }
              return { hours: newHours, minutes: 59, seconds: 59 };
            }
            return { ...prev, minutes: newMinutes, seconds: 59 };
          }
          return { ...prev, seconds: newSeconds };
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [hasBeenVisible]);

  const handleViewportEnter = () => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 12,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    });
    if (!hasBeenVisible) {
      setHasBeenVisible(true);
    }
  };

  const parentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      rotate: isHovered ? 2 : 0,
      boxShadow: '0 20px 40px rgba(156, 39, 176, 0.25)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    },
    initial: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 10px 25px rgba(156, 39, 176, 0.15)'
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(156, 39, 176, 0.3)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    },
    initial: {
      scale: 1
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <Box className="promotional-banner">
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={parentVariants}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={handleViewportEnter}
        >
          <Grid container spacing={4} alignItems="center" justifyContent="space-between" className="promo-content-wrapper">
            <Box className="discount-badge">
              <LocalOfferIcon className="discount-icon" />
              <span>{discount}</span>
            </Box>
            

            <Grid item xs={12} md={6}>
              <motion.div variants={childVariants} className="promo-content">
                <Typography variant="overline" className="promo-overline">
                  Oferta Especial
                </Typography>
                
                <motion.div variants={childVariants}>
                  <Typography variant="h3" component="h2" className="promo-title">
                    {promotionTitle}
                  </Typography>
                </motion.div>
                
                <motion.div variants={childVariants}>
                  <Typography variant="body1" paragraph className="promo-text">
                    {promotionText}
                  </Typography>
                </motion.div>
                
                <motion.div variants={childVariants} className="promo-highlights">
                  {['Produtos Artesanais', 'Ingredientes Premium', 'Sabores Exclusivos'].map((item, index) => (
                    <div key={index} className="promo-highlight-item">
                      <div className="check-icon">✓</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={childVariants} className="countdown-container">
                  <Typography variant="body2" className="countdown-label">
                    Oferta termina em:
                  </Typography>
                  <div className="countdown">
                    <div className="countdown-item">
                      <div className="countdown-value">{formatTime(timeRemaining.hours)}</div>
                      <div className="countdown-label">horas</div>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-item">
                      <div className="countdown-value">{formatTime(timeRemaining.minutes)}</div>
                      <div className="countdown-label">min</div>
                    </div>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-item">
                      <div className="countdown-value">{formatTime(timeRemaining.seconds)}</div>
                      <div className="countdown-label">seg</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={childVariants}
                  className="button-container"
                >
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="medium" 
                      className="promo-button"
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      {buttonText}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                variants={childVariants}
                className="image-container"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={isHovered ? "hover" : "initial"}
              >
                <div className="circle-decoration"></div>
                <div className="dots-decoration"></div>
                <motion.img
                  variants={imageVariants}
                  src={imageSrc}
                  alt={imageAlt}
                  className="promo-image"
                  loading="lazy"
                />
                <div className="star-decoration star-1"></div>
                <div className="star-decoration star-2"></div>
                <div className="star-decoration star-3"></div>
              </motion.div>
            </Grid>
            
            <div className="pattern pattern-1"></div>
            <div className="pattern pattern-2"></div>
            <div className="pattern pattern-3"></div>
          </Grid>
        </motion.div>
        
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
      </Container>
    </Box>
  );
};

export default PromotionalBanner;