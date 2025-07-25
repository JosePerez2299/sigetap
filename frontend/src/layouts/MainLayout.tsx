
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main className="container mx-auto"  >
      <Outlet />
    </main>
  </>
);

export default MainLayout;