import { EstadoProyectoEnum, type EstadoProyectoType } from "../types/generalTypes";

const getEstadoColor = (estado: EstadoProyectoType) => {
    switch (estado) {
          case EstadoProyectoEnum.Planificado:
            return "badge-info";
          case EstadoProyectoEnum.Ejecucion:
            return "badge-warning";
          case EstadoProyectoEnum.Pausado:
            return "badge-error";
          case EstadoProyectoEnum.Finalizado:
            return "badge-success";
          default:
            return "badge-primary";
        }
    };

export default getEstadoColor;