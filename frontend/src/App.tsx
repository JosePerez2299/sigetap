import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <AppRoutes />
  </BrowserRouter>
);

export default App;