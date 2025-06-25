
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import {
    PersonOutline as PersonIcon,
    HomeOutlined as AddressIcon,
    HistoryOutlined as OrdersIcon,
    SettingsOutlined as SettingsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PersonalInfo from '../../components/PersonalInfo/index';
import PersonalInfoSection from '../../components/PersonalInfo/PersonalInfoSection';
import AddressSection from '../../components/Address/AddressSection';
import OrdersSection from './components/OrdersSection';
import SettingsSection from '../Profile/components/SettingsSection/index';
import './Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <Container maxWidth="lg" className="profile-container">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <Typography variant="h4" component="h1" className="profile-title">
                    Meu Perfil
                </Typography>

                <Paper elevation={3} className="profile-paper">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="profile tabs"
                            className="profile-tabs"
                        >
                            <Tab icon={<PersonIcon />} label="Dados Pessoais" />
                            <Tab icon={<AddressIcon />} label="Endereços" />
                            <Tab icon={<OrdersIcon />} label="Pedidos" />
                            <Tab icon={<SettingsIcon />} label="Configurações" />
                        </Tabs>
                    </Box>

                    <Box className="profile-content">
                        {activeTab === 0 && <PersonalInfoSection />}
                        {activeTab === 1 && <AddressSection />}
                        {activeTab === 2 && <OrdersSection />}
                        {activeTab === 3 && <SettingsSection />}
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Profile;