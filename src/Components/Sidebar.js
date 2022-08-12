import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import {
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
  HiDocumentText,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOfficeBuilding,
  HiUserAdd,
  HiUsers,
  HiOutlineUserAdd,
} from "react-icons/hi";
import Nouser from "../Assets/nouser.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  const path = window.location.pathname;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name);
    setUserName(user.firstName + "  " + user.lastName);
  }, [username, referringFacility]);

  return (
    <div className={open ? "sidebar" : "sidebar close"}>
      <div className="sidebar-header">
        <div onClick={() => setOpen(!open)} className="menu-burger">
          {open ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </div>
      </div>

      <ul className="navlinks">
        <li
          className={path.includes("home") ? "active" : ""}
          onClick={() => navigate("/home")}
        >
          <p>
            {path.includes("home") ? (
              <HiDocumentText />
            ) : (
              <HiOutlineDocumentText />
            )}
          </p>
          <span>Refer Patient</span>
        </li>
        <li
          className={path.includes("addhospital") ? "active" : ""}
          onClick={() => navigate("/addhospital")}
        >
          <p>
            {path.includes("addhospital") ? (
              <HiOfficeBuilding />
            ) : (
              <HiOutlineOfficeBuilding />
            )}
          </p>
          <span>Add Hospital</span>
        </li>
        <li
          className={path.includes("verifyuser") ? "active" : ""}
          onClick={() => navigate("/verifyuser")}
        >
          <p>
            {path.includes("verifyuser") ? <HiUserAdd /> : <HiOutlineUserAdd />}
          </p>
          <span>Verify Users</span>
        </li>
        <li
          className={path.includes("patientlist") ? "active" : ""}
          onClick={() => navigate("/patientlist")}
        >
          <p>{path.includes("verifyuser") ? <HiUsers /> : <HiUsers />}</p>
          <span>Patient List</span>
        </li>
      </ul>

      <div className="sidebar-user">
        <img src={Nouser} alt="User Avatar" />
        <div className="user">
          <h1>{username}</h1>
          <small>{referringFacility}</small>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
