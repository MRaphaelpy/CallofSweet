import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Cake as CakeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const PersonalInfoForm = ({ userData, tempUserData, editing, validationErrors, handleChange }) => {
    const formatBirthday = (dateString) => {
        if (!dateString) return '';
        const str = String(dateString);
        if (str.includes('/')) return str;
        const [year, month, day] = str.split('-');
        if (!year || !month || !day) return '';
        return `${day}/${month}/${year}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };


    const commonStyles = {
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
            color: 'text.primary'
        },
        '& .MuiInputBase-root': {
            borderRadius: 1.5,
        },
        '& .MuiInputAdornment-root': {
            mr: 1.2,
            my: 0,
            height: '100%',
            alignItems: 'center',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '1.2rem',
        },

        '& .MuiInput-underline:after': {
            borderBottomStyle: 'none',
        },
        '& .MuiOutlinedInput-root': editing ? {
            '&:hover fieldset': {
                borderColor: 'primary.main',
                borderWidth: '1px',
            },
        } : {},

        '& .MuiOutlinedInput-notchedOutline': {
            borderStyle: 'solid',
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomStyle: 'none',
        },
        '& .MuiFilledInput-underline:before': {
            borderBottomStyle: 'solid',
        },

        '&& .Mui-focused': {
            outline: 'none',
        },
        '&& :focus': {
            outline: 'none',
        },
        '&& :focus-visible': {
            outline: 'none',
        },
        mb: 1
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ width: '100%' }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <TextField
                                fullWidth
                                label="Nome completo"
                                name="name"
                                value={editing ? tempUserData.name : userData.name}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? "outlined" : "filled"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ height: '100%' }}>
                                            <PersonIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    readOnly: !editing,
                                    disableUnderline: true
                                }}
                                error={!!validationErrors.name}
                                helperText={validationErrors.name}
                                sx={commonStyles}
                                required={editing}
                            />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <TextField
                                fullWidth
                                label="E-mail"
                                name="email"
                                type="email"
                                value={editing ? tempUserData.email : userData.email}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? "outlined" : "filled"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ height: '100%' }}>
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    readOnly: !editing,
                                    disableUnderline: true
                                }}
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                                sx={commonStyles}
                                required={editing}
                            />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <TextField
                                fullWidth
                                label="Telefone"
                                name="phone"
                                value={editing ? tempUserData.phone : userData.phone}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? "outlined" : "filled"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ height: '100%' }}>
                                            <PhoneIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    readOnly: !editing,
                                    disableUnderline: true
                                }}
                                error={!!validationErrors.phone}
                                helperText={validationErrors.phone || (editing ? "(XX) XXXXX-XXXX" : "")}
                                sx={commonStyles}
                                required={editing}
                            />
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <TextField
                                fullWidth
                                label="Data de nascimento"
                                name="birthday"
                                type={editing ? "date" : "text"}
                                value={editing ? tempUserData.birthday : formatBirthday(userData.birthday)}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? "outlined" : "filled"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ height: '100%' }}>
                                            <CakeIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    readOnly: !editing,
                                    disableUnderline: true
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!validationErrors.birthday}
                                helperText={validationErrors.birthday}
                                sx={commonStyles}
                                required={editing}
                            />
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </AnimatePresence>
    );
};

export default PersonalInfoForm;