import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // password: "",
    epf: "",
    dateOfJoined: "",
    dateOfBirth: "",
    dateOfRegistered: "",
    welfareNo: "",
    role: "admin",
    payroll: "",
    division: "",
    branch: "",
    unit: "",
    contactNo: {
      whatsappNo: "",
      number: "",
    },
    spouseName: "",
    test: [{ name: "", age: "", gender: "" }],
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

  const [customDivision, setCustomDivision] = useState(false);
  const [customBranch, setCustomBranch] = useState(false);
  const [customPayroll, setCustomPayroll] = useState(false);
  const [customUnit, setCustomUnit] = useState(false);
  const [mobileMessage, setMobileMessage] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState(false);
  const [epfMessage, setEpfMessage] = useState("");

  const regex = /^07\d{8}$/; // Mobile number regex

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle EPF field validation
    if (name === "epf") {
      const epfRegex = /^0\d{5}$/;
      setEpfMessage(
        epfRegex.test(value)
          ? "EPF number is valid."
          : "EPF number must be exactly 6 digits and start with 0."
      );
    }

    // Handle Mother In Law's Name and Age
    else if (name === "motherInLawDetails") {
      const [motherInLawName, motherInLawAge] = value.split(","); // Split input by comma
      setFormData((prevData) => ({
        ...prevData,
        motherInLawName: motherInLawName ? motherInLawName.trim() : "",
        motherInLawAge: motherInLawAge ? motherInLawAge.trim() : "",
      }));
    }

    // Handle Father's Name and Age
    else if (name === "fatherDetails") {
      const [fatherName, fatherAge] = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        fatherName: fatherName ? fatherName.trim() : "",
        fatherAge: fatherAge ? fatherAge.trim() : "",
      }));
    }

    // Handle Mother's Name and Age
    else if (name === "motherDetails") {
      const [motherName, motherAge] = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        motherName: motherName ? motherName.trim() : "",
        motherAge: motherAge ? motherAge.trim() : "",
      }));
    }

    // Handle Father In Law's Name and Age
    else if (name === "fatherInLawDetails") {
      // Note: corrected 'fatherDetails' to 'fatherInLawDetails' to avoid duplication
      const [fatherInLawName, fatherInLawAge] = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        fatherInLawName: fatherInLawName ? fatherInLawName.trim() : "",
        fatherInLawAge: fatherInLawAge ? fatherInLawAge.trim() : "",
      }));
    }

    // Handle Child's Name, Age, and Gender
    else if (name === "childDetails") {
      const [childName, childAge, genderChild] = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        childName: childName ? childName.trim() : "",
        childAge: childAge ? childAge.trim() : "",
        genderChild: genderChild ? genderChild.trim() : "",
      }));
    }

    // Handle custom payroll selection
    if (name === "payroll") {
      if (value === "custom") {
        setCustomPayroll(true);
        setFormData((prevData) => ({
          ...prevData,
          payroll: "", // Clear the payroll when custom is selected
        }));
      } else {
        setCustomPayroll(false);
        setFormData((prevData) => ({
          ...prevData,
          unit: value, // Set the selected payroll
        }));
      }
    }

    // Handle custom division selection
    if (name === "division") {
      if (value === "custom") {
        setCustomDivision(true);
        setFormData((prevData) => ({
          ...prevData,
          division: "",
        }));
      } else {
        setCustomDivision(false);
        setFormData((prevData) => ({
          ...prevData,
          division: value,
        }));
      }
    }

    // Handle custom branch selection
    if (name === "branch") {
      if (value === "custom") {
        setCustomBranch(true);
        setFormData((prevData) => ({
          ...prevData,
          branch: "", // Clear the branch when custom is selected
        }));
      } else {
        setCustomBranch(false);
        setFormData((prevData) => ({
          ...prevData,
          branch: value, // Set the selected branch
        }));
      }
    }

    // Handle custom unit selection
    if (name === "unit") {
      if (value === "custom") {
        setCustomUnit(true);
        setFormData((prevData) => ({
          ...prevData,
          unit: "", // Clear the unit when custom is selected
        }));
      } else {
        setCustomUnit(false);
        setFormData((prevData) => ({
          ...prevData,
          unit: value, // Set the selected unit
        }));
      }
    }

    // For other fields
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value,
      },
    });

    // Validate the input based on the parentKey being updated
    if (parentKey === "contactNo") {
      if (name === "number") {
        validateMobile(value);
      } else if (name === "whatsappNo") {
        validateWhatsApp(value);
      }
    }
  };
  // mobile number validation
  const validateMobile = (value) => {
    if (!/^\d+$/.test(value)) {
      setMobileMessage("Only digits are allowed !");
    } else if (value.length !== 10) {
      setMobileMessage("Mobile number must be exactly 10 digits.");
    } else if (!regex.test(value)) {
      setMobileMessage("Mobile number must start with 07.");
    } else {
      setMobileMessage("Mobile number is valid.");
    }
  };
  // whatsapp number validation
  const validateWhatsApp = (value) => {
    if (!/^\d+$/.test(value)) {
      setWhatsappMessage("Only digits are allowed.");
    } else if (value.length !== 10) {
      setWhatsappMessage("WhatsApp number must be exactly 10 digits.");
    } else if (!regex.test(value)) {
      setWhatsappMessage("WhatsApp number must start with 07.");
    } else {
      setWhatsappMessage("WhatsApp number is valid.");
    }
  };
  // children validation
  const handleChildrenChange = (e, index) => {
    const { name, value } = e.target;
    const updatedChildren = formData.test.map((child, i) =>
      i === index ? { ...child, [name]: value } : child
    );
    setFormData({
      ...formData,
      test: updatedChildren,
    });
  };

  // Add child to the children array
  const addChild = () => {
    setFormData({
      ...formData,
      test: [...formData.test, { name: "", age: "", gender: "" }],
    });
  };

  // Remove child from children array
  const removeChild = (index) => {
    const updatedChildren = formData.test.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      test: updatedChildren,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://serverbackend-4wcf.onrender.com/api/members",
        // "http://localhost:5000/api/members",
        formData
      );
      console.log("Member created:", response.data);
      toast.success(response.data.message);

      if (response.data) {
        setFormData({
          name: "",
          email: "",
          // password: "",
          epf: "",
          dateOfJoined: "",
          dateOfBirth: "",
          dateOfRegistered: "",
          welfareNo: "",
          role: "admin",
          payroll: "",
          division: "",
          branch: "",
          unit: "",
          contactNo: {
            whatsappNo: "",
            number: "",
          },
          spouseName: "",
          test: [{ name: "", age: "", gender: "" }],
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

        setMobileMessage("");
        setWhatsappMessage("");
        setEpfMessage("");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      toast.error("Something went wrong");
      // window.location.reload(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-yellow-50 p-8 rounded-lg shadow-lg max-w-8xl w-full">
        <h1 className="text-center text-2xl font-bold mb-8">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className=" grid grid-cols-3 gap-6">
            <div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  // required
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of joined
                </label>
                <input
                  type="date"
                  name="dateOfJoined"
                  value={formData.dateOfJoined}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  // required
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">Payroll</label>
                {!customPayroll ? (
                  <select
                    value={formData.payroll}
                    name="payroll"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "custom") {
                        setCustomPayroll(true); // Switch to input for custom payroll
                      }
                    }}
                    onClick={(e) => {
                      // Expand dropdown on click
                      e.target.size = 5;
                      // Collapse all other select dropdowns
                      document.querySelectorAll("select").forEach((select) => {
                        if (select !== e.target) select.size = 1;
                      });
                    }}
                    onBlur={(e) => {
                      // Collapse dropdown on blur
                      e.target.size = 1;
                    }}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    style={{ maxHeight: "10rem", overflowY: "auto" }}
                    required
                  >
                    <option value="">Select Payroll</option>
                    <option value="Western Province South I">
                      Western Province South I
                    </option>
                    <option value="Western Province South II">
                      Western Province South II
                    </option>
                    <option value="Sabaragamuwa Province">
                      Sabaragamuwa Province
                    </option>
                    <option value="AFM">AFM</option>
                    <option value="WPN">WPN</option>
                    <option value="North Western Province 1">
                      North Western Province 1
                    </option>
                    <option value="North Western Province 2">
                      North Western Province 2
                    </option>
                    <option value="Central Province 1">
                      Central Province 1
                    </option>
                    <option value="Central Province 2">
                      Central Province 2
                    </option>
                    <option value="Southern Province 1">
                      Southern Province 1
                    </option>
                    <option value="Southern Province 2">
                      Southern Province 2
                    </option>
                    <option value="TRANSMISSION">TRANSMISSION</option>
                    <option value="LAKVIJAYA">LAKVIJAYA</option>
                    <option value="North Central Province">
                      North Central Province
                    </option>
                    <option value="Finance Management Head Quarters">
                      Finance Management Head Quarters
                    </option>
                    <option value="COLOMBO CITY">COLOMBO CITY</option>
                    <option value="custom">Custom Payroll</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="payroll"
                    value={formData.payroll}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        payroll: e.target.value, // Update custom payroll input
                      }))
                    }
                    placeholder="Enter custom payroll"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    required
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Division
                </label>
                {!customDivision ? (
                  <select
                    name="division"
                    value={formData.division}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "custom") {
                        setCustomDivision(true); // Switch to input for custom division
                      }
                    }}
                    onClick={(e) => {
                      // Expand dropdown on click
                      e.target.size = 5;
                      // Collapse all other select dropdowns
                      document.querySelectorAll("select").forEach((select) => {
                        if (select !== e.target) select.size = 1;
                      });
                    }}
                    onBlur={(e) => {
                      // Collapse dropdown on blur
                      e.target.size = 1;
                    }}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    style={{ maxHeight: "10rem", overflowY: "auto" }}
                  >
                    <option value="">Select Division</option>
                    <option value="Distribution Division (Region 1)">
                      Distribution Division (Region 1)
                    </option>
                    <option value="Distribution Division (Region 2)">
                      Distribution Division (Region 2)
                    </option>
                    <option value="Distribution Division (Region 3)">
                      Distribution Division (Region 3)
                    </option>
                    <option value="Distribution Division (Region 4)">
                      Distribution Division (Region 4)
                    </option>
                    <option value="TRANSMISSION">TRANSMISSION</option>
                    <option value="GENERATION">GENERATION</option>
                    <option value="custom">Custom Division</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="division"
                    value={formData.division}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        division: e.target.value, // Update custom division input
                      }))
                    }
                    placeholder="Enter custom division"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">Branch</label>
                {!customBranch ? (
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "custom") {
                        setCustomBranch(true); // Switch to input for custom branch
                      }
                    }}
                    onClick={(e) => {
                      // Expand dropdown on click
                      e.target.size = 5;
                      // Collapse all other select dropdowns
                      document.querySelectorAll("select").forEach((select) => {
                        if (select !== e.target) select.size = 1;
                      });
                    }}
                    onBlur={(e) => {
                      // Collapse dropdown on blur
                      e.target.size = 1;
                    }}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    style={{ maxHeight: "10rem", overflowY: "auto" }}
                  >
                    <option value="">Select Branch</option>
                    <option value="Avissawella">Avissawella</option>
                    <option value="Homagama">Homagama</option>
                    <option value="Horana">Horana</option>
                    <option value="Bandaragama">Bandaragama</option>
                    <option value="Sri Jayawardhanapura">
                      Sri Jayawardhanapura
                    </option>
                    <option value="custom">Other Branch</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        branch: e.target.value, // Update custom branch input
                      }))
                    }
                    placeholder="Enter custom branch"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">Unit</label>
                {!customUnit ? (
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value === "custom") {
                        setCustomUnit(true); // Switch to input for custom unit
                      }
                    }}
                    onClick={(e) => {
                      // Expand dropdown on click
                      e.target.size = 5;
                      // Collapse all other select dropdowns
                      document.querySelectorAll("select").forEach((select) => {
                        if (select !== e.target) select.size = 1;
                      });
                    }}
                    onBlur={(e) => {
                      // Collapse dropdown on blur
                      e.target.size = 1;
                    }}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    style={{ maxHeight: "10rem", overflowY: "auto" }}
                  >
                    <option value="">Select Unit</option>
                    <option value="DGM's office">DGM's OFFICE</option>
                    <option value="Chief Engineer">Chief Engineer</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Account Revenue">Account Revenue</option>
                    <option value="Account Expenditure">
                      Account Expenditure
                    </option>
                    <option value="Planning & Development">
                      Planning & Development
                    </option>
                    <option value="construction">Construction</option>
                    <option value="Distribution Maintenance">
                      Distribution Maintenance
                    </option>
                    <option value="it">IT</option>
                    <option value="Commarcial & Corporate ">
                      Commarcial & Corporate{" "}
                    </option>
                    <option value="Project & Heavy Maintenance">
                      Project & Heavy Maintenance
                    </option>
                    <option value="Additional General Manager">
                      Additional General Manager
                    </option>
                    <option value="Additional Finance Manager">
                      Additional Finance Manager
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Meter Testing Lab">Meter Testing Lab</option>
                    <option value="custom">Other Unit</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        unit: e.target.value, // Update custom unit input
                      }))
                    }
                    placeholder="Enter custom unit"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  />
                )}
              </div>

              {/* <div className="mb-4">
                <label className="block font-bold text-gray-950">Unit</label>
                {!customUnit ? (
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    // required
                  >
                    <option value="">Select Unit</option>
                    <option value="dgm">DGM</option>
                    <option value="ce">CE</option>
                    <option value="hr">HR</option>
                    <option value="acc rev">Acc Rev</option>
                    <option value="acc exp">Acc Exp</option>
                    <option value="p&d">P&D</option>
                    <option value="construction">Construction</option>
                    <option value="dm">DM</option>
                    <option value="it">IT</option>
                    <option value="custom">Other Unit</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        unit: e.target.value, // Update custom unit input
                      }))
                    }
                    placeholder="Enter custom unit"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                    // required
                  />
                )}
              </div> */}
              {/* </div> */}
              {/* Second column */}
              {/* <div> */}
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mobile number
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.contactNo.number}
                  onChange={(e) => handleNestedChange(e, "contactNo")}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
                {mobileMessage && (
                  <p
                    style={{
                      color:
                        mobileMessage === "Mobile number is valid."
                          ? "green"
                          : "red",
                    }}
                  >
                    {mobileMessage}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  WhatsApp number
                </label>
                <input
                  type="text"
                  name="whatsappNo"
                  value={formData.contactNo.whatsappNo}
                  onChange={(e) => handleNestedChange(e, "contactNo")}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
                {whatsappMessage && (
                  <p
                    style={{
                      color:
                        whatsappMessage === "WhatsApp number is valid."
                          ? "green"
                          : "red",
                    }}
                  >
                    {whatsappMessage}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">EPF No</label>
                <input
                  type="text"
                  name="epf"
                  value={formData.epf}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  required
                />
                {epfMessage && (
                  <p
                    style={{
                      color:
                        epfMessage === "EPF number is valid." ? "green" : "red",
                    }}
                  >
                    {epfMessage}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Welfare Number
                </label>
                <input
                  type="text"
                  name="welfareNo"
                  value={formData.welfareNo}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  required
                />
              </div>
            </div>
            {/* Second column */}
            <div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Spouse name
                </label>
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Children Section */}
              <div>
                <h2 className="text-xl font-semibold">Children</h2>
                {formData.test.map((child, index) => (
                  <div key={index} className="border p-4 mb-4 space-y-2">
                    <div>
                      <label className="block">Child Name</label>
                      <input
                        type="text"
                        name="name"
                        value={child.name}
                        onChange={(e) => handleChildrenChange(e, index)}
                        className="w-full p-2 border"
                        // required
                      />
                    </div>
                    <div>
                      <label className="block">Child Age</label>
                      <input
                        type="number"
                        name="age"
                        value={child.age}
                        onChange={(e) => handleChildrenChange(e, index)}
                        className="w-full p-2 border"
                        // required
                      />
                    </div>

                    {/* <div>
                      <label className="block">Child Gender</label>
                      <input
                        type="text"
                        name="gender"
                        value={child.gender}
                        onChange={(e) => handleChildrenChange(e, index)}
                        className="w-full p-2 border"
                        // required
                      />
                    </div> */}
                    <div>
                      <label className="block">Child Gender</label>
                      <select
                        name="gender"
                        value={child.gender}
                        onChange={(e) => handleChildrenChange(e, index)}
                        className="w-full p-2 border"
                      >
                        <option value="">Select Gender</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="text-red-500 mt-2"
                    >
                      Remove Child
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addChild}
                  className="w-full bg-green-500 text-white p-2"
                >
                  Add Child
                </button>
              </div>
            </div>
            {/* Column 3 */}
            <div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mother's Age
                </label>
                <input
                  type="text"
                  name="motherAge"
                  value={formData.motherAge}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Father's Age
                </label>
                <input
                  type="text"
                  name="fatherAge"
                  value={formData.fatherAge}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mother In Law's Name
                </label>
                <input
                  type="text"
                  name="motherInLawName"
                  value={formData.motherInLawName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mother In Law's Age
                </label>
                <input
                  type="text"
                  name="motherInLawAge"
                  value={formData.motherInLawAge}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Father In Law's Name
                </label>
                <input
                  type="text"
                  name="fatherInLawName"
                  value={formData.fatherInLawName}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Father In Law's Age
                </label>
                <input
                  type="text"
                  name="fatherInLawAge"
                  value={formData.fatherInLawAge}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-950">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div> */}
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of registered
                </label>
                <input
                  type="date"
                  name="dateOfRegistered"
                  value={formData.dateOfRegistered}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  // required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Member fee
                </label>
                <input
                  type="text"
                  name="memberFee"
                  value={formData.memberFee}
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Rs.300.00"
                  required
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-red-900 hover:bg-red-700 text-white font-medium text-3xl rounded-lg px-40 py-1.5"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterMember;
