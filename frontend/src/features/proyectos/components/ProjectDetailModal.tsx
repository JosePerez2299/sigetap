// components/ProjectDetailModal.tsx
import React from "react";
import type { ProyectoType } from "../../../types/generalTypes";
import Modal from "../../../components/Modal";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
const ProjectDetailModal = ({
  proyecto,
  isOpen,
  onClose,
}: {
  proyecto: ProyectoType;
  isOpen: boolean;
  onClose: () => void;
}) => {

  const handleViewDetails = () => {
    // Implementar la lógica para ver los detalles del proyecto
    console.log("Ver detalles del proyecto:", proyecto);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={<h3 className="text-lg font-bold">{proyecto.nombre}</h3>}
      footer={
        <button onClick={onClose} className="btn btn-primary btn-sm" type="button">
          Cerrar
        </button>
      }
    >
      <div>
        <p>Nombre: {proyecto.nombre}</p>
        <p>Codigo: {proyecto.codigo}</p>
        <p>Estado: {proyecto.estado}</p>
        <p>Unidad Responsable: {proyecto.unidad_responsable}</p>
        <p>Lider: {proyecto.lider.username}</p>
        <p>Unidad Lider: {proyecto.lider.unidad.codigo}</p>
        <p>Tareas Completadas: {proyecto.tareas_completadas}</p>
        <p>Tareas Total: {proyecto.tareas_total}</p>
        <p>Tareas Pendientes: {proyecto.tareas_pendientes}</p>
        <p>Miembros Total: {proyecto.miembros_total}</p>
        <p> Descripcion: {proyecto.descripcion}</p>
        <Link to={`/proyectos/${proyecto.id}`} className="flex items-center gap-2 cursor-pointer underline text-primary transition-all duration-300 hover:text-primary/70" onClick={handleViewDetails}> Ver informacion detallada <span><Info size={16}  /></span></Link>

      </div>

    </Modal>
  );
};

export default ProjectDetailModal;
