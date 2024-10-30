import React, { useState, useEffect } from "react";
import "../../public/1681549012528.jpg";

const slides = [
  {
    image: "../../public/1681549012528.jpg",
    text: "Welfare Society CEB (WPS II)",
    // buttonText: 'READ FULL STORY',
    // buttonLink: '/full-story-1'
  },
  {
    image: "../../public/Poson.JPG",
    text: "Poson poya day 2024",
    buttonText: "READ FULL STORY",
    buttonLink: "/full-story-1",
  },
  {
    image: "../../public/annual_meeting.JPG",
    text: "ANNUAL MEETING",
    buttonText: "READ FULL STORY",
    buttonLink: "/full-story-2",
  },
  {
    image: "../../public/blood.JPG",
    text: "Blood Donation",
    buttonText: "READ FULL STORY",
    buttonLink: "/full-story-2",
  },
];

const HorizontalCarousel = () => {
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
    <div className="relative min-h-96 w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full relative">
            <div className="absolute h-96 inset-0 bg-black bg-opacity-50">
              <img
                src={slide.image}
                alt={slide.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-balance text-white font-extrabold">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.text}
                </h1>
                {slide.buttonText && (
                  <a
                    href={slide.buttonLink}
                    className="bg-white text-black py-2 px-4 rounded-lg shadow-lg"
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default HorizontalCarousel;
