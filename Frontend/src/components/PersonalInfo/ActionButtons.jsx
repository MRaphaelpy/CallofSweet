import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useMediaQuery } from '@mui/material';

const ActionButtons = ({ editing, loading, setEditing, handleCancel }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: 2
        }}>
            <AnimatePresence mode="wait">
                {!editing ? (
                    <motion.div
                        key="edit-button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => setEditing(true)}
                            size={isMobile ? "medium" : "large"}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                boxShadow: 2,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3,
                                    transition: 'transform 0.2s ease-in-out'
                                }
                            }}
                        >
                            Editar Dados
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="save-buttons"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            display: 'flex',
                            gap: '16px',
                            width: isMobile ? '100%' : 'auto',
                            flexDirection: isMobile ? 'column-reverse' : 'row'
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            size={isMobile ? "medium" : "large"}
                            disabled={loading}
                            fullWidth={isMobile}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                borderWidth: '1.5px',
                                '&:hover': {
                                    borderWidth: '1.5px',
                                }
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            size={isMobile ? "medium" : "large"}
                            disabled={loading}
                            fullWidth={isMobile}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                boxShadow: 2,
                                backgroundColor: theme.palette.success.main,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3,
                                    backgroundColor: theme.palette.success.dark,
                                    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease'
                                }
                            }}
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default ActionButtons;