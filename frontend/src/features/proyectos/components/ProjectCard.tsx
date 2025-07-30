import type { ProyectoType } from "../../../types/generalTypes";
import getEstadoColor from "../../../utils/getProyectStateColor";
import { formatDate } from "../../../utils/formatDate";
import { Building2, Calendar, User } from "lucide-react";
import { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";

const ProjectCard = ({
  proyecto,
  onClick,
}: {
  proyecto: ProyectoType;
  onClick?: (proyecto: ProyectoType) => void;
}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const progressPercentage =
    proyecto.tareas_total > 0
      ? Math.round((proyecto.tareas_completadas / proyecto.tareas_total) * 100)
      : 0;

  const handleProjectClick = () => {
    setModalOpen(true);
    if (onClick) onClick(proyecto);
  };

  return (
    <>
      {" "}
      {proyecto && (
        <li
          className="list-row border border-base-300 hover:border-primary/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={handleProjectClick}
        >
          {/* Avatar/Icono del proyecto */}
          <div className="avatar avatar-placeholder">
            <div className="w-12 rounded-full bg-primary text-primary-content">
              <span className="text-lg font-bold">
                {proyecto.codigo.slice(0, 2)}
              </span>
            </div>
          </div>

          {/* Información principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-base truncate">
                {proyecto.nombre}
              </span>
              <span
                className={`badge badge-sm ${getEstadoColor(proyecto.estado)}`}
              >
                {proyecto.estado}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs opacity-70">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {formatDate(proyecto.fecha_inicio)} -{" "}
                  {formatDate(proyecto.fecha_fin)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{proyecto.lider.username}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>{proyecto.lider.unidad.codigo}</span>
              </div>
            </div>
          </div>

          {/* Progreso compacto */}
          <div className="text-right min-w-0">
            <div className="text-xs font-medium mb-1">
              {proyecto.tareas_completadas}/{proyecto.tareas_total}
            </div>
            <div className="w-16 bg-base-300 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  progressPercentage === 100
                    ? "bg-success"
                    : progressPercentage >= 50
                    ? "bg-primary"
                    : progressPercentage > 0
                    ? "bg-warning"
                    : "bg-base-300"
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs opacity-60 mt-0.5">
              {progressPercentage}%
            </div>
          </div>
        </li>
      )}

      <ProjectDetailModal
        proyecto={proyecto}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />  
    </>
  );
};

export default ProjectCard;
