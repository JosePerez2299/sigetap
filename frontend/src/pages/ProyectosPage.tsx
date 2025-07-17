import {
  AppBar,
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { type ProyectoType, type UserType } from "../types/generalTypes";
import { ProyectoList, UnidadList } from "../features/proyectos";
import { Search } from "@mui/icons-material";
import { useState } from "react";

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
    estado: "Planificado",
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123456",
    tareas_completadas: 10,
    tareas_total: 20,
    tareas_pendientes: 10,
    miembros_total: 10,
  },

  {
    id: 0,
    nombre: "Proyecto 1",
    descripcion: "Descripcion del proyecto 1",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: "Planificado",
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123456",
    tareas_completadas: 10,
    tareas_total: 20,
    tareas_pendientes: 10,
    miembros_total: 10,
  },
  {
    id: 0,
    nombre: "Proyecto 1",
    descripcion: "Descripcion del proyecto 1",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: "Planificado",
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123456",
    tareas_completadas: 10,
    tareas_total: 20,
    tareas_pendientes: 10,
    miembros_total: 10,
  },
  {
    id: 0,
    nombre: "Proyecto 1",
    descripcion: "Descripcion del proyecto 1",
    fecha_inicio: new Date("2025-07-17"),
    fecha_fin: new Date("2025-07-17"),
    estado: "Planificado",
    unidad_responsable: "Unidad 1",
    lider: lider,
    codigo: "123456",
    tareas_completadas: 10,
    tareas_total: 20,
    tareas_pendientes: 10,
    miembros_total: 10,
  },
];

const unidades: any = [
  {
    id: 1,
    nombre: "Unidad 1",
    lider: lider.username,

    codigo: "123456",
  },

  {
    id: 2,
    nombre: "Unidad 2",
    lider: lider.username,
    codigo: "123456",
  },
];

const ProyectosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const handlePageChange = (page: number) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(page);
  };
  const handleSearch = (term: string) => {
    console.log("Buscando:", term);
    setSearchTerm(term);
  };

  return (
    <div>
      {/* Header con título y buscador */}
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", p: 2 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Proyectos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {proyectos.length} proyectos
            </Typography>
          </Box>

          <TextField
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(event) => handleSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      <Paper elevation={3}>
        <ProyectoList
          proyectos={proyectos}
          totalProyectos={proyectos.length + 1000}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </Paper>
      <UnidadList unidades={unidades} />
    </div>
  );
};

export default ProyectosPage;
