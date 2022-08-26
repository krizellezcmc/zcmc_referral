import React from "react";
import "../Styles/Report.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TagubilinReport from "../Components/TagubilinReport";
import Prescription from "../Components/Prescription";

function TagubilinPrescription() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <TagubilinReport />
        </div>
      </div>
    </div>
  );
}

export default TagubilinPrescription;