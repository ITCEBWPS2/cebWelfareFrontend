import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../pages/members/Members.css";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedMemberId, setHighlightedMemberId] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editedMember, setEditedMember] = useState({});
  const navigate = useNavigate();
  const memberRefs = useRef({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        "https://cebwps2welfare.netlify.app/api/members"
      );
      // const response = await axios.get("http://localhost:5000/api/members");
      const sortedMembers = response.data.sort(
        (a, b) => a.welfareNo - b.welfareNo
      );
      setMembers(sortedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleEditClick = (member) => {
    setEditingMemberId(member._id);
    setEditedMember({ ...member }); // Create a copy of the member to edit
  };

  const handleSaveClick = async (memberId) => {
    try {
      await axios.put(
        `https://cebwps2welfare.netlify.app/api/members/${memberId}`,
        // `http://localhost:5000/api/members/${memberId}`,

        editedMember
      );
      setMembers(
        members.map((member) =>
          member._id === memberId ? editedMember : member
        )
      );
      setEditingMemberId(null);
      alert("Member details updated successfully.");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member details.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(
          `https://cebwps2welfare.netlify.app/api/members/${memberId}`
        );
        // await axios.delete(`http://localhost:5000/api/members/${memberId}`);
        setMembers(members.filter((member) => member._id !== memberId));
        alert("Member deleted successfully.");
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.epf?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.welfareNo
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.name?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="epf"
                        value={editedMember.epf}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.epf
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="welfareNo"
                        value={editedMember.welfareNo}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.welfareNo
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedMember.name}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editedMember.dateOfBirth}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.dateOfBirth
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="date"
                        name="dateOfRegistered"
                        value={editedMember.dateOfRegistered}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.dateOfRegistered
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="date"
                        name="dateOfJoined"
                        value={editedMember.dateOfJoined}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.dateOfJoined
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="payroll"
                        value={editedMember.payroll}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.payroll
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="contactNumber"
                        value={editedMember.contactNumber}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.contactNumber
                    )}
                  </td>
                  <td className="border px-6 py-4">
                    {editingMemberId === member._id ? (
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={editedMember.whatsappNumber}
                        onChange={handleInputChange}
                        className="border rounded-lg px-2 py-1"
                      />
                    ) : (
                      member.whatsappNumber
                    )}
                  </td>
                  <td className="border px-6 py-4 flex space-x-2">
                    {editingMemberId === member._id ? (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                          onClick={() => handleSaveClick(member._id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white rounded-lg px-4 py-2"
                          onClick={() => setEditingMemberId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                          onClick={() => handleEditClick(member)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2"
                          onClick={() => handleDelete(member._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <Link to={`/viewmember/${member._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg px-4 py-2">
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
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/members"
//         // "https://serverbackend-4wcf.onrender.com/api/members"
//       );
//       const sortedMembers = response.data.sort(
//         (a, b) => a.welfareNo - b.welfareNo
//       );
//       setMembers(sortedMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   const handleDelete = async (memberId) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       try {
//         await axios.delete(
//           `http://localhost:5000/api/users/${memberId}`
//           // `https://serverbackend-4wcf.onrender.com/api/users/${memberId}`
//         );
//         setMembers(members.filter((member) => member._id !== memberId));
//         alert("Member deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting member:", error);
//         alert("Failed to delete member.");
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//   };

//   // const filteredMembers = members.filter(
//   //   (member) =>
//   //     member.epf?.toString().includes(searchTerm) ||
//   //     member.welfareNo?.toString().includes(searchTerm) ||
//   //     member.name?.toString().includes(searchTerm)
//   // );
//   const filteredMembers = members.filter(
//     (member) =>
//       member.epf?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.welfareNo
//         ?.toString()
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       member.name?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
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
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Actions
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
//                     <button
//                       onClick={() => handleDelete(member._id)}
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                       Delete
//                     </button>
//                     <Link to={`/members/${member._id}`}>
//                       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         View all details
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
