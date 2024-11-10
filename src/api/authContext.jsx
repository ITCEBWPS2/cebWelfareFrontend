import { createContext, useContext, useEffect, useState } from "react";
import api from "./axiosInstance";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (identifier, password, navigate) => {
    try {
      const { data } = await api.post("/members/auth", {
        identifier,
        password,
      });
      setUser(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    await api.post("/members/logout");
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await api.get("/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
