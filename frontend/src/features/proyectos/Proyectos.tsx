import {
  Box,
  CircularProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  type EstadoProyectoType,
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
import { useDebounce } from "../../hooks/useDebounce";

const Proyectos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    proyectos,
    totalItems,
    pageSize,
    loading,
    estadisticas,
    error,
    filters,
    setFilters,
  } = useProyectos();

  const [debouncedSearchTerm, cancelSearchTerm] = useDebounce(
    (searchTerm: string) => {
      setFilters({ ...filters, searchTerm }); // Resetear a la primera página cuando se cambia la búsqueda
    },
    1000
  );

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [ordenarPor, setOrdenarPor] = useState("nombre");
  const [searchTermHeader, setSearchTermHeader] = useState("");

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  // Handlers para el header
  const handleFiltroEstadoChange = (estado: EstadoProyectoType| "todos") => {
    setFiltroEstado(estado);
    setFilters({ ...filters, filterBy: estado }); // Resetear a la primera página cuando se cambia el filtro
  };

  const handleOrdenarPorChange = (ordenar: string) => {
    setOrdenarPor(ordenar);
    setFilters({ ...filters, sortBy: ordenar }); // Resetear a la primera página cuando se cambia el ordenamiento
  };

  const handleSearchChangeHeader = (search: string) => {
    setSearchTermHeader(search);
    debouncedSearchTerm(search);
  };
 

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
            proyectos={proyectos}
            totalProyectos={totalItems}
            currentPage={filters.page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </Paper>
    </>
  );
};

export default Proyectos;
