import React from "react";
import {
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { type ProyectoType } from "../types/generalTypes";
import { Business, Group, Info, Person, Today, ArrowForwardIos } from "@mui/icons-material";
import utils from "../utils";
import getEstadoColor from "../utils/getProyectStateColor";

const ProyectoList = ({ proyecto, handleOpen }: { proyecto: ProyectoType, handleOpen: (proyecto: ProyectoType) => void }) => {
 



  const formatearFecha = (fecha: Date): string => {
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const progreso = utils.calculateProgress(proyecto.tareas_completadas, proyecto.tareas_total);

  return (
    <Paper
      elevation={0}
      onClick={() => handleOpen(proyecto)}
      sx={{
        cursor: "pointer",
        p: 2,
        mb: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 1,
          backgroundColor: "action.hover",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Lado izquierdo - Información principal */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
          {/* Título y estado */}
          <Box sx={{ minWidth: 200 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Tooltip title={proyecto.nombre}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "150px",
                  }}
                >
                  {proyecto.nombre}
                </Typography>
              </Tooltip>
              <Chip
                label={proyecto.estado}
                sx={{
                  backgroundColor: getEstadoColor(proyecto.estado),
                  color: "white",
                  fontSize: "0.7rem",
                  height: 20,
                }}
                size="small"
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.8rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "180px",
              }}
            >
              {proyecto.descripcion}
            </Typography>
          </Box>

          {/* Información en columnas */}
          <Stack direction="row" spacing={3} sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Person sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                  Líder
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  {proyecto.lider.username}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", minWidth: 100 }}>
              <Group sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                  Miembros
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  {proyecto.miembros_total}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Business sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                  Unidad
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100px",
                  }}
                >
                  {proyecto.unidad_responsable}
                </Typography>
              </Box>
            </Box>
                  
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 100 }}>
              <Today sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                  Fecha fin
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  {formatearFecha(proyecto.fecha_fin)}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* Progreso */}
          <Box sx={{ minWidth: 150 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                Progreso
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
                {Math.round(progreso)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progreso}
              sx={{ 
                height: 6, 
                borderRadius: 1,
                mb: 0.5
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "text.secondary", textAlign: "center" }}>
              {proyecto.tareas_completadas}/{proyecto.tareas_total} tareas
            </Typography>
          </Box>
        </Box>

        {/* Lado derecho - Botón de acción */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleOpen(proyecto);
          }}
          sx={{ 
            ml: 2,
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            }
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ProyectoList;