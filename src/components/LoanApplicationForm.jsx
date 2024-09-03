import React, { useState } from 'react';
import axios from 'axios';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    memberNumber: '',
    epfNumber: '',
    loanNumber: '',
    loanAmount: '',
    name: '',
    address: '',
    position: '',
    branch: '',
    phoneNumberMobile: '',
    phoneNumberLandline: '',
    nationalIdNumber: '',
    reasonForLoan: '',
    requiredLoanDate: '',
    dateOfBirth: '',
    retirementDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/loan-applications', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Member Number', name: 'memberNumber' },
          { label: 'EPF Number', name: 'epfNumber' },
          { label: 'Loan Number', name: 'loanNumber' },
          { label: 'Loan Amount', name: 'loanAmount', type: 'number' },
          { label: 'Name', name: 'name' },
          { label: 'Address', name: 'address' },
          { label: 'Position', name: 'position' },
          { label: 'Branch/Unit', name: 'branch' },
          { label: 'Phone Number (Mobile)', name: 'phoneNumberMobile' },
          { label: 'Phone Number (Landline)', name: 'phoneNumberLandline' },
          { label: 'National ID Number', name: 'nationalIdNumber' },
          { label: 'Reason for Loan', name: 'reasonForLoan' },
          { label: 'Required Loan Date', name: 'requiredLoanDate', type: 'date' },
          { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
          { label: 'Retirement Date', name: 'retirementDate', type: 'date' },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-gray-700">{field.label}:</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded-lg w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
