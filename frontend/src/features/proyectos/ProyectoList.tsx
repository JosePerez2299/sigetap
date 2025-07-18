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
import ProyectoListCard from "./ProyectoListCard";
import getEstadoColor from "../../utils/getProyectStateColor";

interface ProyectoListProps {
  proyectos: ProyectoType[];
  totalProyectos?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (searchTerm: string) => void;
}

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
      
      <Box >
      {/* Grid de proyectos - más columnas para cards compactas */}
      {proyectos.map((proyecto) => (
        <ProyectoListCard proyecto={proyecto} handleOpen={abrirDetalle} />
      ))}
      </Box>

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
                  sx ={{
                    backgroundColor: getEstadoColor(proyectoSeleccionado.estado),
                    color: "white",
                  }}
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
                        <Code color="primary"/>
                      </ListItemIcon>
                      <ListItemText
                        primary="Código de proyecto"
                        secondary={proyectoSeleccionado.codigo}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday color="success" />
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
                        <CalendarToday color="error" />
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
                        <Business color="warning" />
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
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: "primary.main" }}>
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
                        <Group color="info"/>
                      </ListItemIcon>
                      <ListItemText
                        primary="Miembros del equipo"
                        secondary={`${proyectoSeleccionado.miembros_total} miembros`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tareas completadas"
                        secondary={`${proyectoSeleccionado.tareas_completadas} de ${proyectoSeleccionado.tareas_total}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PendingActions color="error" />
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


