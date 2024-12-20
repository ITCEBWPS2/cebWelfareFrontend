import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const BottomToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-10 bg-white rounded-lg shadow-lg flex justify-center items-center p-2 md:bottom-10 md:right-10 ${
        scrolled ? "block" : "hidden"
      } animate-fade-in`}
    >
      <button
        className="flex flex-col items-center text-gray-600 hover:text-red-500"
        onClick={handleScrollToTop}
      >
        <ArrowUp />
      </button>
    </div>
  );
};

export default BottomToTop;
