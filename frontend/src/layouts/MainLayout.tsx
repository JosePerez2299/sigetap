
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main className="container max-w-6xl mx-auto p-6 "  >
      <Outlet />
    </main>
  </>
);

export default MainLayout;