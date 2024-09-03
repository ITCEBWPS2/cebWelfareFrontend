import React, { useState } from "react";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    purpose: "",
    repaymentTerm: "",
  });
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomAmount(true);
      setFormData({ ...formData, amount: "" });
    } else {
      setIsCustomAmount(false);
      setFormData({ ...formData, amount: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Loan application submitted successfully!");
        setFormData({
          memberId: "",
          amount: "",
          purpose: "",
          repaymentTerm: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 grid-cols-2">
      <h2 className="text-2xl font-bold mb-4 grid-cols-2">Apply for a Loan</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="memberId"
            >
              Member ID
            </label>
            <input
              type="text"
              name="memberId"
              id="memberId"
              value={formData.memberId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Loan Amount
            </label>
            <select
              name="amount"
              id="amount"
              value={isCustomAmount ? "" : formData.amount}
              onChange={handleSelectChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Amount</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
              <option value="150000">150,000</option>
              <option value="custom">Custom Amount</option>
            </select>
            {isCustomAmount && (
              <input
                type="number"
                name="amount"
                id="amount-custom"
                value={formData.amount}
                onChange={handleChange}
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter custom amount"
              />
            )}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="purpose"
            >
              Purpose
            </label>
            <textarea
              name="purpose"
              id="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="repaymentTerm"
            >
              Repayment Term (months)
            </label>
            <input
              type="number"
              name="repaymentTerm"
              id="repaymentTerm"
              value={formData.repaymentTerm}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplication;
