import { Navigate } from "react-router-dom"
import { useAuth } from "../features/auth/hooks/useAuth"

function Logout() {
    const { logout } = useAuth()
    // Eliminar cache de tanstack
    localStorage.removeItem("react-query/cache")
    sessionStorage.removeItem("react-query/cache")
    logout()
    return <Navigate to="/login" />
}

export default Logout