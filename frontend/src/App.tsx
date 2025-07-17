import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';


const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />

    <AppRoutes />
  </BrowserRouter>
);

export default App;