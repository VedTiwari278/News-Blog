// context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    if (user.length > 0) return; // 🧠 Prevent refetching
    try {
      setLoading(true);
      const response = await axios.get(
        "https://news-blog-abh6.vercel.app/admin/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Ye hai user ka dataa :",response.da);

      if (response?.data?.data) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
