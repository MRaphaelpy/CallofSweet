import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress
} from '@mui/material';

import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import PromotionalBanner from './components/PromotionalBanner';

import { getProducts, getCategories } from '../../services/userService';
import './Home.css';

const LoadingIndicator = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
    </Box>
);

const ErrorMessage = ({ message }) => (
    <Box sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>
        <Typography>{message}</Typography>
    </Box>
);

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <HeroBanner />

            <Container>
                <section className="home-section">
                    <Typography variant="h4" component="h2" className="section-title" gutterBottom>
                        Compre por Categoria
                    </Typography>
                    {loading ? <LoadingIndicator /> : <CategorySection categories={categories} />}
                </section>
            </Container>
            <Box>
               
            </Box>

            <Container>
                <section className="home-section">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Typography variant="h4" component="h2" className="section-title">
                            Produtos em Destaque
                        </Typography>
                        <Button variant="outlined" className="view-all-button">
                            View All
                        </Button>
                    </Box>

                    <Typography variant="body1" className="section-subtitle" gutterBottom>
                        Explore nossos produtos mais populares e aproveite ofertas exclusivas.
                    </Typography>

                    {loading ? (
                        <LoadingIndicator />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <ProductGrid products={products} />
                    )}
                </section>
            </Container>

            <PromotionalBanner />
        </div>
    );
};

export default Home;
