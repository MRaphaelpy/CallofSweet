import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const CreditCardDisplay = styled(motion.div)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    borderRadius: 16,
    padding: theme.spacing(3),
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    height: 200,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    }
}));

export default CreditCardDisplay;