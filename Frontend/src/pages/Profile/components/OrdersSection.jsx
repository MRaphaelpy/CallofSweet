
import React, { useState } from 'react';
import {
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Grid,
    Divider,
    Paper,
    useTheme,
    Badge
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    CheckCircleOutline as DeliveredIcon,
    LocalShipping as ShippingIcon,
    Pending as PendingIcon,
    Receipt as ReceiptIcon,
    DateRange as DateIcon,
    AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const OrdersSection = () => {
    const theme = useTheme();
    const [expandedPanel, setExpandedPanel] = useState(null);

    const orders = [
        {
            id: '#12345',
            date: '15/04/2023',
            total: 'R$ 89,90',
            status: 'Entregue',
            items: [
                { name: 'Bolo de Chocolate', price: 'R$ 49,90', quantity: 1 },
                { name: 'Brigadeiros', price: 'R$ 40,00', quantity: 20 }
            ]
        },
        {
            id: '#12346',
            date: '28/04/2023',
            total: 'R$ 120,50',
            status: 'Em trânsito',
            items: [
                { name: 'Torta de Morango', price: 'R$ 65,90', quantity: 1 },
                { name: 'Cupcakes', price: 'R$ 54,60', quantity: 6 }
            ]
        },
        {
            id: '#12347',
            date: '03/05/2023',
            total: 'R$ 75,00',
            status: 'Processando',
            items: [
                { name: 'Pão de Mel', price: 'R$ 35,00', quantity: 10 },
                { name: 'Cheesecake', price: 'R$ 40,00', quantity: 1 }
            ]
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Entregue':
                return <DeliveredIcon />;
            case 'Em trânsito':
                return <ShippingIcon />;
            case 'Processando':
                return <PendingIcon />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Entregue':
                return 'success';
            case 'Em trânsito':
                return 'info';
            case 'Processando':
                return 'warning';
            default:
                return 'default';
        }
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-container"
        >
            <Typography
                variant="h5"
                component={motion.h5}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main
                }}
            >
                <ReceiptIcon sx={{ mr: 1.5, fontSize: 32 }} />
                Histórico de Pedidos
            </Typography>

            <Box sx={{ mt: 2 }}>
                <AnimatePresence>
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 12
                                }
                            }}
                            exit={{ opacity: 0, y: 20 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: theme.shadows[3]
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15
                            }}
                        >
                            <Paper
                                elevation={expandedPanel === index ? 3 : 1}
                                sx={{
                                    mb: 2,
                                    borderRadius: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Accordion
                                    expanded={expandedPanel === index}
                                    onChange={handleAccordionChange(index)}
                                    disableGutters
                                    elevation={0}
                                    sx={{
                                        background: 'transparent',
                                        '&:before': { display: 'none' },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <motion.div
                                                animate={{
                                                    rotate: expandedPanel === index ? 180 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ExpandMoreIcon />
                                            </motion.div>
                                        }
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                        sx={{
                                            py: 2,
                                            px: 3,
                                            backgroundColor: expandedPanel === index
                                                ? theme.palette.mode === 'dark'
                                                    ? 'rgba(255,255,255,0.05)'
                                                    : 'rgba(0,0,0,0.03)'
                                                : 'transparent'
                                        }}
                                    >
                                        <Grid container alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        color: theme.palette.primary.main
                                                    }}
                                                >
                                                    {order.id}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <DateIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: theme.palette.text.secondary }}
                                                    />
                                                    <Typography variant="body2">
                                                        {order.date}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <MoneyIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: theme.palette.success.main }}
                                                    />
                                                    <Typography fontWeight={500}>
                                                        {order.total}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Chip
                                                    icon={getStatusIcon(order.status)}
                                                    label={order.status}
                                                    color={getStatusColor(order.status)}
                                                    sx={{
                                                        fontWeight: 500,
                                                        '& .MuiChip-icon': { fontSize: 18 }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        <AnimatePresence>
                                            {expandedPanel === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{
                                                        opacity: 1,
                                                        height: 'auto',
                                                        transition: {
                                                            height: { duration: 0.3 },
                                                            opacity: { duration: 0.5, delay: 0.1 }
                                                        }
                                                    }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Box sx={{ p: 3, pt: 0 }}>
                                                        <Box
                                                            sx={{
                                                                p: 2,
                                                                backgroundColor: theme.palette.mode === 'dark'
                                                                    ? 'rgba(255,255,255,0.03)'
                                                                    : 'rgba(0,0,0,0.02)',
                                                                borderRadius: 2,
                                                                mt: 2
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                fontWeight={600}
                                                                sx={{ mb: 1.5 }}
                                                            >
                                                                Itens do pedido:
                                                            </Typography>

                                                            {order.items.map((item, idx) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    animate={{
                                                                        x: 0,
                                                                        opacity: 1,
                                                                        transition: { delay: idx * 0.1 + 0.2 }
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            py: 1,
                                                                            mb: idx < order.items.length - 1 ? 1 : 0,
                                                                            borderBottom: idx < order.items.length - 1 ? `1px dashed ${theme.palette.divider}` : 'none'
                                                                        }}
                                                                    >
                                                                        <Grid container spacing={1} alignItems="center">
                                                                            <Grid item xs={1}>
                                                                                <Badge
                                                                                    badgeContent={item.quantity}
                                                                                    color="primary"
                                                                                    sx={{
                                                                                        '& .MuiBadge-badge': {
                                                                                            right: 10,
                                                                                            top: 10,
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <Box sx={{ width: 8, height: 8 }}></Box>
                                                                                </Badge>
                                                                            </Grid>
                                                                            <Grid item xs={7}>
                                                                                <Typography variant="body2" fontWeight={500}>
                                                                                    {item.name}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={4} textAlign="right">
                                                                                <Typography variant="body2">{item.price}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                </motion.div>
                                                            ))}

                                                            <Divider sx={{ my: 2 }} />

                                                            <Grid container>
                                                                <Grid item xs={8}>
                                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                                        Total
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={4} textAlign="right">
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        fontWeight={600}
                                                                        color="primary"
                                                                        component={motion.p}
                                                                        whileHover={{ scale: 1.05 }}
                                                                    >
                                                                        {order.total}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {orders.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Paper
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 2,
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderColor: theme.palette.divider
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                Você ainda não realizou nenhum pedido.
                            </Typography>
                        </Paper>
                    </motion.div>
                )}
            </Box>
        </motion.div>
    );
};

export default OrdersSection;