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
        <div className="content-wrapper">
          <PatientsList />
        </div>
      </div>
    </div>
  );
}

export default Patient;
