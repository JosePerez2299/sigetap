import { Link, useNavigate } from "react-router-dom";
import type { ProyectoType } from "../../../types/generalTypes";
import {
  ArrowLeft,
  Info,
  ListIcon,
  ListMinusIcon,
  UserPlusIcon,
  User,
  Columns2,
  ChartBarStacked,
  Calendar1Icon,
  FileIcon,
  Folder,
  FolderClosed,
  SettingsIcon,
  ShareIcon,
  Trash,
  UserXIcon,
  Eye,
} from "lucide-react";
import { formatDate } from "../../../utils/formatDate";
import getProyectStateColor from "../../../utils/getProyectStateColor";
import type { ViewNameType } from "../types/Projects";

interface AsideDetailProps {
  currentView: ViewNameType;
  switchView: (view: ViewNameType) => void;
  proyecto: ProyectoType;
}
const AsideDetail = ({
  currentView,
  switchView,
  proyecto,
}: AsideDetailProps) => {
  const navigate = useNavigate();
  const progress = proyecto.tareas_completadas / proyecto.tareas_total || 0;

  const views = [
    {
      name: "Tableros",
      icon: <Columns2 className="w-4 h-4" />,
      to: `/proyectos/${proyecto.id}/tableros`,
      isActive: currentView === "tableros",
    },
    {
      name: "Gantt",
      icon: <ChartBarStacked className="w-4 h-4" />,
      to: `/proyectos/${proyecto.id}/gantt`,
      isActive: currentView === "gantt",
    },
    {
      name: "Calendar",
      icon: <Calendar1Icon className="w-4 h-4" />,
      to: `/proyectos/${proyecto.id}/calendar`,
      isActive: currentView === "calendar",
    },
    {
      name: "Archivos",
      icon: <FolderClosed className="w-4 h-4" />,
      to: `/proyectos/${proyecto.id}/files`,
      isActive: currentView === "files",
    },
  ];
  return (
    <>
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-br border-base-300 from-base-100 via-base-100 to-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate("/proyectos")}
            className="btn btn-ghost btn-circle btn-sm"
          >
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

        <div className="flex items-center gap-3 pt-2">
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
              <span className="text-xs font-bold text-primary">
                {progress}%
              </span>
            </div>
          </div>
          <div className="">
            <div className="text-sm font-semibold text-base-content/70">
              Progreso
            </div>
            <div className="text-xs text-base-content/70">
              {proyecto?.tareas_completadas || 0}/{proyecto?.tareas_total || 0}{" "}
              completadas
            </div>

            {proyecto && (
              <div
                className={`badge badge-xs  mt-1 ${getProyectStateColor(
                  proyecto?.estado
                )}`}
              >
                {proyecto?.estado}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información del Proyecto */}
      <div className="p-4 border-b border-base-300">
        <h3 className="font-semibold text-base-content mb-2 text-sm">
          Información del Proyecto
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-base-content/70">Inicio:</span>
            <span className="text-xs font-medium text-base-content/70">
              {formatDate(proyecto?.fecha_inicio)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-base-content/70">Fin:</span>
            <span className="text-xs font-medium text-base-content/70">
              {formatDate(proyecto?.fecha_fin)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-base-content/70">Líder:</span>
            <span className="text-xs font-medium text-base-content/70">
              {proyecto?.lider.username}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-base-content/70">Unidad:</span>
            <span className="text-xs font-medium text-base-content/70">
              {proyecto?.unidad_responsable.codigo || ""}
            </span>
          </div>
        </div>
      </div>

      {/* Miembros */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-base-content text-sm">
            Miembros
          </span>
          <div className="tooltip" data-tip="Ver Miembros">
            <button className="btn btn-ghost btn-circle btn-xs btn-primary">
              <Eye className="w-4 h-4"></Eye>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="avatar-group -space-x-3 rtl:space-x-reverse">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="avatar avatar-placeholder">
                <div
                  className={`w-8 rounded-full bg-primary text-primary-content ${
                    index === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <span className="text-md font-bold">JG</span>
                </div>
              </div>
            ))}

            {proyecto?.miembros_total && proyecto.miembros_total > 2 && (
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-6">
                  <span className="text-xs">
                    {proyecto.miembros_total > 99
                      ? "99+"
                      : proyecto.miembros_total}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="join join-horizontal shadow-2xl ">
            <div className=" tooltip" data-tip="Agregar Miembro">
              <button className="join-item btn btn-ghost btn-primary btn-xs  ">
                <UserPlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Vistas */}
      <div className="p-4 border-b border-base-300">
        <h3 className="font-semibold text-base-content mb-2 text-sm">Vistas</h3>
        <div className="space-y-1">
          {views.map((view) => (
            <Link
              key={view.name}
              className={`btn btn-ghost btn-primary w-full flex items-center justify-start gap-2 p-2 rounded-lg text-left text-sm ${
                view.isActive ? "btn-active" : ""
              }`}
              to={view.to}
            >
              {view.icon}
              <span>{view.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto ">
        <button className="btn btn-primary btn-sm w-full mb-2">
          <i className="fas fa-plus mr-1"></i>
          Nueva Tarea
        </button>
      </div>
    </>
  );
};

export default AsideDetail;
