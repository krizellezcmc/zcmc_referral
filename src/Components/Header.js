import React from "react";
import "../Styles/Header.css";
import Logo from "../Assets/zcmc.png";

function Header() {
  return (
    <nav>
      <div className="brand">
        <img src={Logo} alt="ZCMC Logo" />
        <h1>
          ZCMC <span>Hospital Referral System</span>
        </h1>
      </div>
    </nav>
  );
}

export default Header;
