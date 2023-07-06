import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import PatientsList from "../Components/PatientsList";
function Patient() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "rgb(247, 252, 245)" }}
    >
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
            <PatientsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
