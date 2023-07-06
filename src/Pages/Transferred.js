import React from "react";
import TransferredRef from "../Components/TransferredRef";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

function Transfererd(props) {
  return (
    <div>
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
              <TransferredRef />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfererd;
