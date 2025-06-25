
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';
import SecuritySettings from './SecuritySettings';
import PasswordDialog from './dialogs/PasswordDialog';
import DeleteAccountDialog from './dialogs/DeleteAccountDialog';

const SettingsSection = ({ onThemeChange }) => {
    const theme = useTheme();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: true,
        darkMode: localStorage.getItem('darkMode') === 'true' || false
    });

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            const isDarkMode = savedDarkMode === 'true';
            setSettings(prev => ({ ...prev, darkMode: isDarkMode }));
            if (onThemeChange) {
                onThemeChange(isDarkMode ? 'dark' : 'light');
            }
        } else {
            
            setSettings(prev => ({ ...prev, darkMode: prefersDarkMode }));
            localStorage.setItem('darkMode', prefersDarkMode.toString());
            if (onThemeChange) {
                onThemeChange(prefersDarkMode ? 'dark' : 'light');
            }
        }
    }, [onThemeChange, prefersDarkMode]);

    const handleSettingChange = (setting) => (event) => {
        const newValue = event.target.checked;
        setSettings({
            ...settings,
            [setting]: newValue
        });

        
        if (setting === 'darkMode') {
            localStorage.setItem('darkMode', newValue.toString());
            if (onThemeChange) {
                onThemeChange(newValue ? 'dark' : 'light');
            }
        }
    };

    const toggleShowPassword = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 0 } }}>
                <NotificationSettings
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />

                <AppearanceSettings
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />

                <SecuritySettings
                    isMobile={isMobile}
                    onPasswordDialogOpen={() => setOpenPasswordDialog(true)}
                    onDeleteDialogOpen={() => setOpenDeleteDialog(true)}
                />
            </Box>

            <PasswordDialog
                open={openPasswordDialog}
                onClose={() => setOpenPasswordDialog(false)}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
            />

            <DeleteAccountDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                showPassword={showPassword.current}
                toggleShowPassword={() => toggleShowPassword('current')}
            />
        </motion.div>
    );
};

export default SettingsSection;