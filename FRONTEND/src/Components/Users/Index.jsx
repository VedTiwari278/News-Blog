import React from "react";
import Header from "./Header";
import News from "./News";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  return (
    <div className="Main-Container">
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
