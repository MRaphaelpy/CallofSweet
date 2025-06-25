
import React from 'react';
import { Box, Button } from '@mui/material';
import { 
    LockReset as PasswordIcon,
    Delete as DeleteIcon 
} from '@mui/icons-material';
import SectionContainer from './SectionContainer';

const SecuritySettings = ({ isMobile, onPasswordDialogOpen, onDeleteDialogOpen }) => {
    return (
        <SectionContainer icon={<PasswordIcon />} title="Segurança">
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onPasswordDialogOpen}
                    startIcon={<PasswordIcon />}
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Alterar senha
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={onDeleteDialogOpen}
                    sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1
                    }}
                >
                    Excluir conta
                </Button>
            </Box>
        </SectionContainer>
    );
};

export default SecuritySettings;