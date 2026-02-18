import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on first render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { user: loggedUser, token: authToken } = res.data.data;

    if (!loggedUser || !authToken) {
      throw new Error("Invalid server response");
    }

    setUser(loggedUser);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", authToken);
    toast.success(res?.data?.message);
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
