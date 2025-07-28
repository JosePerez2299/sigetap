import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartLine,
  faHome,
  faList,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../routes/Routes";
import { useSelector } from "react-redux";
import type { RootState } from "../store/RootState";
const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navLinks = [
    { label: "Inicio", icon: faHome, to: ROUTES.DASHBOARD },
    { label: "Proyectos", icon: faList, to: ROUTES.PROYECTOS },
    { label: "Auditoría", icon: faUserGroup, to: ROUTES.AUDITORY },
    { label: "Estadísticas", icon: faChartLine, to: ROUTES.STATS },
  ];

  const location = useLocation();
  const currentPage = location.pathname;
  return (
    <div className="navbar sticky top-0 z-50 justify-between bg-base-200 text-base-content shadow-sm px-4 gap-4">
      {/* Logo */}
      <div className="">
        <Link to={ROUTES.DASHBOARD} className="  btn btn-ghost text-xl">
          <span className="bg-gradient-to-r text-xl from-primary to-secondary bg-clip-text text-transparent">
            SIGETAP
          </span>
        </Link>
      </div>

      {/* Enlaces */}
      <div className="">
        <ul className="menu menu-md menu-horizontal gap-2 ">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={currentPage === link.to ? "bg-primary text-primary-content" : ""}>
                <FontAwesomeIcon icon={link.icon} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Notificaciones y Perfil */}
      <div className="flex-none space-x-4">
        {/* Notificaciones */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FontAwesomeIcon icon={faBell} size="lg" />
              <span className="badge badge-xs indicator-item badge-secondary">
                8
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        {/* Perfil */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle">
            <div className="avatar avatar-placeholder">
              <div className="w-12 rounded-full bg-primary text-primary-content">
                <span className="text-lg font-bold">JG</span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to={ROUTES.LOGOUT}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
