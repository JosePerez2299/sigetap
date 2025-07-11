export const handleErrorMessage = (error: any): string => {
  
    // Si el error viene de una respuesta Axios con data de backend
    if (error?.response?.data) {
      const data = error.response.data;
  
      // Si es un objeto con detail (Django REST Framework)
      if (typeof data === "object" && data.detail) {
        return data.detail;
      }
  
      // Si es un objeto con mensajes field-specific (e.g. {username: ["Este campo..."]})
      if (typeof data === "object") {
        const messages = Object.values(data)
          .flat()
          .join(" ");
        return messages || "Error en la petición.";
      }
  
      // Si es un string directamente
      if (typeof data === "string") {
        return data;
      }
    }
    console.error("handleErrorMessage:", error);
    // Si no se pudo determinar nada
    return "Ocurrió un error inesperado.";
  };
  