// import { Carousel } from 'bootstrap';
import React from "react";
import HorizontalCarousel from "../components/HorizontalCarousel";

const Homepage = () => {
  return (
    // <div className=" justify-center items-center min-h-screen bg-yellow-50">
    <div>
      <HorizontalCarousel />
      {/* <div className="bg-gray-100 font-sans min-h-screen"> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 bg-red-200 p-4 shadow-lg">
            <div>
              <input
                type="text"
                placeholder="Search ..."
                className="w-full border rounded-3xl px-4 py-2 mb-4"
              />
              <ul className="text-red-700 font-bold">
                <li>
                  The Blood Donation Camp was successfully completed on
                  31-10-2023 by the Welfare Association for the 54th Anniversary
                  of Lang.VMA (B.P. II).
                </li>
                <br />
                <li>
                  Western Province South II Welfare Association 14th Annual The
                  general meeting was held on 12-06-2024.
                </li>
              </ul>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-3/4 ml-4">
            {/* Carousel */}
            <div className="bg-red-900 p-4 rounded-2xl shadow-lg mb-4">
              <img
                src="../../../Cover photo.jpg"
                alt="Banner 1"
                className="w-full h-100 object-cover rounded mb-4"
              />
              <img
                src="/banner2.jpg"
                alt="Banner 2"
                className="w-full h-64 object-cover rounded hidden"
              />
            </div>

            {/* Article Section */}
            <section className="bg-white p-4 shadow-lg">
              <h3 className="text-xl font-bold text-red-700">
                Ceylon Electricity Board Welfare Society
              </h3>
              <p className="mt-2 text-gray-600">
                Western Province South II Welfare Association 14th Annual The
                general meeting was held on 12-06-2024.
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Homepage;
