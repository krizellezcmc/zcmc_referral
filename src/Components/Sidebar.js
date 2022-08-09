import React, { useState } from "react";
import "../Styles/Sidebar.css";
import {
  HiChevronDoubleRight,
  HiChevronDoubleLeft,
  HiDocumentText,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOfficeBuilding,
} from "react-icons/hi";
import Nouser from "../Assets/nouser.png";
import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={open ? "sidebar" : "sidebar close"}>
      <div className="sidebar-header">
        <div onClick={() => setOpen(!open)} className="menu-burger">
          {open ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </div>
      </div>

      <ul className="navlinks">
        <li className="active">
          <p>
            <HiDocumentText />
          </p>
          <span>Refer Patient</span>
        </li>
        <li>
          <Link as={ReachLink} to="/addhospital">
            <p>
              <HiOutlineOfficeBuilding />
            </p>
            <span>Add Hospital</span>
          </Link>
        </li>
        <li>
          <Link as={ReachLink} to="/addhospital">
            <p>
              <HiOutlineOfficeBuilding />
            </p>
            <span>Verify Users</span>
          </Link>
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
