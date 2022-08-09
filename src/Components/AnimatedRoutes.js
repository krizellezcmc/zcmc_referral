import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import Layout from "../Components/Layout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AddHospital from "../Pages/AddHospital";

const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="addhospital" element={<AddHospital />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
