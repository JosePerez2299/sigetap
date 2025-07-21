import React from "react";
import {
  Box,
  Grid,
  Typography,
  Pagination,
  Paper,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import { UnidadCard } from "./UnidadCard";
import { type UnidadType } from "../types/generalTypes";

interface UnidadesListProps {
  unidades: UnidadType[];
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const UnidadesList: React.FC<UnidadesListProps> = ({
  unidades,
  totalItems,
  currentPage,
  pageSize,

  onPageChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log("Cambiando a página:", page);
    onPageChange?.(page);
  };

  const onUnidadClick = (unidad: UnidadType) => {
    console.log("Unidad seleccionada:", unidad);
  };
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" color="text.secondary">
          Mostrando {startItem} - {endItem} de {totalItems} unidades
        </Typography>

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        )}
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {unidades.map((unidad) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={unidad.id}>
            <UnidadCard unidad={unidad} onClick={onUnidadClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UnidadesList;
