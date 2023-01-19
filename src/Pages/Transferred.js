import React from "react";
import TransferredRef from "../Components/TransferredRef";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

function Transfererd(props) {
  return (
    <div>
      <div
        className="container"
        style={{ backgroundColor: "rgb(247, 252, 245)" }}
      >
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper">
            <TransferredRef />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfererd;
