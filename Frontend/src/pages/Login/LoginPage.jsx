import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { motion } from 'framer-motion';
import './LoginPage.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await loginUser(credentials);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Ocorreu um erro durante o login. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-animation">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="background-shape"></div>
                ))}
            </div>
            
            <motion.div 
                className="login-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <motion.div 
                    className="login-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h2>Bem-vindo de volta</h2>
                    <p>Faça login para continuar suas compras</p>
                </motion.div>

                {error && (
                    <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <motion.div 
                        className="form-group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <label htmlFor="email">Email</label>
                        <div className="input-container">
                            <i className="fas fa-envelope input-icon"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Seu email"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        className="form-group"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label htmlFor="password">Senha</label>
                        <div className="input-container">
                            <i className="fas fa-lock input-icon"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Sua senha"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        className="forgot-password"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Link to="/forgot-password">Esqueceu sua senha?</Link>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        {loading ? (
                            <div className="loader">
                                <div className="loader-dot"></div>
                                <div className="loader-dot"></div>
                                <div className="loader-dot"></div>
                            </div>
                        ) : (
                            'Entrar'
                        )}
                    </motion.button>
                </form>

                <motion.div 
                    className="register-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <p>Não tem uma conta?</p>
                    <Link to="/register" className="register-button">
                        Criar conta
                    </Link>
                </motion.div>

                <motion.div 
                    className="social-login"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    <p>Ou continue com</p>
                    <div className="social-icons">
                        <motion.button 
                            className="social-icon google"
                            whileHover={{ y: -5 }}
                        >
                            <i className="fab fa-google"></i>
                        </motion.button>
                        <motion.button 
                            className="social-icon facebook"
                            whileHover={{ y: -5 }}
                        >
                            <i className="fab fa-facebook-f"></i>
                        </motion.button>
                        <motion.button 
                            className="social-icon twitter"
                            whileHover={{ y: -5 }}
                        >
                            <i className="fab fa-twitter"></i>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;