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
  HiUserGroup,
} from "react-icons/hi";
import Nouser from "../Assets/nouser.png";
import { useNavigate } from "react-router-dom";
import { BiGrid, BiGridAlt, BiMenu, BiWrench } from "react-icons/bi";
import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const path = window.location.pathname;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name);
    setUserName(user.firstName + "  " + user.lastName);
    setRole(user.role);
  }, [username, referringFacility, role]);
  const { user } = useAuth();

  return (
    <div className={open ? "sidebar" : "sidebar close"}>
      <div className="sidebar-header">
        <div onClick={() => setOpen(!open)} className="menu-burger">
          {open ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
        </div>
      </div>

      <ul className="navlinks">
        {role === "admin" ? (
          <>
            {/* <li
              className={path.includes("admindashboard") ? "active" : ""}
              onClick={() => navigate("/admindashboard")}
            >
              <p>
                {path.includes("admindashboard") ? (
                  <BiGridAlt />
                ) : (
                  <BiGridAlt />
                )}
              </p>
              <span>Dashboard</span>
            </li> */}

            <li
              className={path.includes("patientlist") ? "active" : ""}
              onClick={() => navigate("/patientlist")}
            >
              <p>{path.includes("verifyuser") ? <HiUsers /> : <HiUsers />}</p>
              <span>Patient List</span>
            </li>
            <li
              className={path.includes("verifyuser") ? "active" : ""}
              onClick={() => navigate("/verifyuser")}
            >
              <p>
                {path.includes("verifyuser") ? (
                  <HiUserAdd />
                ) : (
                  <HiOutlineUserAdd />
                )}
              </p>
              <span>Verify Users</span>
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
              <span>Hospitals</span>
            </li>
            <li
              className={path.includes("changepass") ? "active" : ""}
              onClick={() => navigate("/changepass")}
            >
              <p>{path.includes("verifyuser") ? <BiWrench /> : <BiWrench />}</p>
              <span>Account Settings</span>
            </li>
          </>
        ) : role === "ipcc" ? (
          <>
            <li
              className={path.includes("ipcc") ? "active" : ""}
              onClick={() => navigate("/ipcc")}
            >
              <p>
                {path.includes("ipcc") ? (
                  <HiDocumentText />
                ) : (
                  <HiOutlineDocumentText />
                )}
              </p>
              <span>IPCC Home</span>
            </li>
          </>
        ) : role === "nurse" ? (
          <>
            <li
              className={path.includes("tagubilin") ? "active" : ""}
              onClick={() => navigate("/tagubilin")}
            >
              <p>
                {path.includes("tagubilin") ? (
                  <HiDocumentText />
                ) : (
                  <HiOutlineDocumentText />
                )}
              </p>
              <span>Tagubilin Form</span>
            </li>
            <li
              className={path.includes("changepass") ? "active" : ""}
              onClick={() => navigate("/changepass")}
            >
              <p>{path.includes("verifyuser") ? <BiWrench /> : <BiWrench />}</p>
              <span>Account Settings</span>
            </li>
          </>
        ) : (
          <>
            {/* <li
              className={path.includes("user") ? "active" : ""}
              onClick={() => navigate("/user")}
            >
              <p>{path.includes("user") ? <BiGridAlt /> : <BiGridAlt />}</p>
              <span>Dashboard</span>
            </li> */}
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
              className={path.includes("referredpatient") ? "active" : ""}
              onClick={() => navigate("/referredpatient")}
            >
              <p>
                {path.includes("verifyuser") ? (
                  <HiUserGroup />
                ) : (
                  <HiUserGroup />
                )}
              </p>
              <span>Referred Patients</span>
            </li>
            <li
              className={path.includes("changepass") ? "active" : ""}
              onClick={() => navigate("/changepass")}
            >
              <p>{path.includes("verifyuser") ? <BiWrench /> : <BiWrench />}</p>
              <span>Account Settings</span>
            </li>
          </>
        )}
      </ul>

      <div className="sidebar-user">
        <img src={Nouser} alt="User Avatar" />
        <div className="user">
          <h1>{role === "admin" ? "ADMIN" : username}</h1>
          <small>{referringFacility}</small>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
