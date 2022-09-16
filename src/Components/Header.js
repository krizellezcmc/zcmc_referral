import React, { useEffect, useState } from "react";
import "../Styles/Header.css";
import Logo from "../Assets/zcmc.png";
import Logo2 from "../Assets/doh-logo.png";
import { IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { Circle } from "@chakra-ui/react";

function Header() {
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name);
    setUserName(user.firstName + "  " + user.lastName);
    setRole(user.role);
  }, [username, referringFacility, role]);

  let navigate = useNavigate();
  const logout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post("/logout.php");

        sessionStorage.removeItem("sessionId");
        localStorage.removeItem("user");
        // navigate("/");
        // window.location.reload();
        console.log(response);
      }
    });
  };

  return (
    <>
      <nav>
        <div className="brand">
          <img src={Logo} alt="ZCMC Logo" />
          <img src={Logo2} alt="DOH Logo" />
          <h1>
            ZCMC
            <Circle size="5px" bg="green" mt={3} mx={1} />
            DOH<span> One Hospital Command </span>
          </h1>
        </div>

        <div className="brand">
          <h1>
            {role === "user" ? (
              <>
                <span style={{ fontWeight: "500" }}>{referringFacility}</span>
                <span>|</span>
              </>
            ) : role === "nurse" ? (
              <>
                <span style={{ fontWeight: "500" }}>ZCMC Nurse </span>
                <span>|</span>
              </>
            ) : role === "ipcc" ? (
              <>
                <span style={{ fontWeight: "500" }}>ZCMC IPCC</span>
                <span>|</span>
              </>
            ) : (
              <>
                <span style={{ fontWeight: "500" }}>ZCMC Administrator </span>
                <span>|</span>
              </>
            )}
          </h1>
          <IconButton
            size="sm"
            variant="solid"
            colorScheme="red"
            ml={5}
            onClick={logout}
            icon={<FiLogOut fontSize="17px" />}
          />
        </div>
      </nav>
    </>
  );
}

export default Header;
