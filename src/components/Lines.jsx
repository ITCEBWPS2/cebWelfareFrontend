import React from 'react';

const LinesImage = ({ className }) => {
  return (
    <div className="relative w-full">
      <img src="/image2.png" alt="Decorative Lines" className={`w-full object-cover ${className}`} />
      <div className="absolute top-0 right-0 flex items-start">
        <p className="mr-2 text-red-900 font-extrabold p-2 rounded-md text-2xl md:text-3xl lg:text-4xl">
          Welfare Society CEB (WPS II)
        </p>
        <img 
          src="/Picture2.jpg" 
          alt="CEB Logo" 
          className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32" 
        />
      </div>
    </div>
  );
};

export default LinesImage;




// import React from 'react';

// const LinesImage = ({ className }) => {
//   return (
//     <div className="w-full ">
//         {/* <img src="/Picture2.jpg" alt="CEB Logo" className="inherit w-16 h-16 align-center md:w-24 md:h-24 lg:w-32 lg:h-32" /> */}
//       <img src="/Lines.png" alt="Decorative Lines" className={`w-full  object-cover ${className}`} />
//     </div>
//   );
// };

// export default LinesImage;


