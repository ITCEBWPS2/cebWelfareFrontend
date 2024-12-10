import React from "react";

const BottomToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full bg-white shadow-lg flex justify-around items-center py-2 border-t border-gray-300">
      <button
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-500"
        onClick={() => alert("Navigating to Home")}
      >
        X<span className="text-sm">Home</span>
      </button>

      <button
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-500"
        onClick={() => alert("Navigating to About")}
      >
        X<span className="text-sm">About</span>
      </button>

      <button
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-500"
        onClick={() => alert("Navigating to Contact")}
      >
        X<span className="text-sm">Contact</span>
      </button>

      <button
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-500"
        onClick={handleScrollToTop}
      >
        A<span className="text-sm">Top</span>
      </button>
    </div>
  );
};

export default BottomToTop;
