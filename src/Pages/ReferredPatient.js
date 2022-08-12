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
        <div className="content-wrapper">
          <ReferredPatients />
        </div>
      </div>
    </div>
  );
}

export default ReferredPatient;
