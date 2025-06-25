import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    Grid,
    Divider,
    Box,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';
import AddressCard from './AddressCard';
import AddressDialog from './AddressDialog';
import EmptyAddressState from './EmptyAddressState';
import { containerVariants } from './animations';

const AddressSection = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAddress, setCurrentAddress] = useState({
        name: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const getUserId = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).userId : 1;
    };

    const getAuthToken = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData).token : null;
    }

    const parseAddressString = (addressString) => {
        if (!addressString) return {
            street: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            isDefault: true
        };

        try {
            const parts = addressString.split(', ');

            const street = parts.length > 1 ? `${parts[0]}, ${parts[1]}` : parts[0];
            const neighborhood = parts.length > 2 ? parts[2] : '';
            const city = parts.length > 3 ? parts[3] : '';
            const state = parts.length > 4 ? parts[4] : '';
            const zipCode = parts.length > 5 ? parts[5] : '';

            return {
                street,
                neighborhood,
                city,
                state,
                zipCode,
                isDefault: true
            };
        } catch (error) {
            console.error("Error parsing address string:", error);
            return {
                street: addressString || '',
                neighborhood: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: true
            };
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const userId = getUserId();
                const token = getAuthToken();

                const config = token ? {
                    headers: { Authorization: `Bearer ${token}` }
                } : {};

                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, config);
                const userData = response.data;

                if (userData && userData.address) {
                    const parsedAddress = parseAddressString(userData.address);

                    const addressObject = {
                        id: userData.id,
                        name: userData.name || 'Casa',
                        ...parsedAddress
                    };

                    setAddresses([addressObject]);
                } else if (userData && userData.addresses && userData.addresses.length > 0) {
                    setAddresses(userData.addresses.map(addr => ({
                        id: addr.id || userData.id,
                        name: addr.name || 'Casa',
                        street: addr.street || '',
                        neighborhood: addr.neighborhood || '',
                        city: addr.city || '',
                        state: addr.state || '',
                        zipCode: addr.zipCode || '',
                        isDefault: addr.isDefault || false
                    })));
                } else {
                    setAddresses([]);
                }
                setError(null);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Não foi possível carregar seus dados de endereço. Por favor, tente novamente mais tarde.");

                if (process.env.NODE_ENV !== 'production') {
                    setAddresses([{
                        id: 1,
                        name: 'Casa',
                        street: 'Rua das Flores, 123',
                        neighborhood: 'Jardim Primavera',
                        city: 'São Paulo',
                        state: 'SP',
                        zipCode: '01234-567',
                        isDefault: true
                    }]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleOpenDialog = (address = null) => {
        if (address) {
            setCurrentAddress(address);
            setIsEditing(true);
        } else {
            setCurrentAddress({
                name: '',
                street: '',
                neighborhood: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: false
            });
            setIsEditing(false);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveAddress = async (addressData) => {
        const userId = getUserId();
        const token = getAuthToken();

        setLoading(true);
        try {

            const formattedAddress = {
                name: addressData.name || 'Casa',
                street: addressData.street,
                neighborhood: addressData.neighborhood,
                city: addressData.city,
                state: addressData.state,
                zipCode: addressData.zipCode,
                country: "brazil",
                default: addressData.isDefault
            };

            const config = token ? {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            } : { headers: { 'Content-Type': 'application/json' } };

            console.log("Dados do endereço que serão enviados:", formattedAddress);

            let response;

            if (isEditing) {

                response = await axios.put(
                    `http://localhost:8080/api/v1/address/${addressData.id}`,
                    formattedAddress,
                    config
                );
            } else {

                response = await axios.post(
                    `http://localhost:8080/api/v1/address/user/${userId}`,
                    formattedAddress,
                    config
                );
            }


            const savedAddress = response.data;
            const newAddressObject = {
                id: savedAddress.id || Date.now(),
                name: savedAddress.name || addressData.name || 'Casa',
                street: savedAddress.street || addressData.street,
                neighborhood: savedAddress.neighborhood || addressData.neighborhood,
                city: savedAddress.city || addressData.city,
                state: savedAddress.state || addressData.state,
                zipCode: savedAddress.zipCode || addressData.zipCode,
                isDefault: savedAddress.default || addressData.isDefault
            };

            if (isEditing) {

                const updatedAddresses = addresses.map(addr =>
                    addr.id === addressData.id ? newAddressObject : addr
                );
                setAddresses(updatedAddresses);
            } else {


                if (newAddressObject.isDefault) {
                    const updatedAddresses = addresses.map(addr => ({
                        ...addr,
                        isDefault: false
                    }));
                    setAddresses([...updatedAddresses, newAddressObject]);
                } else {
                    setAddresses([...addresses, newAddressObject]);
                }
            }

            setSuccessMessage(isEditing ? "Endereço atualizado com sucesso!" : "Endereço adicionado com sucesso!");
            setShowSuccess(true);
            setOpenDialog(false);
            setError(null);
        } catch (err) {
            console.error("Failed to save address:", err);
            try {

                const tempId = Date.now();
                const addressForStorage = {
                    ...addressData,
                    id: isEditing ? addressData.id : tempId,
                    userId: getUserId(),
                    savedLocally: true
                };


                const storedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');

                if (isEditing) {
                    const updatedStoredAddresses = storedAddresses.map(addr =>
                        addr.id === addressData.id ? addressForStorage : addr
                    );
                    localStorage.setItem('userAddresses', JSON.stringify(updatedStoredAddresses));

                    const updatedAddresses = addresses.map(addr => {
                        if (addr.id === addressData.id) {
                            return { ...addressData, id: addr.id, savedLocally: true };
                        }
                        return addr;
                    });
                    setAddresses(updatedAddresses);
                } else {
                    localStorage.setItem('userAddresses', JSON.stringify([...storedAddresses, addressForStorage]));
                    setAddresses([...addresses, { ...addressData, id: tempId, savedLocally: true }]);
                }

                setSuccessMessage("Endereço salvo localmente (modo offline). Será sincronizado quando possível.");
                setShowSuccess(true);
                setOpenDialog(false);
            } catch (storageErr) {
                setError("Não foi possível salvar o endereço. Por favor, tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (id) => {
        const userId = getUserId();
        const token = getAuthToken();

        setLoading(true);
        try {
            const config = token ? {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            } : { headers: { 'Content-Type': 'application/json' } };

            await axios.delete(
                `http://localhost:8080/api/v1/address/${id}`,
                config
            );

            const updatedAddresses = addresses.filter(addr => addr.id !== id);
            setAddresses(updatedAddresses);

            const storedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
            const updatedStoredAddresses = storedAddresses.filter(addr => addr.id !== id);
            localStorage.setItem('userAddresses', JSON.stringify(updatedStoredAddresses));

            setSuccessMessage("Endereço removido com sucesso!");
            setShowSuccess(true);
            setError(null);
        } catch (err) {
            console.error("Failed to delete address:", err);
            try {

                const updatedAddresses = addresses.filter(addr => addr.id !== id);
                setAddresses(updatedAddresses);


                const storedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
                const updatedStoredAddresses = storedAddresses.filter(addr => addr.id !== id);
                localStorage.setItem('userAddresses', JSON.stringify(updatedStoredAddresses));

                setSuccessMessage("Endereço removido localmente. A sincronização ocorrerá quando possível.");
                setShowSuccess(true);
            } catch (storageErr) {
                setError("Não foi possível remover o endereço. Por favor, tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSetDefaultAddress = async (id) => {

        const userId = getUserId();
        const token = getAuthToken();

        const addressToUpdate = addresses.find(addr => addr.id === id);
        if (!addressToUpdate) return;

        const updatedAddressData = {
            ...addressToUpdate,
            isDefault: true
        };

        setLoading(true);
        try {

            const formattedAddress = {
                street: updatedAddressData.street,
                neighborhood: updatedAddressData.neighborhood,
                city: updatedAddressData.city,
                state: updatedAddressData.state,
                zipCode: updatedAddressData.zipCode,
                country: "brazil",
                default: true
            };

            const config = token ? {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            } : { headers: { 'Content-Type': 'application/json' } };

            await axios.put(
                `http://localhost:8080/api/v1/address/${id}`,
                formattedAddress,
                config
            );


            const updatedAddresses = addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === id
            }));

            setAddresses(updatedAddresses);
            setSuccessMessage("Endereço padrão atualizado com sucesso!");
            setShowSuccess(true);
            setError(null);
        } catch (err) {
            console.error("Failed to set default address:", err);
            setError("Não foi possível definir o endereço padrão. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-container"
        >
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                message={successMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />

            <Box sx={{ mb: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item>
                        <Typography variant="h5" fontWeight="500" sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                            Seus endereços
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                boxShadow: 2,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    transition: 'transform 0.2s ease-in-out'
                                }
                            }}
                        >
                            Adicionar Endereço
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 2, mb: 3 }} />

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : addresses.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Grid container spacing={3}>
                            {addresses.map((address) => (
                                <Grid item xs={12} sm={6} md={4} key={address.id}>
                                    <AddressCard
                                        address={address}
                                        onEdit={handleOpenDialog}
                                        onDelete={handleDeleteAddress}
                                        onSetDefault={handleSetDefaultAddress}
                                        showDefaultToggle={addresses.length > 1}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                ) : (
                    <EmptyAddressState onAddAddress={handleOpenDialog} />
                )}
            </Box>

            <AddressDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveAddress}
                address={currentAddress}
                isEditing={isEditing}
            />
        </motion.div>
    );
};

export default AddressSection;