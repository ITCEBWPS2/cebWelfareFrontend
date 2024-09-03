// src/pages/AdminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleViewUsers = () => {
    navigate("/viewusers"); // This route will display all users
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleViewUsers}>View Users</button>
      {/* Add more admin functionality as needed */}
    </div>
  );
};

export default AdminPanel;
