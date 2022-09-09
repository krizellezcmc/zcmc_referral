import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TagubilinForHospi from "../Components/TagubilinForHospi";

function HospiTagubilin() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <TagubilinForHospi />
        </div>
      </div>
    </div>
  );
}

export default HospiTagubilin;