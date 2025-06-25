

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const ErrorFallback = ({ message, onRetry }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            textAlign: 'center'
        }}>
            <WarningIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
                {message || 'Something went wrong'}
            </Typography>
            {onRetry && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onRetry}
                    sx={{ mt: 2 }}
                >
                    Try Again
                </Button>
            )}
        </Box>
    );
};

export default ErrorFallback;