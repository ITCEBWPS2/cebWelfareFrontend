import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../pages/members/Members.css";
import HorizontalCarousel from "../../components/HorizontalCarousel";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editedMember, setEditedMember] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://13.61.8.102/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const deleteTask = async (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${memberId}`);
        setMembers(members.filter((member) => member._id !== memberId));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleEditClick = (member) => {
    setEditMemberId(member._id);
    setEditedMember({ ...member });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (memberId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/members/${memberId}`,
        updatedData
      );
      console.log("Member updated:", response.data);
      setMembers(
        members.map((member) =>
          member._id === editMemberId ? response.data : member
        )
      );
      setEditMemberId(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HorizontalCarousel />
      <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="search" className="text-gray-700 font-semibold">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Search..."
            />
          </div>
          <button
            className="bg-red-900 hover:bg-red-700 text-white font-semibold rounded-lg px-5 py-2.5 transition duration-300"
            onClick={() => navigate("/registermember")}
          >
            Register a New Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
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
                  Status
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
              {members.length === 0 ? (
                <tr>
                  <td className="border px-6 py-4 text-center" colSpan="11">
                    No members found
                  </td>
                </tr>
              ) : (
                members.map((member, index) => (
                  <tr
                    key={member._id}
                    className={`${
                      index % 2 === 0 ? "bg-yellow-50" : "bg-red-50"
                    }`}
                  >
                    {editMemberId === member._id ? (
                      <>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="epf"
                            value={editedMember.epf}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="welfareNo"
                            value={editedMember.welfareNo}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="name"
                            value={editedMember.name}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="dateOfBirth"
                            value={editedMember.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="dateOfRegistered"
                            value={editedMember.dateOfRegistered}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="dateOfJoined"
                            value={editedMember.dateOfJoined}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="payroll"
                            value={editedMember.payroll}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="status"
                            value={editedMember.status}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="contactNo.number"
                            value={editedMember.contactNo?.number || ""}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4">
                          <input
                            type="text"
                            name="contactNo.whatsappNo"
                            value={editedMember.contactNo?.whatsappNo || ""}
                            onChange={handleInputChange}
                            className="w-full border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="border px-6 py-4 flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleUpdate(member._id, editedMember)
                            }
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditMemberId(null)}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-6 py-4">{member.epf}</td>
                        <td className="border px-6 py-4">{member.welfareNo}</td>
                        <td className="border px-6 py-4">{member.name}</td>
                        <td className="border px-6 py-4">
                          {member.dateOfBirth}
                        </td>
                        <td className="border px-6 py-4">
                          {member.dateOfRegistered}
                        </td>
                        <td className="border px-6 py-4">
                          {member.dateOfJoined}
                        </td>
                        <td className="border px-6 py-4">{member.payroll}</td>
                        <td className="border px-6 py-4">{member.status}</td>
                        <td className="border px-6 py-4">
                          {member.contactNo?.number}
                        </td>
                        <td className="border px-6 py-4">
                          {member.contactNo?.whatsappNo}
                        </td>
                        <td className="border px-6 py-4 flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditClick(member)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(member._id)}
                            className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../pages/members/Members.css';
// import HorizontalCarousel from '../../components/HorizontalCarousel';

// const MembersTable = () => {
//   const [members, setMembers] = useState([]);
//   const [editMemberId, setEditMemberId] = useState(null);
//   const [editedMember, setEditedMember] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/members');
//         setMembers(response.data);
//       } catch (error) {
//         console.error('Error fetching members:', error);
//       }
//     };
//     fetchMembers();
//   }, []);

//   // Handle delete
//   const deleteTask = async (memberId) => {
//     if (window.confirm('Are you sure you want to delete this member?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/members/${memberId}`);
//         setMembers(members.filter(member => member._id !== memberId));
//       } catch (error) {
//         console.error('Error deleting member:', error);
//       }
//     }
//   };

//   // Handle edit button click
//   const handleEditClick = (member) => {
//     setEditMemberId(member._id);
//     setEditedMember({ ...member });
//   };

//   // Handle input change for editing
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedMember((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle update
//   const handleUpdate = async (memberId, updatedData) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/members/${memberId}`, updatedData);
//       console.log('Member updated:', response.data);
//       // Handle success (e.g., update the state or redirect)
//     } catch (error) {
//       console.error('Error updating member:', error);
//     }
//   };

//   // const handleUpdate = async () => {
//   //   try {
//   //     await axios.put(`http://localhost:5000/api/members/${editMemberId}`, editedMember);
//   //     setMembers(members.map(member => member._id === editMemberId ? editedMember : member));
//   //     setEditMemberId(null);
//   //   } catch (error) {
//   //     console.error('Error updating member:', error);
//   //   }
//   // };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <HorizontalCarousel />
//       <div className="bg-yellow-50 p-8">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center space-x-2">
//             <label htmlFor="search" className="text-gray-700">Search:</label>
//             <input
//               type="text"
//               id="search"
//               className="border border-gray-300 rounded-lg px-3 py-2"
//               placeholder="Search..."
//             />
//           </div>
//           <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate('/registermember')}>
//             Register a new member
//           </button>
//         </div>
//       </div>

//       <div className="flex-grow bg-white p-8 overflow-auto">
//         <table className="w-full flex-auto  bg-white rounded-lg shadow-lg">
//           <thead className=" bg-red-900 text-white ">
//             <tr>
//               <th className="px-4 py-2">EPF no</th>
//               <th className="px-4 py-2">Welfare no</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Date of birth</th>
//               <th className="px-4 py-2">Date of registered</th>
//               <th className="px-4 py-2">Date of joined</th>
//               <th className="px-4 py-2">Payroll</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Contact Number</th>
//               <th className="px-4 py-2">Whatsapp Number</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.length === 0 ? (
//               <tr>
//                 <td className="border px-4 py-2 text-center" colSpan="11">No members found</td>
//               </tr>
//             ) : (
//               members.map((member, index) => (
//                 <tr key={member._id} className={`${index % 2 === 0 ? 'bg-yellow-100' : ''}`}>
//                   {editMemberId === member._id ? (
//                     <>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="epf"
//                           value={editedMember.epf}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="welfareNo"
//                           value={editedMember.welfareNo}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="name"
//                           value={editedMember.name}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="dateOfBirth"
//                           value={editedMember.dateOfBirth}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="dateOfRegistered"
//                           value={editedMember.dateOfRegistered}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="dateOfJoined"
//                           value={editedMember.dateOfJoined}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="payroll"
//                           value={editedMember.payroll}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="status"
//                           value={editedMember.status}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="contactNo.number"
//                           value={editedMember.contactNo?.number || ''}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border px-4 py-2">
//                         <input
//                           type="text"
//                           name="contactNo.whatsappNo"
//                           value={editedMember.contactNo?.whatsappNo || ''}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                       <td className="border w-screen px-4 py-2">
//                         <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
//                         <button onClick={() => setEditMemberId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="border px-4 py-2">{member.epf}</td>
//                       <td className="border px-4 py-2">{member.welfareNo}</td>
//                       <td className="border px-4 py-2">{member.name}</td>
//                       <td className="border px-4 py-2">{member.dateOfBirth}</td>
//                       <td className="border px-4 py-2">{member.dateOfRegistered}</td>
//                       <td className="border px-4 py-2">{member.dateOfJoined}</td>
//                       <td className="border px-4 py-2">{member.payroll}</td>
//                       <td className="border px-4 py-2">{member.status}</td>
//                       <td className="border px-4 py-2">{member.contactNo.number}</td>
//                       <td className="border px-4 py-2">{member.contactNo.whatsappNo}</td>
//                       <td className="border px-4 py-2">
//                         <button onClick={(e) => {e.stopPropagation(); deleteTask(member._id)}} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
//                         <button onClick={() => handleEditClick(member)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2">Edit</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default MembersTable;
