import React, { useState, useEffect } from 'react';
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
    Badge,
    CircularProgress,
    Alert,
    Button
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    CheckCircleOutline as DeliveredIcon,
    LocalShipping as ShippingIcon,
    Pending as PendingIcon,
    Receipt as ReceiptIcon,
    DateRange as DateIcon,
    AttachMoney as MoneyIcon,
    Refresh as RefreshIcon,
    AccessTime as ProcessingIcon,
    CancelOutlined as CanceledIcon,
    Login as LoginIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1';


const MOCK_ORDERS = [
    {
        id: 101,
        userId: 1,
        totalPrice: 89.90,
        status: 'PENDING',
        paymentMethod: 'credit-card',
        trackingCode: null,
        createdAt: new Date().toISOString(),
        items: [
            {
                id: 1,
                orderId: 101,
                variationId: 1,
                quantity: 1,
                subtotal: 49.90,
                productName: 'Bolo de Chocolate'
            },
            {
                id: 2,
                orderId: 101,
                variationId: 2,
                quantity: 20,
                subtotal: 40.00,
                productName: 'Brigadeiros'
            }
        ]
    },
    {
        id: 102,
        userId: 1,
        totalPrice: 120.50,
        status: 'SHIPPING',
        paymentMethod: 'pix',
        trackingCode: 'BR123456789',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
            {
                id: 3,
                orderId: 102,
                variationId: 3,
                quantity: 1,
                subtotal: 65.90,
                productName: 'Torta de Morango'
            },
            {
                id: 4,
                orderId: 102,
                variationId: 4,
                quantity: 6,
                subtotal: 54.60,
                productName: 'Cupcakes'
            }
        ]
    }
];

