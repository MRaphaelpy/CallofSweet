import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const CustomModal = ({ open, handleClose, title, children }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 600,
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
                <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Fechar
                </Button>
            </Box>
        </Modal>
    );
};

export default CustomModal;