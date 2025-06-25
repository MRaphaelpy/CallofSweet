import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    InputAdornment,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Switch,
    FormControlLabel,
    Rating
} from '@mui/material';

const ProductForm = ({ product, onSubmit, loading, mode }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        imageUrl: '',
        rating: 0,
        active: true
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (product) {
            const activeValue = typeof product.active === 'boolean' ? product.active : true;
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price?.toString() || '',
                category: product.category || '',
                brand: product.brand || '',
                imageUrl: product.imageUrl || '',
                rating: product.rating || 0,
                active: activeValue
            });

            if (product.imageUrl) {
                setImagePreview(product.imageUrl);
            }
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleRatingChange = (event, newValue) => {
        setFormData({
            ...formData,
            rating: newValue
        });
    };

    const handleSwitchChange = (e) => {
        const activeValue = Boolean(e.target.checked);

        console.log(`Switch alterado para: ${activeValue} (tipo: ${typeof activeValue})`);

        setFormData({
            ...formData,
            active: activeValue
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({
                    ...formData,
                    imageUrl: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Descrição é obrigatória';
        }

        if (!formData.price) {
            newErrors.price = 'Preço é obrigatório';
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Preço deve ser um número positivo';
        }

        if (!formData.category) {
            newErrors.category = 'Categoria é obrigatória';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating) || 0,
                active: Boolean(formData.active),
                variations: product?.variations || [],
                reviews: product?.reviews || []
            };

            console.log("Dados a serem enviados:", productData);
            onSubmit(productData);
        }
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {mode === 'edit' ? 'Editar Produto' : 'Novo Produto'}
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(formData.active)}
                                        onChange={handleSwitchChange}
                                        name="activeSwitch"
                                        color="primary"
                                    />
                                }
                                label={formData.active ? "Produto Ativo" : "Produto Inativo"}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome do Produto"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel id="category-label">Categoria</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={formData.category}
                                    label="Categoria"
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="CHOCOLATE">Chocolate</MenuItem>
                                    <MenuItem value="CANDY">Doces</MenuItem>
                                    <MenuItem value="BISCUIT">Biscoitos</MenuItem>
                                    <MenuItem value="DESSERT">Sobremesas</MenuItem>
                                    <MenuItem value="DRINK">Bebidas</MenuItem>
                                    <MenuItem value="OTHER">Outros</MenuItem>
                                </Select>
                                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Preço (R$)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Marca"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography component="legend">Classificação</Typography>
                            <Rating
                                name="rating"
                                value={formData.rating || 0}
                                precision={0.5}
                                onChange={handleRatingChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Imagem do Produto
                                </Typography>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image-upload">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                    >
                                        Escolher Imagem
                                    </Button>
                                </label>
                            </Box>

                            {imagePreview && (
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                </Box>
                            )}
                        </Grid>

                        {/* Exibir variações existentes se estiver editando */}
                        {mode === 'edit' && product?.variations && product.variations.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Variações do Produto
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    bgcolor: 'background.paper'
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Este produto possui {product.variations.length} variação(ões).
                                        As variações devem ser gerenciadas na tela específica.
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Exibir avaliações existentes se estiver editando */}
                        {mode === 'edit' && product?.reviews && product.reviews.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Avaliações do Produto
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    bgcolor: 'background.paper'
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Este produto possui {product.reviews.length} avaliação(ões).
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            {loading ? 'Salvando...' : (mode === 'edit' ? 'Atualizar' : 'Cadastrar')}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductForm;