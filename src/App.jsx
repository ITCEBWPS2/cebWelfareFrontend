import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Benefits,
  Contact,
  About,
  Loans,
  Login,
  Register,
  MemberBenefits,
  MemberLoans,
  Members,
  RegisterMember,
  Relatives,
  ViewMember,
  AdminPanel,
  ViewUsers,
} from "./pages";
import MainLayout from "./components/MainLayout.jsx";
import LoanApplication from "./pages/members/LoanApplication.jsx";
import LoanApplicationForm from "./components/LoanApplicationForm.jsx";
import ProfileCard from "./pages/members/ProfileCard.jsx";

function App() {
  return (
    <div className="appBackground">
      <Router>
        <Routes>
          {/* Set Login page as the default */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/relatives" element={<Relatives />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/viewusers" element={<ViewUsers />} />
          <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/benefits" element={<Benefits />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/registermember" element={<RegisterMember />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/viewmember" element={<ViewMember />} />
                  <Route
                    path="/loanapplicationform"
                    element={<LoanApplicationForm />}
                  />
                  <Route path="/profilecard" element={<ProfileCard />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   Home,
//   Benefits,
//   Contact,
//   About,
//   Loans,
//   Login,
//   Register,
//   MemberBenefits,
//   MemberLoans,
//   Members,
//   RegisterMember,
//   Relatives,
//   ViewMember,
//   AdminPanel,
//   ViewUsers,
// } from "./pages"; // Ensure you import AdminPanel and ViewUsers
// import MainLayout from "./components/MainLayout.jsx";
// import LoanApplication from "./pages/members/LoanApplication.jsx";
// import LoanApplicationForm from "./components/LoanApplicationForm.jsx";
// import ProfileCard from "./pages/members/ProfileCard.jsx";

// function App() {
//   return (
//     <div className="appBackground">
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/relatives" element={<Relatives />} />
//           <Route path="/admin" element={<AdminPanel />} />
//           <Route path="/viewusers" element={<ViewUsers />} />
//           <Route
//             path="*"
//             element={
//               <MainLayout>
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/benefits" element={<Benefits />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/loans" element={<Loans />} />
//                   <Route path="/registermember" element={<RegisterMember />} />
//                   <Route path="/members" element={<Members />} />
//                   <Route path="/viewmember" element={<ViewMember />} />
//                   <Route
//                     path="/loanapplicationform"
//                     element={<LoanApplicationForm />}
//                   />
//                   <Route path="/profilecard" element={<ProfileCard />} />
//                 </Routes>
//               </MainLayout>
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
