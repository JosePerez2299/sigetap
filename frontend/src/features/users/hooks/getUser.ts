import { userServices } from "../services/userServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/RootState";

export const useUser = () => {
  const userStore = useSelector((state: RootState) => state.auth.user);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userStore?.username],
    queryFn: () => userServices.getUser(),
    enabled: !!userStore?.username,
  });

  return { user, isLoading, error };
};
