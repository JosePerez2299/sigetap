import { userServices } from "../services/userServices";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const {
    data: user,
    isLoading: loadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => userServices.getUser(),
  });

  return { user, loadingUser, errorUser };
};
