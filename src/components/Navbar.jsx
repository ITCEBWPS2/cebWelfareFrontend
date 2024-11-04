// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // Change background when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-10">
      <nav
        className={`absolute z-10 top-0 py-4 w-full ${
          scrolled ? "bg-red-900" : "bg-transparent"
        } transition-colors duration-300`}
      >
        <div className="wrapper flex-between">
          {/* Logo Section */}
          <Link to="/">
            <div className="flex-center gap-2">
              <img src="/cebcare.png" alt="CEB Logo" className="h-8 md:h-12" />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block space-x-6 font-medium">
            <Link to="/" className="text-white hover:text-yellow-300">
              Home
            </Link>
            <a href="#about" className="text-white hover:text-yellow-300">
              About
            </a>
            <a href="#news" className="text-white hover:text-yellow-300">
              Events
            </a>
            <a href="/members" className="text-white hover:text-yellow-300">
              Members
            </a>
            <a href="#benefits" className="text-white hover:text-yellow-300">
              Benefits
            </a>
            <a href="#contact" className="text-white hover:text-yellow-300">
              Contact
            </a>
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
                    <img src="/cebcare.png" alt="CEB Logo" className="h-12" />
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
                  <a to="#about" className="text-white hover:text-yellow-300">
                    About
                  </a>
                  <a href="#news" className="text-white hover:text-yellow-300">
                    Events
                  </a>
                  <a
                    href="/members"
                    className="text-white hover:text-yellow-300"
                  >
                    Members
                  </a>
                  <a
                    href="#benefits"
                    className="text-white hover:text-yellow-300"
                  >
                    Benefits
                  </a>
                  <a
                    href="#contact"
                    className="text-white hover:text-yellow-300"
                  >
                    Contact
                  </a>
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
    </div>
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
