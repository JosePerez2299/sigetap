import { Link } from "react-router-dom";
import ROUTES from "../routes/Routes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/RootState";
import { logoutThunk } from "../store/auth/authThunks";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const navLinks = [
    { label: "Dashboard", path: ROUTES.DASHBOARD },
    { label: "Home", path: ROUTES.HOME },
    { label: "About", path: ROUTES.ABOUT },
    { label: "Logout", path: ROUTES.HOME, onClick: handleLogout },
  ];

  return (
    <ul>
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            to={link.path}
            onClick={link.onClick} // solo si existe
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
