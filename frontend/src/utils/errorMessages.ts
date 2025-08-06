export const ERROR_MESSAGES = {
    // Errores HTTP específicos
    400: "Los datos enviados no son válidos.",
    401: "No tienes autorización para realizar esta acción.",
    403: "No tienes permisos para acceder a este recurso.",
    404: "El recurso solicitado no fue encontrado.",
    409: "Ya existe un registro con estos datos.",
    422: "Los datos proporcionados contienen errores.",
    429: "Has excedido el límite de peticiones. Intenta más tarde.",
    500: "Error interno del servidor. Intenta más tarde.",
    502: "El servidor no está disponible temporalmente.",
    503: "El servicio no está disponible en este momento.",
    
    // Errores de red
    NETWORK_ERROR: "Error de conexión. Verifica tu internet.",
    TIMEOUT: "La petición tardó demasiado en responder.",
    
    // Errores genéricos
    DEFAULT: "Ocurrió un error inesperado.",
    VALIDATION: "Por favor corrige los errores en el formulario.",
    PERMISSION_DENIED: "No tienes permisos para realizar esta acción.",
    RESOURCE_NOT_FOUND: "El recurso que buscas no existe.",
    
    // Errores específicos de negocio (personaliza según tu app)
    USER_NOT_FOUND: "Usuario no encontrado.",
    EMAIL_ALREADY_EXISTS: "Este correo electrónico ya está registrado.",
    INVALID_CREDENTIALS: "Credenciales inválidas.",
    SESSION_EXPIRED: "Tu sesión ha expirado. Inicia sesión nuevamente.",
    UPLOAD_FAILED: "Error al subir el archivo.",
    INSUFFICIENT_PERMISSIONS: "Permisos insuficientes para esta acción.",
  } as const;
  