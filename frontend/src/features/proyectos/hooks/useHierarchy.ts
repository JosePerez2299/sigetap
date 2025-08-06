import { useQuery } from "@tanstack/react-query";
import { useTreeState } from "../hooks/useTreeState";
import { userServices } from "../../users/services/userServices";

export const useHierarchy = (codigoUnidad?: string) => {
    const query = useQuery({
        queryKey: ["hierarchy", codigoUnidad],
        queryFn: () => userServices.getHierarchy(codigoUnidad!),
        enabled: !!codigoUnidad,
      });
    
      // Usar el hook personalizado para manejar el estado
      const { selectedNode, selectedNodeId, handleNodeSelect, clearSelection } =
        useTreeState();
  return {
    ...query,
    selectedNode,
    selectedNodeId,
    handleNodeSelect,
    clearSelection,
  };
};
