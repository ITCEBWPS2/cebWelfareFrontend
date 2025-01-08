import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/api/authContext";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEpf, setResetEpf] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Identifier input, Step 2: New Password input
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(identifier, password, navigate);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Verify the EPF number (optional logic)
      console.log("Verification initiated for EPF:", resetEpf);
      setStep(2); // Move to Step 2
    } else if (step === 2) {
      try {
        // Send PATCH request to update password
        const response = await axios.put(
          `${BASE_URL}/api/members/${resetEpf}`, // Assuming EPF is the unique ID
          { password: newPassword }
        );
        console.log("Password updated successfully:", response.data);
        setIsForgotPasswordOpen(false);
        setStep(1); // Reset to Step 1 for future use
        alert("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password:", error.response.data);
        alert("Failed to update password. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/main_header_1.webp')" }}
    >
      <div className="flex flex-col justify-center p-8 bg-white w-full md:max-w-sm md:p-12 md:mr-auto md:ml-0">
        <Link to="/">
          <div className="flex justify-center md:justify-start mb-14">
            <img src="/icon.jpg" alt="Logo" className="h-12" />
          </div>
        </Link>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-8 font-heading text-2xl font-bold text-center md:text-left">
            Login to Your Account
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Email / EPF Number
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 w-full bg-black hover:bg-red-900 rounded text-white py-3 font-semibold transition duration-200"
          >
            Login
          </button>
          {/* <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm text-red-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div> */}
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            {step === 1 && (
              <>
                <h3 className="text-xl font-bold mb-4">Reset Password</h3>
                <form onSubmit={handleForgotPasswordSubmit}>
                  <label
                    htmlFor="resetEpf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your EPF Number
                  </label>
                  <input
                    type="text"
                    id="resetEpf"
                    value={resetEpf}
                    onChange={(e) => setResetEpf(e.target.value)}
                    className="mt-1 mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="text-xl font-bold mb-4">Set New Password</h3>
                <form onSubmit={handleForgotPasswordSubmit}>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/api/authContext";

// const LoginPage = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(identifier, password, navigate);
//   };

//   return (
//     <div
//       className="flex min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/main_header_1.webp')" }}
//     >
//       <div className="flex flex-col justify-center p-8 bg-white w-full md:max-w-sm md:p-12 md:mr-auto md:ml-0">
//         <Link to="/">
//           <div className="flex justify-center md:justify-start mb-14">
//             <img src="/icon.jpg" alt="Logo" className="h-12" />
//           </div>
//         </Link>
//         <form onSubmit={handleSubmit}>
//           <h2 className="mb-8 font-heading text-2xl font-bold text-center md:text-left">
//             Login to Your Account
//           </h2>
//           <div className="space-y-6">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email / EPF Number
//               </label>
//               <input
//                 type="text"
//                 id="identifier"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="mt-8 w-full bg-black hover:bg-red-900 rounded text-white py-3 font-semibold transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
