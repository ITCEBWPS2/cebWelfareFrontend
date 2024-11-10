// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default MainLayout;
