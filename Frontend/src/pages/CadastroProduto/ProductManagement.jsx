import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Divider,
    Tabs,
    Tab,
    Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

import ProductForm from './ProductForm';
import ProductList from './ProductList';
import * as ProductService from './ProductService';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('create'); 
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await ProductService.getAllProducts();

            const normalizedData = data.map(product => ({
                ...product,
                isActive: Boolean(product.isActive)
            }));

            setProducts(normalizedData);
        } catch (error) {
            showSnackbar('Falha ao carregar produtos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setFormMode('create');
        setFormOpen(true);
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setFormMode('edit');
        setFormOpen(true);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
    };

    const closeProductView = () => {
        setSelectedProduct(null);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setCurrentProduct(null);
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;

        setLoading(true);
        try {
            await ProductService.deleteProduct(productToDelete);
            setProducts(products.filter(p => p.id !== productToDelete));
            showSnackbar('Produto excluído com sucesso');
        } catch (error) {
            showSnackbar('Falha ao excluir o produto', 'error');
        } finally {
            setDeleteDialogOpen(false);
            setProductToDelete(null);
            setLoading(false);
        }
    };

    const handleSubmit = async (productData) => {
        setFormLoading(true);
        try {
            if (formMode === 'create') {
                const newProduct = await ProductService.createProduct(productData);
                setProducts([...products, newProduct]);
                showSnackbar('Produto cadastrado com sucesso!');
            } else {
                const updatedProduct = await ProductService.updateProduct(currentProduct.id, productData);
                setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                showSnackbar('Produto atualizado com sucesso!');
            }
            setFormOpen(false);
        } catch (error) {
            showSnackbar(
                formMode === 'create'
                    ? 'Falha ao cadastrar o produto'
                    : 'Falha ao atualizar o produto',
                'error'
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Gerenciamento de Produtos
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Cadastre, visualize e gerencie seus produtos
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddProduct}
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }
                                }}
                            >
                                Novo Produto
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                </Box>

                <Paper sx={{ mb: 4 }} elevation={0} variant="outlined">
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Todos os Produtos" />
                        <Tab label="Produtos Ativos" />
                        <Tab label="Produtos Inativos" />
                    </Tabs>
                </Paper>

                <Box sx={{ mb: 4 }}>
                    {tabValue === 0 && (
                        <ProductList
                            products={products}
                            loading={loading}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteClick}
                            onView={handleViewProduct}
                        />
                    )}
                    {tabValue === 1 && (
                        <ProductList
                            products={products.filter(p => p.isActive)}
                            loading={loading}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteClick}
                            onView={handleViewProduct}
                        />
                    )}
                    {tabValue === 2 && (
                        <ProductList
                            products={products.filter(p => !p.isActive)}
                            loading={loading}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteClick}
                            onView={handleViewProduct}
                        />
                    )}
                </Box>

         
                <Dialog
                    open={formOpen}
                    onClose={handleFormClose}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogContent>
                        <ProductForm
                            product={currentProduct}
                            onSubmit={handleSubmit}
                            loading={formLoading}
                            mode={formMode}
                        />
                    </DialogContent>
                </Dialog>

       
                <Dialog
                    open={!!selectedProduct}
                    onClose={closeProductView}
                    maxWidth="md"
                    fullWidth
                >
                    {selectedProduct && (
                        <>
                            <DialogTitle>Detalhes do Produto</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: 2 }}>
                                        {selectedProduct.imageUrl ? (
                                            <img
                                                src={selectedProduct.imageUrl}
                                                alt={selectedProduct.name}
                                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    height: 200,
                                                    bgcolor: 'grey.200',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary">
                                                    Sem imagem
                                                </Typography>
                                            </Box>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {selectedProduct.name}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Rating value={selectedProduct.rating || 0} precision={0.5} readOnly />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                ({selectedProduct.reviews?.length || 0} avaliações)
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" color="primary" gutterBottom>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(selectedProduct.price)}
                                        </Typography>

                                        <Chip
                                            label={selectedProduct.isActive ? 'Ativo' : 'Inativo'}
                                            color={selectedProduct.isActive ? 'success' : 'error'}
                                            size="small"
                                            sx={{ mb: 2 }}
                                        />

                                        <Typography variant="subtitle2" gutterBottom>
                                            Marca: {selectedProduct.brand || 'Não informada'}
                                        </Typography>

                                        <Typography variant="subtitle2" gutterBottom>
                                            Categoria: {selectedProduct.category}
                                        </Typography>

                                        <Typography variant="subtitle2" gutterBottom>
                                            Data de criação: {new Date(selectedProduct.createdAt).toLocaleDateString('pt-BR')}
                                        </Typography>

                                        {selectedProduct.variations && selectedProduct.variations.length > 0 && (
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Variações: {selectedProduct.variations.length}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Descrição
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            {selectedProduct.description}
                                        </Typography>
                                    </Grid>

                        
                                    {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom>
                                                Avaliações
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />

                                            {selectedProduct.reviews.map((review, index) => (
                                                <Box key={review.id || index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="subtitle2">
                                                            {review.userName || 'Usuário'}
                                                        </Typography>
                                                        <Rating value={review.rating || 0} readOnly size="small" />
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {review.comment}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Grid>
                                    )}
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeProductView}>Fechar</Button>
                                <Button
                                    onClick={() => {
                                        closeProductView();
                                        handleEditProduct(selectedProduct);
                                    }}
                                    color="primary"
                                >
                                    Editar
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>

         
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                            Excluir
                        </Button>
                    </DialogActions>
                </Dialog>

          
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        elevation={6}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </motion.div>
        </Container>
    );
};

export default ProductManagement;