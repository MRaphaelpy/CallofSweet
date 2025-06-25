import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from '@mui/material';
import {
  CakeOutlined as CakeIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Send as SendIcon,
  Favorite as HeartIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as CupcakeIcon,
  LocalCafe as CoffeeIcon,
  Spa as SpaIcon,
  Stars as SparkleIcon
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
  };

  const generateRandomSparkles = (count) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          opacity: 0,
          scale: 0,
          x: Math.random() * 60 - 30,
          y: Math.random() * 60 - 30
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, Math.random() * 0.8 + 0.3, 0],
          rotate: [0, Math.random() * 360]
        }}
        transition={{
          duration: Math.random() * 1.5 + 1,
          repeat: Infinity,
          repeatDelay: Math.random() * 3,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: Math.random() * 10 + 5,
          height: Math.random() * 10 + 5,
          background: i % 2 === 0 ? '#a239ca' : '#4717f6',
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: '0 0 8px 2px rgba(162, 57, 202, 0.6)'
        }}
      />
    ));
  };

  const socialHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.3,
      rotate: [0, -15, 15, -5, 0],
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  const floatingIconVariants = {
    animate: (i) => ({
      y: ["0%", `${(i % 2 === 0) ? -15 : -20}%`, "0%"],
      rotate: [(i % 2 === 0) ? 0 : 10, (i % 2 === 0) ? 10 : -5, (i % 2 === 0) ? 0 : 10],
      transition: {
        duration: 3 + i * 0.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    })
  };

  return (
    <Box
      className="footer"
      sx={{
        background: 'linear-gradient(135deg, #2b0036 0%, #4717f6 100%)',
        color: 'white',
        pt: 10,
        pb: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(90deg, #4717f6 0%, #a239ca 50%, #4717f6 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientFlow 3s linear infinite',
        }
      }}
    >
      <style jsx="true">{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
      `}</style>
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              scale: Math.random() * 0.8 + 0.6
            }}
            animate={{
              y: [`${Math.random() * 20}%`, `${Math.random() * 80 + 20}%`],
              x: [`${Math.random() * 20}%`, `${Math.random() * 80 + 20}%`],
              rotate: [0, 360],
              scale: [Math.random() * 0.8 + 0.6, Math.random() * 1.2 + 0.8, Math.random() * 0.8 + 0.6],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: i % 3 === 0 ? 'rgba(162, 57, 202, 0.15)' :
                i % 3 === 1 ? 'rgba(71, 23, 246, 0.15)' : 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(8px)',
            }}
          />
        ))}

        {[CakeIcon, CupcakeIcon, CoffeeIcon, SpaIcon].map((Icon, i) => (
          <motion.div
            key={`icon-${i}`}
            custom={i}
            variants={floatingIconVariants}
            animate="animate"
            style={{
              position: 'absolute',
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: 0.15,
              color: i % 2 === 0 ? '#a239ca' : '#ffffff'
            }}
          >
            <Icon style={{ fontSize: 40 + i * 5 }} />
          </motion.div>
        ))}
      </Box>

      <Container maxWidth="lg">

        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>

            <Box
              className="footer-logo"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                position: 'relative',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  animate={{
                    rotate: [0, -10, 5, -5, 0],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CakeIcon
                    fontSize="large"
                    sx={{
                      mr: 1,
                      fontSize: 50,
                      color: '#a239ca',
                      filter: 'drop-shadow(0 0 8px rgba(162, 57, 202, 0.8))'
                    }}
                  />
                </motion.div>

                {generateRandomSparkles(8)}
              </Box>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 15px rgba(162, 57, 202, 0.8)"
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(to right, #4717f6, #a239ca, #FF00FF)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(162, 57, 202, 0.3)',
                    animation: 'gradientFlow 5s linear infinite'
                  }}
                >
                  Call of Sweet
                </Typography>
              </motion.div>
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontStyle: 'italic',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                position: 'relative'
              }}
            >
              <span style={{
                fontWeight: 'bold',
                color: '#a239ca',
                position: 'relative',
                display: 'inline-block'
              }}>
                ✨ Especialistas em doces artesanais
                <motion.div
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    background: '#a239ca',
                  }}
                />
              </span> que encantam paladares com sabores mágicos.
              Cada doce é uma experiência única, criada com qualidade excepcional, sabor inesquecível e muito amor.
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 3,
              position: 'relative',
              background: 'rgba(71, 23, 246, 0.1)',
              borderRadius: '15px',
              padding: 3,
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(162, 57, 202, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div animate={controls}>
                    <LocationIcon sx={{ color: '#a239ca' }} />
                  </motion.div>
                  <Typography variant="body2">Rua dos Doces, 123 - Centro</Typography>
                </Box>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div animate={controls}>
                    <PhoneIcon sx={{ color: '#a239ca' }} />
                  </motion.div>
                  <Typography variant="body2">(11) 9876-5432</Typography>
                </Box>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div animate={controls}>
                    <EmailIcon sx={{ color: '#a239ca' }} />
                  </motion.div>
                  <Typography variant="body2">contato@callofsweet.com</Typography>
                </Box>
              </motion.div>
            </Box>

          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <motion.div variants={itemVariants}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="footer-heading"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: '1.3rem',
                  }}
                >
                  Produtos
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      height: 2,
                      background: '#a239ca'
                    }}
                  />
                </Typography>

                {['Bolos', 'Docinhos', 'Cupcakes', 'Novidades', 'Mais Vendidos'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ x: 0 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1.8,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative',
                        '&:hover': { color: '#a239ca' }
                      }}
                    >
                      <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.5 }}
                        style={{ marginRight: 10, color: '#a239ca' }}
                      >
                        •
                      </motion.span>
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <motion.div variants={itemVariants}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="footer-heading"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: '1.3rem',
                  }}
                >
                  Suporte
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      height: 2,
                      background: '#a239ca'
                    }}
                  />
                </Typography>

                {['Contato', 'Perguntas Frequentes', 'Entregas', 'Devoluções', 'Política de Privacidade'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ x: 0 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1.8,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative',
                        '&:hover': { color: '#a239ca' }
                      }}
                    >
                      <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.5 }}
                        style={{ marginRight: 10, color: '#a239ca' }}
                      >
                        •
                      </motion.span>
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <motion.div variants={itemVariants}>

              <Box sx={{ position: 'relative' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Siga nossa magia nas redes:
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    filter: 'blur(40px)',
                    background: 'radial-gradient(circle, rgba(162,57,202,0.2) 0%, rgba(162,57,202,0) 70%)',
                    zIndex: 0
                  }}
                />

                <Box
                  className="social-icons"
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {[
                    { icon: <InstagramIcon />, color: '#E1306C', label: 'Instagram' },
                    { icon: <FacebookIcon />, color: '#3b5998', label: 'Facebook' },
                    { icon: <TwitterIcon />, color: '#1DA1F2', label: 'Twitter' },
                    { icon: <YouTubeIcon />, color: '#FF0000', label: 'YouTube' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={socialHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(5px)',
                          color: item.color,
                          position: 'relative',
                          overflow: 'hidden',
                          p: 1.5,
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `${item.color}30`,
                            transform: 'scale(0)',
                            borderRadius: '50%',
                            transition: 'transform 0.3s',
                            zIndex: -1,
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            transform: 'translateY(-5px)',
                            boxShadow: `0 5px 15px ${item.color}50`,
                            '&::before': {
                              transform: 'scale(1.5)',
                            }
                          },
                          transition: 'all 0.3s'
                        }}
                        aria-label={item.label}
                      >
                        {item.icon}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: `2px solid ${item.color}40`,
                            animation: 'pulse 1.5s infinite',
                            animationDelay: `${index * 0.3}s`,
                            zIndex: -1
                          }}
                        />
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider
          sx={{
            mt: 6,
            mb: 4,
            backgroundColor: 'rgba(162, 57, 202, 0.3)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #a239ca, transparent)'
            }
          }}
        />

        <Box
          className="copyright"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            position: 'relative'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            © 2023 Call of Sweet. Todos os direitos reservados.
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(71, 23, 246, 0.1)',
            borderRadius: '50px',
            padding: '5px 15px',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="body2" sx={{ mr: 1, color: 'rgba(255,255,255,0.8)' }}>
              Feito com
            </Typography>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <HeartIcon sx={{
                color: '#a239ca',
                fontSize: '1.1rem',
                filter: 'drop-shadow(0 0 5px rgba(162, 57, 202, 0.8))'
              }} />
            </motion.div>
            <Typography variant="body2" sx={{ ml: 1, color: 'rgba(255,255,255,0.8)' }}>
              para nossos queridos clientes
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;