import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import Layout from "../Components/Layout";
import AdminHome from "../Pages/AdminHome";
import Register from "../Pages/Signup";
import Login from "../Pages/Login";
import AddHospital from "../Pages/AddHospital";
import VerifyUser from "../Pages/VerifyUser";
import Patient from "../Pages/Patient";
import ReferredPatient from "../Pages/ReferredPatient";
import ChangePassword from "../Pages/ChangePass";

const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<AdminHome />} />
          <Route path="/addhospital" element={<AddHospital />} />
          <Route path="/verifyuser" element={<VerifyUser />} />
          <Route path="/patientlist" element={<Patient />} />
          <Route path="/referredpatient" element={<ReferredPatient />} />
          <Route path="/changepass" element={<ChangePassword />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
