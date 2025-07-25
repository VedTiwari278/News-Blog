import React from "react";
import Header from "./Header";
import News from "./News";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  return (
    <div
      className="Main-Container min-vh-100"
      style={{
        background: "linear-gradient(to right, #c8e1ebff, #dbac8dff, #e1ecf1ff)",
        color: "#ffffff",
      }}
    >
      <Header />
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar: Mobile mein order-1, Desktop mein order-md-1 */}
          <div className="col-12 col-md-4 order-1 order-md-1">
            <Sidebar />
          </div>

          {/* News: Mobile mein order-2, Desktop mein order-md-2 */}
          <div className="col-12 col-md-8 order-2 order-md-2">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
