
import React from 'react';
import { Typography, Box, FormControlLabel, Switch } from '@mui/material';

const SettingItem = ({ label, description, checked, onChange }) => {
    return (
        <Box sx={{ mb: 1.5 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body1" fontWeight={500}>
                        {label}
                    </Typography>
                }
            />
            {description && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 3.5, mb: description ? 2 : 0 }}
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
};

export default SettingItem;