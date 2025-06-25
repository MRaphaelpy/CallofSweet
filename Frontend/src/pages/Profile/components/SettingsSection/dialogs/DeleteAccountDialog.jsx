
import React from 'react';
import {
    Typography,
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DeleteAccountDialog = ({ open, onClose, showPassword, toggleShowPassword }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: motion.div,
                initial: { y: 50, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { type: 'spring', damping: 15, stiffness: 300 },
                sx: { borderRadius: 2, overflow: 'hidden' }
            }}
            maxWidth="sm"
            fullWidth
        >
            <Box
                sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <DeleteIcon sx={{ mr: 1.5 }} />
                    Excluir Conta
                </Typography>
            </Box>
            <DialogContent sx={{ py: 3 }}>
                <DialogContentText sx={{ mb: 2 }}>
                    <Box component="span" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                        Atenção:
                    </Box> Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente excluídos.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Digite sua senha para confirmar"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                    variant="outlined"
                    sx={{ borderRadius: 2, minWidth: '100px' }}
                >
                    Cancelar
                </Button>
                <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 2, px: 3, minWidth: '100px' }}
                    >
                        Excluir conta
                    </Button>
                </motion.div>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;