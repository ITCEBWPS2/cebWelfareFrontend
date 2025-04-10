import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const BottomBar = () => {
  return (
    <div className="">
      <div className="bg-red-900 text-white py-8 w-full">
        <div className="wrapper flex justify-between items-center space-y-4 flex-col md:flex-row md:space-y-0">
          <div className="flex-1">
            <div className="flex justify-start space-x-6">
              {/* <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a> */}
            </div>
          </div>
          <Link to="/">
            <p className="flex-1 text-[14px] text-center text-white hover:text-yellow-300">
              © Welfare Society WPS II
            </p>
          </Link>
          <p className="flex-1 text-[14px] text-right text-white">
            Developed by Thanusha Elvitigala
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
