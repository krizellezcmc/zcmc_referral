import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import UsersTable from "../Components/UsersTable";

function VerifyUser() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
