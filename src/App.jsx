// import "./App.css";
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
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
// } from "./pages";
// import MainLayout from "./components/MainLayout";
// import LoanApplicationForm from "./components/LoanApplicationForm";
// import ProfileCard from "./pages/members/ProfileCard";
// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// function App() {
//   return (
//     <div className="appBackground">
//       <Router>
//         <Routes>
//           {/* Set Login page as the default */}
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           <Route element={<MainLayout />}>
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/about"
//               element={
//                 <ProtectedRoute>
//                   <About />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/benefits"
//               element={
//                 <ProtectedRoute>
//                   <Benefits />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/contact"
//               element={
//                 <ProtectedRoute>
//                   <Contact />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/loans"
//               element={
//                 <ProtectedRoute>
//                   <Loans />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/registermember"
//               element={
//                 <ProtectedRoute>
//                   <RegisterMember />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/members"
//               element={
//                 <ProtectedRoute>
//                   <Members />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/viewmember"
//               element={
//                 <ProtectedRoute>
//                   <ViewMember />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/loanapplicationform"
//               element={
//                 <ProtectedRoute>
//                   <LoanApplicationForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profilecard"
//               element={
//                 <ProtectedRoute>
//                   <ProfileCard />
//                 </ProtectedRoute>
//               }
//             />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

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
