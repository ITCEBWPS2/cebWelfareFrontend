import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Loans,
  Login,
  RegisterMember,
  Members,
  ViewMember,
} from "./pages";
import MainLayout from "./components/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";

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
        {/* Routes that use MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />

        {/* Routes that use DashboardLayout */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/loans" element={<Loans />} />
          <Route
            path="/dashboard/registermember"
            element={<RegisterMember />}
          />
          <Route path="/dashboard/members" element={<Members />} />
          <Route
            path="/dashboard/viewmember/:memberId"
            element={<ViewMember />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
