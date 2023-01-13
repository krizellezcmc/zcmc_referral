import React from "react";
import Header from "../Components/Header";
import RequestTable from "../Components/RequestTable";
import Sidebar from "../Components/Sidebar";

function AdminRequests(props) {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <RequestTable />
        </div>
      </div>
    </div>
  );
}

export default AdminRequests;
