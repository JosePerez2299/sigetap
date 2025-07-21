import { useEffect, useState } from "react";
import UnidadList from "../../components/UnidadList";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useUnidades } from "../../hooks/useUnidades";
import Loading from "../../components/Loading";

const Unidades = () => {
  const {unidades, totalItems, pageSize, currentPage, loading, setCurrentPage} = useUnidades();
  const handlePageChange = (page: number) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(page);
  };  
  return (
    <>

    {loading ? <CircularProgress /> : (
      <Box sx={{ p: 2 }}>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Unidades
          </Typography>
        </Box>
        <UnidadList
          unidades={unidades}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </Box>
    )}
    </>
  );
};

export default Unidades;
