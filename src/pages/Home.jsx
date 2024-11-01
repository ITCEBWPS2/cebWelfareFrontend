import React from "react";
import HorizontalCarousel from "../components/HorizontalCarousel";
import LinesImage from "@/components/Lines";
import MainCarousel from "@/components/MainCarousel";
import LinksSection from "@/components/LinksSection";
import { cover } from "@/assets";

const Home = () => {
  return (
    <div>
      <MainCarousel />
      <div className="wrapper">
        <section className="flex flex-col md:flex-row items-center justify-between bg-soft-green rounded-xl gap-8 py-14 md:py-20 md:gap-28">
          <div className="flex-1 flex justify-center items-center">
            <img className="max-w-full rounded-lg" src={cover} alt="CEB" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-primary mb-4 md:text-5xl md:mb-8">
              ABOUT.
            </h2>
            <p className="text-base text-justify">
              Welcome to our organization! We are committed to providing the
              best services to our members. Our mission is to support and
              enhance the well-being of our community through various programs
              and initiatives. Our team is dedicated to ensuring that our
              members receive the highest level of service and support. We
              believe in the power of community and strive to foster a sense of
              belonging and mutual support among our members.
            </p>
          </div>
        </section>

        <div className="flex flex-col gap-4 md:flex-row">
          {/* Left Sidebar */}
          <div className="bg-red-200 h-fit p-4 rounded-lg md:w-1/4">
            <div>
              <input
                type="text"
                placeholder="Search ..."
                className="w-full border rounded-3xl px-4 py-2 mb-6"
              />
              <ul className="text-red-700 font-medium text-sm">
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
          <div className="md:w-3/4">
            <img
              src="../../../Cover photo.jpg"
              alt="Banner 1"
              className="w-full h-100 object-cover rounded-lg mb-4"
            />

            {/* Article Section */}
            <section className="bg-gray-100 p-4 rounded-lg">
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

      <LinksSection />
    </div>
  );
};

export default Home;
