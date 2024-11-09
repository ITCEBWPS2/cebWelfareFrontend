import { BASE_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemberProfile = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/members/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!member) {
    return <div>Member not found.</div>;
  }

  const {
    name,
    email,
    epf,
    dateOfJoined,
    dateOfBirth,
    dateOfRegistered,
    welfareNo,
    role,
    payroll,
    division,
    branch,
    unit,
    contactNo,
    spouseName,
    children,
    motherName,
    motherAge,
    fatherName,
    fatherAge,
    motherInLawName,
    motherInLawAge,
    fatherInLawName,
    fatherInLawAge,
    memberFee,
    profilePhoto = "https://via.placeholder.com/150",
  } = member;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-500">{role === "admin" ? "Admin" : "Member"}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>EPF:</strong> {epf}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dateOfBirth || "N/A"}
          </p>
          <p>
            <strong>Date of Joined:</strong> {dateOfJoined || "N/A"}
          </p>
          <p>
            <strong>Date of Registered:</strong> {dateOfRegistered || "N/A"}
          </p>
          <p>
            <strong>Welfare No:</strong> {welfareNo}
          </p>
        </div>

        {/* Work Information */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Work Information</h3>
          <p>
            <strong>Payroll:</strong> {payroll}
          </p>
          <p>
            <strong>Division:</strong> {division}
          </p>
          <p>
            <strong>Branch:</strong> {branch}
          </p>
          <p>
            <strong>Unit:</strong> {unit}
          </p>
          <p>
            <strong>Contact:</strong> {contactNo?.number || "N/A"}
          </p>
          <p>
            <strong>WhatsApp:</strong> {contactNo?.whatsappNo || "N/A"}
          </p>
        </div>

        {/* Family Information */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Family Information</h3>
          <p>
            <strong>Spouse:</strong> {spouseName || "N/A"}
          </p>
          {children && children.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mt-2">Children:</h4>
              <ul className="ml-4 list-disc">
                {children.map((child, index) => (
                  <li key={index}>
                    {child.name}, {child.age} years old ({child.gender})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>
            <strong>Mother:</strong> {motherName || "N/A"}{" "}
            {motherAge ? `(${motherAge} years)` : ""}
          </p>
          <p>
            <strong>Father:</strong> {fatherName || "N/A"}{" "}
            {fatherAge ? `(${fatherAge} years)` : ""}
          </p>
          <p>
            <strong>Mother-in-Law:</strong> {motherInLawName || "N/A"}{" "}
            {motherInLawAge ? `(${motherInLawAge} years)` : ""}
          </p>
          <p>
            <strong>Father-in-Law:</strong> {fatherInLawName || "N/A"}{" "}
            {fatherInLawAge ? `(${fatherInLawAge} years)` : ""}
          </p>
        </div>

        {/* Membership Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Membership Details</h3>
          <p>
            <strong>Membership Fee:</strong> ${memberFee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
