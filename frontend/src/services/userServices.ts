import { privateApi } from "../api/privateApi";
import { urls } from "../api/urls";
import type { UserType } from "../types/generalTypes";

const getUser = async (): Promise<UserType> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const {data}: {data: UserType} = await privateApi.get(urls.user);
    return data;
};
    
export const userServices = {
    getUser,
};