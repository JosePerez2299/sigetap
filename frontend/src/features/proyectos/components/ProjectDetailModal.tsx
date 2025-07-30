// OPCIÓN 1: Modal controlado completamente por props (Recomendado)
import React from "react";
import type { ProyectoType } from "../../../types/generalTypes";

const ProjectDetailModal = ({
  proyecto,
  isOpen,
  onClose,
}: {
  proyecto: ProyectoType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si el click fue exactamente en el backdrop, no en sus hijos
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal modal-open" onClick={handleBackdropClick}>
      <div className="modal-box">
        <form method="dialog">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </form>
        
        <h3 className="text-lg font-bold">{proyecto.nombre}</h3>
        <p className="py-4">{proyecto.descripcion}</p>
        
        <div className="modal-action">
          <button 
            onClick={onClose} 
            className="btn"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
