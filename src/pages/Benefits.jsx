// src/components/Benefits.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Benefits = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <div className="w-full max-w-3xl">
        <div className="text-red-700 font-bold mb-8">
          <ul>
            <li>Welfare society WPS II </li>
          </ul>
        </div>

        {/* Carousel */}
        <div className="relative bg-gray-100 p-4 rounded shadow-lg mb-4">
          <Slider {...settings}>
            <div>
              <section className="bg-white p-4 shadow-lg">
                <h3 className="text-xl font-bold text-red-700">Grade 5 Scholarship</h3>
                <img src="/BOC-SCHOLS.jpg" alt="Banner 1" className="object-cover rounded mb-4" />
              </section>
            </div>

            <div>
              <section className="bg-white p-4 shadow-lg">
                <h3 className="text-xl font-bold text-red-700">Retirement Gifts</h3>
                <img src="/retirement.webp" alt="Banner 2" className="object-cover rounded mb-4" />
              </section>
            </div>

            <div>
              <section className="bg-white p-4 shadow-lg">
                <h3 className="text-xl font-bold text-red-700">Death Funds Donation</h3>
                <img src="/" alt="Banner 3" className="object-cover rounded mb-4" />
              </section>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

// Custom Previous Arrow
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
  >
    &#9664;
  </button>
);

// Custom Next Arrow
const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
  >
    &#9654;
  </button>
);

export default Benefits;



// // src/components/Benefits.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const Benefits = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
    
//   };

//   return (
//     <div className="justify-center items-center min-h-screen bg-yellow-50">
//       <div className="align-middle">
//         <div>
//           <ul className="text-red-700 font-bold">
//             <li>Inauguration of the Uma-Oya Multipurpose Development Project</li>
//           </ul>
//         </div>
//       </div>

//       {/* Left Sidebar */}
//       <div className="relative bg-red-900 flex shadow-lg">
//         <div className="w-full ml-4">
//           {/* Carousel */}
//           <div className="bg-gray-100 p-4 rounded shadow-lg mb-4">
            
//             <Slider {...settings}>
//               <div>
//               <section className="bg-white p-4 shadow-lg">
//               <h3 className="text-xl font-bold text-red-700">Grade 5 scholarship </h3>
//                 <img src="/BOC-SCHOLS.jpg" alt="Banner 1" className="object-cover rounded mb-4" />

              
//               {/* <p className="mt-2 text-gray-600">
//                 </p> */}
//             </section>
//               </div>

//               <div>
//               <section className="bg-white p-4 shadow-lg">
//               <h3 className="text-xl font-bold text-red-700">Retirement gifts </h3>
//                 <img src="/retirement.webp" alt="Banner 2" className="object-cover rounded mb-4" />
//                 {/* <p className="mt-2 text-gray-600">
//                 </p> */}
//             </section>
//               </div>
              

//               <div>
//               <section className="bg-white p-4 shadow-lg">
//               <h3 className="text-xl font-bold text-red-700">Retirement gifts </h3>
//                 <img src="/" alt="Banner 2" className="object-cover rounded mb-4" />
//                {/* <p className="mt-2 text-gray-600">
//                 </p> */}
//             </section>
//               </div>

            
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Benefits;




// import React from 'react'

// const Benefits = () => {
//   return (
//     <div className=" justify-center items-center min-h-screen bg-yellow-50">
//       {/* <div className="container mx-auto px-4 py-8"> */}

//       <div className="align-middle ">

          
//       <div>
              
//               <ul className="text-red-700 font-bold">
//                 <li>Inauguration of the Uma-Oya Multipurpose Development Project</li>
//               </ul>
//             </div>
//           </div>

//           {/* Left Sidebar */}
//           <div className="relative   bg-red-900 flex   shadow-lg">
//           <div className="w-full ml-4  ">
//             {/* Carousel */}
//             <div className="bg-gray-100 p-4 rounded shadow-lg mb-4">
//               <img src="../../../public/BOC-SCHOLS.jpg " alt="Banner 1" className="  object-cover rounded mb-4" />
//               <img src="../../../public/Picture2.jpg" alt="Banner 2" className=" object-cover rounded hidden mb-4" />
//             </div>
//             </div>



//           </div>
//           </div>
//       // </div>
      

//   )
// }

// export default Benefits