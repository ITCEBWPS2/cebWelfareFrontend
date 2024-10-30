import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../pages/members/Members.css";
import { Link } from "react-router-dom";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedMemberId, setHighlightedMemberId] = useState(null);
  const navigate = useNavigate();
  const memberRefs = useRef({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        "https://serverbackend-4wcf.onrender.com/api/members"
      );
      const sortedMembers = response.data.sort(
        (a, b) => a.welfareNo - b.welfareNo
      );
      setMembers(sortedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await axios.delete(
        `https://serverbackend-4wcf.onrender.com/api/users/${memberId}`
      );
      setMembers(members.filter((member) => member._id !== memberId)); // Remove deleted member from state
      alert("Member deleted successfully.");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member.");
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.epf?.toString().includes(searchTerm) ||
      member.welfareNo?.toString().includes(searchTerm)
  );

  useEffect(() => {
    if (
      filteredMembers.length > 0 &&
      memberRefs.current[filteredMembers[0]._id]
    ) {
      setHighlightedMemberId(filteredMembers[0]._id);
      memberRefs.current[filteredMembers[0]._id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      setHighlightedMemberId(null);
    }
  }, [filteredMembers]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="search" className="text-gray-700 font-semibold">
              Search:
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Search by EPF or Welfare No..."
            />
          </div>
          <button
            className="bg-red-900 hover:bg-red-700 text-yellow-200 text-3xl font-semibold rounded-lg px-60 py-2.5 transition duration-300"
            onClick={() => navigate("/registermember")}
          >
            Register a New Member
          </button>
        </div>

        <div className="overflow-x-auto h-screen">
          <table className="w-full bg-white rounded-lg h-screen shadow-lg">
            <thead className="bg-red-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  EPF no
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Welfare no
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date of Registered
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Date of Joined
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Payroll
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Whatsapp Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member._id}
                  ref={(el) => (memberRefs.current[member._id] = el)}
                  className={`${
                    highlightedMemberId === member._id
                      ? "bg-yellow-200"
                      : index % 2 === 0
                      ? "bg-yellow-50"
                      : "bg-red-50"
                  }`}
                >
                  <td className="border px-6 py-4">{member.epf}</td>
                  <td className="border px-6 py-4">{member.welfareNo}</td>
                  <td className="border px-6 py-4">{member.name}</td>
                  <td className="border px-6 py-4">{member.dateOfBirth}</td>
                  <td className="border px-6 py-4">
                    {member.dateOfRegistered}
                  </td>
                  <td className="border px-6 py-4">{member.dateOfJoined}</td>
                  <td className="border px-6 py-4">{member.payroll}</td>
                  <td className="border px-6 py-4">
                    {member.contactNo?.number || "N/A"}
                  </td>
                  <td className="border px-6 py-4">
                    {member.contactNo?.whatsappNo || "N/A"}
                  </td>
                  <td className="border px-6 py-4 flex justify-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/members/${member._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../pages/members/Members.css";
// import { Link } from "react-router-dom";

// const MembersTable = () => {
//   const [members, setMembers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [highlightedMemberId, setHighlightedMemberId] = useState(null);
//   const navigate = useNavigate();
//   const memberRefs = useRef({});

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(
//           "https://serverbackend-4wcf.onrender.com/api/members"
//         );
//         const sortedMembers = response.data.sort(
//           (a, b) => a.welfareNo - b.welfareNo
//         );
//         setMembers(sortedMembers);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//   };

//   // Filtered members list based on search term
//   const filteredMembers = members.filter(
//     (member) =>
//       member.epf?.toString().includes(searchTerm) ||
//       member.welfareNo?.toString().includes(searchTerm)
//   );

//   useEffect(() => {
//     // Scroll to the first highlighted member if found
//     if (
//       filteredMembers.length > 0 &&
//       memberRefs.current[filteredMembers[0]._id]
//     ) {
//       setHighlightedMemberId(filteredMembers[0]._id);
//       memberRefs.current[filteredMembers[0]._id].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     } else {
//       setHighlightedMemberId(null);
//     }
//   }, [filteredMembers]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <label htmlFor="search" className="text-gray-700 font-semibold">
//               Search:
//             </label>
//             <input
//               type="text"
//               id="search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Search by EPF or Welfare No..."
//             />
//           </div>
//           <button
//             className="bg-red-900 hover:bg-red-700 text-yellow-200 text-3xl font-semibold rounded-lg px-60 py-2.5 transition duration-300"
//             onClick={() => navigate("/registermember")}
//           >
//             Register a New Member
//           </button>
//         </div>

//         <div className="overflow-x-auto h-screen">
//           <table className="w-full bg-white rounded-lg h-screen shadow-lg">
//             <thead className="bg-red-900 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   EPF no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Welfare no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Registered
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Payroll
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Contact Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Whatsapp Number
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMembers.map((member, index) => (
//                 <tr
//                   key={member._id}
//                   ref={(el) => (memberRefs.current[member._id] = el)}
//                   className={`${
//                     highlightedMemberId === member._id
//                       ? "bg-yellow-200"
//                       : index % 2 === 0
//                       ? "bg-yellow-50"
//                       : "bg-red-50"
//                   }`}
//                 >
//                   <td className="border px-6 py-4">{member.epf}</td>
//                   <td className="border px-6 py-4">{member.welfareNo}</td>
//                   <td className="border px-6 py-4">{member.name}</td>
//                   <td className="border px-6 py-4">{member.dateOfBirth}</td>
//                   <td className="border px-6 py-4">
//                     {member.dateOfRegistered}
//                   </td>
//                   <td className="border px-6 py-4">{member.dateOfJoined}</td>
//                   <td className="border px-6 py-4">{member.payroll}</td>
//                   <td className="border px-6 py-4">
//                     {member.contactNo?.number || "N/A"}
//                   </td>
//                   <td className="border px-6 py-4">
//                     {member.contactNo?.whatsappNo || "N/A"}
//                   </td>
//                   <td className="border px-6 py-4 flex justify-center space-x-2">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Edit
//                     </button>
//                     <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                       Delete
//                     </button>
//                     <Link to={`/members/${member._id}`}>
//                       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         View Details
//                       </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersTable;

//import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../pages/members/Members.css";
// import { Link } from "react-router-dom";

// const MembersTable = () => {
//   const [members, setMembers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [highlightedMemberId, setHighlightedMemberId] = useState(null);
//   const navigate = useNavigate();
//   const memberRefs = useRef({});

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(
//           "https://serverbackend-4wcf.onrender.com/api/members"
//         );
//         const sortedMembers = response.data.sort(
//           (a, b) => a.welfareNo - b.welfareNo
//         );
//         setMembers(sortedMembers);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     // Find the member that matches the search term in epf or welfareNo
//     const matchingMember = members.find(
//       (member) =>
//         (member.epf && member.epf.toString().includes(term)) ||
//         (member.welfareNo && member.welfareNo.toString().includes(term))
//     );

//     if (matchingMember) {
//       setHighlightedMemberId(matchingMember._id);
//     } else {
//       setHighlightedMemberId(null);
//     }
//   };

//   useEffect(() => {
//     // Scroll to the highlighted member if found
//     if (highlightedMemberId && memberRefs.current[highlightedMemberId]) {
//       memberRefs.current[highlightedMemberId].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [highlightedMemberId]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <label htmlFor="search" className="text-gray-700 font-semibold">
//               Search:
//             </label>
//             <input
//               type="text"
//               id="search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Search by EPF or Welfare No..."
//             />
//           </div>
//           <button
//             className="bg-red-900 hover:bg-red-700 text-yellow-200 text-3xl font-semibold rounded-lg px-60 py-2.5 transition duration-300"
//             onClick={() => navigate("/registermember")}
//           >
//             Register a New Member
//           </button>
//         </div>

//         <div className="overflow-x-auto h-screen">
//           <table className="w-full bg-white rounded-lg h-screen shadow-lg">
//             <thead className="bg-red-900 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   EPF no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Welfare no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Registered
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Payroll
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Contact Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Whatsapp Number
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {members.map((member, index) => (
//                 <tr
//                   key={member._id}
//                   ref={(el) => (memberRefs.current[member._id] = el)}
//                   className={`${
//                     highlightedMemberId === member._id
//                       ? "bg-yellow-200"
//                       : index % 2 === 0
//                       ? "bg-yellow-50"
//                       : "bg-red-50"
//                   }`}
//                 >
//                   <td className="border px-6 py-4">{member.epf}</td>
//                   <td className="border px-6 py-4">{member.welfareNo}</td>
//                   <td className="border px-6 py-4">{member.name}</td>
//                   <td className="border px-6 py-4">{member.dateOfBirth}</td>
//                   <td className="border px-6 py-4">
//                     {member.dateOfRegistered}
//                   </td>
//                   <td className="border px-6 py-4">{member.dateOfJoined}</td>
//                   <td className="border px-6 py-4">{member.payroll}</td>
//                   <td className="border px-6 py-4">
//                     {member.contactNo?.number || "N/A"}
//                   </td>
//                   <td className="border px-6 py-4">
//                     {member.contactNo?.whatsappNo || "N/A"}
//                   </td>
//                   <td className="border px-6 py-4 flex justify-center space-x-2">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Edit
//                     </button>
//                     <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                       Delete
//                     </button>
//                     <Link to={`/member/${member._id}`}>
//                       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         View Details
//                       </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersTable;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../pages/members/Members.css";
// import HorizontalCarousel from "../../components/HorizontalCarousel";
// import { Link } from "react-router-dom";

// const MembersTable = () => {
//   const [members, setMembers] = useState([]);
//   const [editMemberId, setEditMemberId] = useState(null);
//   const [editedMember, setEditedMember] = useState({});
//   const [searchTerm, setSearchTerm] = useState(""); // Added searchTerm state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(
//           "https://serverbackend-4wcf.onrender.com/api/members"
//         );
//         const sortedMembers = response.data.sort(
//           (a, b) => a.welfareNo - b.welfareNo
//         );
//         setMembers(sortedMembers);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const deleteTask = async (memberId) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       try {
//         await axios.delete(
//           `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`
//         );
//         setMembers(members.filter((member) => member._id !== memberId));
//       } catch (error) {
//         console.error("Error deleting member:", error);
//       }
//     }
//   };

//   const handleEditClick = (member) => {
//     setEditMemberId(member._id);
//     setEditedMember({ ...member });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedMember((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (memberId, updatedData) => {
//     try {
//       const response = await axios.put(
//         `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`,
//         updatedData
//       );
//       setMembers(
//         members.map((member) =>
//           member._id === editMemberId ? response.data : member
//         )
//       );
//       setEditMemberId(null);
//     } catch (error) {
//       console.error("Error updating member:", error);
//     }
//   };

//   const filteredMembers = members.filter(
//     (member) =>
//       (member.name &&
//         member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (member.epf &&
//         member.epf
//           .toString()
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())) ||
//       (member.welfareNo && member.welfareNo.toString().includes(searchTerm)) // Add more fields as needed
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <label htmlFor="search" className="text-gray-700 font-semibold">
//               Search:
//             </label>
//             <input
//               type="text"
//               id="search"
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             className="bg-red-900 hover:bg-red-700 text-yellow-200 text-3xl font-semibold rounded-lg px-60 py-2.5 transition duration-300"
//             onClick={() => navigate("/registermember")}
//           >
//             Register a New Member
//           </button>
//         </div>

//         <div className="overflow-x-auto h-screen">
//           <table className="w-full bg-white rounded-lg h-screen shadow-lg">
//             <thead className="bg-red-900 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   EPF no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Welfare no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Registered
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Payroll
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Contact Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Whatsapp Number
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMembers.length === 0 ? (
//                 <tr>
//                   <td className="border px-6 py-4 text-center" colSpan="11">
//                     No members found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredMembers.map((member, index) => (
//                   <tr
//                     key={member._id}
//                     className={`${
//                       index % 2 === 0 ? "bg-yellow-50" : "bg-red-50"
//                     }`}
//                   >
//                     {editMemberId === member._id ? (
//                       <>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             value={editedMember.epf}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             value={editedMember.welfareNo}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             value={editedMember.name}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfBirth"
//                             value={editedMember.dateOfBirth}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfRegistered"
//                             value={editedMember.dateOfRegistered}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfJoined"
//                             value={editedMember.dateOfJoined}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="payroll"
//                             value={editedMember.payroll}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="contactNo.number"
//                             value={editedMember.contactNo?.number || ""}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="contactNo.whatsappNo"
//                             value={editedMember.contactNo?.whatsappNo || ""}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4 flex justify-center space-x-2">
//                           <button
//                             onClick={() =>
//                               handleUpdate(member._id, editedMember)
//                             }
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={() => setEditMemberId(null)}
//                             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Cancel
//                           </button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="border px-6 py-4">{member.epf}</td>
//                         <td className="border px-6 py-4">{member.welfareNo}</td>
//                         <td className="border px-6 py-4">{member.name}</td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfBirth}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfRegistered}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfJoined}
//                         </td>
//                         <td className="border px-6 py-4">{member.payroll}</td>
//                         <td className="border px-6 py-4">
//                           {member.contactNo?.number || "N/A"}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.contactNo?.whatsappNo || "N/A"}
//                         </td>
//                         <td className="border px-6 py-4 flex justify-center space-x-2">
//                           <button
//                             onClick={() => handleEditClick(member)}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => deleteTask(member._id)}
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                         <td className="border px-6 py-4">
//                           <Link to={`/member/${member._id}`}>
//                             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                               View Details
//                             </button>
//                           </Link>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersTable;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../pages/members/Members.css";
// import HorizontalCarousel from "../../components/HorizontalCarousel";
// import { Link } from "react-router-dom";

// const MembersTable = () => {
//   const [members, setMembers] = useState([]);
//   const [editMemberId, setEditMemberId] = useState(null);
//   const [editedMember, setEditedMember] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(
//           "https://serverbackend-4wcf.onrender.com/api/members"
//         );
//         // Sorting members by name in ascending order

//         const sortedMembers = response.data.sort(
//           (a, b) => a.welfareNo - b.welfareNo
//         );

//         // const sortedMembers = response.data.sort((a, b) =>
//         //   a.name.localeCompare(b.name)
//         // );
//         setMembers(sortedMembers);
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     };
//     fetchMembers();
//   }, []);

//   const deleteTask = async (memberId) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       try {
//         await axios.delete(
//           `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`
//         );
//         setMembers(members.filter((member) => member._id !== memberId));
//       } catch (error) {
//         console.error("Error deleting member:", error);
//       }
//     }
//   };

//   const handleEditClick = (member) => {
//     setEditMemberId(member._id);
//     setEditedMember({ ...member });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedMember((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (memberId, updatedData) => {
//     try {
//       const response = await axios.put(
//         `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`,
//         updatedData
//       );
//       console.log("Member updated:", response.data);
//       setMembers(
//         members.map((member) =>
//           member._id === editMemberId ? response.data : member
//         )
//       );
//       setEditMemberId(null);
//     } catch (error) {
//       console.error("Error updating member:", error);
//     }
//   };

//   // Filtered members based on search query
//   const filteredMembers = members.filter((member) =>
//     member.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* <HorizontalCarousel /> */}
//       <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <label htmlFor="search" className="text-gray-700 font-semibold">
//               Search:
//             </label>
//             <input
//               type="text"
//               id="search"
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Search..."
//             />
//           </div>
//           <button
//             className="bg-red-900 hover:bg-red-700 text-yellow-200 text-3xl font-semibold rounded-lg px-60 py-2.5 transition duration-300"
//             onClick={() => navigate("/registermember")}
//           >
//             Register a New Member
//           </button>
//         </div>

//         <div className="overflow-x-auto h-screen">
//           <table className="w-full bg-white rounded-lg h-screen shadow-lg">
//             <thead className="bg-red-900 text-white">
//               <tr>
//                 {/* <th className="px-6 py-3 text-left text-sm font-semibold">
//                   ID
//                 </th> */}
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   EPF no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Welfare no
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Birth
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Registered
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Date of Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Payroll
//                 </th>
//                 {/* <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Status
//                 </th> */}
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Contact Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Whatsapp Number
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {members.length === 0 ? (
//                 <tr>
//                   <td className="border px-6 py-4 text-center" colSpan="11">
//                     No members found
//                   </td>
//                 </tr>
//               ) : (
//                 members.map((member, index) => (
//                   <tr
//                     key={member._id}
//                     className={`${
//                       index % 2 === 0 ? "bg-yellow-50" : "bg-red-50"
//                     }`}
//                   >
//                     {editMemberId === member._id ? (
//                       <>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             // name="epf"
//                             value={editedMember.epf}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             // name="welfareNo"
//                             value={editedMember.welfareNo}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             // name="name"
//                             value={editedMember.name}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfBirth"
//                             value={editedMember.dateOfBirth}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfRegistered"
//                             value={editedMember.dateOfRegistered}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="dateOfJoined"
//                             value={editedMember.dateOfJoined}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="payroll"
//                             value={editedMember.payroll}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         {/* <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="status"
//                             value={editedMember.status}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td> */}
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="contactNo.number"
//                             value={editedMember.contactNo?.number || ""}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>
//                         <td className="border px-6 py-4">
//                           <input
//                             type="text"
//                             name="contactNo.whatsappNo"
//                             value={editedMember.contactNo?.whatsappNo || ""}
//                             onChange={handleInputChange}
//                             className="w-full border-gray-300 rounded-md"
//                           />
//                         </td>

//                         <td className="border px-6 py-4 flex justify-center space-x-2">
//                           <button
//                             onClick={() =>
//                               handleUpdate(member._id, editedMember)
//                             }
//                             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={() => setEditMemberId(null)}
//                             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Cancel
//                           </button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         {/* <td className="border px-6 py-4">{member._id}</td> */}

//                         <td className="border px-6 py-4">{member.epf}</td>
//                         <td className="border px-6 py-4">{member.welfareNo}</td>
//                         <td className="border px-6 py-4">{member.name}</td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfBirth}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfRegistered}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.dateOfJoined}
//                         </td>
//                         <td className="border px-6 py-4">{member.payroll}</td>
//                         {/* <td className="border px-6 py-4">{member.status}</td> */}
//                         <td className="border px-6 py-4">
//                           {member.contactNo?.number || "N/A"}
//                         </td>
//                         <td className="border px-6 py-4">
//                           {member.contactNo?.whatsappNo || "N/A"}
//                         </td>
//                         <td className="border px-6 py-4 flex justify-center space-x-2">
//                           <button
//                             onClick={() => handleEditClick(member)}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => deleteTask(member._id)}
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                         <td className="border px-6 py-4">
//                           <Link to={`/member/${member._id}`}>
//                             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                               View Details
//                             </button>
//                           </Link>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembersTable;
