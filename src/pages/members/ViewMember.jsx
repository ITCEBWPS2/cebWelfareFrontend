import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewMember = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);

  console.log(memberId);

  useEffect(() => {
    const fetchViewMember = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/members/${memberId}`

          // `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`
        );
        setMember(response.data);
        console.log("member data: ", response.data);
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchViewMember();
  }, [memberId]);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
      <h2 className="text-2xl font-bold mb-6">Member Details</h2>
      <p>
        <strong>EPF No:</strong> {member.epf}
      </p>
      <p>
        <strong>Welfare No:</strong> {member.welfareNo}
      </p>
      <p>
        <strong>Name:</strong> {member.name}
      </p>
      <p>
        <strong>Email:</strong> {member.email}
      </p>
      <p>
        <strong>Date of Birth:</strong> {member.dateOfBirth}
      </p>
      <p>
        <strong>Date of Registered:</strong> {member.dateOfRegistered}
      </p>
      <p>
        <strong>Date of Joined:</strong> {member.dateOfJoined}
      </p>
      <p>
        <strong>Role:</strong> {member.role}
      </p>
      <p>
        <strong>Payroll:</strong> {member.payroll}
      </p>
      <p>
        <strong>Division:</strong> {member.division}
      </p>
      <p>
        <strong>Branch:</strong> {member.branch}
      </p>
      <p>
        <strong>Unit:</strong> {member.unit}
      </p>
      <p>
        <strong>Contact Number:</strong> {member.contactNo?.number}
      </p>
      <p>
        <strong>WhatsApp Number:</strong> {member.contactNo?.whatsappNo}
      </p>
      <p>
        <strong>Spouse Name:</strong> {member.spouseName}
      </p>
      <h3 className="text-xl font-semibold mt-4">Test Information:</h3>
      {member.test?.map((testItem, index) => (
        <div key={index} className="ml-4">
          <p>
            <strong>Name:</strong> {testItem.name}
          </p>
          <p>
            <strong>Age:</strong> {testItem.age}
          </p>
          <p>
            <strong>Gender:</strong> {testItem.gender}
          </p>
        </div>
      ))}
      <p>
        <strong>Mother's Name:</strong> {member.motherName}
      </p>
      <p>
        <strong>Mother's Age:</strong> {member.motherAge}
      </p>
      <p>
        <strong>Father's Name:</strong> {member.fatherName}
      </p>
      <p>
        <strong>Father's Age:</strong> {member.fatherAge}
      </p>
      <p>
        <strong>Mother-in-law's Name:</strong> {member.motherInLawName}
      </p>
      <p>
        <strong>Mother-in-law's Age:</strong> {member.motherInLawAge}
      </p>
      <p>
        <strong>Father-in-law's Name:</strong> {member.fatherInLawName}
      </p>
      <p>
        <strong>Father-in-law's Age:</strong> {member.fatherInLawAge}
      </p>
      <p>
        <strong>Member Fee:</strong> {member.memberFee}
      </p>
    </div>
  );
};

export default ViewMember;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ViewMember = () => {
//   const { memberId } = useParams();
//   const [member, setMember] = useState(null);

//   useEffect(() => {
//     const fetchViewMember = async () => {
//       try {
//         const response = await axios.get(
//           `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`
//         );
//         setMember(response.data);
//       } catch (error) {
//         console.error("Error fetching member details:", error);
//       }
//     };

//     fetchViewMember();
//   }, [memberId]);

//   if (!member) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white p-8 shadow-md rounded-lg mx-4 my-8">
//       <h2 className="text-2xl font-bold mb-6">Member Details</h2>
//       <p>
//         <strong>EPF No:</strong> {member.epf}
//       </p>
//       <p>
//         <strong>Welfare No:</strong> {member.welfareNo}
//       </p>
//       <p>
//         <strong>Name:</strong> {member.name}
//       </p>
//       <p>
//         <strong>Date of Birth:</strong> {member.dateOfBirth}
//       </p>
//       <p>
//         <strong>Date of Registered:</strong> {member.dateOfRegistered}
//       </p>
//       <p>
//         <strong>Date of Joined:</strong> {member.dateOfJoined}
//       </p>
//       <p>
//         <strong>Payroll:</strong> {member.payroll}
//       </p>
//       <p>
//         <strong>Contact Number:</strong> {member.contactNo?.number}
//       </p>
//       <p>
//         <strong>Whatsapp Number:</strong> {member.contactNo?.whatsappNo}
//       </p>
//       {/* Add more fields as necessary */}
//     </div>
//   );
// };

// export default ViewMember;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ViewMember = () => {
//   const { id } = useParams();
//   const [member, setMember] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMember = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/members/${id}`);
//         setMember(response.data);
//       } catch (error) {
//         console.error('Error fetching member details:', error);
//       }
//     };

//     fetchMember();
//   }, [id]);

//   if (!member) return <div>No members...</div>;

//   const navigateToLoanApplication = () => {
//     navigate('/loan-application', { state: { member } });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/background.jpg)' }}>
//       <div className="bg-yellow-100 bg-opacity-50 p-8 rounded-lg shadow-lg max-w-4xl w-full">
//         <h1 className="text-center text-2xl font-bold mb-6">Member Details</h1>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Name</label>
//               <p className="text-gray-700">{member.name}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Date of Birth</label>
//               <p className="text-gray-700">{member.dateOfBirth}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Status</label>
//               <p className="text-gray-700">{member.status}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Payroll</label>
//               <p className="text-gray-700">{member.payroll}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Contact Number</label>
//               <p className="text-gray-700">{member.contactNumber}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">WhatsApp Number</label>
//               <p className="text-gray-700">{member.whatsappNumber}</p>
//             </div>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Member Fee</label>
//               <p className="text-gray-700">{member.memberFee}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">EPF No</label>
//               <p className="text-gray-700">{member.epfNo}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Date of Registered</label>
//               <p className="text-gray-700">{member.dateOfRegistered}</p>
//             </div>
//             <div className="flex flex-col space-y-2">
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`./LoanApplication ${id}/loans`)}>
//                 View Loan Details
//               </button>
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/viewmember/${id}/benefits`)}>
//                 View Benefit Details
//               </button>
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/membership`)}>
//                 View Membership Details
//               </button>
//               {/* <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/relatives`)}>
//                 Relatives Details
//               </button> */}
//               <button
//           className="bg-red-600 text-white py-2 px-4 rounded-lg w-full"
//           onClick={handleRelativesDetails}
//         >
//           Relatives Details
//         </button>

//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={navigateToLoanApplication}>
//                 Apply for Loan
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMember;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ViewMember = () => {
//   const { id } = useParams();
//   const [member, setMember] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMember = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/members/${id}`);
//         setMember(response.data);
//       } catch (error) {
//         console.error('Error fetching member details:', error);
//       }
//     };

//     fetchMember();
//   }, [id]);

//   if (!member) return <div>No members...</div>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/background.jpg)' }}>
//       <div className="bg-yellow-100 bg-opacity-50 p-8 rounded-lg shadow-lg max-w-4xl w-full">
//         <h1 className="text-center text-2xl font-bold mb-6">Member Details</h1>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Name</label>
//               <p className="text-gray-700">{member.name}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Date of Birth</label>
//               <p className="text-gray-700">{member.dateOfBirth}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Status</label>
//               <p className="text-gray-700">{member.status}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Payroll</label>
//               <p className="text-gray-700">{member.payroll}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Contact Number</label>
//               <p className="text-gray-700">{member.contactNumber}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">WhatsApp Number</label>
//               <p className="text-gray-700">{member.whatsappNumber}</p>
//             </div>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Member Fee</label>
//               <p className="text-gray-700">{member.memberFee}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">EPF No</label>
//               <p className="text-gray-700">{member.epfNo}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-950">Date of Registered</label>
//               <p className="text-gray-700">{member.dateOfRegistered}</p>
//             </div>
//             <div className="flex flex-col space-y-2">
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/loans`)}>
//                 View Loan Details
//               </button>
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/benefits`)}>
//                 View Benefit Details
//               </button>
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/membership`)}>
//                 View Membership Details
//               </button>
//               <button className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5" onClick={() => navigate(`/members/${id}/relatives`)}>
//                 Relatives Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMember;
