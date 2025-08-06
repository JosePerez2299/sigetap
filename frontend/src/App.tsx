import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./api/tanStackQuery";
import { QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default App;
