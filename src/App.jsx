import "./App.css";
import React from "react";
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
  Events,
  About,
  ManageDeathFunds,
  DeathFunds,
  ManageScholarships,
  ManageMedicals,
  ManageRefunds,
  ManageRetirements,
  Scholarships,
  Medicals,
  Refunds,
} from "./pages";
import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MyLoans from "./pages/dashboard/MyLoans";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that use MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
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
              path="/dashboard/apply-loan"
              element={<LoanApplicationPage />}
            />
            <Route path="/dashboard/deathfunds" element={<DeathFunds />} />
            <Route path="/dashboard/scholarships" element={<Scholarships />} />
            <Route path="/dashboard/medicals" element={<Medicals />} />
            <Route path="/dashboard/refunds" element={<Refunds />} />
            <Route path="/dashboard/my-loans" element={<MyLoans />} />
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
              <Route
                path="/dashboard/benefits/deathfunds"
                element={<ManageDeathFunds />}
              />
              <Route
                path="/dashboard/benefits/scholarships"
                element={<ManageScholarships />}
              />
              <Route
                path="/dashboard/benefits/medicals"
                element={<ManageMedicals />}
              />
              <Route
                path="/dashboard/benefits/refunds"
                element={<ManageRefunds />}
              />
              <Route
                path="/dashboard/benefits/retirements"
                element={<ManageRetirements />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
