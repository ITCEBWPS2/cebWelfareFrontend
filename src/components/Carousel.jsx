import React, { useState, useEffect } from "react";
// test git hub
const slides = [
  {
    image: "/blood.JPG",
    text: "Annual Blood Donation",
    buttonText: "READ FULL STORY",
    buttonLink: "/full-story-1",
  },
  {
    image: "/annual_meeting.JPG",
    text: "Annual Welfare Meeting",
    buttonText: "READ FULL STORY",
    buttonLink: "/full-story-2",
  },
  // Add more slides as needed
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Change slide every 1 second
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div
      className="relative overflow-hidden items-center justify-center max-w-sm min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${slides[current].image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {slides[current].text}
        </h1>
        <a
          href={slides[current].buttonLink}
          className="bg-white text-black py-2 px-4 rounded-lg shadow-lg"
        >
          {slides[current].buttonText}
        </a>
      </div>
      <button
        onClick={nextSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full cursor-pointer"
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
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full cursor-pointer"
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

export default Carousel;

// import React, { useState } from 'react';

// const slides = [
//   {
//     image: '/blood.JPG',
//     text: 'Annual Blood Donation',
//     buttonText: 'READ FULL STORY',
//     buttonLink: '/full-story-1'
//   },
//   {
//     image: '/annual_meeting.JPG',
//     text: 'Anuual Welfare Meeting',
//     buttonText: 'READ FULL STORY',
//     buttonLink: '/full-story-2'
//   },
//   // Add more slides as needed
// ];

// const Carousel = () => {
//   const [current, setCurrent] = useState(0);

//   const nextSlide = () => {
//     setCurrent(current === slides.length - 1 ? 0 : current + 1);
//   };

//   const prevSlide = () => {
//     setCurrent(current === 0 ? slides.length - 1 : current - 1);
//   };

//   return (
//     <div className="relative overflow-hidden items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${slides[current].image})` }}>
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <div className="relative z-10 text-white text-center px-4">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">{slides[current].text}</h1>
//         <a href={slides[current].buttonLink} className="bg-white text-black py-2 px-4 rounded-lg shadow-lg">
//           {slides[current].buttonText}
//         </a>
//       </div>
//       <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full cursor-pointer">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full cursor-pointer">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default Carousel;
