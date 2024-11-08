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
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { logout } from "@/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // Change background when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
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
            <a href="#benefits" className="text-white hover:text-yellow-300">
              Benefits
            </a>
            <a href="#contact" className="text-white hover:text-yellow-300">
              Contact
            </a>
            {userInfo ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-yellow-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logoutHandler}
                  className="button-yellow-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="button-yellow-outline">Login</button>
                </Link>
              </>
            )}
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

                  {userInfo ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-white hover:text-yellow-300"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="button-yellow-outline"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="button-yellow-outline">Login</button>
                      </Link>
                    </>
                  )}
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
