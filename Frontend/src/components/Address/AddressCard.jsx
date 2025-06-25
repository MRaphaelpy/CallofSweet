
import React, { useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Divider,
    IconButton,
    Box,
    Button
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
    Work as WorkIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { cardVariants } from './animations';

const AddressCard = ({ address, onEdit, onDelete }) => {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const getAddressIcon = (name) => {
        if (name.toLowerCase().includes('casa')) return <HomeIcon />;
        if (name.toLowerCase().includes('trabalho')) return <WorkIcon />;
        return <LocationIcon />;
    };

    const handleDeleteConfirm = () => {
        onDelete(address.id);
        setDeleteConfirmId(null);
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            layout
        >
            <Card
                sx={{
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'visible',
                    boxShadow: address.isDefault
                        ? '0 4px 15px rgba(25, 118, 210, 0.2)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                    border: address.isDefault
                        ? '1px solid rgba(25, 118, 210, 0.2)'
                        : 'none'
                }}
            >
                {address.isDefault && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -10,
                            right: 15,
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'medium',
                            zIndex: 1,
                            boxShadow: 1
                        }}
                    >
                        Padrão
                    </Box>
                )}
                <CardContent sx={{ pb: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'primary.dark',
                            fontWeight: 500
                        }}
                    >
                        <Box component="span" sx={{ mr: 1, color: 'primary.main' }}>
                            {getAddressIcon(address.name)}
                        </Box>
                        {address.name}
                    </Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Box sx={{ pl: 0.5 }}>
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: '500' }}>
                            {address.street}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {address.neighborhood}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {address.city} - {address.state}, CEP: {address.zipCode}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'flex-end',
                        p: 1,
                        pt: 0
                    }}
                >
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(address)}
                        sx={{
                            '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.08)'
                            }
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {deleteConfirmId === address.id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                size="small"
                                color="error"
                                onClick={handleDeleteConfirm}
                                sx={{ minWidth: 'auto', mr: 1 }}
                            >
                                Sim
                            </Button>
                            <Button
                                size="small"
                                color="inherit"
                                onClick={() => setDeleteConfirmId(null)}
                                sx={{ minWidth: 'auto' }}
                            >
                                Não
                            </Button>
                        </Box>
                    ) : (
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteConfirmId(address.id)}
                            sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(211, 47, 47, 0.08)'
                                }
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    )}
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default AddressCard;