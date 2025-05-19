// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";
import { Outlet } from "react-router-dom";
import BottomToTop from "./BottomToTop";

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomBar />
      <BottomToTop />
    </div>
  );
};

export default MainLayout;
