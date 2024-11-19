import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

const MemberUpdate = ({ memberId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    epf: "",
    dateOfJoined: "",
    dateOfBirth: "",
    dateOfRegistered: "",
    welfareNo: "",
    role: "member",
    payroll: "",
    division: "",
    branch: "",
    unit: "",
    contactNo: {
      whatsappNo: "",
      number: "",
    },
    spouseName: "",
    children: [{ name: "", age: "", gender: "" }],
    motherName: "",
    motherAge: "",
    fatherName: "",
    fatherAge: "",
    motherInLawName: "",
    motherInLawAge: "",
    fatherInLawName: "",
    fatherInLawAge: "",
    memberFee: "",
  });
  const [initialData, setInitialData] = useState(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/members/${memberId}`, { withCredentials: true })
      .then((response) => {
        setFormData(response.data);
        setInitialData(response.data);
      })
      .catch((error) => console.error("Error fetching member data:", error));
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [parentKey]: {
        ...prevFormData[parentKey],
        [name]: value,
      },
    }));
  };

  const addChild = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: [...prevFormData.children, { name: "", age: "", gender: "" }],
    }));
  };

  const removeChild = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: prevFormData.children.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/members/${memberId}`, formData, {
        withCredentials: true,
      });
      alert("Member updated successfully");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member");
    }
  };

  // Check if formData has been modified compared to initialData
  useEffect(() => {
    if (initialData) {
      setIsModified(JSON.stringify(formData) !== JSON.stringify(initialData));
    }
  }, [formData, initialData]);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Member</h2>

      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Example for nested fields (Contact Numbers) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            WhatsApp Number
          </label>
          <input
            type="number"
            name="whatsappNo"
            value={formData.contactNo.whatsappNo}
            onChange={(e) => handleNestedChange(e, "contactNo")}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="number"
            name="number"
            value={formData.contactNo.number}
            onChange={(e) => handleNestedChange(e, "contactNo")}
            className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Dynamic Children Fields */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Children
        </label>
        {formData.children.map((child, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Child's Name"
              value={child.name}
              onChange={(e) => {
                const newChildren = [...formData.children];
                newChildren[index].name = e.target.value;
                setFormData({ ...formData, children: newChildren });
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={child.age}
              onChange={(e) => {
                const newChildren = [...formData.children];
                newChildren[index].age = e.target.value;
                setFormData({ ...formData, children: newChildren });
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={child.gender}
              onChange={(e) => {
                const newChildren = [...formData.children];
                newChildren[index].gender = e.target.value;
                setFormData({ ...formData, children: newChildren });
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeChild(index)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addChild}
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Child
        </button>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isModified}
        className={`w-full py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500
          ${
            isModified
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
      >
        Update Member
      </button>
    </form>
  );
};

export default MemberUpdate;
