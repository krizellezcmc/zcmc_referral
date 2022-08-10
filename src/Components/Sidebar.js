import React, { useState } from "react";
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
} from "react-icons/hi";
import Nouser from "../Assets/nouser.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  return (
    <div className={open ? "sidebar" : "sidebar close"}>
      <div className="sidebar-header">
        <div onClick={() => setOpen(!open)} className="menu-burger">
          {open ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </div>
      </div>

      <ul className="navlinks">
        <li className="active" onClick={() => navigate("/")}>
          <p>
            <HiDocumentText />
          </p>
          <span>Refer Patient</span>
        </li>
        <li onClick={() => navigate("/addhospital")}>
          <p>
            <HiOutlineOfficeBuilding />
          </p>
          <span>Add Hospital</span>
        </li>
        <li onClick={() => navigate("/verifyuser")}>
          <p>
            <HiUserAdd />
          </p>
          <span>Verify Users</span>
        </li>
        <li onClick={() => navigate("/patientlist")}>
          <p>
            <HiUsers />
          </p>
          <span>Patient List</span>
        </li>
      </ul>

      <div className="sidebar-user">
        <img src={Nouser} alt="User Avatar" />
        <div className="user">
          <h1>Juan Dela Cruz</h1>
          <p>User</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
