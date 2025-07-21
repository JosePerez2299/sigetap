import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Group as GroupIcon,
  FolderOpen as ProjectIcon,
} from "@mui/icons-material";

export interface UnidadType {
  id: number;
  nombre: string;
  codigo: string;
  proyectos_total: number;
  miembros_total: number;
}

interface UnidadCardProps {
  unidad: UnidadType;
  onClick?: (unidad: UnidadType) => void;
}

export const UnidadCard: React.FC<UnidadCardProps> = ({ unidad, onClick }) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick(unidad);
    }
  };

  return (
    <Box>
      <Tooltip placement="top" title={`Ver proyectos de ${unidad.nombre}`}>
        <Card
          sx={{
            height: "100%",
            cursor: onClick ? "pointer" : "default",
            transition: "all 0.3s ease",
            "&:hover": onClick
              ? {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                }
              : {},
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.1)",
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&:hover::before": onClick
              ? {
                  opacity: 1,
                }
              : {},
          }}
          onClick={handleClick}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  mr: 2,
                  width: 48,
                  height: 48,
                }}
              >
                <BusinessIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: "white",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {unidad.nombre}
                </Typography>
                <Chip
                  label={unidad.codigo}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 500,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProjectIcon sx={{ fontSize: 20, mr: 1, opacity: 0.9 }} />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    {unidad.proyectos_total}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    Proyectos
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GroupIcon sx={{ fontSize: 20, mr: 1, opacity: 0.9 }} />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    {unidad.miembros_total}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    Miembros
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Tooltip>
    </Box>
  );
};
