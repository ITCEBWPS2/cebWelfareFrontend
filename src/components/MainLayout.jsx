// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { Outlet } from "react-router-dom";
import BottomToTop from "./BottomToTop";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomBar />
      <BottomToTop />
    </div>
  );
};

export default MainLayout;
