
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import { Box } from '@mui/material';

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Box sx={{ padding: '20px' }}>
    <main >
      <Container>
        <Outlet />
      </Container>
    </main>
    </Box>
  </>
);

export default MainLayout;