const OrdersHistory = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [expandedPanel, setExpandedPanel] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [useRealData, setUseRealData] = useState(false);

    
    const getUserId = () => {
        try {
            
            const userIdValue = localStorage.getItem('userId');
            if (userIdValue) {
                return parseInt(userIdValue, 10);
            }

            
            const userDataStr = localStorage.getItem('userData');
            if (userDataStr) {
                try {
                    const userData = JSON.parse(userDataStr);
                    if (userData && userData.userId) {
                        return userData.userId;
                    }
                } catch (e) {
                    console.error("Erro ao interpretar userData:", e);
                }
            }

            
            console.log("Nenhum ID de usuário encontrado. Usando ID fixo 1.");
            return 1;
        } catch (e) {
            console.error("Erro ao obter ID do usuário:", e);
            return 1; 
        }
    };

    const isUserAuthenticated = () => {
        try {
            const token = localStorage.getItem('authToken');
            return !!token;
        } catch (e) {
            console.error("Erro ao verificar autenticação:", e);
            return false;
        }
    };

    
    const fetchRealOrders = async () => {
        try {
            setLoading(true);
            const userId = getUserId();
            console.log(`Tentando buscar dados para o usuário ID: ${userId}`);

            
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.warn("Token de autenticação não encontrado");
                return null;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            
            console.log("Config da requisição:", {
                url: `${API_URL}/orders/user/${userId}`,
                headers: config.headers
            });

            const response = await axios.get(`${API_URL}/orders/user/${userId}`, config);
            console.log("Resposta da API:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro detalhado ao buscar pedidos:", error);

            
            if (error.response) {
                console.error("Resposta de erro:", {
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers
                });
            } else if (error.request) {
                console.error("Erro na requisição (sem resposta):", error.request);
            } else {
                console.error("Erro na configuração:", error.message);
            }

            throw error;
        }
    };

    
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        
        const authenticated = isUserAuthenticated();
        setIsAuthenticated(authenticated);

        if (!authenticated) {
            
            console.log("Usuário não autenticado. Usando dados mockados.");
            setTimeout(() => {
                setOrders(MOCK_ORDERS);
                setLoading(false);
                setUseRealData(false);
            }, 500);
            return;
        }

        try {
            
            const realData = await fetchRealOrders();

            if (realData && Array.isArray(realData) && realData.length > 0) {
                setOrders(realData);
                setUseRealData(true);
            } else {
                
                console.log("Nenhum pedido real encontrado. Usando dados mockados.");
                setOrders(MOCK_ORDERS);
                setUseRealData(false);
            }
        } catch (err) {
            console.error('Erro ao buscar pedidos:', err);

            
            console.log("Usando dados mockados devido ao erro na API.");
            setOrders(MOCK_ORDERS);
            setUseRealData(false);

            
            setError("Usando dados de exemplo, pois o servidor está com problemas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
        } catch (e) {
            return 'Data não disponível';
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleLogin = () => {
        navigate('/login', { state: { redirectTo: '/profile' } });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'DELIVERED':
                return <DeliveredIcon />;
            case 'SHIPPING':
                return <ShippingIcon />;
            case 'PENDING':
                return <ProcessingIcon />;
            case 'CANCELED':
                return <CanceledIcon />;
            default:
                return <PendingIcon />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED':
                return 'success';
            case 'SHIPPING':
                return 'info';
            case 'PENDING':
                return 'warning';
            case 'CANCELED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusTranslation = (status) => {
        switch (status) {
            case 'DELIVERED':
                return 'Entregue';
            case 'SHIPPING':
                return 'Em trânsito';
            case 'PENDING':
                return 'Processando';
            case 'CANCELED':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const getPaymentMethodTranslation = (method) => {
        switch (method) {
            case 'credit-card':
                return 'Cartão de Crédito';
            case 'pix':
                return 'PIX';
            case 'bank-slip':
                return 'Boleto Bancário';
            default:
                return method;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="orders-history-container"
            style={{ padding: '20px' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography
                    variant="h5"
                    component={motion.h5}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    sx={{
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        color: theme.palette.primary.main
                    }}
                >
                    <ReceiptIcon sx={{ mr: 1.5, fontSize: 32 }} />
                    Histórico de Pedidos
                    {useRealData && <small style={{ fontSize: '0.6em', opacity: 0.7, marginLeft: '8px' }}>(dados reais)</small>}
                </Typography>

                {!isAuthenticated ? (
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        onClick={handleLogin}
                    >
                        Fazer Login
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={fetchOrders}
                        disabled={loading}
                    >
                        Atualizar
                    </Button>
                )}
            </Box>

            {!isAuthenticated && (
                <Alert
                    severity="info"
                    sx={{ mb: 3 }}
                    action={
                        <Button color="inherit" size="small" onClick={handleLogin}>
                            Login
                        </Button>
                    }
                >
                    Faça login para ver seus pedidos reais. Mostrando exemplos de pedidos.
                </Alert>
            )}

            {error && (
                <Alert
                    severity="info"
                    sx={{ mb: 3 }}
                    action={
                        <Button color="inherit" size="small" onClick={fetchOrders}>
                            Tentar novamente
                        </Button>
                    }
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
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
                                    scale: 1.01,
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
                                                        Pedido #{order.id}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <DateIcon
                                                            fontSize="small"
                                                            sx={{ mr: 1, color: theme.palette.text.secondary }}
                                                        />
                                                        <Typography variant="body2">
                                                            {formatDate(order.createdAt)}
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
                                                            {formatCurrency(order.totalPrice)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <Chip
                                                        icon={getStatusIcon(order.status)}
                                                        label={getStatusTranslation(order.status)}
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
                                                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Box sx={{
                                                                        p: 2,
                                                                        backgroundColor: theme.palette.background.default,
                                                                        borderRadius: 1,
                                                                        border: `1px solid ${theme.palette.divider}`
                                                                    }}>
                                                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                            Detalhes do Pedido
                                                                        </Typography>
                                                                        <Divider sx={{ mb: 1.5 }} />
                                                                        <Grid container spacing={1}>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    Método de Pagamento:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant="body2" fontWeight={500}>
                                                                                    {getPaymentMethodTranslation(order.paymentMethod)}
                                                                                </Typography>
                                                                            </Grid>

                                                                            <Grid item xs={6}>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    Data:
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant="body2" fontWeight={500}>
                                                                                    {formatDate(order.createdAt)}
                                                                                </Typography>
                                                                            </Grid>

                                                                            {order.trackingCode && (
                                                                                <>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography variant="body2" color="text.secondary">
                                                                                            Código de Rastreio:
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography variant="body2" fontWeight={500}>
                                                                                            {order.trackingCode}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </>
                                                                            )}
                                                                        </Grid>
                                                                    </Box>
                                                                </Grid>

                                                                <Grid item xs={12} sm={6}>
                                                                    <Box sx={{
                                                                        p: 2,
                                                                        backgroundColor: theme.palette.background.default,
                                                                        borderRadius: 1,
                                                                        border: `1px solid ${theme.palette.divider}`
                                                                    }}>
                                                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                            Status do Pedido
                                                                        </Typography>
                                                                        <Divider sx={{ mb: 1.5 }} />

                                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                                            {getStatusIcon(order.status)}
                                                                            <Typography variant="body1" fontWeight={500} sx={{ ml: 1 }}>
                                                                                {getStatusTranslation(order.status)}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Typography variant="body2" color="text.secondary">
                                                                            {order.status === 'DELIVERED' ?
                                                                                'Seu pedido foi entregue com sucesso.' :
                                                                                order.status === 'SHIPPING' ?
                                                                                    'Seu pedido está a caminho. Acompanhe pelo código de rastreio.' :
                                                                                    order.status === 'PENDING' ?
                                                                                        'Seu pedido está sendo processado e será enviado em breve.' :
                                                                                        order.status === 'CANCELED' ?
                                                                                            'Este pedido foi cancelado.' :
                                                                                            'Status do pedido atualizado.'
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>

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

                                                                {order.items && order.items.length > 0 ? (
                                                                    order.items.map((item, idx) => (
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
                                                                                            {item.productName || `Produto #${item.variationId}`}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={4} textAlign="right">
                                                                                        <Typography variant="body2">
                                                                                            {formatCurrency(item.subtotal)}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        </motion.div>
                                                                    ))
                                                                ) : (
                                                                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                                        Não há itens disponíveis para exibição.
                                                                    </Typography>
                                                                )}

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
                                                                            {formatCurrency(order.totalPrice)}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>

                                                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => navigate(`/order-confirmation?id=${order.id}`)}
                                                                >
                                                                    Ver Detalhes Completos
                                                                </Button>
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
                                    {isAuthenticated ?
                                        'Você ainda não realizou nenhum pedido.' :
                                        'Faça login para ver seu histórico de pedidos.'
                                    }
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() => isAuthenticated ? navigate('/') : handleLogin()}
                                >
                                    {isAuthenticated ? 'Começar a comprar' : 'Fazer Login'}
                                </Button>
                            </Paper>
                        </motion.div>
                    )}
                </Box>
            )}
        </motion.div>
    );
};

export default OrdersHistory;