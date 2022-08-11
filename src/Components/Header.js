import React from "react";
import "../Styles/Header.css";
import Logo from "../Assets/zcmc.png";
import { IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  const logout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("logStat");
        navigate("/");
      }
    });
  };

  return (
    <>
      <nav>
        <div className="brand">
          <img src={Logo} alt="ZCMC Logo" />
          <h1>
            ZCMC <span>Hospital Referral System</span>
          </h1>
        </div>

        <IconButton
          className="log-out"
          size="sm"
          variant="solid"
          colorScheme="red"
          style={{ marginTop: "9px" }}
          onClick={logout}
          icon={<FiLogOut fontSize="17px" />}
        />
      </nav>
    </>
  );
}

export default Header;
