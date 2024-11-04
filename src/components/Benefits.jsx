import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { annual_meeting, blood_donation, main_header_1 } from "@/assets";

const slides = [
  {
    image: main_header_1,
    text: "WELOCME TO WELFARE SOCIETY CEB (WPS II)",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.",
  },
  {
    image: annual_meeting,
    text: "ANNUAL MEETING",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.",
    buttonText: "READ FULL STORY",
    buttonLink: "#news",
  },
  {
    image: blood_donation,
    text: "BLOOD DONATION",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.",
    buttonText: "READ FULL STORY",
    buttonLink: "#news",
  },
  {
    image: main_header_1,
    text: "WELOCME TO WELFARE SOCIETY CEB (WPS II)",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.",
  },
];

const Benefits = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section id="benefits" className="my-14 min-h-[30rem]">
      <h2 className="main-heading">Benefits</h2>
      <div className="relative h-[30rem] w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full relative">
              <div className="absolute h-full inset-0 bg-black bg-opacity-50">
                <img
                  src={slide.image}
                  alt={slide.text}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
                <div
                  key={current}
                  className="max-w-xl mx-auto px-4 absolute inset-0 flex flex-col justify-center items-center text-center text-white lg:px-0"
                >
                  <h1 className="font-heading text-4xl font-extrabold mb-4 animate-fade-in md:text-6xl">
                    {slide.text}
                  </h1>
                  {slide.subText && (
                    <p className="text-base md:text-lg font-normal mb-4 animate-fade-in-delay">
                      {slide.subText}
                    </p>
                  )}

                  {slide.buttonText && (
                    <a
                      href={slide.buttonLink}
                      className="bg-yellow-300 text-black py-2 px-4 rounded-lg font-semibold animate-fade-in-extra-delay"
                    >
                      {slide.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrent((current - 1 + slides.length) % slides.length)
          }
          className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-25 hover:bg-opacity-35 text-white rounded-full hidden md:block"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-25 hover:bg-opacity-35 text-white rounded-full hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Benefits;
