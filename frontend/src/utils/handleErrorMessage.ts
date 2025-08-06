import { ERROR_MESSAGES } from "./errorMessages";
// Definir la interfaz ApiError
export interface ApiError extends Error {
  status?: number;
  response?: {
    status?: number;
    data?: any;
  };
  userMessage?: string;
  errorCode?: string;
}

// Función para determinar el mensaje de error basado en el status y contexto
const getErrorMessageByStatus = (status: number): string => {
  return ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.DEFAULT;
};

// Función para extraer mensaje específico del backend
const extractBackendMessage = (errorData: any): string | null => {
  // Django REST Framework
  if (typeof errorData === "object" && errorData?.detail) {
    return errorData.detail;
  }
  
  // Mensajes field-specific
  if (typeof errorData === "object" && errorData) {
    const fieldErrors = Object.entries(errorData)
      .filter(([key, value]) => Array.isArray(value) || typeof value === 'string')
      .map(([key, value]) => {
        const messages = Array.isArray(value) ? value : [value];
        return messages.join(' ');
      })
      .filter(msg => msg.length > 0);
    
    if (fieldErrors.length > 0) {
      return fieldErrors.join(' ');
    }
  }
  
  // Si es string directamente
  if (typeof errorData === "string") {
    return errorData;
  }
  
  return null;
};

// Función para mapear errores específicos del backend a mensajes globales
const mapBackendErrorToGlobal = (backendMessage: string, status?: number): string => {
  const lowerMessage = backendMessage.toLowerCase();
  
  // Mapear errores comunes del backend
  if (lowerMessage.includes('user not found') || lowerMessage.includes('usuario no encontrado')) {
    return ERROR_MESSAGES.USER_NOT_FOUND;
  }
  
  if (lowerMessage.includes('email already exists') || lowerMessage.includes('correo ya existe')) {
    return ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
  }
  
  if (lowerMessage.includes('invalid credentials') || lowerMessage.includes('credenciales inválidas')) {
    return ERROR_MESSAGES.INVALID_CREDENTIALS;
  }
  
  if (lowerMessage.includes('session expired') || lowerMessage.includes('sesión expirada')) {
    return ERROR_MESSAGES.SESSION_EXPIRED;
  }
  
  if (lowerMessage.includes('permission denied') || lowerMessage.includes('sin permisos')) {
    return ERROR_MESSAGES.PERMISSION_DENIED;
  }
  
  // Si no hay mapeo específico, usar el mensaje del backend o el genérico por status
  return backendMessage;
};

// Función para obtener el mensaje de error apropiado
export const getErrorMessage = (
  error: any,
  defaultMsg?: string
): string => {
  // Si el error ya tiene un mensaje de usuario procesado
  if ((error as ApiError)?.userMessage) {
    return (error as ApiError).userMessage!;
  }
  
  const status = error?.response?.status || error?.status;
  
  // Errores de red
  if (error?.code === 'NETWORK_ERROR' || error?.message === 'Network Error') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
    return ERROR_MESSAGES.TIMEOUT;
  }
  
  // Si hay respuesta del servidor
  if (error?.response?.data) {
    const backendMessage = extractBackendMessage(error.response.data);
    
    if (backendMessage) {
      return mapBackendErrorToGlobal(backendMessage, status);
    }
  }
  
  // Mensaje basado en status HTTP
  if (status) {
    return getErrorMessageByStatus(status);
  }
  
  console.error("getErrorMessage - Error no manejado:", error);
  return defaultMsg || ERROR_MESSAGES.DEFAULT;
};

// Función que crea un ApiError con la estructura correcta para React Query
export const createApiError = (
  originalError: any,
  customMessage?: string,
  errorCode?: string
): ApiError => {
  const userMessage = customMessage || getErrorMessage(originalError);
  const apiError = new Error(userMessage) as ApiError;
  
  // Preservar información del status para React Query
  apiError.status = originalError?.response?.status || originalError?.status;
  apiError.response = originalError?.response;
  
  // Información adicional
  apiError.userMessage = userMessage;
  apiError.errorCode = errorCode;
  
  // Preservar stack trace si existe
  if (originalError?.stack) {
    apiError.stack = originalError.stack;
  }
  
  return apiError;
};

// Función específica para lanzar errores desde services
export const throwServiceError = (
  originalError: any,
  customMessage?: string,
  errorCode?: string
): never => {
  throw createApiError(originalError, customMessage, errorCode);
};

// Función legacy para mantener compatibilidad
export const handleErrorMessage = (
  error: any,
  msg?: string
): ApiError => {
  return createApiError(error, msg);
};

// Hook para usar en React Query
export const useErrorMessage = () => {
  return {
    getErrorMessage,
    createApiError,
    ERROR_MESSAGES,
  };
};

// Utilidades específicas para casos comunes
export const ErrorUtils = {
  isNotFound: (error: any): boolean => {
    const status = error?.response?.status || error?.status;
    return status === 404;
  },
  
  isUnauthorized: (error: any): boolean => {
    const status = error?.response?.status || error?.status;
    return status === 401;
  },
  
  isForbidden: (error: any): boolean => {
    const status = error?.response?.status || error?.status;
    return status === 403;
  },
  
  isValidationError: (error: any): boolean => {
    const status = error?.response?.status || error?.status;
    return status === 400 || status === 422;
  },
  
  isServerError: (error: any): boolean => {
    const status = error?.response?.status || error?.status;
    return status >= 500;
  },
};