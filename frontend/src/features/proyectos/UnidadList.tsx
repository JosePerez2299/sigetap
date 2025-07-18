import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Pagination,
  Paper,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import { UnidadCard } from './UnidadCard';
import { type UnidadType } from '../../types/generalTypes';

interface UnidadesListProps {
  unidades: UnidadType[];
  loading?: boolean;
  error?: string | null;
  // Propiedades para paginación
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  // Callback opcional para click en card
  onUnidadClick?: (unidad: UnidadType) => void;
}

const UnidadesList: React.FC<UnidadesListProps> = ({
  unidades,
  loading = false,
  error = null,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onUnidadClick,
}) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header con información de paginación */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Unidades
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mostrando {startItem} - {endItem} de {totalItems} unidades
        </Typography>
      </Box>

      {/* Grid de cards */}
      {unidades.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            bgcolor: 'grey.50',
            border: '2px dashed',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No hay unidades disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No se encontraron unidades para mostrar
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {unidades.map((unidad) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={unidad.id}>
              <UnidadCard
                unidad={unidad}
                onClick={onUnidadClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 500,
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default UnidadesList;
