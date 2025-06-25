
import React, { useState } from 'react';
import {
    Typography,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    LockReset as PasswordIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PasswordDialog = ({ open, onClose, showPassword, toggleShowPassword }) => {
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (field) => (event) => {
        setPasswordFields({
            ...passwordFields,
            [field]: event.target.value
        });
    };

    const handleSubmitPassword = () => {
        
        alert('Senha alterada com sucesso!');
        onClose();
        setPasswordFields({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

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
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <PasswordIcon sx={{ mr: 1.5 }} />
                    Alterar Senha
                </Typography>
            </Box>
            <DialogContent sx={{ py: 3 }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Senha atual"
                    type={showPassword.current ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordChange('currentPassword')}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggleShowPassword('current')}>
                                    {showPassword.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="dense"
                    label="Nova senha"
                    type={showPassword.new ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange('newPassword')}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggleShowPassword('new')}>
                                    {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="dense"
                    label="Confirmar nova senha"
                    type={showPassword.confirm ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    error={passwordFields.newPassword !== passwordFields.confirmPassword && passwordFields.confirmPassword !== ''}
                    helperText={
                        passwordFields.newPassword !== passwordFields.confirmPassword && passwordFields.confirmPassword !== ''
                            ? 'As senhas não conferem'
                            : ''
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => toggleShowPassword('confirm')}>
                                    {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                        onClick={handleSubmitPassword}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2, px: 3, minWidth: '100px' }}
                        disabled={
                            !passwordFields.currentPassword ||
                            !passwordFields.newPassword ||
                            passwordFields.newPassword !== passwordFields.confirmPassword
                        }
                    >
                        Salvar
                    </Button>
                </motion.div>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordDialog;