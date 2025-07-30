import { EstadoProyectoEnum } from "../types/generalTypes";

const getEstadoColor = (estado: string) => {
    switch (estado) {
          case EstadoProyectoEnum.Planificado:
            return "bg-info";
          case EstadoProyectoEnum.Ejecucion:
            return "bg-warning";
          case EstadoProyectoEnum.Pausado:
            return "bg-gray-600";
          case EstadoProyectoEnum.Finalizado:
            return "bg-success";
          default:
            return "bg-primary";
        }
    };

export default getEstadoColor;