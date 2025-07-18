import theme from "../theme/theme";
import { EstadoProyectoEnum } from "../types/generalTypes";

const getEstadoColor = (estado: string) => {
    switch (estado) {
          case EstadoProyectoEnum.Planificado:
            return theme.palette.info.main;
          case EstadoProyectoEnum.Ejecucion:
            return theme.palette.warning.main;
          case EstadoProyectoEnum.Pausado:
            return theme.palette.grey[600];
          case EstadoProyectoEnum.Finalizado:
            return theme.palette.success.main;
          default:
            return theme.palette.primary.main;
        }
    };

export default getEstadoColor;