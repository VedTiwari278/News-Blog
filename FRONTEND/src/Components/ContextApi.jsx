import axios from "axios";
import { createContext, useState } from "react";

export const context_API = createContext();

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const response = await axios.get(
      "https://news-blog-abh6.vercel.app/admin/get-users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
};
