import { userServices } from "../services/userServices";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => userServices.getUser(),
  });

  return { user, isLoading, error };
};
