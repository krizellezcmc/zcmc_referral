import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

function AdminDashboard(props) {
  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper">
            <iframe
              width="100%"
              height="900"
              src="https://datastudio.google.com/embed/reporting/f652922b-81d4-4fe7-8767-917f1058ef49/page/Y7y1C"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
