import { Navigate, Outlet, useParams } from "react-router-dom";
import type { ProyectoType } from "../types/Projects";
import { proyectosServices } from "../services/proyectosServices";
import AsideDetail from "../components/AsideDetail";
import ROUTES from "../../../routes/Routes";
import { useQuery } from "@tanstack/react-query";
import ErrorView from "../../ui/components/ErrorView";
import LoadingView from "../../ui/components/LoadingView";

const ProyectDetailLayout = () => {
  const { id } = useParams();
  // Validar que el id sea un numero
  if (!id || !Number(id)) {
    return <Navigate to={ROUTES.PROYECTOS} />;
  }
  // Obtener el proyecto
  const {
    data: proyecto,
    isLoading,
    error,
  } = useQuery<ProyectoType>({
    queryKey: ["proyecto", id],
    queryFn: () => proyectosServices.getOne(Number(id)),
    enabled: !!id,
    // Opciones para que no refetchee al volver a montar o al enfocar ventana:
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingView />;
  }
  
  if (error) {
    return <ErrorView error={error} />;
  }

  return (
    <>
      {/* Panel principal y aside*/}
      {proyecto && (
        <div className="flex h-full ">
          <div className="w-1/4 min-w-72  bg-base-100 shadow-lg border-r border-base-300 flex flex-col">
            {/* Aside */}
            <AsideDetail proyecto={proyecto} />
          </div>

          {/* Panel principal */}
          <div className="w-3/4 h-full">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default ProyectDetailLayout;
