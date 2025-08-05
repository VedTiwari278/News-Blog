import React, { useContext } from "react";
import Header from "./Header";
import News from "./News";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "../context/ThemeContext";
import Search from "./Saerch";

const Index = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`${darkMode ? "bg-dark" : "bg-light"} min-vh-100`}>
      <Header />
      <Search />

      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-12 col-md-8 offset-md-2 col-lg-10 offset-lg-1">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
