import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

const PasswordUpdate = () => {
  const [epf, setEpf] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BASE_URL}/api/members/${epf}`, {
        password: newPassword,
      });
      console.log("response data", response);

      setMessage("Password updated successfully!");
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response?.data || error.message
      );
      setMessage(
        "Failed to update password. Please check the EPF number and try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Password</h2>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4">
            <label
              htmlFor="epf"
              className="block text-sm font-medium text-gray-700"
            >
              EPF Number
            </label>
            <input
              type="text"
              id="epf"
              value={epf}
              onChange={(e) => setEpf(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;

//   const [epfNumber, setEpfNumber] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState(null);

//   const handleUpdatePassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/members/${epfNumber}`,
//         {
//           password: newPassword,
//         }
//       );
//       setMessage({ type: "success", text: "Password updated successfully!" });
//       setEpfNumber("");
//       setNewPassword("");
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text:
//           error.response?.data?.message ||
//           "Failed to update password. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold mb-6 text-center">Update Password</h2>
//         {message && (
//           <div
//             className={`mb-4 p-2 text-center text-white rounded ${
//               message.type === "success" ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//         <form onSubmit={handleUpdatePassword}>
//           <div className="mb-4">
//             <label
//               htmlFor="epfNumber"
//               className="block text-sm font-medium text-gray-700"
//             >
//               EPF Number
//             </label>
//             <input
//               type="text"
//               id="epfNumber"
//               value={epfNumber}
//               onChange={(e) => setEpfNumber(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="newPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition duration-200"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
