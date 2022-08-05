import React from "react";
import "../Styles/Home.css"
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ReferralForm from "../Components/ReferralForm";
// import ReferralForm from "../components/ReferralForm";

function Home() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          <ReferralForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
