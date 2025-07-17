import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  NotificationsOutlined,
  AccountCircle,
  Settings,
  Logout,
  Person,
  Dashboard,
  Analytics,
  Group,
  Help,
  Search,
  FactCheck,
  ViewList,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import ROUTES from "../routes/Routes";

const ModernAppBar = () => {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);

  // Datos dummy del usuario
  const userData = {
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    role: "Administrador",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
  };

  // Datos dummy de notificaciones
  const notifications = [
    {
      id: 1,
      title: "Nueva tarea asignada",
      description: "Te han asignado una nueva tarea de revisión",
      time: "hace 5 min",
      read: false,
      type: "task",
    },
    {
      id: 2,
      title: "Reunión en 30 minutos",
      description: "Reunión de equipo programada para las 3:00 PM",
      time: "hace 25 min",
      read: false,
      type: "meeting",
    },
    {
      id: 3,
      title: "Informe completado",
      description: "El informe mensual ha sido generado exitosamente",
      time: "hace 1 hora",
      read: true,
      type: "report",
    },
    {
      id: 4,
      title: "Nuevo usuario registrado",
      description: "Un nuevo usuario se ha registrado en el sistema",
      time: "hace 2 horas",
      read: true,
      type: "user",
    },
  ];

  const navigationLinks = [
    {
      name: "Dashboard",
      to: ROUTES.DASHBOARD,
      icon: <Dashboard />,
      active: true,
    },
    {
      name: "Proyectos",
      to: ROUTES.PROYECTOS,
      icon: <ViewList />,
      active: false,
    },

    {
      name: "Auditoría",
      to: ROUTES.AUDITORY,
      icon: <FactCheck />,
      active: false,
    },
    {
      name: "Estadísticas",
      to: ROUTES.STATS,
      icon: <Analytics />,
      active: false,
    },
  ];

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotifications = (event: any) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleOpenMobileMenu = (event: any) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setAnchorElMobile(null);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "task":
        return "📋";
      case "meeting":
        return "📅";
      case "report":
        return "📊";
      case "user":
        return "👤";
      default:
        return "🔔";
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(250, 250, 250, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Logo />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SIGETAP
            </Typography>
          </Box>

          {/* Navigation Links - Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {navigationLinks.map((link) => (
              <Button
                key={link.name}
                startIcon={link.icon}
                variant={link.active ? "contained" : "text"}
                color={link.active ? "primary" : "inherit"}
                component={Link}
                to={link.to}
              >
                {link.name}
              </Button>
            ))}
          </Box>

          {/* User Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Notifications */}
            <IconButton
              onClick={handleOpenNotifications}
              sx={{
                borderRadius: "12px",
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
              }}
            >
              <Badge
                badgeContent={unreadNotifications}
                color="error"
                variant="dot"
                invisible={unreadNotifications === 0}
              >
                <NotificationsOutlined />
              </Badge>
            </IconButton>

            {/* User Info - Desktop */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {userData.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: userData.isOnline
                        ? "#4caf50"
                        : "#f44336",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {userData.role}
                  </Typography>
                </Box>
              </Box>

              <IconButton onClick={handleOpenUserMenu} size="large">
                <Settings />
              </IconButton>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleOpenMobileMenu}
              sx={{
                display: { xs: "flex", md: "none" },
                borderRadius: "12px",
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
          <Chip
            label={userData.role}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>
        <Divider />
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuración</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{
            color: "error.main",
            "&:hover": {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorElNotifications}
        open={Boolean(anchorElNotifications)}
        onClose={handleCloseNotifications}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 350,
            maxWidth: 400,
            borderRadius: "12px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notificaciones
          </Typography>
          {unreadNotifications > 0 && (
            <Typography variant="body2" color="primary.main">
              {unreadNotifications} nuevas
            </Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleCloseNotifications}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                py: 1.5,
                px: 2,
                backgroundColor: notification.read
                  ? "transparent"
                  : alpha(theme.palette.primary.main, 0.04),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <Box sx={{ fontSize: "1.2rem", mt: 0.5 }}>
                  {getNotificationIcon(notification.type)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {notification.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {notification.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {notification.time}
                  </Typography>
                </Box>
                {!notification.read && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      mt: 1,
                    }}
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Box>
        <Divider />
        <MenuItem
          onClick={handleCloseNotifications}
          sx={{
            justifyContent: "center",
            color: "primary.main",
            fontWeight: 500,
            py: 1.5,
          }}
        >
          Ver todas las notificaciones
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorElMobile}
        open={Boolean(anchorElMobile)}
        onClose={handleCloseMobileMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 200,
            borderRadius: "12px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
        </Box>
        <Divider />
        {navigationLinks.map((link) => (
          <MenuItem key={link.name} onClick={handleCloseMobileMenu}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText>{link.name}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleCloseMobileMenu}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMobileMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuración</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMobileMenu} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ModernAppBar;
