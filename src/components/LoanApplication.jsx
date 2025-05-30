import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import toast from "react-hot-toast";
import { NoBreakHyphen } from "docx";

const LoanApplication = () => {
  const [members, setMembers] = useState([]);
  const [filteredEPFs, setFilteredEPFs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const [loanCount, setLoanCount] = useState(0);

  const showLoanCountPopup = (count) => {
    setPopupMessage(`This member has ${count} approved loan(s).`);
    setShowPopup(true);
  };  

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members`, {
        withCredentials: true,
      });
      setMembers(response.data);  
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

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

  const fetchApprovedLoanCount = async (epf) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/loans/approved-count/${epf}`, {
        withCredentials: true,
      });
      setLoanCount(response.data.count);
      alert(`This member has ${response.data.count} approved loan(s).`); 
      return response.data.count;
    } catch (error) {
      console.error("Error fetching approved loan count:", error);
      setLoanCount(0);
      return 0;
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
      const lowerEPF = value.toLowerCase();
      setShowSuggestions(true);
      setFilteredEPFs(
        members.filter((member) =>
          member.epf.toLowerCase().includes(lowerEPF)
        )
      );
    
      setFormData((prev) => ({ ...prev, epf: value }));
    
      if (value.length >= 5) {
        fetchApprovedLoanCount(value).then((count) => {
          showLoanCountPopup(count);
          setLoanCount(count);
        });
      } else {
        setLoanCount(0);
      }
      return;
    }       
    
    if (name.includes("contactNo.")) {
      const contactField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactNo: { ...prev.contactNo, [contactField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSuggestionClick = async (epf) => {
    setFormData((prev) => ({ ...prev, epf }));
    const count = await fetchApprovedLoanCount(epf); // wait for count
    alert(`This member has ${count} approved loan(s).`);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredDate = new Date(formData.requiredLoanDate);
    const retirementDate = new Date(formData.retirementDate);
    // const finalLoanAmount =
    //   formData.loanAmount === "other"
    //     ? formData.customLoanAmount
    //     : formData.loanAmount;
    const finalLoanAmount =
      formData.loanAmount === "other" && formData.customLoanAmount
        ? formData.customLoanAmount
        : formData.loanAmount;

    const dataToSubmit = {
      ...formData,
      loanAmount: finalLoanAmount,
    };

    const monthDifference =
      retirementDate.getFullYear() * 12 +
      retirementDate.getMonth() -
      (requiredDate.getFullYear() * 12 + requiredDate.getMonth());

    // Check if the gap is less than 10 months
    if (monthDifference < 10) {
      const confirmation = window.confirm(
        "There should be a minimum of 10 months gap between the Required Loan Date and Retirement Date. Do you want to proceed?"
      );

      if (!confirmation) {
        return; // Cancel submission
      }
    }

    // try {
    //   const response = await axios.post(`${BASE_URL}/api/loans`, formData, {
    //     withCredentials: true,
    //   });
    try {
      const response = await axios.post(`${BASE_URL}/api/loans`, dataToSubmit, {
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
        <div className="relative">
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

          {formData.epf && (
            <p className="text-sm text-gray-700 mt-2">
              Approved Loan(s) Count: <span className="font-semibold">{loanCount}</span>
            </p>
          )}

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
                <p className="mb-4 text-lg">{popupMessage}</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800"
                >
                  OK
                </button>
              </div>
            </div>
          )}


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

