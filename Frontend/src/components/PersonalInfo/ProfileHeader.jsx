import React from 'react';
import { Box, Avatar, IconButton, Tooltip, Typography } from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon 
} from '@mui/icons-material';
import { CameraAltOutlined as CameraIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProfileHeader = ({ userData, editing, avatarPreview, handleAvatarChange }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            mb: 2,
            position: 'relative'
        }}>
            <motion.div
                whileHover={{ scale: editing ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            border: '4px solid white',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                            fontSize: '3rem',
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            transition: 'all 0.3s ease'
                        }}
                        alt={userData.name}
                        src={avatarPreview || "/path-to-profile-pic.jpg"}
                    >
                        {userData.name?.charAt(0).toUpperCase() || <PersonIcon fontSize="large" />}
                    </Avatar>

                    {editing && (
                        <Tooltip title="Alterar foto de perfil">
                            <IconButton
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        transform: 'scale(1.1)'
                                    },
                                    width: 40,
                                    height: 40,
                                    boxShadow: 2,
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <CameraIcon fontSize="small" />
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </motion.div>

            <Box sx={{
                ml: { xs: 0, sm: 3 },
                mt: { xs: 2, sm: 0 },
                textAlign: { xs: 'center', sm: 'left' }
            }}>
                <motion.div layout>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 0.5
                        }}
                    >
                        {userData.name}
                    </Typography>
                </motion.div>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        mb: 0.5
                    }}
                >
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    {userData.email}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        color: 'text.secondary'
                    }}
                >
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.light' }} />
                    {userData.phone}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProfileHeader;