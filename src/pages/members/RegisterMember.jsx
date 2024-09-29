import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [memberRegister, setMemberRegister] = useState({
    name: "",
    email: "",
    password: "",
    epf: "",
    status: "",
    dateOfJoined: "",
    dateOfBirth: "",
    dateOfRegistered: "",
    welfareNo: "",
    payroll: "",
    division: "",
    contactNo: { whatsappNo: "", number: "" },
    spouseName: "",
    noOfChildren: "",
    aboutChildren: "",
    noOfAdults: "",
    aboutAdults: "",
    memberFee: "300.00",
  });

  const [customDivision, setCustomDivision] = useState(false);
  const [customPayroll, setCustomPayroll] = useState(false);
  const [mobileMessage, setMobileMessage] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [epfMessage, setEpfMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "epf") {
      const epfRegex = /^0\d{5}$/;
      setEpfMessage(
        epfRegex.test(value)
          ? "EPF number is valid."
          : "EPF number must be exactly 6 digits and start with 0."
      );
    }

    setMemberRegister((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setMemberRegister((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setMemberRegister((prevUser) => ({
        ...prevUser,
        contactNo: { ...prevUser.contactNo, [name]: value },
      }));

      const regex = /^07\d{8}$/;
      if (name === "number") {
        setMobileMessage(
          value.length === 0 || regex.test(value)
            ? value.length === 10
              ? "Mobile number is valid."
              : ""
            : "Mobile number must be exactly 10 digits."
        );
      }

      if (name === "whatsappNo") {
        setWhatsappMessage(
          value.length === 0 || regex.test(value)
            ? value.length === 10
              ? "WhatsApp number is valid."
              : ""
            : "WhatsApp number must be exactly 10 digits."
        );
      }
    } else {
      if (name === "number") setMobileMessage("Only digits are allowed.");
      if (name === "whatsappNo") setWhatsappMessage("Only digits are allowed.");
    }
  };

  const handlePayrollChange = (e) => {
    const { value } = e.target;
    if (value === "custom") {
      setCustomPayroll(true);
      setMemberRegister((prevUser) => ({
        ...prevUser,
        payroll: "", // Clear the payroll when custom is selected
      }));
    } else {
      setCustomPayroll(false);
      setMemberRegister((prevUser) => ({
        ...prevUser,
        payroll: value,
      }));
    }
  };

  const handleDivisionChange = (e) => {
    const { value } = e.target;
    if (value === "custom") {
      setCustomDivision(true);
      setMemberRegister((prevUser) => ({
        ...prevUser,
        division: "", // Clear the division when custom is selected
      }));
    } else {
      setCustomDevision(false);
      setMemberRegister((prevUser) => ({
        ...prevUser,
        division: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://serverbackend-4wcf.onrender.com/api/members",
        memberRegister
      );
      console.log(response.data);

      setMemberRegister({
        name: "",
        email: "",
        password: "",
        epf: "",
        status: "",
        dateOfJoined: "",
        dateOfBirth: "",
        dateOfRegistered: "",
        welfareNo: "",
        payroll: "",
        division: "",
        contactNo: { whatsappNo: "", number: "" },
        spouseName: "",
        noOfChildren: "",
        aboutChildren: "",
        noOfAdults: "",
        aboutAdults: "",
        memberFee: "300.00",
      });

      window.location.reload();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="bg-yellow-50 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">Status</label>
                <select
                  name="status"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 group-hover:bg-red-100"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="retired">Retired</option>
                  <option value="resign">Resign</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of joined
                </label>
                <input
                  type="date"
                  name="dateOfJoined"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">Payroll</label>
                {!customPayroll ? (
                  <select
                    name="payroll"
                    onChange={handlePayrollChange}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  >
                    <option value="">Select Payroll</option>
                    <option value="Payroll 1">Payroll 1</option>
                    <option value="Payroll 2">Payroll 2</option>
                    <option value="Payroll 3">Payroll 3</option>
                    <option value="custom">Custom Payroll</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="payroll"
                    value={memberRegister.payroll}
                    onChange={handleChange}
                    placeholder="Enter custom payroll"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  />
                )}
              </div>
              {/* <div className="mb-4">
                <label className="block font-bold text-gray-950">Payroll</label>
                <input
                  type="text"
                  name="payroll"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div> */}

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Division
                </label>
                {!customDivision ? (
                  <select
                    name="division"
                    onChange={handleDivisionChange}
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  >
                    <option value="">Select Division</option>
                    <option value="Payroll 1">Division 1</option>
                    <option value="Payroll 2">Division 2</option>
                    <option value="Payroll 3">Division 3</option>
                    <option value="custom">Custom Division</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="division"
                    value={memberRegister.division}
                    onChange={handleChange}
                    placeholder="Enter custom division"
                    className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  />
                )}
              </div>
              {/* <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Division
                </label>
                <input
                  type="text"
                  name="division"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div> */}

              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Mobile number
                </label>
                <input
                  type="text"
                  name="number"
                  onChange={handleContactChange}
                  value={memberRegister.contactNo.number}
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
                  onChange={handleContactChange}
                  value={memberRegister.contactNo.whatsappNo}
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
                  onChange={handleChange}
                  value={memberRegister.epf}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
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
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Spouse name
                </label>
                <input
                  type="text"
                  name="spouseName"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Number of children
                </label>
                <input
                  type="text"
                  name="noOfChildren"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  About children
                </label>
                <input
                  type="text"
                  name="aboutChildren"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
                  placeholder="eg: Age, Name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Number of adults
                </label>
                <input
                  type="number"
                  name="noOfAdults"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  About adults
                </label>
                <input
                  type="text"
                  name="aboutAdults"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
                  placeholder="eg: Age, Name"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Date of registered
                </label>
                <input
                  type="date"
                  name="dateOfRegistered"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-950">
                  Member fee
                </label>
                <input
                  type="text"
                  name="memberFee"
                  onChange={handleChange}
                  className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Rs.300.00"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

// import { useState } from "react";
// import axios from "axios";

// const RegisterForm = () => {
//   const [memberRegister, setMemberRegister] = useState({
//     name: "",
//     email: "",
//     password: "",
//     epf: "",
//     status: "",
//     dateOfJoined: "",
//     dateOfBirth: "",
//     dateOfRegistered: "",
//     welfareNo: "",
//     payroll: "",
//     division: "",
//     contactNo: { whatsappNo: "", number: "" },
//     spouseName: "",
//     noOfChildren: "",
//     aboutChildren: "",
//     noOfAdults: "",
//     aboutAdults: "",
//     memberFee: "300.00",
//   });

//   const [mobileMessage, setMobileMessage] = useState("");
//   const [whatsappMessage, setWhatsappMessage] = useState("");
//   const [epfMessage, setEpfMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "epf") {
//       const epfRegex = /^0\d{5}$/;
//       setEpfMessage(
//         epfRegex.test(value)
//           ? "EPF number is valid."
//           : "EPF number must be exactly 6 digits and start with 0."
//       );
//     }

//     setMemberRegister((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setMemberRegister((prevUser) => ({
//   //     ...prevUser,
//   //     [name]: value,
//   //   }));
//   // };

//   const handleContactChange = (e) => {
//     const { name, value } = e.target;

//     if (/^\d*$/.test(value)) {
//       setMemberRegister((prevUser) => ({
//         ...prevUser,
//         contactNo: { ...prevUser.contactNo, [name]: value },
//       }));

//       const regex = /^07\d{8}$/;
//       if (name === "number") {
//         setMobileMessage(
//           value.length === 0 || regex.test(value)
//             ? value.length === 10
//               ? "Mobile number is valid."
//               : ""
//             : "Mobile number must be exactly 10 digits."
//         );
//       }

//       if (name === "whatsappNo") {
//         setWhatsappMessage(
//           value.length === 0 || regex.test(value)
//             ? value.length === 10
//               ? "WhatsApp number is valid."
//               : ""
//             : "WhatsApp number must be exactly 10 digits."
//         );
//       }
//     } else {
//       if (name === "number") setMobileMessage("Only digits are allowed.");
//       if (name === "whatsappNo") setWhatsappMessage("Only digits are allowed.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://serverbackend-4wcf.onrender.com/api/members",
//         memberRegister
//       );
//       console.log(response.data);

//       setMemberRegister({
//         name: "",
//         email: "",
//         password: "",
//         epf: "",
//         status: "",
//         dateOfJoined: "",
//         dateOfBirth: "",
//         dateOfRegistered: "",
//         welfareNo: "",
//         payroll: "",
//         division: "",
//         contactNo: { whatsappNo: "", number: "" },
//         spouseName: "",
//         noOfChildren: "",
//         aboutChildren: "",
//         noOfAdults: "",
//         aboutAdults: "",
//         memberFee: "300.00",
//       });

//       window.location.reload();
//     } catch (error) {
//       console.error("There was an error!", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
//       <div className="bg-yellow-50 p-8 rounded-lg shadow-lg max-w-4xl w-full">
//         <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of birth
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Status</label>
//                 <select
//                   name="status"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 group-hover:bg-red-100"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="active">Active</option>
//                   <option value="retired">Retired</option>
//                   <option value="resign">Resign</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of joined
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfJoined"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Payroll</label>
//                 <input
//                   type="text"
//                   name="payroll"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Division
//                 </label>
//                 <input
//                   type="text"
//                   name="division"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Mobile number
//                 </label>
//                 <input
//                   type="text"
//                   name="number"
//                   onChange={handleContactChange}
//                   value={memberRegister.contactNo.number}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//                 {mobileMessage && (
//                   <p
//                     style={{
//                       color:
//                         mobileMessage === "Mobile number is valid."
//                           ? "green"
//                           : "red",
//                     }}
//                   >
//                     {mobileMessage}
//                   </p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   WhatsApp number
//                 </label>
//                 <input
//                   type="text"
//                   name="whatsappNo"
//                   onChange={handleContactChange}
//                   value={memberRegister.contactNo.whatsappNo}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//                 {whatsappMessage && (
//                   <p
//                     style={{
//                       color:
//                         whatsappMessage === "WhatsApp number is valid."
//                           ? "green"
//                           : "red",
//                     }}
//                   >
//                     {whatsappMessage}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">EPF No</label>
//                 <input
//                   type="text"
//                   name="epf"
//                   onChange={handleChange}
//                   value={memberRegister.epf}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//                 {epfMessage && (
//                   <p
//                     style={{
//                       color:
//                         epfMessage === "EPF number is valid." ? "green" : "red",
//                     }}
//                   >
//                     {epfMessage}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Welfare Number
//                 </label>
//                 <input
//                   type="text"
//                   name="welfareNo"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//             </div>
//             {/* Right Column */}
//             <div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Spouse name
//                 </label>
//                 <input
//                   type="text"
//                   name="spouseName"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Number of children
//                 </label>
//                 <input
//                   type="text"
//                   name="noOfChildren"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   About children
//                 </label>
//                 <input
//                   type="text"
//                   name="aboutChildren"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
//                   placeholder="eg: Age, Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Number of adults
//                 </label>
//                 <input
//                   type="number"
//                   name="noOfAdults"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   About adults
//                 </label>
//                 <input
//                   type="text"
//                   name="aboutAdults"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
//                   placeholder="eg: Age, Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of registered
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfRegistered"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Member fee
//                 </label>
//                 <input
//                   type="text"
//                   name="memberFee"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                   placeholder="Rs.300.00"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// import { useState } from "react";
// import axios from "axios";

// const RegisterForm = () => {
//   // const[name,setName]=useState('')
//   // const[email,setEmail]=useState('')
//   // const[password,setPassword]=useState('')
//   // const[epf,setEpf]=useState('')
//   // const[status,setStatus]=useState('')
//   // const[dateOfJoined,setDateOfJoined]=useState('')
//   // const[dateOfBirth,setDateOfBirth]=useState('')
//   // const[dateOfRegistered,setDateOfRegistered]=useState('')
//   // const[welfareNo,setWelfareNo]=useState('')
//   // const[payroll,setPayroll]=useState('')
//   // const[division,setDivision]=useState('')
//   // const[whatsappNo,setWhatsappNo]=useState('')
//   // const[number,setNumber]=useState('')
//   // const[spouseName,setSpouseName]=useState('')
//   // const[noOfChildren,setNoOfChildren]=useState('')
//   // const[aboutChildren,setAboutChildren]=useState('')
//   // const[noOfAdults,setNoOfAdults]=useState('')
//   // const[aboutAdults,setAboutAdults]=useState('')
//   // const[memberFee,setMemberFee]=useState('')
//   // const contactNumber= {contactNo: {whatsappNo, number}}
//   // const [formData, setFormData] = useState({
//   //   name: '',
//   //   email: '',
//   //   password: '',
//   //   epf: '',
//   //   status: '',
//   //   dateOfJoined: '',
//   //   dateOfBirth: '',
//   //   dateOfRegistered: '',
//   //   welfareNo: '',
//   //   payroll: '',
//   //   division: '',
//   //   contactNumber,
//   //   // whatsappNo: '',
//   //   // number: '',
//   //   memberFee: '',
//   //   spouseName: '',
//   //   noOfChildren: '',
//   //   aboutChildren: '',
//   //   noOfAdults: '',
//   //   aboutAdults: '',
//   // });

//   const [memberRegister, setMemberRegister] = useState({
//     name: "",
//     email: "",
//     password: "",
//     epf: "",
//     status: "",
//     dateOfJoined: "",
//     dateOfBirth: "",
//     dateOfRegistered: "",
//     welfareNo: "",
//     payroll: "",
//     division: "",
//     contactNo: { whatsappNo: "", number: "" },
//     spouseName: "",
//     noOfChildren: "",
//     aboutChildren: "",
//     noOfAdults: "",
//     aboutAdults: "",
//     memberFee: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMemberRegister((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };
//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setMemberRegister((prevUser) => ({
//       ...prevUser,
//       contactNo: { ...prevUser.contactNo, [name]: value },
//     }));
//   };

//   // const handleContactChange = (e) => {
//   //   const { name, value } = e.target;

//   //   // Regex patterns
//   //   const phonePattern = /^[0-9]{10}$/; // Exactly 10 digits for phone numbers
//   //   const epfPattern = /^[0-9]{6}$/; // Exactly 6 digits for EPF number

//   //   // Validation logic based on field name
//   //   if (name === "number" || name === "whatsappNo") {
//   //     if (!phonePattern.test(value)) {
//   //       console.log(
//   //         `${
//   //           name === "number" ? "Mobile" : "WhatsApp"
//   //         } number must be exactly 10 digits`
//   //       );
//   //     } else {
//   //       console.log(
//   //         `${name === "number" ? "Mobile" : "WhatsApp"} number is valid`
//   //       );
//   //     }
//   //   }

//   //   if (name === "epfNumber") {
//   //     if (!epfPattern.test(value)) {
//   //       console.log("EPF number must be exactly 6 digits");
//   //     } else {
//   //       console.log("EPF number is valid");
//   //     }
//   //   }
//   // };
//   //======================================================
//   // const memberDetails={
//   //   name:name,
//   //   email:email,
//   //   password:password,
//   //   epf:epf,
//   //   status:status,
//   //   dateOfJoined:dateOfJoined,
//   //   dateOfBirth:dateOfBirth,
//   //   dateOfRegistered:dateOfRegistered,
//   //   welfareNo:welfareNo,
//   //   payroll:payroll,
//   //   division:division,
//   //   contactNo:{
//   //     whatsappNo:whatsappNo,
//   //     number:number
//   //     },
//   //   memberFee:memberFee,
//   //   spouseName:spouseName,
//   //   noOfChildren:noOfChildren,
//   //   aboutChildren:aboutChildren,
//   //   noOfAdults:noOfAdults,
//   //   aboutAdults:aboutAdults

//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://serverbackend-4wcf.onrender.com/api/members",
//         memberRegister
//       );
//       console.log(response.data);
//       // Handle success (e.g., redirect to another page, show success message)

//       setMemberRegister({
//         name: "",
//         email: "",
//         password: "",
//         epf: "",
//         status: "",
//         dateOfJoined: "",
//         dateOfBirth: "",
//         dateOfRegistered: "",
//         welfareNo: "",
//         payroll: "",
//         division: "",
//         contactNo: { whatsappNo: "", number: "" },
//         spouseName: "",
//         noOfChildren: "",
//         aboutChildren: "",
//         noOfAdults: "",
//         aboutAdults: "",
//         memberFee: "",
//       });

//       window.location.reload();
//     } catch (error) {
//       console.error("There was an error!", error);
//       // Handle error (e.g., show error message)
//     }
//   };

//   // const {form} = form.useForm();
//   // const onFinish= (values) => {
//   //     form.resetFields();
//   // };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen  bg-cover bg-center "
//       style={{ backgroundImage: "url(../../../public/background.jpg)" }}
//     >
//       {/* style={{ backgroundImage: 'url(../../../public/bulbs.jpg)' }} */}
//       <div className="bg-yellow-50  p-8 rounded-lg shadow-lg max-w-4xl w-full">
//         <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of birth
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent font-semibold border-b-2 border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Status</label>
//                 <select
//                   name="status"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 group-hover:bg-red-100"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="active">Active</option>
//                   <option value="retired">Retired</option>
//                   <option value="resign">Resign</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of joined
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfJoined"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Payroll</label>
//                 <input
//                   type="text"
//                   name="payroll"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Division
//                 </label>
//                 <input
//                   type="text"
//                   name="division"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Mobile number
//                 </label>
//                 <input
//                   type="text"
//                   name="number"
//                   onChange={handleContactChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Whatsapp number
//                 </label>
//                 <input
//                   type="text"
//                   name="whatsappNo"
//                   onChange={handleContactChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Member fee
//                 </label>
//                 <input
//                   type="text"
//                   name="memberFee"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">EPF No</label>
//                 <input
//                   type="text"
//                   name="epf"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Date of registered
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfRegistered"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Welfare Number
//                 </label>
//                 <input
//                   type="text"
//                   name="welfareNo"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Spouse name
//                 </label>
//                 <input
//                   type="text"
//                   name="spouseName"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Number of children
//                 </label>
//                 <input
//                   type="text"
//                   name="noOfChildren"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   About children
//                 </label>
//                 <input
//                   type="text"
//                   name="aboutChildren"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
//                   placeholder="eg: Age, Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Number of adults
//                 </label>
//                 <input
//                   type="number"
//                   name="noOfAdults"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   About adults
//                 </label>
//                 <input
//                   type="text"
//                   name="aboutAdults"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500 placeholder:text-gray-800"
//                   placeholder="eg: Age, Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold text-gray-950">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   className="appearance-none bg-transparent border-b-2 font-semibold border-black w-full text-gray-900 py-2 px-2 leading-tight focus:outline-none focus:border-red-500"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-red-900 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
