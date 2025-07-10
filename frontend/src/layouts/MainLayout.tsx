
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default MainLayout;