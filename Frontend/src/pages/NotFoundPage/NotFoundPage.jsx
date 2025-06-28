import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button, useTheme, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [countdown, setCountdown] = React.useState(15);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Box className="error-container">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="error-number"
          >
            4
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, -10, 10, -10, 0]
            }}
            transition={{ 
              duration: 1.5,
              delay: 0.4
            }}
            className="error-number"
          >
            0
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.6
            }}
            className="error-number"
          >
            4
          </motion.div>
        </Box>

        <Box className="floating-icons-container">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="floating-icon"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            >
              <span className="icon-shape"></span>
            </div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Oops! Página não encontrada
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              maxWidth: '600px',
              mx: 'auto',
              color: theme.palette.text.secondary
            }}
          >
            Parece que você se perdeu no ciberespaço. A página que você está procurando pode ter sido removida, 
            renomeada ou talvez nunca tenha existido.
          </Typography>
          
          <Box className="glitch-container">
            <div className="glitch" data-text="404">404</div>
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              mb: 4,
              fontStyle: 'italic',
              color: theme.palette.text.secondary
            }}
          >
            Redirecionando para a página inicial em {countdown} segundos...
          </Typography>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{ 
              borderRadius: '50px', 
              px: 3,
              boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 20px rgba(99, 102, 241, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Voltar para o Início
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ 
              borderRadius: '50px', 
              px: 3,
              '&:hover': {
                transform: 'translateY(-3px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Página Anterior
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="lost-astronaut"
        >
          <div className="astronaut">
            <div className="astronaut-body"></div>
            <div className="astronaut-head">
              <div className="astronaut-visor"></div>
            </div>
            <div className="astronaut-backpack"></div>
            <div className="astronaut-arm left"></div>
            <div className="astronaut-arm right"></div>
            <div className="astronaut-leg left"></div>
            <div className="astronaut-leg right"></div>
          </div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFoundPage;