import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import toast from "react-hot-toast";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    memberNumber: "",
    epfNumber: "",
    loanNumber: "",
    loanAmount: "",
    name: "",
    address: "",
    position: "",
    branch: "",
    contactNo: { mobile: "", landline: "" },
    nationalIdNumber: "",
    reasonForLoan: "",
    requiredLoanDate: "",
    dateOfBirth: "",
    retirementDate: "",
    loanStatus: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contactNo.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactNo: { ...prev.contactNo, [contactField]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/loans`, formData, {
        withCredentials: true,
      });
      console.log("Loan Application Submitted Successfully:", response.data);
      toast.success(response.data.message);

      if (response.data) {
        setFormData({
          memberNumber: "",
          epfNumber: "",
          loanNumber: "",
          loanAmount: "",
          name: "",
          address: "",
          position: "",
          branch: "",
          contactNo: { mobile: "", landline: "" },
          nationalIdNumber: "",
          reasonForLoan: "",
          requiredLoanDate: "",
          dateOfBirth: "",
          retirementDate: "",
        });
      }
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto my-8 p-8 space-y-12"
    >
      <h1 className="text-2xl font-bold text-gray-700">
        Loan Application Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="memberNumber"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Member Number
          </label>
          <input
            id="memberNumber"
            type="text"
            name="memberNumber"
            placeholder="Enter Member Number"
            value={formData.memberNumber}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* EPF Number */}
        <div>
          <label
            htmlFor="epfNumber"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            EPF Number
          </label>
          <input
            id="epfNumber"
            type="text"
            name="epfNumber"
            placeholder="Enter EPF Number"
            value={formData.epfNumber}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Loan Number */}
        <div>
          <label
            htmlFor="loanNumber"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Loan Number
          </label>
          <input
            id="loanNumber"
            type="text"
            name="loanNumber"
            placeholder="Enter Loan Number"
            value={formData.loanNumber}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Loan Amount */}
        <div>
          <label
            htmlFor="loanAmount"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Loan Amount
          </label>
          <input
            id="loanAmount"
            type="number"
            name="loanAmount"
            placeholder="Enter Loan Amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            name="position"
            placeholder="Enter Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="branch"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Branch
          </label>
          <input
            id="branch"
            type="text"
            name="branch"
            placeholder="Enter branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="contactNoMobile"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Mobile Contact
          </label>
          <input
            id="contactNoMobile"
            type="text"
            name="contactNo.mobile"
            placeholder="Enter Mobile Contact"
            value={formData.contactNo.mobile}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="contactNoLandline"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Landline Contact
          </label>
          <input
            id="contactNoLandline"
            type="text"
            name="contactNo.landline"
            placeholder="Enter Landline Contact"
            value={formData.contactNo.landline}
            onChange={handleChange}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="nationalIdNumber"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            National ID Number
          </label>
          <input
            id="nationalIdNumber"
            type="text"
            name="nationalIdNumber"
            placeholder="Enter NIC"
            value={formData.nationalIdNumber}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="reasonForLoan"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Reason for Loan
          </label>
          <input
            id="reasonForLoan"
            type="text"
            name="reasonForLoan"
            placeholder="Enter Reason"
            value={formData.reasonForLoan}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="requiredLoanDate"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Required Loan Date
          </label>
          <input
            type="date"
            name="requiredLoanDate"
            placeholder="Required Loan Date"
            value={formData.requiredLoanDate}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="retirementDate"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Retirement Date
          </label>
          <input
            type="date"
            name="retirementDate"
            placeholder="Retirement Date"
            value={formData.retirementDate}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-3 font-semibold bg-red-900 text-white rounded-md hover:bg-red-800 transition"
      >
        Submit Loan Application
      </button>
    </form>
  );
};

export default LoanApplication;
