import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", { identifier, password });
      console.log("Login successful:", response.data);
      // Redirect or handle login success here
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/main_header_1.webp')" }}
    >
      <div className="flex flex-col justify-center p-8 bg-white w-full md:max-w-sm md:p-12 md:mr-auto md:ml-0">
        <Link to="/">
          <div className="flex justify-center md:justify-start mb-14">
            <img src="/cebcare.png" alt="Logo" className="h-12" />
          </div>
        </Link>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-8 font-heading text-2xl font-bold text-center md:text-left">
            Login to Your Account
          </h2>
          <div className="space-y-6">
            <div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email / EPF Number
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none bg-transparent border-b-2 border-black w-full text-gray-700 p-2 leading-tight focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-black hover:bg-red-900 rounded text-white py-3 font-semibold transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
