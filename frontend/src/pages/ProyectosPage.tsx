import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { type ProyectoType, type UserType, EstadoProyectoEnum } from "../types/generalTypes";
import { ProyectoList, UnidadList } from "../features/proyectos";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import ProyectoHeader from "../features/proyectos/ProyectosHeader";

const lider: UserType = {
  id: 1,
  email: "lider@empresa.com",
  username: "userlider",
  first_name: "Lider",
  last_name: "Apellido",
  nom_unidad: "Unidad 1",
  nom_gerencia_general: "Gerencia General 1",
  nom_coordinacion: "Coordinacion 1",
  nom_departamento: "Departamento 1",
  p00: "P00",
};

const proyectos: ProyectoType[] = [
  {
    id: 0,
    nombre: "Proyecto 1",
    descripcion: "Descripcion del proyecto 1",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: EstadoProyectoEnum.Planificado,
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123456",
    tareas_completadas: 10,
    tareas_total: 20,
    tareas_pendientes: 10,
    miembros_total: 10,
  },
  {
    id: 1,
    nombre: "Proyecto 2",
    descripcion: "Descripcion del proyecto 2",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: EstadoProyectoEnum.Ejecucion,
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123457",
    tareas_completadas: 15,
    tareas_total: 25,
    tareas_pendientes: 10,
    miembros_total: 12,
  },
  {
    id: 2,
    nombre: "Proyecto 3",
    descripcion: "Descripcion del proyecto 3",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: EstadoProyectoEnum.Finalizado,
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123458",
    tareas_completadas: 20,
    tareas_total: 20,
    tareas_pendientes: 0,
    miembros_total: 8,
  },
  {
    id: 3,
    nombre: "Proyecto 4",
    descripcion: "Descripcion del proyecto 4",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: EstadoProyectoEnum.Pausado,
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123459",
    tareas_completadas: 5,
    tareas_total: 30,
    tareas_pendientes: 25,
    miembros_total: 15,
  },
];

const unidades: any = [
  {
    id: 1,
    nombre: "Unidad 1",
    codigo: "123456",
    proyectos_total: 10,
    miembros_total: 10,
  },
  {
    id: 2,
    nombre: "Unidad 2",
    codigo: "123456",
    proyectos_total: 10,
    miembros_total: 10,
  },
];

const ProyectosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para el header
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [ordenarPor, setOrdenarPor] = useState('nombre');
  const [searchTermHeader, setSearchTermHeader] = useState('');

  const handlePageChange = (page: number) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    console.log("Buscando:", term);
    setSearchTerm(term);
  };

  // Handlers para el header
  const handleFiltroEstadoChange = (estado: string) => {
    console.log("Cambiando filtro estado:", estado);
    setFiltroEstado(estado);
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el filtro
  };

  const handleOrdenarPorChange = (ordenar: string) => {
    console.log("Cambiando ordenar por:", ordenar);
    setOrdenarPor(ordenar);
  };

  const handleSearchChangeHeader = (search: string) => {
    console.log("Cambiando búsqueda header:", search);
    setSearchTermHeader(search);
    setCurrentPage(1); // Resetear a la primera página cuando se cambia la búsqueda
  };

  // Aquí puedes agregar la lógica para filtrar y ordenar los proyectos
  const filteredProyectos = proyectos.filter(proyecto => {
    const matchesSearch = searchTermHeader === '' || 
      proyecto.nombre.toLowerCase().includes(searchTermHeader.toLowerCase()) ||
      proyecto.codigo.toLowerCase().includes(searchTermHeader.toLowerCase()) ||
      proyecto.lider.first_name.toLowerCase().includes(searchTermHeader.toLowerCase()) ||
      proyecto.lider.last_name.toLowerCase().includes(searchTermHeader.toLowerCase());
    
    const matchesEstado = filtroEstado === 'todos' || proyecto.estado === filtroEstado;
    
    return matchesSearch && matchesEstado;
  });

  // Lógica de ordenamiento
  const sortedProyectos = [...filteredProyectos].sort((a, b) => {
    switch (ordenarPor) {
      case 'nombre':
        return a.nombre.localeCompare(b.nombre);
      case 'fecha_inicio':
        return a.fecha_inicio.getTime() - b.fecha_inicio.getTime();
      case 'fecha_fin':
        return a.fecha_fin.getTime() - b.fecha_fin.getTime();
      case 'estado':
        return a.estado.localeCompare(b.estado);
      case 'lider':
        return `${a.lider.first_name} ${a.lider.last_name}`.localeCompare(`${b.lider.first_name} ${b.lider.last_name}`);
      case 'progreso':
        const progressA = (a.tareas_completadas / a.tareas_total) * 100;
        const progressB = (b.tareas_completadas / b.tareas_total) * 100;
        return progressB - progressA; // Descendente
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Header con título y filtros */}
      <ProyectoHeader 
        filtroEstado={filtroEstado}
        ordenarPor={ordenarPor}
        searchTerm={searchTermHeader}
        onFiltroEstadoChange={handleFiltroEstadoChange}
        onOrdenarPorChange={handleOrdenarPorChange}
        onSearchChange={handleSearchChangeHeader}
      />

      <Paper elevation={3}>
        <ProyectoList
          proyectos={sortedProyectos}
          totalProyectos={filteredProyectos.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </Paper>

      {/* TODO: Seccion de unidades, tambien un header con el buscador por titulo. Seran cards las unidades */}
    </div>
  );
};

export default ProyectosPage;