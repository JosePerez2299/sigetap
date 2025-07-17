import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
  Toolbar,
  AppBar,
} from "@mui/material";
import {
  CalendarToday,
  Person,
  Business,
  Code,
  CheckCircle,
  PendingActions,
  Group,
  Info,
  Search,
  Today,
} from "@mui/icons-material";
import { type ProyectoType } from "../../types/generalTypes";
import ProyectoCard from "./ProyectoCard";

interface ProyectoListProps {
  proyectos: ProyectoType[];
  totalProyectos?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (searchTerm: string) => void;
}

// Función para obtener el color del estado
const getEstadoColor = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "planificado":
      return "info";
    case "en progreso":
      return "warning";
    case "completado":
      return "success";
    case "cancelado":
      return "error";
    default:
      return "default";
  }
};

// Función para formatear fechas de manera compacta
const formatearFecha = (fecha: Date): string => {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatearFechaCompleta = (fecha: Date): string => {
  return fecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Componente principal
const ProyectoList: React.FC<ProyectoListProps> = ({
  proyectos,
  totalProyectos = 0,
  currentPage = 1,
  pageSize = 12,
  onPageChange,
  onSearch,
}) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<ProyectoType | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const abrirDetalle = (proyecto: ProyectoType) => {
    setProyectoSeleccionado(proyecto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProyectoSeleccionado(null);
  };

  const calcularProgreso = (completadas: number, total: number): number => {
    return total > 0 ? (completadas / total) * 100 : 0;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Debounce simulado - en producción usar debounce real
    setTimeout(() => {
      console.log("Buscando:", value);
      onSearch?.(value);
    }, 300);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log("Cambiando a página:", page);
    onPageChange?.(page);
  };

  const totalPages = Math.ceil(totalProyectos / pageSize);

  return (
    <Box sx={{ p: 2 }}>
      {/* Información de resultados */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {proyectos.length} de {totalProyectos} proyectos
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

      {/* Grid de proyectos - más columnas para cards compactas */}
      <Grid container spacing={2}>
        {proyectos.map((proyecto) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={proyecto.id}>
            <ProyectoCard proyecto={proyecto} handleOpen={abrirDetalle} />
          </Grid>
        ))}
      </Grid>

      {/* Modal de detalles */}
      <Dialog open={modalAbierto} onClose={cerrarModal} maxWidth="md" fullWidth>
        {proyectoSeleccionado && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  {proyectoSeleccionado.nombre}
                </Typography>
                <Chip
                  label={proyectoSeleccionado.estado}
                  color={getEstadoColor(proyectoSeleccionado.estado) as any}
                />
              </Box>
            </DialogTitle>

            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {proyectoSeleccionado.descripcion}
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Información General
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Code />
                      </ListItemIcon>
                      <ListItemText
                        primary="Código de proyecto"
                        secondary={proyectoSeleccionado.codigo}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fecha de inicio"
                        secondary={formatearFechaCompleta(
                          proyectoSeleccionado.fecha_inicio
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fecha de fin"
                        secondary={formatearFechaCompleta(
                          proyectoSeleccionado.fecha_fin
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Business />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unidad responsable"
                        secondary={proyectoSeleccionado.unidad_responsable}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Equipo y Progreso
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {proyectoSeleccionado.lider.username.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary="Líder del proyecto"
                        secondary={`${proyectoSeleccionado.lider.username} (${proyectoSeleccionado.lider.email})`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Group />
                      </ListItemIcon>
                      <ListItemText
                        primary="Miembros del equipo"
                        secondary={`${proyectoSeleccionado.miembros_total} miembros`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tareas completadas"
                        secondary={`${proyectoSeleccionado.tareas_completadas} de ${proyectoSeleccionado.tareas_total}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PendingActions />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tareas pendientes"
                        secondary={proyectoSeleccionado.tareas_pendientes}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" gutterBottom>
                  Progreso del proyecto
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={calcularProgreso(
                    proyectoSeleccionado.tareas_completadas,
                    proyectoSeleccionado.tareas_total
                  )}
                  sx={{ mb: 1, height: 8 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {Math.round(
                    calcularProgreso(
                      proyectoSeleccionado.tareas_completadas,
                      proyectoSeleccionado.tareas_total
                    )
                  )}
                  % completado
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={cerrarModal}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ProyectoList;
