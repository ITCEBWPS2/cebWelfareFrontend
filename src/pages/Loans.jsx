import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Loans = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    memberNumber: "",
    epfNumber: "",
    loanNumber: "",
    loanAmount: "",
    name: "",
    address: "",
    position: "",
    branch: "",
    contactNo: {
      phoneNumberMobile: "",
      phoneNumberLandline: "",
    },
    nationalIdNumber: "",
    reasonForLoan: "",
    requiredLoanDate: "",
    dateOfBirth: "",
    retirementDate: "",
  });

  useEffect(() => {
    if (location.state && location.state.member) {
      const member = location.state.member;
      setFormData((prevData) => ({
        ...prevData,
        memberNumber: member.welfareNo,
        epfNumber: member.epfNo,
        name: member.name,
        dateOfBirth: member.dateOfBirth,
        phoneNumberMobile: member.contactNumber,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumberMobile" || name === "phoneNumberLandline") {
      setFormData((prevData) => ({
        ...prevData,
        contactNo: {
          ...prevData.contactNo,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Add this line to inspect form data
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loans",
        formData
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response.data); // Log the actual server error message
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(../../../public/back.jpg)" }}
    >
      {/* <div className=" flex justify-center items-center min-h-screen bg-yellow-50 "> */}

      <div className="bg-gray-100 bg-transparent p-6 rounded-lg shadow-lg w-4/6 mt-10 ">
        <h2 className="text-2xl font-bold mb-4">Loan Application Form</h2>
        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {[
            { label: "Member Number", name: "memberNumber" },
            { label: "EPF Number", name: "epfNumber" },
            { label: "Loan Number", name: "loanNumber" },
            { label: "Loan Amount", name: "loanAmount", type: "number" },
            { label: "Name", name: "name" },
            { label: "Address", name: "address" },
            { label: "Position", name: "position" },
            { label: "Branch/Unit", name: "branch" },
            { label: "Phone Number (Mobile)", name: "phoneNumberMobile" },
            { label: "Phone Number (Landline)", name: "phoneNumberLandline" },
            { label: "National ID Number", name: "nationalIdNumber" },
            { label: "Reason for Loan", name: "reasonForLoan" },
            {
              label: "Required Loan Date",
              name: "requiredLoanDate",
              type: "date",
            },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Retirement Date", name: "retirementDate", type: "date" },
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block font-bold text-gray-950">
                {field.label}:
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border-b-2 bg-transparent leading-tight border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-red-500  group-hover:bg-red-100"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-red-600 align-center text-white py-2 px-4 rounded-lg w-l"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Loans;
