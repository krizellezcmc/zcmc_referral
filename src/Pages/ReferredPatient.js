import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ReferredPatients from "../Components/ReferredPatients";

function ReferredPatient() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{ backgroundColor: "#F0F8F8", flex: 1 }}
            className="content-wrapper"
          >
            <ReferredPatients />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferredPatient;
