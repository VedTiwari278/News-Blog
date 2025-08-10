import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchNews = async () => {
    try {
      // const res = await fetch(
      //   "https://newsdata.io/api/1/latest?apikey=pub_5794b7e4160b4dd887170aa49eac425a&q=pizza"
      // );

      // const data = await res.json(); // ✅ parse JSON
      // console.log(data); // now you can access articles

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
