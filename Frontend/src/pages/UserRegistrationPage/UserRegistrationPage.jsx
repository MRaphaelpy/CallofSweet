
import React, { useState } from 'react';
import UserRegistrationForm from '../../components/UserRegistration/UserRegistrationForm';
import { registerUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import './UserRegistrationPage.css';

const UserRegistrationPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerUser(userData);
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-container">
                {error && (
                    <div className="error-banner">
                        {error}
                    </div>
                )}

                <UserRegistrationForm onSubmit={handleSubmit} loading={loading} />

                <div className="login-link">
                    Already have an account? <a href="/login">Log in</a>
                </div>
            </div>
        </div>
    );
};

export default UserRegistrationPage;