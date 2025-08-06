import { privateApi } from "../../../api/privateApi";
import { urls } from "../../../api/urls";
import type { UserType } from "../../../types/generalTypes";
import type { TreeNodeData } from "../../proyectos/types/Tree";

const getUser = async (): Promise<UserType> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const {data}: {data: UserType} = await privateApi.get(urls.user);
    return data;
};

const getHierarchy = async (root: string): Promise<TreeNodeData[]> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    const {data}: {data: TreeNodeData[]} = await privateApi.get(urls.hierarchy  + root);

    console.log(data);
    return data;
};
    
export const userServices = {
    getUser,
    getHierarchy,
};