import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import type { ProyectoType } from "../types/Projects";
import { proyectosServices } from "../services/proyectosServices";
import AsideDetail from "../components/AsideDetail";
import { type ViewNameType } from "../types/Projects";
import ROUTES from "../../../routes/Routes";
import { useQuery } from "@tanstack/react-query";
const ProyectDetailLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [view, setView] = useState<ViewNameType>("tableros");
  const [proyecto, setProyecto] = useState<ProyectoType | null>(null);
  const {
    data: proyectoData,
    isLoading: isLoadingProyecto,
    error: errorProyecto,
  } = useQuery({
    queryKey: ["proyecto", id],
    queryFn: () => proyectosServices.getOne(Number(id)),
    enabled: !!id,
  });

  if (!id) {
    navigate(ROUTES.PROYECTOS);
    return null;
  }

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await proyectosServices.getOne(Number(id));
        console.log(response);
        const data = response;
        console.log(data);

        setProyecto(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProyecto();
  }, [view]);

  const isLoading = proyecto === null;
  return (
    <>
      {/* Loading */}
      {isLoadingProyecto && (
        <div className=" h-[calc(100vh-10vh)] p-4 w-1/4">
          <div className="skeleton h-full w-full"></div>
        </div>
      )}

      {/* Panel principal y aside*/}
      {proyectoData && (
        <div className="flex h-full ">
          <div className="w-1/4 min-w-72  bg-base-100 shadow-lg border-r border-base-300 flex flex-col">
            {/* Aside */}
            <AsideDetail
              proyecto={proyectoData}
            />
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
