import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = ({ message = "Carregando..." }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                width: '100%',
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{
                        color: theme.palette.primary.main,
                        marginBottom: 3
                    }}
                />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500
                    }}
                >
                    {message}
                </Typography>
            </motion.div>
        </Box>
    );
};

export default LoadingScreen;