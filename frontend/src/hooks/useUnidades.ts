import { useEffect, useState } from "react";
import type { UnidadType, UnidadTypeResponse } from "../types/generalTypes";
import { proyectosServices } from "../services/proyectosServices";

export const useUnidades = () => {
    const [unidades, setUnidades] = useState<UnidadType[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const fetchUnidades = async () => {
        try {
            setLoading(true);
            const result = await proyectosServices.getAllUnidades( );
            console.log('unidades', result);
            setUnidades(result.unidades);
            setTotalItems(result.totalItems);
            setPageSize(result.pageSize);
            setCurrentPage(result.currentPage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnidades();
    }, [currentPage]);

    return {
        unidades,
        totalItems,
        pageSize,
        currentPage,
        loading,
        setCurrentPage,
    };
};  