import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Benefits,
  Contact,
  About,
  Loans,
  Login,
  RegisterMember,
  Members,
  ViewMember,
} from "./pages";
import MainLayout from "./components/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  // A wrapper to handle redirection based on authentication
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token"); // Check authentication status
    //return isAuthenticated ? children : <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Route for login page without MainLayout */}
        <Route path="/login" element={<Login />} />

        {/* Routes that use MainLayout for authenticated users */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/benefits" element={<Benefits />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/registermember" element={<RegisterMember />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/members/:memberId" element={<ViewMember />} />
                  <Route path="/viewmember" element={<ViewMember />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
