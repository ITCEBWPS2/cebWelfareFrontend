import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData, {
        withCredentials: true,
      });
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      console.log("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="main-heading">Contact</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-fit py-2 px-4 bg-yellow-300 font-semibold text-black rounded-lg transition-colors duration-300 hover:bg-yellow-400"
      >
        SEND MESSAGE
      </button>
    </form>
  );
};

export default ContactForm;
