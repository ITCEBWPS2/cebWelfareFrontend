// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { Outlet } from "react-router-dom";
import BottomToTop from "./BottomToTop";

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomBar />
      <BottomToTop />
    </div>
  );
};

export default MainLayout;
