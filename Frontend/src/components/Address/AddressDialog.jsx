import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Box,
    Typography
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const AddressDialog = ({ open, onClose, onSave, address, isEditing }) => {
    const [formData, setFormData] = useState(address);

    useEffect(() => {
        setFormData(address);
    }, [address]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const val = name === 'isDefault' ? checked : value;

        setFormData({
            ...formData,
            [name]: val
        });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                component: motion.div,
                initial: { y: 50, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { type: 'spring', damping: 15, stiffness: 300 },
                sx: { 
                    borderRadius: 2,
                    overflow: 'hidden'
                }
            }}
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {isEditing ? 'Editar Endereço' : 'Adicionar Novo Endereço'}
                </Typography>
            </Box>

            <DialogContent 
                sx={{ 
                    py: 3, 
                    px: 3, 
                    '&.MuiDialogContent-root': {
                        paddingTop: '24px !important'
                    }
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nome do endereço (ex: Casa, Trabalho)"
                            name="name"
                            value={formData?.name || ''}
                            onChange={handleChange}
                            variant="outlined"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Rua e Número"
                            name="street"
                            value={formData?.street || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Bairro"
                            name="neighborhood"
                            value={formData?.neighborhood || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="CEP"
                            name="zipCode"
                            value={formData?.zipCode || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Cidade"
                            name="city"
                            value={formData?.city || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Estado"
                            name="state"
                            value={formData?.state || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData?.isDefault || false}
                                    onChange={handleChange}
                                    name="isDefault"
                                    color="primary"
                                />
                            }
                            label="Definir como endereço padrão"
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions 
                sx={{ 
                    px: 3, 
                    py: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Button
                    onClick={onClose}
                    color="inherit"
                    variant="outlined"
                    sx={{ 
                        borderRadius: 2,
                        minWidth: '100px'
                    }}
                >
                    Cancelar
                </Button>
                <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            minWidth: '100px'
                        }}
                    >
                        Salvar
                    </Button>
                </motion.div>
            </DialogActions>
        </Dialog>
    );
};

export default AddressDialog;