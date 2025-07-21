// src/components/LoadingOverlay.tsx
import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

type LoadingOverlayProps = {
  text?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ text = 'Loading...' }) => {
  const theme = useTheme();

  return (
    <Box
      // Ocupa toda la pantalla
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: theme.zIndex.modal + 1,          // siempre encima de diálogos/modals
        bgcolor: 'rgba(0, 0, 0, 0.5)',           // fondo semitransparente
        backdropFilter: 'blur(4px)',             // desenfoque
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      <Typography
        variant="h6"
        sx={{ mt: 2, color: theme.palette.common.white }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;
