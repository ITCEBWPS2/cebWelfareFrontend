import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Loans,
  Login,
  RegisterMember,
  AllMembers,
  Dashboard,
  MemberProfile,
  LoanApplicationPage,
  PendingLoans,
  ApprovedLoans,
  RejectedLoans,
} from "./pages";
import MainLayout from "./components/MainLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardLayout from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { useAuth } from "./api/authContext";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Routes that use MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Routes that use DashboardLayout */}
        <Route path="" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/members/:memberId"
              element={<MemberProfile />}
            />
            <Route
              path="/dashboard/loans/apply"
              element={<LoanApplicationPage />}
            />
            <Route path="" element={<AdminRoute />}>
              <Route
                path="/dashboard/members/register"
                element={<RegisterMember />}
              />
              <Route path="/dashboard/members" element={<AllMembers />} />
              <Route path="/dashboard/loans" element={<Loans />} />
              <Route
                path="/dashboard/loans/pending"
                element={<PendingLoans />}
              />
              <Route
                path="/dashboard/loans/approved"
                element={<ApprovedLoans />}
              />
              <Route
                path="/dashboard/loans/rejected"
                element={<RejectedLoans />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
