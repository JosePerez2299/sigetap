import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProyectoType } from "../types/generalTypes";
import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";
import {
  ArrowLeft,
  Info,
  ListIcon,
  ListMinusIcon,
  UserPlusIcon,
  Columns2,
  ChartBarStacked,
  Calendar1Icon,
  FileIcon,
  Folder,
  FolderClosed,
  SettingsIcon,
  ShareIcon,
  Trash,
} from "lucide-react";
const ProyectosDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState<ProyectoType | null>(null);
  const dataCard = [
    {
      label: "Estado",
      value: proyecto?.estado,
      className: "badge badge-warning",
    },
    {
      label: "Fecha Inicio",
      value: proyecto?.fecha_inicio,
      className: "badge-info",
    },
    { label: "Fecha Fin", value: proyecto?.fecha_fin, className: "" },
    {
      label: "Lider",
      value: proyecto?.lider.username,
      className: "badge-info",
    },
    {
      label: "Unidad",
      value: proyecto?.unidad_responsable.nombre,
      className: "badge-info",
    },
    {
      label: "Progreso",
      value: proyecto?.tareas_completadas,
      className: "badge-success",
    },
  ];
  const fetchProyecto = async () => {
    try {
      const response = await privateApi.get(urls.proyectos + `${id}`);
      const data = await response.data;
      setProyecto(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!id) {
      navigate("/proyectos");
    }

    fetchProyecto();
  }, [id]);

  const switchView = (view: string) => {
    console.log(view);
  };

  return (
    <div className="flex h-full ">
      <div className="w-1/4 min-w-72 h-screen-[calc(100vh-10px)] bg-base-100 shadow-lg border-r border-base-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-br border-base-300 from-base-100 via-base-100 to-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <button className="btn btn-ghost btn-circle btn-sm">
              <ArrowLeft className="fas fa-arrow-left text-base-content/70"></ArrowLeft>
            </button>
            <div className="flex-1 space-y-1">
              <h1 className="text-base font-bold text-base-content">
                {proyecto?.nombre}
              </h1>
              <div className="flex items-center gap-1 text-xs text-base-content/70">
                <Info className="w-4 h-4"></Info>
                <span>{proyecto?.codigo}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-base-300 pt-4">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#e5e7eb"
                  stroke-width="3"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#6366f1"
                  stroke-width="3"
                  fill="transparent"
                  stroke-dasharray="125.66"
                  stroke-dashoffset="125.66"
                  className="progress-ring"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">0%</span>
              </div>
            </div>
            <div className="">
              <div className="text-sm font-semibold text-base-content/70">
                Progreso
              </div>
              <div className="text-xs text-base-content/70">
                0/2 completadas
              </div>
              <div className="badge badge-warning badge-xs mt-1">Ejecución</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-base-300">
          <h3 className="font-semibold text-base-content mb-2 text-sm">
            Información del Proyecto
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-base-content/70">Inicio:</span>
              <span className="text-xs font-medium text-base-content/70">
                25/07/2025
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-base-content/70">Fin:</span>
              <span className="text-xs font-medium text-base-content/70">
                24/08/2025
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-base-content/70">Líder:</span>
              <span className="text-xs font-medium text-base-content/70">
                ger1_ger1
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-base-content/70">Unidad:</span>
              <span className="text-xs font-medium text-base-content/70">
                VP001
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-base-content/70">Miembros:</span>
              <span className="text-xs font-medium text-base-content/70">
                99+
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div className="avatar">
                    <div className="w-6">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                ))}

                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-6">
                    <span className="text-xs">99+</span>
                  </div>
                </div>
              </div>
              <div className="tooltip" data-tip="Agregar miembro">
                <button className="btn p-2 btn-ghost btn-primary btn-circle btn-sm  ">
                  <UserPlusIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-base-300">
          <h3 className="font-semibold text-base-content mb-2 text-sm">
            Vistas
          </h3>
          <div className="space-y-1">
            <button
              className="sidebar-item active w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm"
              onClick={() => switchView("tableros")}
            >
              <Columns2 className="w-4 h-4" />
              <span>Tableros</span>
            </button>
            <button
              className="sidebar-item w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm"
              onClick={() => switchView("gantt")}
            >
              <ChartBarStacked className="w-4 h-4" />
              <span>Gantt</span>
            </button>
            <button
              className="sidebar-item w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm"
              onClick={() => switchView("calendar")}
            >
              <Calendar1Icon className="w-4 h-4" />
              <span>Calendario</span>
            </button>
            <button
              className="sidebar-item w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm"
              onClick={() => switchView("files")}
            >
              <FolderClosed className="w-4 h-4" />
              <span>Archivos</span>
            </button>
          </div>
        </div>

        <div className="p-4 mt-auto ">
          <button className="btn btn-primary btn-sm w-full mb-2">
            <i className="fas fa-plus mr-1"></i>
            Nueva Tarea
          </button>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-xs flex-1">
              <SettingsIcon fill="" className="w-4 h-4" />
            </button>
            <button className="btn btn-outline btn-xs flex-1">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        Contenido
      </div>
    </div>
  );
};

export default ProyectosDetailPage;
