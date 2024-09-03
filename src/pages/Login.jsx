// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../public/Signin.jpg";
import "../pages/Login.css";

const Login = () => {
  const [epfNo, setEpfNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!epfNo || !password) {
      setError("EPF Number and Password are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/members/auth",
        {
          epf: epfNo,
          password,
        }
      );

      localStorage.setItem("token", data.token);

      console.log("User logged in successfully:", data);
      navigate("/"); // Redirect to the home page or admin panel
    } catch (err) {
      setError("Invalid EPF Number or Password");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('../../public/Signin.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="container1 bg-yellow-50 bg-opacity-50 rounded-lg shadow-2xl max-w-fit px-8 flex-col justify-between"
          style={{ height: "auto", minHeight: "50vh" }}
        >
          <div className="flex-grow"></div>
          <h1 className="text-4xl font-medium text-center mb-8">Sign In</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="epfNo"
                className="block font-semibold text-xl text-black-900 mb-2"
              >
                EPF Number
              </label>
              <input
                type="text"
                id="epfNo"
                value={epfNo}
                onChange={(e) => setEpfNo(e.target.value)}
                className="appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block font-semibold text-xl text-black-900 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
            <br />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5"
              >
                Sign In
              </button>
              <a
                href="#"
                className="text-lg text-gray-500 hover:underline ml-4"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="flex-grow"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../public/Signin.jpg';
// import '../pages/Login.css';

// const Login = () => {
//   const [epfNo, setEpfNo] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting login data...', epfNo, password);
//     navigate('/');
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url('../../public/Signin.jpg')`,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         width: '100vw',
//       }}
//     >
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="container1 bg-yellow-50 bg-opacity-50 rounded-lg shadow-2xl max-w-fit px-8 flex-col justify-between" style={{ height: 'auto', minHeight: '50vh' }}>
//           <div className="flex-grow"></div>
//           <h1 className="text-4xl font-medium text-center mb-8">Sign In</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label htmlFor="epfNo" className="block font-semibold text-xl text-black-900 mb-2">
//                 EPF Number
//               </label>
//               <input
//                 type="text"
//                 id="epfNo"
//                 value={epfNo}
//                 onChange={(e) => setEpfNo(e.target.value)}
//                 className="appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block font-semibold text-xl text-black-900 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//             </div>
//             <br />
//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5">
//                 Sign In
//               </button>
//               <a href="/" className="text-lg text-gray-500 hover:underline ml-4">
//                 Forgot Password?
//               </a>
//             </div>
//           </form>
//           <div className="flex-grow"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
