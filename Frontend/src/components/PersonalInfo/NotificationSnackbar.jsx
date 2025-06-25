
import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';

const NotificationSnackbar = ({ snackbar, handleSnackbarClose }) => {
    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%' }}
                icon={snackbar.severity === 'success' ? <CheckIcon fontSize="inherit" /> : undefined}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;