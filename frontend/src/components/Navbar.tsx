import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../routes/Routes';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Logout', path: '#' },

  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Logo / Título */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          {/* Links visibles en desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navLinks.map((item) => (
              <Button key={item.path} component={Link} to={item.path} color="inherit" >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Menu icon visible en mobile */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer para mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((item) => (
              
        // Usa esto (v5):
        <ListItem key={item.label} disablePadding>
          <ListItemButton component="a" href={item.path} onClick={toggleDrawer(false)}>
            <ListItemIcon>{item.path}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
