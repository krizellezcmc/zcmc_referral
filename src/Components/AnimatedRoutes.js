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
import ProtectedRoutes from "./ProtectedRoute";
import TagubilinForm from "./TagubilinForm";

const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/tagubilin" element={<TagubilinForm />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route element={<ProtectedRoutes user={user} role="user" />}>
            <Route path="/home" element={<AdminHome />} />
            <Route path="/referredpatient" element={<ReferredPatient />} />
          </Route>

          {/* Universal */}
          <Route path="/changepass" element={<ChangePassword />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoutes user={user} role="admin" />}>
            <Route path="/addhospital" element={<AddHospital />} />
            <Route path="/verifyuser" element={<VerifyUser />} />
            <Route path="/patientlist" element={<Patient />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
