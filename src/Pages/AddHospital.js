import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import AddHospiForm from "../Components/AddHospiForm";

function AddHospital() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <AddHospiForm />
        </div>
      </div>
    </div>
  );
}

export default AddHospital;
