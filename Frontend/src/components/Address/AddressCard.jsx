import React, { useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Divider,
    IconButton,
    Box,
    Button,
    Tooltip,
    Chip,
    Collapse,
    Fade
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
    Work as WorkIcon,
    LocationOn as LocationIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    ContentCopy as CopyIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { cardVariants } from './animations';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);


    const getAddressIcon = (name) => {
        const lowercaseName = name.toLowerCase();
        if (lowercaseName.includes('casa')) return <HomeIcon />;
        if (lowercaseName.includes('trabalho')) return <WorkIcon />;
        return <LocationIcon />;
    };


    const copyAddressToClipboard = () => {
        const fullAddress = `${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}, CEP: ${address.zipCode}`;
        navigator.clipboard.writeText(fullAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDeleteConfirm = () => {
        onDelete(address.id);
        setDeleteConfirmId(null);
    };

    const formatZipCode = (zipCode) => {
        if (!zipCode) return '';
        return zipCode.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            layout
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
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
                        : 'none',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        borderColor: 'primary.light'
                    }
                }}
            >
                {address.isDefault && (
                    <Chip
                        icon={<StarIcon fontSize="small" />}
                        label="Padrão"
                        color="primary"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: -12,
                            right: 16,
                            fontWeight: 500,
                            boxShadow: 1
                        }}
                    />
                )}
                <CardContent sx={{ pb: 1 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'primary.dark',
                                fontWeight: 500
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    mr: 1,
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {getAddressIcon(address.name)}
                            </Box>
                            {address.name}
                        </Typography>

                        {!address.isDefault && (
                            <Tooltip title="Definir como padrão">
                                <IconButton
                                    size="small"
                                    onClick={() => onSetDefault(address.id)}
                                    color="default"
                                    sx={{
                                        opacity: 0.6,
                                        '&:hover': {
                                            opacity: 1,
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    <StarBorderIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Divider sx={{ mb: 1.5 }} />

                    <Box
                        sx={{
                            pl: 0.5,
                            cursor: 'pointer',
                        }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: '500' }}>
                            {address.street}
                            {address.number && `, ${address.number}`}
                            {address.complement && ` - ${address.complement}`}
                        </Typography>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {address.neighborhood}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {address.city} - {address.state}, CEP: {formatZipCode(address.zipCode)}
                            </Typography>
                        </Collapse>

                        {!expanded && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                sx={{
                                    maxWidth: '90%',
                                    '&::after': {
                                        content: '"..."',
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        ml: 0.5
                                    }
                                }}
                            >
                                {address.neighborhood}, {address.city} - {address.state}
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                <CardActions
                    sx={{
                        justifyContent: 'space-between',
                        p: 1,
                        pt: 0
                    }}
                >
                    <Tooltip title={copied ? "Copiado!" : "Copiar endereço"}>
                        <IconButton
                            size="small"
                            onClick={copyAddressToClipboard}
                            color={copied ? "success" : "default"}
                            sx={{ opacity: copied ? 1 : 0.7, transition: 'all 0.2s' }}
                        >
                            {copied ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>

                    <Box>
                        <AnimatePresence>
                            {deleteConfirmId === address.id ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(244, 67, 54, 0.1)',
                                        borderRadius: '8px',
                                        padding: '2px 4px'
                                    }}
                                >
                                    <Typography variant="caption" sx={{ mr: 1, color: 'error.main' }}>
                                        Excluir?
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={handleDeleteConfirm}
                                        sx={{ p: 0.5 }}
                                    >
                                        <CheckIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => setDeleteConfirmId(null)}
                                        sx={{ p: 0.5 }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </motion.div>
                            ) : (
                                <Box sx={{ display: 'flex' }}>
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
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default AddressCard;