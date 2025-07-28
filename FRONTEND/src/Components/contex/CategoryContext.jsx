import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://news-blog-abh6.vercel.app/admin/get-categories");
      const data = await res.json();
      setCategories(data.data); // Make sure to access .data properly
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
