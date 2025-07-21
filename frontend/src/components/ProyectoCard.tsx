import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Tooltip,
  CardActions,
  Button,
  LinearProgress,
} from "@mui/material";
import { type ProyectoType } from "../types/generalTypes";
import { Business, Group, Info, Person, Today } from "@mui/icons-material";

const ProyectoCard = ({ proyecto, handleOpen }: { proyecto: ProyectoType, handleOpen: (proyecto: ProyectoType) => void }) => {
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

  const calcularProgreso = (completadas: number, total: number): number => {
    return total > 0 ? (completadas / total) * 100 : 0;
  };


  const formatearFecha = (fecha: Date): string => {
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Card
      onClick={() => handleOpen(proyecto)}
      sx={{
        cursor: "pointer",
        height: 280,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Header de la card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Tooltip title={proyecto.nombre}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "70%",
              }}
            >
              {proyecto.nombre}
            </Typography>
          </Tooltip>
          <Chip
            label={proyecto.estado}
            color={getEstadoColor(proyecto.estado) as any}
            size="small"
            sx={{ fontSize: "0.7rem" }}
          />
        </Box>

        {/* Descripción compacta */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            fontSize: "0.8rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.4rem",
          }}
        >
          {proyecto.descripcion}
        </Typography>

        {/* Información compacta en rows */}
        <Box sx={{ mb: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person sx={{ mr: 0.5, fontSize: 14 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {proyecto.lider.username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Group sx={{ mr: 0.5, fontSize: 14 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {proyecto.miembros_total}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Business sx={{ mr: 0.5, fontSize: 14 }} />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "120px",
                }}
              >
                {proyecto.unidad_responsable}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Today sx={{ mr: 0.5, fontSize: 14 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {formatearFecha(proyecto.fecha_fin)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Progreso compacto */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "0.75rem" }}
              color="text.secondary"
            >
              Progreso
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.75rem" }}
              color="text.secondary"
            >
              {proyecto.tareas_completadas}/{proyecto.tareas_total}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={calcularProgreso(
              proyecto.tareas_completadas,
              proyecto.tareas_total
            )}
            sx={{ height: 6, borderRadius: 1 }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ pt: 0, pb: 1 }}>
        <Button
          size="small"
          onClick={() => handleOpen(proyecto)}
          startIcon={<Info />}
          sx={{ fontSize: "0.75rem" }}
        >
          Detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProyectoCard;
