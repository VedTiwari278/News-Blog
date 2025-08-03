import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchNews = async () => {
    try {
      const response = await axios.get(
        "https://news-blog-abh6.vercel.app/getAllPost"
      );
      if (response) {
        setNews(response.data.data);
      }
    } catch (err) {
      console.error("No Posts Found", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchNews();
  }, []);

  return (
    <NewsContext.Provider
      value={{ news, setNews, FetchNews, loading, setLoading }}
    >
      {children}
    </NewsContext.Provider>
  );
};
