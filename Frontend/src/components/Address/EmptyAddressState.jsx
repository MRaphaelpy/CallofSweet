
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LocationOn as LocationIcon, Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const EmptyAddressState = ({ onAddAddress }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
    >
        <Box
            sx={{
                textAlign: 'center',
                py: 6,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px dashed #ccc'
            }}
        >
            <LocationIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
                Você não possui nenhum endereço cadastrado
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => onAddAddress()}
                sx={{ mt: 2 }}
            >
                Adicionar Endereço
            </Button>
        </Box>
    </motion.div>
);

export default EmptyAddressState;