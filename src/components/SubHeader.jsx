import React from "react";

const SubHeader = ({ image, title, description }) => {
  return (
    <div className="relative h-96">
      <img
        src={image}
        alt="cover-image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70" />
      <div className="wrapper-header absolute inset-0 flex flex-col justify-center items-center text-center text-white pt-8">
        <h1 className="font-heading text-4xl font-bold mb-4 animate-fade-in md:text-6xl">
          {title}
        </h1>
        <p className="text-base md:text-lg font-normal mb-4 animate-fade-in-delay">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SubHeader;