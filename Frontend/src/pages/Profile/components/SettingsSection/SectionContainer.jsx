
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SectionContainer = ({ icon, title, children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: theme.shadows[2],
                    transform: 'translateY(-2px)',
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main,
                    fontWeight: 600
                }}
            >
                {React.cloneElement(icon, {
                    sx: { mr: 1.5, fontSize: 24 },
                    color: "primary"
                })}
                {title}
            </Typography>
            <Box sx={{ ml: isMobile ? 0 : 4 }}>
                {children}
            </Box>
        </Paper>
    );
};

export default SectionContainer;