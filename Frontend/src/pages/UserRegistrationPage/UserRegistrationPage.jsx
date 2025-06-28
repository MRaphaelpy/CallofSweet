import React, { useState } from 'react';
import UserRegistrationForm from '../../components/UserRegistration/UserRegistrationForm';
import { registerUser } from '../../services/userService';
import { useNavigate, Link } from 'react-router-dom';
import './UserRegistrationPage.css';

const UserRegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registrationStep, setRegistrationStep] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerUser(userData);
            setLoading(false);
            setRegistrationStep(1);
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
        }
    };

    return (
        <div className="registration-page">
            <div className="animated-background">
                {[...Array(15)].map((_, index) => (
                    <div 
                        key={index} 
                        className="floating-shape"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 20}s`
                        }}
                    ></div>
                ))}
            </div>
            
            <div className={`registration-container ${registrationStep === 0 ? 'fade-in' : ''}`}>
                {error && (
                    <div className="error-banner">
                        <div className="error-icon">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="error-message">{error}</div>
                        <button 
                            className="error-close"
                            onClick={() => setError(null)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
                
                {registrationStep === 0 ? (
                    <div className="registration-form-container">
                        <div className="registration-header">
                            <h1>Crie sua conta</h1>
                            <p>Junte-se à nossa comunidade e comece sua jornada</p>
                        </div>
                        
                        <UserRegistrationForm onSubmit={handleSubmit} loading={loading} />
                        
                        <div className="login-link">
                            <p>Já possui uma conta?</p>
                            <Link to="/login" className="login-button">
                                <span>Entrar</span>
                            </Link>
                        </div>
                        
                        <div className="features-section">
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <div className="feature-text">Seguro</div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="feature-text">Rápido</div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <i className="fas fa-user-friends"></i>
                                </div>
                                <div className="feature-text">Social</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="success-container">
                        <div className="success-animation">
                            <div className="checkmark-circle">
                                <div className="checkmark draw"></div>
                            </div>
                        </div>
                        <h2>Cadastro realizado com sucesso!</h2>
                        <p>Redirecionando para a página de login...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserRegistrationPage;