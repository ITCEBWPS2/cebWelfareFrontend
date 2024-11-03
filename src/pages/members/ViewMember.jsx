import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const ViewMember = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchViewMember = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/members/${memberId}`
          `https://cebwps2welfare.netlify.app/api/members/${memberId}`
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchViewMember();
  }, [memberId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("member-details");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", [220, 307]);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
      pdf.save(`${member.name}_details.pdf`);
    });
  };

  const handleDownloadWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun("Member Details")],
              heading: "Heading1",
            }),
            ...Object.entries(member).map(
              ([key, value]) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${key}: `, bold: true }),
                    new TextRun(value ? value.toString() : "N/A"), // Provide "N/A" if the value is undefined or null
                  ],
                })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc)
      .then((blob) => {
        saveAs(
          new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }),
          `${member.name || "member"}_details.docx`
        );
      })
      .catch((error) =>
        console.error("Error generating Word document:", error)
      );
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-10 flex justify-center print:w-full print:p-0">
      <div
        id="member-details"
        className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full relative print:shadow-none print:bg-white print:w-full print:max-w-none"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-indigo-600 print:text-black">
          Member Details
        </h2>
        <div className="border-l-4 border-indigo-500 pl-3 mb-4 space-y-3 text-sm print:border-none print:pl-0">
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
          <h3 className="text-lg font-semibold mt-3">Test Information:</h3>
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
        <div className="flex justify-center space-x-4 mt-6 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Download as PDF
          </button>
          {/* <button
            onClick={handleDownloadWord}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
          >
            Download as Word
          </button> */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMember;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// const ViewMember = () => {
//   const { memberId } = useParams();
//   const [member, setMember] = useState(null);

//   useEffect(() => {
//     const fetchViewMember = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/members/${memberId}`
//         );
//         setMember(response.data);
//         console.log("member data: ", response.data);
//       } catch (error) {
//         console.error("Error fetching member details:", error);
//       }
//     };

//     fetchViewMember();
//   }, [memberId]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById("member-details");
//     html2canvas(input, { scale: 1 }).then((canvas) => {
//       const pdf = new jsPDF("p", "mm", [210, 297]); // A4 size
//       const imgData = canvas.toDataURL("image/png");
//       const imgWidth = 200;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
//       pdf.save(`${member.name}_details.pdf`);
//     });
//   };

//   const handleDownloadWord = () => {
//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({
//               children: [new TextRun("Member Details")],
//               heading: "Heading1",
//             }),
//             ...Object.entries(member).map(
//               ([key, value]) =>
//                 new Paragraph({
//                   children: [
//                     new TextRun({ text: `${key}: `, bold: true }),
//                     new TextRun(value?.toString()),
//                   ],
//                 })
//             ),
//           ],
//         },
//       ],
//     });

//     Packer.toBlob(doc).then((blob) => {
//       saveAs(blob, `${member.name}_details.docx`);
//     });
//   };

//   if (!member) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 p-10 flex justify-center print:w-full print:p-0">
//       <div
//         id="member-details"
//         className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full relative print:shadow-none print:bg-white print:w-full print:max-w-none"
//       >
//         <h2 className="text-xl font-bold text-center mb-4 text-indigo-600 print:text-black">
//           Member Details
//         </h2>
//         <div className="border-l-4 border-indigo-500 pl-3 mb-4 space-y-3 text-sm print:border-none print:pl-0">
//           <p>
//             <strong>EPF No:</strong> {member.epf}
//           </p>
//           <p>
//             <strong>Welfare No:</strong> {member.welfareNo}
//           </p>
//           <p>
//             <strong>Name:</strong> {member.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {member.email}
//           </p>
//           <p>
//             <strong>Date of Birth:</strong> {member.dateOfBirth}
//           </p>
//           <p>
//             <strong>Date of Registered:</strong> {member.dateOfRegistered}
//           </p>
//           <p>
//             <strong>Date of Joined:</strong> {member.dateOfJoined}
//           </p>
//           <p>
//             <strong>Role:</strong> {member.role}
//           </p>
//           <p>
//             <strong>Payroll:</strong> {member.payroll}
//           </p>
//           <p>
//             <strong>Division:</strong> {member.division}
//           </p>
//           <p>
//             <strong>Branch:</strong> {member.branch}
//           </p>
//           <p>
//             <strong>Unit:</strong> {member.unit}
//           </p>
//           <p>
//             <strong>Contact Number:</strong> {member.contactNo?.number}
//           </p>
//           <p>
//             <strong>WhatsApp Number:</strong> {member.contactNo?.whatsappNo}
//           </p>
//           <p>
//             <strong>Spouse Name:</strong> {member.spouseName}
//           </p>
//           <h3 className="text-lg font-semibold mt-3">Test Information:</h3>
//           {member.test?.map((testItem, index) => (
//             <div key={index} className="ml-4">
//               <p>
//                 <strong>Name:</strong> {testItem.name}
//               </p>
//               <p>
//                 <strong>Age:</strong> {testItem.age}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {testItem.gender}
//               </p>
//             </div>
//           ))}
//           <p>
//             <strong>Mother's Name:</strong> {member.motherName}
//           </p>
//           <p>
//             <strong>Mother's Age:</strong> {member.motherAge}
//           </p>
//           <p>
//             <strong>Father's Name:</strong> {member.fatherName}
//           </p>
//           <p>
//             <strong>Father's Age:</strong> {member.fatherAge}
//           </p>
//           <p>
//             <strong>Mother-in-law's Name:</strong> {member.motherInLawName}
//           </p>
//           <p>
//             <strong>Mother-in-law's Age:</strong> {member.motherInLawAge}
//           </p>
//           <p>
//             <strong>Father-in-law's Name:</strong> {member.fatherInLawName}
//           </p>
//           <p>
//             <strong>Father-in-law's Age:</strong> {member.fatherInLawAge}
//           </p>
//           <p>
//             <strong>Member Fee:</strong> {member.memberFee}
//           </p>
//         </div>
//         <div className="flex justify-center space-x-4 mt-6 print:hidden">
//           <button
//             onClick={handleDownloadPDF}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             Download as PDF
//           </button>
//           <button
//             onClick={handleDownloadWord}
//             className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
//           >
//             Download as Word
//           </button>
//           <button
//             onClick={handlePrint}
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
//           >
//             Print
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMember;

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
//           `http://localhost:5000/api/members/${memberId}`
//           // `https://serverbackend-4wcf.onrender.com/api/members/${memberId}`
//         );
//         setMember(response.data);
//         console.log("member data: ", response.data);
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
//         <strong>Email:</strong> {member.email}
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
//         <strong>Role:</strong> {member.role}
//       </p>
//       <p>
//         <strong>Payroll:</strong> {member.payroll}
//       </p>
//       <p>
//         <strong>Division:</strong> {member.division}
//       </p>
//       <p>
//         <strong>Branch:</strong> {member.branch}
//       </p>
//       <p>
//         <strong>Unit:</strong> {member.unit}
//       </p>
//       <p>
//         <strong>Contact Number:</strong> {member.contactNo?.number}
//       </p>
//       <p>
//         <strong>WhatsApp Number:</strong> {member.contactNo?.whatsappNo}
//       </p>
//       <p>
//         <strong>Spouse Name:</strong> {member.spouseName}
//       </p>
//       <h3 className="text-xl font-semibold mt-4">Test Information:</h3>
//       {member.test?.map((testItem, index) => (
//         <div key={index} className="ml-4">
//           <p>
//             <strong>Name:</strong> {testItem.name}
//           </p>
//           <p>
//             <strong>Age:</strong> {testItem.age}
//           </p>
//           <p>
//             <strong>Gender:</strong> {testItem.gender}
//           </p>
//         </div>
//       ))}
//       <p>
//         <strong>Mother's Name:</strong> {member.motherName}
//       </p>
//       <p>
//         <strong>Mother's Age:</strong> {member.motherAge}
//       </p>
//       <p>
//         <strong>Father's Name:</strong> {member.fatherName}
//       </p>
//       <p>
//         <strong>Father's Age:</strong> {member.fatherAge}
//       </p>
//       <p>
//         <strong>Mother-in-law's Name:</strong> {member.motherInLawName}
//       </p>
//       <p>
//         <strong>Mother-in-law's Age:</strong> {member.motherInLawAge}
//       </p>
//       <p>
//         <strong>Father-in-law's Name:</strong> {member.fatherInLawName}
//       </p>
//       <p>
//         <strong>Father-in-law's Age:</strong> {member.fatherInLawAge}
//       </p>
//       <p>
//         <strong>Member Fee:</strong> {member.memberFee}
//       </p>
//     </div>
//   );
// };

// export default ViewMember;
