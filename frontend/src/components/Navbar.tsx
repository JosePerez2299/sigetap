import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App de prueba
        </Typography>

        <Button color="inherit" component={Link} to="/about">
            About
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/"
          sx={{
            ml: 1,
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
