import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://news-blog-abh6.vercel.app/admin/get-categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
