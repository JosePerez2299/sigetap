import {
  Box,
  CircularProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  type ProyectoType,
  type UserType,
  EstadoProyectoEnum,
} from "../../types/generalTypes";
import { ProyectoList } from ".";
import { useEffect, useState } from "react";
import ProyectoHeader from "../../components/ProyectosHeader";
import { useDispatch } from "react-redux";
import { getAllProyectosThunk } from "../../store/proyectos/proyectosThunks";
import type { AppDispatch } from "../../store/RootState";
import { useProyectos } from "../../hooks/useProyectos";
import LoadingOverlay from "../../components/Loading";

const Proyectos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    proyectos,
    totalItems,
    pageSize,
    currentPage,
    loading,
    setCurrentPage,
    estadisticas,
    error,
  } = useProyectos();

  const [searchTerm, setSearchTerm] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [ordenarPor, setOrdenarPor] = useState("nombre");
  const [searchTermHeader, setSearchTermHeader] = useState("");

  const handlePageChange = (page: number) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(page);
    console.log("currentPage de proyectos:", currentPage);
  };

  const handleSearch = (term: string) => {
    console.log("Buscando:", term);
    setSearchTerm(term);
  };

  // Handlers para el header
  const handleFiltroEstadoChange = (estado: string) => {
    console.log("Cambiando filtro estado:", estado);
    setFiltroEstado(estado);
    setCurrentPage(0); // Resetear a la primera página cuando se cambia el filtro
  };

  const handleOrdenarPorChange = (ordenar: string) => {
    console.log("Cambiando ordenar por:", ordenar);
    setOrdenarPor(ordenar);
  };

  const handleSearchChangeHeader = (search: string) => {
    console.log("Cambiando búsqueda header:", search);
    setSearchTermHeader(search);
    setCurrentPage(0); // Resetear a la primera página cuando se cambia la búsqueda
  };

  // Aquí puedes agregar la lógica para filtrar y ordenar los proyectos
  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesSearch =
      searchTermHeader === "" ||
      proyecto.nombre.toLowerCase().includes(searchTermHeader.toLowerCase()) ||
      proyecto.codigo.toLowerCase().includes(searchTermHeader.toLowerCase()) ||
      proyecto.lider.first_name
        .toLowerCase()
        .includes(searchTermHeader.toLowerCase()) ||
      proyecto.lider.last_name
        .toLowerCase()
        .includes(searchTermHeader.toLowerCase());

    const matchesEstado =
      filtroEstado === "todos" || proyecto.estado === filtroEstado;

    return matchesSearch && matchesEstado;
  });

  // Lógica de ordenamiento
  const sortedProyectos = [...filteredProyectos].sort((a, b) => {
    switch (ordenarPor) {
      case "nombre":
        return a.nombre.localeCompare(b.nombre);
      case "fecha_inicio":
        return a.fecha_inicio.getTime() - b.fecha_inicio.getTime();
      case "fecha_fin":
        return a.fecha_fin.getTime() - b.fecha_fin.getTime();
      case "estado":
        return a.estado.localeCompare(b.estado);
      case "lider":
        return `${a.lider.first_name} ${a.lider.last_name}`.localeCompare(
          `${b.lider.first_name} ${b.lider.last_name}`
        );
      case "progreso":
        const progressA = (a.tareas_completadas / a.tareas_total) * 100;
        const progressB = (b.tareas_completadas / b.tareas_total) * 100;
        return progressB - progressA; // Descendente
      default:
        return 0;
    }
  });

  return (
    <>
      {error && <p> error:{error}</p>}

      <ProyectoHeader
        filtroEstado={filtroEstado}
        ordenarPor={ordenarPor}
        searchTerm={searchTermHeader}
        estadisticas={estadisticas}
        onFiltroEstadoChange={handleFiltroEstadoChange}
        onOrdenarPorChange={handleOrdenarPorChange}
        onSearchChange={handleSearchChangeHeader}
      />
        <Paper elevation={3}>
          <ProyectoList
            proyectos={sortedProyectos}
            totalProyectos={totalItems}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            loading={loading}
          />
        </Paper>
    </>
  );
};

export default Proyectos;
