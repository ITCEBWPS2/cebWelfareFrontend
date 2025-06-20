import { useAuth } from "@/api/authContext";
import { main_header_1, user_fallback } from "@/assets";
import { isSecretaryOrAssistantSecretary } from "@/authorization";
import MemberUpdate from "@/components/MemberUpdate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const MemberProfile = () => {
  const { epfnumber } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/members/${epfnumber}`,
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
  }, [epfnumber]);

  const handleDelete = async (epfnumber) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`${BASE_URL}/api/members/${epfnumber}`, {
          withCredentials: true,
        });
        alert("Member deleted successfully.");
        // Navigate back to the member list after deletion
        navigate("/dashboard/members");
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member!!!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div>Member not found.</div>
      </div>
    );
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
    profilePhoto = user_fallback,
  } = member;

  return (
    <div className="flex flex-col items-center relative">
      <img
        src={main_header_1}
        alt="Profile"
        className="w-full h-36 object-cover object-center"
      />
      <div className="max-w-4xl w-full -mt-14 px-4">
        <button
          onClick={() => {
            navigate("/dashboard/members", {
              state: { scrollPosition: location.state?.scrollPosition },
            });
          }}
          className="absolute left-4 top-8 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200">
          Go to Member List
        </button>

        <div className="flex flex-col items-left">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover mb-4"
          />
          <h2 className="text-2xl text-gray-800 font-bold">{name}</h2>
          <p className="text-gray-500">
            {role === "super_admin" ? "Super Admin" : ""} 
          </p>
        </div>

        <div className="mt-6 text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>EPF:</strong> {epf}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(dateOfBirth).toLocaleDateString("en-GB") || "N/A"}
              </p>
              <p>
                <strong>Date of Joined:</strong>{" "}
                {new Date(dateOfJoined).toLocaleDateString("en-GB") || "N/A"}
              </p>
              <p>
                <strong>Date of Registered:</strong>{" "}
                {new Date(dateOfRegistered).toLocaleDateString("en-GB") || "N/A"}
              </p>
              <p>
                <strong>Welfare No:</strong> {welfareNo}
              </p>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h3 className="text-x1 font-semibold mb-4">Work Information</h3>
            <div className="space-y-2">
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
          </div>

          {/* Family Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Family Information</h3>
            <div className="space-y-2">
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
                {motherAge ? `${motherAge} years` : ""}
              </p>
              <p>
                <strong>Father:</strong> {fatherName || "N/A"}{" "}
                {fatherAge ? `${fatherAge} years` : ""}
              </p>
              <p>
                <strong>Mother-in-Law:</strong> {motherInLawName || "N/A"}{" "}
                {motherInLawAge ? `${motherInLawAge} years` : ""}
              </p>
              <p>
                <strong>Father-in-Law:</strong> {fatherInLawName || "N/A"}{" "}
                {fatherInLawAge ? `${fatherInLawAge} years` : ""}
              </p>
            </div>
          </div>

          {/* Membership Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Membership Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Membership Fee:</strong> Rs.{memberFee}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {role === "super_admin" ? "Super Admin" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full my-8">
        <div className="flex flex-col max-w-4xl w-full gap-4 px-4 py-8 md:flex-row border-t">
          <Link to={`/dashboard/members/${member._id}/loans`}>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200">
              Loans
            </button>
          </Link>
          <Link to={`/dashboard/members/${member._id}/benefits`}>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200">
              Benefits
            </button>
          </Link>
          {isSecretaryOrAssistantSecretary(user) && (
            <>
              <Dialog>
                <DialogTrigger>
                  <button className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200">
                    Update Profile
                  </button>
                </DialogTrigger>
            
                <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                  <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold">
                      {name}
                    </DialogTitle>
                    <DialogDescription>Update User Details.</DialogDescription>
                  </DialogHeader>
                  <MemberUpdate memberId={epfnumber} />
                </DialogContent>
              </Dialog>

              <button
                className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-200"
                onClick={() => handleDelete(epfnumber)}>
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;