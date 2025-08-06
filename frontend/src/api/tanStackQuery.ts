// queryClient.ts
import { QueryClient } from '@tanstack/react-query';

// Definir tipos para errores personalizados si es necesario
interface ApiError {
  status?: number;
  message?: string;
  response?: {
    status?: number;
    data?: any;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown) => {
        const apiError = error as ApiError;
        const status = apiError?.status || apiError?.response?.status;
        console.log('error tanStack',error);
        // No reintentar para errores 4xx (incluyendo 404)
        if (status && status >= 400 && status < 500) {
          return false;
        }
        
        // Para otros errores (5xx, network), reintentar máximo 2 veces
        return failureCount < 2;
      },
      retryDelay: (attemptIndex: number) => 
        Math.min(1000 * 2 ** attemptIndex, 30000),

     
    },
    mutations: {
      retry: false,
    }
  }
});