import { privateApi } from "../../../api/privateApi";
import { urls } from "../../../api/urls";
import type { UserType } from "../types/User";
import type { TreeNodeData } from "../../proyectos/types/Tree";
import { throwServiceError } from "../../../utils/handleErrorMessage";

const getUser = async (): Promise<UserType> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const {data}: {data: UserType} = await privateApi.get(urls.user);
    try {
        return data;
    } catch (error) {
        throw throwServiceError(error);
    }
};

const getHierarchy = async (root: string): Promise<TreeNodeData[]> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const {data}: {data: TreeNodeData[]} = await privateApi.get(urls.hierarchy  + root);
    try {
        return data;
    } catch (error) {
        throw throwServiceError(error);
    }
};
    
export const userServices = {
    getUser,
    getHierarchy,
};