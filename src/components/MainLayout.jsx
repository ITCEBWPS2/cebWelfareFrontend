// src/components/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LinesImage from './Lines';
import Wrapper from './Wrapper';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <LinesImage className="w-full h-auto" />
      <Wrapper>
      {children}
      </Wrapper>
      <Footer />

    </div>
  );
};

export default MainLayout;

