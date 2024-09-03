import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/members");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Panel - View Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>EPF Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.epf}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Implement user management actions here */}
                <button
                  onClick={() => {
                    /* handle edit */
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    /* handle delete */
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
