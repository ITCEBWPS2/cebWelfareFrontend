import React from "react";
import MainCarousel from "@/components/MainCarousel";
import LinksSection from "@/components/LinksSection";
import { cover } from "@/assets";
import NewsSection from "@/components/NewsSection";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";

const Home = () => {
  return (
    <div>
      <MainCarousel />
      <div className="wrapper">
        <section
          id="about"
          className="mt-14 flex flex-col md:flex-row items-center justify-between bg-soft-green rounded-xl gap-8 py-7 md:py-14 md:gap-28"
        >
          <div
            className="flex-1 flex justify-center items-center"
            data-aos="slide-in"
          >
            <img className="max-w-full rounded-lg" src={cover} alt="CEB" />
          </div>
          <div className="flex-1" data-aos="slide-in">
            <h2 className="hidden font-heading text-4xl font-bold text-center mb-4 md:text-6xl md:mb-8 md:text-left md:block">
              About
            </h2>
            <p className="text-base">
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

        <NewsSection />
        <Benefits />
        <Contact />
      </div>
      <LinksSection />
    </div>
  );
};

export default Home;
