import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main className="">
      <Outlet />
    </main>
  </>
);

export default MainLayout;
