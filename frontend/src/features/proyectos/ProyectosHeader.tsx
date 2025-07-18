import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Tooltip,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
} from '@mui/material';
import {
  FolderOpen,
  FilterList,
  Sort,
  Dashboard,
  Business,
  Schedule,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  NavigateNext,
  Refresh,
  Settings,
  Search,
  Clear,
} from '@mui/icons-material';

import { EstadoProyectoEnum } from '../../types/generalTypes';
import getEstadoColor from '../../utils/getProyectStateColor';

// Tipos para las props
interface ProyectoHeaderProps {
  filtroEstado: string;
  ordenarPor: string;
  searchTerm: string;
  onFiltroEstadoChange: (estado: string) => void;
  onOrdenarPorChange: (ordenar: string) => void;
  onSearchChange: (search: string) => void;
}

// Datos dummy para la demostración
const unidadReporta = {
  id: 1,
  nombre: "Dirección General de Tecnología",
  codigo: "DGT"
};

const unidadActual = {
  id: 2,
  nombre: "Subdirección de Desarrollo de Software",
  codigo: "SDS"
};

const estadisticasProyectos = {
  total: 24,
  planificado: 5,
  ejecucion: 12,
  pausado: 2,
  finalizado: 5
};

const ProyectoHeader: React.FC<ProyectoHeaderProps> = ({
  filtroEstado,
  ordenarPor,
  searchTerm,
  onFiltroEstadoChange,
  onOrdenarPorChange,
  onSearchChange,
}) => {
  const theme = useTheme();

  const estadoOptions = [
    { value: 'todos', label: 'Todos los Estados', icon: <Dashboard />, count: estadisticasProyectos.total },
    { value: EstadoProyectoEnum.Planificado, label: 'Planificado', icon: <Schedule />, count: estadisticasProyectos.planificado },
    { value: EstadoProyectoEnum.Ejecucion, label: 'En Ejecución', icon: <PlayCircle />, count: estadisticasProyectos.ejecucion },
    { value: EstadoProyectoEnum.Pausado, label: 'Pausado', icon: <PauseCircle />, count: estadisticasProyectos.pausado },
    { value: EstadoProyectoEnum.Finalizado, label: 'Finalizado', icon: <CheckCircle />, count: estadisticasProyectos.finalizado },
  ];

  const sortOptions = [
    { value: 'nombre', label: 'Nombre del Proyecto' },
    { value: 'fecha_inicio', label: 'Fecha de Inicio' },
    { value: 'fecha_fin', label: 'Fecha de Fin' },
    { value: 'progreso', label: 'Progreso' },
    { value: 'estado', label: 'Estado' },
    { value: 'lider', label: 'Líder del Proyecto' },
  ];


  const handleClearSearch = () => {
    onSearchChange('');
  };

  const conteoActual = filtroEstado === 'todos' 
    ? estadisticasProyectos.total 
    : estadoOptions.find(e => e.value === filtroEstado)?.count || 0;

  return (
    <Box sx={{ mb: 2 }}>
      {/* Header Principal Compacto */}
      <Card 
        elevation={0} 
        sx={{ 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          mb: 1.5
        }}
      >
        <CardContent sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            {/* Lado izquierdo - Título e info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                }}
              >
                <FolderOpen sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                  Proyectos
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  {unidadActual.nombre}
                </Typography>
              </Box>
            </Box>

            {/* Lado derecho - Estadísticas y acciones */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Estadísticas compactas */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                {estadoOptions.slice(1).map((estado) => (
                  <Tooltip key={estado.value} title={`${estado.count} ${estado.label}`}>
                    <Chip
                      icon={React.cloneElement(estado.icon, { sx: { fontSize: 14 } })}
                      label={estado.count}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.7rem',
                        backgroundColor: alpha(getEstadoColor(estado.value), 0.1),
                        color: getEstadoColor(estado.value),
                        border: `1px solid ${alpha(getEstadoColor(estado.value), 0.3)}`,
                        '& .MuiChip-icon': {
                          color: getEstadoColor(estado.value),
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              
              {/* Botones de acción */}
              <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                <Tooltip title="Actualizar">
                  <IconButton size="small" color="primary">
                    <Refresh fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Configuración">
                  <IconButton size="small" color="primary">
                    <Settings fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          {/* Breadcrumbs compactos */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ 
                '& .MuiBreadcrumbs-separator': { color: 'primary.main', mx: 0.5 },
                '& .MuiBreadcrumbs-ol': { fontSize: '0.8rem' }
              }}
            >
              <Link
                color="inherit"
                href="#"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Business sx={{ mr: 0.5, fontSize: 14 }} />
                {unidadReporta.codigo}
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 600, fontSize: '0.8rem' }}>
                <Business sx={{ mr: 0.5, fontSize: 14 }} />
                {unidadActual.codigo}
              </Box>
            </Breadcrumbs>
            
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {conteoActual} proyectos
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Filtros y Ordenamiento Compactos */}
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexWrap: { xs: 'wrap', lg: 'nowrap' }
          }}>
            {/* Buscador de texto */}
            <TextField
              size="small"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ 
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      sx={{ padding: 0.5 }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Filtro por Estado */}
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: 180,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                },
              }}
            >
              <InputLabel 
                id="filtro-estado-label" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 0.5,
                  backgroundColor: 'background.paper',
                  px: 0.5,
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                }}
              >
                <FilterList fontSize="small" />
                Estado
              </InputLabel>
              <Select
                labelId="filtro-estado-label"
                value={filtroEstado}
                onChange={(e) => onFiltroEstadoChange(e.target.value)}
                label="Estado"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        fontSize: '0.9rem',
                      },
                    },
                  },
                }}
              >
                {estadoOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      {React.cloneElement(option.icon, { 
                        sx: { fontSize: 16, color: getEstadoColor(option.value) } 
                      })}
                      <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>{option.label}</Typography>
                      <Typography 
                        sx={{ 
                          fontSize: '0.8rem', 
                          color: 'text.secondary',
                          backgroundColor: alpha(getEstadoColor(option.value), 0.1),
                          px: 0.5,
                          py: 0.25,
                          borderRadius: 0.5,
                          minWidth: 20,
                          textAlign: 'center',
                        }}
                      >
                        {option.count}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Ordenar por */}
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: 160,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                },
              }}
            >
              <InputLabel 
                id="ordenar-por-label"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 0.5,
                  backgroundColor: 'background.paper',
                  px: 0.5,
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                }}
              >
                <Sort fontSize="small" />
                Ordenar
              </InputLabel>
              <Select
                labelId="ordenar-por-label"
                value={ordenarPor}
                onChange={(e) => onOrdenarPorChange(e.target.value)}
                label="Ordenar"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        fontSize: '0.9rem',
                      },
                    },
                  },
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Typography sx={{ fontSize: '0.9rem' }}>{option.label}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Filtros activos */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, flexWrap: 'wrap' }}>
              {filtroEstado !== 'todos' && (
                <Chip
                  icon={React.cloneElement(estadoOptions.find(e => e.value === filtroEstado)?.icon || <Dashboard />, { sx: { fontSize: 14 } })}
                  label={estadoOptions.find(e => e.value === filtroEstado)?.label}
                  onDelete={() => onFiltroEstadoChange('todos')}
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    backgroundColor: alpha(getEstadoColor(filtroEstado), 0.1),
                    color: getEstadoColor(filtroEstado),
                    border: `1px solid ${alpha(getEstadoColor(filtroEstado), 0.3)}`,
                    '& .MuiChip-icon': {
                      color: getEstadoColor(filtroEstado),
                    },
                    '& .MuiChip-deleteIcon': {
                      color: getEstadoColor(filtroEstado),
                    },
                  }}
                />
              )}
              {searchTerm && (
                <Chip
                  icon={<Search sx={{ fontSize: 14 }} />}
                  label={`"${searchTerm}"`}
                  onDelete={handleClearSearch}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: 24 }}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProyectoHeader;