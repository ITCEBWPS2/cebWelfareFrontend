// src/components/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <BottomBar />
    </div>
  );
};

export default MainLayout;
