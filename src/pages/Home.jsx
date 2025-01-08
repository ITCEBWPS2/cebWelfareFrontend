import React, { useEffect, useRef } from "react";
import MainCarousel from "@/components/MainCarousel";
import LinksSection from "@/components/LinksSection";
import { cover } from "@/assets";
import NewsSection from "@/components/NewsSection";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import { Link } from "react-router-dom";

const Home = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("animate-fade-in");
        } else {
          element.classList.remove("animate-fade-in");
        }
      },
      { threshold: 0.4 }
    );

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

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
            <Link to="/about">
              <button className="mt-4 font-semibold hover:text-red-900 transition-colors duration-200">
                Read More...
              </button>
            </Link>
          </div>
        </section>
        {/* 
        <NewsSection /> */}
        <Benefits />
        {/* <Contact /> */}
      </div>
      {/* <LinksSection /> */}
    </div>
  );
};

export default Home;
