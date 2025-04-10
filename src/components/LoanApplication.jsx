import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import toast from "react-hot-toast";

const LoanApplication = () => {
  const [members, setMembers] = useState([]);
  const [filteredEPFs, setFilteredEPFs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    epf: "",
    loanNumber: "",
    loanAmount: "",
    customLoanAmount: "",
    name: "",
    address: "",
    position: "",
    branch: "",
    contactNo: {
      mobile: "",
      landline: "",
    },
    nationalIdNumber: "",
    reasonForLoan: "",
    requiredLoanDate: "",
    dateOfBirth: "",
    retirementDate: "",
    loanStatus: "pending",
  });

  const fetchLoanNumber = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/loans/util/generate-loan-number`,
        { withCredentials: true }
      );
      if (response.data) {
        setFormData((prev) => ({ ...prev, loanNumber: response.data }));
      }
    } catch (error) {
      console.error("Error fetching loan number:", error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchLoanNumber();

    console.log("Members fetched:", members); // Debugging
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customLoanAmount") {
      setFormData((prev) => ({ ...prev, customLoanAmount: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "epf") {
      setShowSuggestions(true);
      setFilteredEPFs(
        members.filter((member) =>
          member.epf.toLowerCase().includes(value.toLowerCase())
        )
      );
    }

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

  const handleSuggestionClick = (epf) => {
    setFormData((prev) => ({ ...prev, epf }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/loans`, formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setFormData({
        epf: "",
        loanNumber: "",
        loanAmount: "",
        customLoanAmount: "",
        name: "",
        address: "",
        position: "",
        branch: "",
        contactNo: {
          mobile: "",
          landline: "",
        },
        nationalIdNumber: "",
        reasonForLoan: "",
        requiredLoanDate: "",
        dateOfBirth: "",
        retirementDate: "",
        loanStatus: "pending",
      });
    } catch (error) {
      console.error("Error submitting loan application:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="epf"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            EPF Number
          </label>
          <input
            id="epf"
            type="text"
            name="epf"
            placeholder="Enter EPF Number"
            value={formData.epf}
            onInput={handleChange} // Handle both typing and autocomplete selection
            onChange={handleChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
          {showSuggestions && filteredEPFs.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
              {filteredEPFs.map((member) => (
                <li
                  key={member._id}
                  onClick={() => handleSuggestionClick(member.epf)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {member.epf}
                </li>
              ))}
            </ul>
          )}
        </div>
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
            disabled
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>

        {/* <div>
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
        </div> */}
        <div>
          <label
            htmlFor="loanAmount"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Loan Amount
          </label>
          <select
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
          >
            <option value="">Select Loan Amount</option>
            <option value="50000">50,000</option>
            <option value="100000">100,000</option>
            <option value="150000">150,000</option>
            <option value="other">Other</option>
          </select>
          {formData.loanAmount === "other" && (
            <input
              type="number"
              name="customLoanAmount"
              placeholder="Enter custom loan amount"
              value={formData.customLoanAmount}
              onChange={handleChange}
              className="mt-2 appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
            />
          )}
        </div>

        {/* <div>
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
        {/* 
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
        </div>*/}

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

        {/* <div>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "@/constants";
// import toast from "react-hot-toast";
// import { NoBreakHyphen } from "docx";

// const LoanApplication = () => {
//   const [members, setMembers] = useState([]);
//   console.log("allmembers:", members);

//   const [formData, setFormData] = useState({
//     epf: "",
//     loanNumber: "",
//     loanAmount: "",
//     name: "",
//     address: "",
//     position: "",
//     branch: "",
//     contactNo: {
//       mobile: "",
//       landline: "",
//     },
//     nationalIdNumber: "",
//     reasonForLoan: "",
//     requiredLoanDate: "",
//     dateOfBirth: "",
//     retirementDate: "",
//     loanStatus: "pending",
//   });
//   const fetchMembers = async () => {
//     try {
//       const memberFetch = await axios.get(`${BASE_URL}/api/members`, {
//         withCredentials: true,
//       });

//       // const sortedMembers = response.data.sort(
//       //   (a, b) => a.welfareNo - b.welfareNo
//       // );
//       setMembers(memberFetch.data);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };
//   useEffect(() => {
//     fetchMembers();
//   }, []);
//   const fetchLoanNumber = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/loans/util/generate-loan-number`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.data) {
//         setFormData((prevData) => ({
//           ...prevData,
//           loanNumber: response.data,
//         }));
//       } else {
//         console.error("Failed to fetch loan number:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching loan number:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchLoanNumber();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("contactNo.")) {
//       const contactField = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         contactNo: { ...prev.contactNo, [contactField]: value },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Parse the dates from the form data
//     const requiredDate = new Date(formData.requiredLoanDate);
//     const retirementDate = new Date(formData.retirementDate);

//     // Calculate the difference in months
//     const monthDifference =
//       retirementDate.getFullYear() * 12 +
//       retirementDate.getMonth() -
//       (requiredDate.getFullYear() * 12 + requiredDate.getMonth());

//     // Check if the gap is less than 10 months
//     if (monthDifference < 10) {
//       const confirmSubmit = window.confirm(
//         "The gap between the Required Loan Date and Retirement Date is less than 10 months. Do you still want to proceed?"
//       );
//       if (!confirmSubmit) {
//         return; // Cancel the submission
//       }
//     }
//     try {
//       const response = await axios.post(`${BASE_URL}/api/loans`, formData, {
//         withCredentials: true,
//       });
//       console.log("Loan Application Submitted Successfully:", response.data);
//       toast.success(response.data.message);

//       if (response.data) {
//         setFormData({
//           memberNumber: "",
//           epf: "",
//           loanNumber: "",
//           loanAmount: "",
//           name: "",
//           address: "",
//           position: "",
//           branch: "",
//           contactNo: {
//             mobile: "",
//             landline: "",
//           },
//           nationalIdNumber: "",
//           reasonForLoan: "",
//           requiredLoanDate: "",
//           dateOfBirth: "",
//           retirementDate: "",
//           loanStatus: "pending",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting loan application:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-8 space-y-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <label
//             htmlFor="epf"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             EPF Number
//           </label>
//           {/* <input
//             id="epf"
//             type="text"
//             name="epf"
//             placeholder="Enter EPF Number"
//             value={formData.epf}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           /> */}
//           <select
//             id="epf"
//             name="epf"
//             value={formData.epf}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           >
//             {members?.map((member) => (
//               <option key={member._id}>{member.epf}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label
//             htmlFor="loanNumber"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Loan Number
//           </label>
//           <input
//             id="loanNumber"
//             type="text"
//             name="loanNumber"
//             placeholder="Enter Loan Number"
//             value={formData.loanNumber}
//             onChange={handleChange}
//             required
//             disabled
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="loanAmount"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Loan Amount
//           </label>
//           <input
//             id="loanAmount"
//             type="number"
//             name="loanAmount"
//             placeholder="Enter Loan Amount"
//             value={formData.loanAmount}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="name"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Full Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             name="name"
//             placeholder="Enter Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="address"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Address
//           </label>
//           <input
//             id="address"
//             type="text"
//             name="address"
//             placeholder="Enter Address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="position"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Position
//           </label>
//           <input
//             id="position"
//             type="text"
//             name="position"
//             placeholder="Enter Position"
//             value={formData.position}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="branch"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Branch
//           </label>
//           <input
//             id="branch"
//             type="text"
//             name="branch"
//             placeholder="Enter branch"
//             value={formData.branch}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="contactNoMobile"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Mobile Contact
//           </label>
//           <input
//             id="contactNoMobile"
//             type="text"
//             name="contactNo.mobile"
//             placeholder="Enter Mobile Contact"
//             value={formData.contactNo.mobile}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="contactNoLandline"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Landline Contact
//           </label>
//           <input
//             id="contactNoLandline"
//             type="text"
//             name="contactNo.landline"
//             placeholder="Enter Landline Contact"
//             value={formData.contactNo.landline}
//             onChange={handleChange}
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="nationalIdNumber"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             National ID Number
//           </label>
//           <input
//             id="nationalIdNumber"
//             type="text"
//             name="nationalIdNumber"
//             placeholder="Enter NIC"
//             value={formData.nationalIdNumber}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="reasonForLoan"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Reason for Loan
//           </label>
//           <input
//             id="reasonForLoan"
//             type="text"
//             name="reasonForLoan"
//             placeholder="Enter Reason"
//             value={formData.reasonForLoan}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="requiredLoanDate"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Required Loan Date
//           </label>
//           <input
//             type="date"
//             name="requiredLoanDate"
//             placeholder="Required Loan Date"
//             value={formData.requiredLoanDate}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="dateOfBirth"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             placeholder="Date of Birth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="retirementDate"
//             className="block mb-2 text-sm font-medium text-gray-600"
//           >
//             Retirement Date
//           </label>
//           <input
//             type="date"
//             name="retirementDate"
//             placeholder="Retirement Date"
//             value={formData.retirementDate}
//             onChange={handleChange}
//             required
//             className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-red-500"
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full p-3 font-semibold bg-red-900 text-white rounded-md hover:bg-red-800 transition"
//       >
//         Submit Loan Application
//       </button>
//     </form>
//   );
// };

// export default LoanApplication;
