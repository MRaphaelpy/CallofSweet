
import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography, Grid, Divider, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import PersonalInfoForm from './PersonalInfoForm';
import ActionButtons from './ActionButtons';
import NotificationSnackbar from './NotificationSnackbar';

const PersonalInfoSection = () => {
    const theme = useTheme();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });


    const fallbackData = {
        name: 'Ana Silva',
        email: 'ana.silva@email.com',
        phone: '(11) 98765-4321',
        birthday: '1990-05-15',
        address: 'Rua das Flores, 123'
    };

    const [userData, setUserData] = useState(fallbackData);
    const [tempUserData, setTempUserData] = useState({ ...fallbackData });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});


    const getUserId = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).userId : 5;
    };



    useEffect(() => {
        const fetchUserData = async () => {
            setInitialLoading(true);
            try {
                const userId = getUserId();
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);

                const formattedData = {
                    id: response.data.id,
                    name: response.data.name || fallbackData.name,
                    email: response.data.email || fallbackData.email,
                    phone: response.data.phone || fallbackData.phone,
                    birthday: response.data.birthday || fallbackData.birthday,
                    address: response.data.address || fallbackData.address,
                    role: response.data.role
                };

                setUserData(formattedData);
                setTempUserData(formattedData);
                setFetchError(null);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setFetchError("Não foi possível carregar os dados do usuário. Usando dados de exemplo.");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempUserData({
            ...tempUserData,
            [name]: value
        });

        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: null
            });
        }
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > 5 * 1024 * 1024) {
                setSnackbar({
                    open: true,
                    message: 'A imagem não deve exceder 5MB',
                    severity: 'error'
                });
                return;
            }

            setAvatarFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!tempUserData.name?.trim()) {
            errors.name = 'Nome é obrigatório';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!tempUserData.email?.trim() || !emailRegex.test(tempUserData.email)) {
            errors.email = 'Email inválido';
        }


        const phoneRegex = /^\d{10,15}$/;
        if (tempUserData.phone && !phoneRegex.test(tempUserData.phone.replace(/\D/g, ''))) {
            errors.phone = 'Telefone inválido. Deve conter entre 10 e 15 dígitos.';
        }

        if (!tempUserData.birthday) {
            errors.birthday = 'Data de nascimento é obrigatória';
        } else {
            const birthDate = new Date(tempUserData.birthday);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();

            if (isNaN(birthDate.getTime())) {
                errors.birthday = 'Data inválida';
            } else if (age < 18) {
                errors.birthday = 'É necessário ter pelo menos 18 anos';
            }
        }

        if (!tempUserData.address?.trim()) {
            errors.address = 'Endereço é obrigatório';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: 'Verifique os campos com erro antes de salvar',
                severity: 'error'
            });
            return;
        }

        setLoading(true);

        try {
            const userId = getUserId();


            const profileUpdateData = {
                name: tempUserData.name,
                email: tempUserData.email,
                phone: tempUserData.phone,
                birthday: tempUserData.birthday

            };


            await axios.put(
                `http://localhost:8080/api/v1/users/${userId}/profile`,
                profileUpdateData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );


            setUserData({
                ...userData,
                name: profileUpdateData.name,
                email: profileUpdateData.email,
                phone: profileUpdateData.phone,
                birthday: profileUpdateData.birthday
            });

            setEditing(false);
            setSnackbar({
                open: true,
                message: 'Dados atualizados com sucesso!',
                severity: 'success'
            });


            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                console.log("Avatar would be uploaded here");
            }

        } catch (error) {
            console.error("Failed to update user:", error);
            setSnackbar({
                open: true,
                message: 'Erro ao atualizar os dados. Por favor, tente novamente.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTempUserData({ ...userData });
        setAvatarPreview(null);
        setAvatarFile(null);
        setEditing(false);
        setValidationErrors({});
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;

            return date.toISOString().split('T')[0];
        } catch (error) {
            return dateString;
        }
    };


    const formatPhone = (phone) => {
        if (!phone) return '';


        const cleaned = phone.replace(/\D/g, '');

        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 10)}`;
        }

        return phone;
    };

    useEffect(() => {

        if (userData !== fallbackData) {
            setUserData(prev => ({
                ...prev,
                birthday: formatDate(prev.birthday),
                phone: formatPhone(prev.phone)
            }));

            setTempUserData(prev => ({
                ...prev,
                birthday: formatDate(prev.birthday),
                phone: formatPhone(prev.phone)
            }));
        }
    }, [userData.id]);

    if (initialLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-container"
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'visible',
                    boxShadow: theme.shadows[editing ? 6 : 3],
                    transition: 'box-shadow 0.3s ease-in-out'
                }}
            >
                {fetchError && (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        {fetchError}
                    </Alert>
                )}

                {editing && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            p: 1,
                            textAlign: 'center',
                            zIndex: 1
                        }}
                    >
                        <Typography variant="subtitle2">
                            Modo de edição ativo
                        </Typography>
                    </Box>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ mt: editing ? 2 : 0 }}>
                        <Grid item xs={12}>
                            <Box sx={{ zIndex: 0, position: 'relative' }}>
                                <ProfileHeader
                                    userData={userData}
                                    editing={editing}
                                    avatarPreview={avatarPreview}
                                    handleAvatarChange={handleAvatarChange}
                                />
                            </Box>
                            <Divider sx={{ my: 3 }} />
                        </Grid>

                        <PersonalInfoForm
                            userData={userData}
                            tempUserData={tempUserData}
                            editing={editing}
                            validationErrors={validationErrors}
                            handleChange={handleChange}
                        />

                        <Grid item xs={12}>
                            <Divider sx={{ mb: 3, mt: 1 }} />
                            <ActionButtons
                                editing={editing}
                                loading={loading}
                                setEditing={setEditing}
                                handleCancel={handleCancel}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <NotificationSnackbar
                snackbar={snackbar}
                handleSnackbarClose={handleSnackbarClose}
            />
        </motion.div>
    );
};

export default PersonalInfoSection;