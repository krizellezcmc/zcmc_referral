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
            <RequestTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRequests;
