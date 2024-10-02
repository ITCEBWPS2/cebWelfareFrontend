// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-red-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/Picture2.jpg" alt="CEB Logo" className="h-12 w-12" />
        <div className="text-yellow-300 text-lg font-semibold">
          <Link to="/">Welfare Society CEB (WPS II)</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-yellow-300">
            Home
          </Link>
          <Link to="/members" className="text-white hover:text-yellow-300">
            Members
          </Link>
          <Link to="/Benefits" className="text-white hover:text-yellow-300">
            Benefits
          </Link>
          <Link to="/loans" className="text-white hover:text-yellow-300">
            Loans
          </Link>
          <Link to="/about" className="text-white hover:text-yellow-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-yellow-300">
            Contact
          </Link>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-yellow-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// // src/components/Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-red-900 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//       <img src="/Picture2.jpg" alt="CEB Logo" className="h-12 w-12" />
//         <div className="text-yellow-300 text-lg font-semibold">
//           <Link to="/">Welfare Society CEB ( WPS II )</Link>
//         </div>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
//           <Link to="/members" className="text-white hover:text-yellow-300">Members</Link>
//           <Link to="/Benefits" className="text-white hover:text-yellow-300">Benefits</Link>
//           <Link to="/loans" className="text-white hover:text-yellow-300">Loans</Link>
//           <Link to="/about" className="text-white hover:text-yellow-300">About</Link>
//           <Link to="/contact" className="text-white hover:text-yellow-300">Contact</Link>
//           <Link to="/login" className="text-white hover:text-yellow-300">Logout</Link>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
