import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewMember = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);

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
