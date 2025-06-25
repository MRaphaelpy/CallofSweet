import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const CheckoutProgress = styled(motion.div)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0),
}));

export default CheckoutProgress;