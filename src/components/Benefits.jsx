import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { annual_meeting, blood_donation, main_header_1 } from "@/assets";

const slides = [
  {
    image: main_header_1,
    text: "WELOCME TO WELFARE SOCIETY CEB (WPS II)",
    subText:
      "We’re here to support each other and create a strong community where everyone feels valued. Our society is committed to enhancing the well-being of all our members, offering financial assistance, benefits, and a reliable network of support. Through our various programs, we aim to improve the quality of life for each member, helping you feel connected and cared for within our community. Thank you for being a part of WPS II—we’re glad to have you with us!",
  },
  {
    image: annual_meeting,
    text: "ANNUAL MEETING",
    subText:
      "The Welfare Society (WPS II) recently held its Annual Meeting for 2024, marking a successful gathering dedicated to fostering unity, growth, and mutual support within our community. Attendees included members and leaders committed to discussing past achievements, upcoming initiatives, and shared goals aimed at enhancing welfare services. This group photo captures the spirit of teamwork and dedication that drives WPS II forward, reflecting our collective commitment to a brighter future for all members.",
    buttonText: "READ FULL STORY",
    buttonLink: "#news",
  },
  {
    image: blood_donation,
    text: "BLOOD DONATION",
    subText:
      "The Welfare Society recently organized a successful blood donation event, uniting members and volunteers to support a crucial cause. This event embodies the society's commitment to giving back and making a meaningful impact in the community. With the collective efforts of all participants, the blood donation drive served as a reminder of the power of compassion and solidarity in helping those in need.",
    buttonText: "READ FULL STORY",
    buttonLink: "#news",
  },
  {
    image: main_header_1,
    text: "WELOCME TO WELFARE SOCIETY CEB (WPS II)",
    subText:
      "We’re here to support each other and create a strong community where everyone feels valued. Our society is committed to enhancing the well-being of all our members, offering financial assistance, benefits, and a reliable network of support. Through our various programs, we aim to improve the quality of life for each member, helping you feel connected and cared for within our community. Thank you for being a part of WPS II—we’re glad to have you with us!  Thank you!",
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
