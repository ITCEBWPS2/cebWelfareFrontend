// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-red-900 py-4">
      <div className="wrapper flex-between">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex-center gap-2">
            <img
              src="/Picture2.jpg"
              alt="CEB Logo"
              className="h-8 w-8 md:w-12 md:h-12"
            />
            <div className="text-yellow-300 text-lg font-semibold">
              CEB (WPS II)
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:block space-x-6 font-medium">
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
          <button onClick={handleLogout} className="button-yellow-outline">
            Login
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-white" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="text-left bg-red-900 border-none"
            >
              <Link to="/">
                <div className="flex items-center mb-7 mt-2 gap-2">
                  <img
                    src="/Picture2.jpg"
                    alt="CEB Logo"
                    className="h-12 w-12"
                  />
                  <div className="text-yellow-300 text-lg font-semibold">
                    CEB (WPS II)
                  </div>
                </div>
              </Link>
              <SheetHeader className="text-left">
                <SheetTitle className="text-white dark:text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-5">
                <Link to="/" className="text-white hover:text-yellow-300">
                  Home
                </Link>
                <Link
                  to="/members"
                  className="text-white hover:text-yellow-300"
                >
                  Members
                </Link>
                <Link
                  to="/Benefits"
                  className="text-white hover:text-yellow-300"
                >
                  Benefits
                </Link>
                <Link to="/loans" className="text-white hover:text-yellow-300">
                  Loans
                </Link>
                <Link to="/about" className="text-white hover:text-yellow-300">
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-yellow-300"
                >
                  Contact
                </Link>
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="button-yellow-outline"
                >
                  Login
                </button>
              </nav>
            </SheetContent>
          </Sheet>
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
