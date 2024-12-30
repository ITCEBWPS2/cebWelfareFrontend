import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import toast from "react-hot-toast";

const RetirementForm = () => {
  const [formData, setFormData] = useState({
    epf: "",
    date: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/retirements`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Form submitted successfully");
      setFormData({
        epf: "",
        date: "",
        amount: "",
      });
    } catch (error) {
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="epf" className="block text-sm font-medium mb-1">
            EPF Number
          </label>
          <input
            type="text"
            id="epf"
            name="epf"
            value={formData.epf}
            onChange={handleChange}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-2 leading-tight focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-2 leading-tight focus:outline-none focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount
          </label>
          <textarea
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-2 leading-tight focus:outline-none focus:border-red-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-900 text-white font-semibold rounded-md hover:bg-red-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RetirementForm;
