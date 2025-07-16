import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Paleta de colores personalizada
const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  }
};

// Configuración de tipografía
const typography = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase' as const,
  },
};

// Tema base
const baseTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary[600],
      light: colors.primary[400],
      dark: colors.primary[800],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[600],
      light: colors.secondary[400],
      dark: colors.secondary[800],
      contrastText: '#ffffff',
    },
    success: {
      main: colors.success[600],
      light: colors.success[400],
      dark: colors.success[800],
      contrastText: '#ffffff',
    },
    warning: {
      main: colors.warning[600],
      light: colors.warning[400],
      dark: colors.warning[800],
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error[600],
      light: colors.error[400],
      dark: colors.error[800],
      contrastText: '#ffffff',
    },
    info: {
      main: colors.primary[600],
      light: colors.primary[400],
      dark: colors.primary[800],
      contrastText: '#ffffff',
    },
    grey: colors.neutral,
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

// Tema claro
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'light',
    background: {
      default: colors.neutral[50],
      paper: '#ffffff',
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
    },
    divider: colors.neutral[200],
    action: {
      active: colors.neutral[600],
      hover: alpha(colors.neutral[600], 0.04),
      selected: alpha(colors.neutral[600], 0.08),
      disabled: colors.neutral[400],
      disabledBackground: alpha(colors.neutral[600], 0.12),
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: colors.neutral[900],
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary[600],
          '&:hover': {
            backgroundColor: colors.primary[700],
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary[300],
          color: colors.primary[700],
          '&:hover': {
            backgroundColor: alpha(colors.primary[600], 0.04),
            borderColor: colors.primary[600],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[400],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[600],
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.neutral[200]}`,
        },
        head: {
          backgroundColor: colors.neutral[50],
          fontWeight: 600,
          color: colors.neutral[900],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: colors.primary[600],
            '&:hover': {
              backgroundColor: alpha(colors.primary[600], 0.08),
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: colors.primary[600],
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.neutral[600],
          '&.Mui-checked': {
            color: colors.primary[600],
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.neutral[600],
          '&.Mui-checked': {
            color: colors.primary[600],
          },
        },
      },
    },
  },
});

// Tema oscuro
const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: colors.neutral[100],
      secondary: colors.neutral[400],
      disabled: colors.neutral[600],
    },
    divider: colors.neutral[800],
    action: {
      active: colors.neutral[400],
      hover: alpha(colors.neutral[400], 0.08),
      selected: alpha(colors.neutral[400], 0.16),
      disabled: colors.neutral[600],
      disabledBackground: alpha(colors.neutral[400], 0.12),
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          color: colors.neutral[100],
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary[600],
          '&:hover': {
            backgroundColor: colors.primary[700],
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary[400],
          color: colors.primary[400],
          '&:hover': {
            backgroundColor: alpha(colors.primary[600], 0.08),
            borderColor: colors.primary[500],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.neutral[700],
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[400],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[500],
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          backgroundColor: colors.neutral[800],
          color: colors.neutral[200],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#1a1a1a',
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.neutral[800]}`,
        },
        head: {
          backgroundColor: colors.neutral[900],
          fontWeight: 600,
          color: colors.neutral[200],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: colors.primary[500],
            '&:hover': {
              backgroundColor: alpha(colors.primary[500], 0.08),
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: colors.primary[500],
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.neutral[400],
          '&.Mui-checked': {
            color: colors.primary[500],
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.neutral[400],
          '&.Mui-checked': {
            color: colors.primary[500],
          },
        },
      },
    },
  },
});

// Función para obtener el tema según el modo
export const getTheme = (mode = 'light') => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Exportar ambos temas
export { lightTheme, darkTheme };
export default lightTheme;

// Ejemplo de uso:
/*
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourAppContent />
    </ThemeProvider>
  );
}
*/