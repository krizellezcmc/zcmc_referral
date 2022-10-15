import { AspectRatio, Link } from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import DashboardTile from "../Components/DashboardTile";

function AdminDashboard(props) {
  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper">
            <DashboardTile />
            {/* <iframe
              width="100%"
              height="900"
              src="https://datastudio.google.com/embed/reporting/6b93099e-2cb4-456e-9aaa-369940a0f40c/page/rt54C"
              // frameborder="0"
              // style="border:0"
              // allowfullscreen
            ></iframe> */}
            {/* <iframe
              width="100%"
              height="900"
              src="https://datastudio.google.com/embed/reporting/f652922b-81d4-4fe7-8767-917f1058ef49/page/Y7y1C"
            ></iframe> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
