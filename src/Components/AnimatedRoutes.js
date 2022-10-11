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
import TagubilinPrescription from "../Pages/TagubilinPrescription";
import Prescription from "./Prescription";
import IPCCHome from "../Pages/IPCCHome";
import NurseHome from "../Pages/NurseHome";
import Blocked from "../Pages/Blocked";
import AdminDashboard from "../Pages/AdminDashboard";
import UserDashboard from "../Pages/UserDashboard";
import HospiTagubilin from "../Pages/HospiTagubilin";
import Forbidden from "./Forbidden";
import OpcenHome from "../Pages/OpcenHome";
import OpcenReferral from "./OpcenReferral";
import OpcenTable from "./OpcenTable";
import OpcenHome2 from "../Pages/OpcenHome2";
import Recover from "../Pages/Recover";
import Success from "../Pages/Success";
import Verify from "../Pages/Verify";
import Transferred from "../Pages/Transferred";
import Referrals from "../Pages/Referrals";
import ReferralHome from "../Pages/ReferralHome";
import Sample from "../Pages/Sample";

const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="/forbidden" element={<Forbidden />}></Route>
          <Route path="/" element={<Login />} />
          <Route path="/blocked" element={<Blocked />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/success" element={<Success />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sample" element={<Sample />} />
          <Route
            path="/tagubilinreport/:id"
            element={<TagubilinPrescription />}
          />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/user" element={<UserDashboard />}></Route>

          <Route path="/recovery" element={<Verify />}></Route>

          <Route path="/opcen" element={<OpcenHome />}></Route>
          <Route path="/opcenref" element={<OpcenReferral />}></Route>
          <Route path="/patientlist" element={<Patient />} />
          <Route path="/opcentable" element={<OpcenTable />}></Route>
          <Route path="/opcenhome/:id" element={<OpcenHome2 />}></Route>
          <Route path="/transfer" element={<Transferred />}></Route>
          {/* <Route path="/cancelled" element={<CancelledModal />} /> */}

          {/* Nurse Routes*/}
          <Route element={<ProtectedRoutes user={user} role="nurse" />}>
            <Route path="/tagubilin" element={<NurseHome />} />
          </Route>

          {/* User Routes */}
          <Route element={<ProtectedRoutes user={user} role="user" />}>
            <Route path="/home" element={<AdminHome />} />
            <Route path="/referredpatient" element={<ReferredPatient />} />
            <Route path="/hospitagubilin/:id" element={<HospiTagubilin />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/referrals/:id" element={<ReferralHome />}></Route>
          </Route>

          {/* IPCC Routes */}
          <Route element={<ProtectedRoutes user={user} role="ipcc" />}>
            <Route path="/ipcc" element={<IPCCHome />} />
          </Route>

          {/* Universal */}
          <Route path="/changepass" element={<ChangePassword />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoutes user={user} role="admin" />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/addhospital" element={<AddHospital />} />
            <Route path="/verifyuser" element={<VerifyUser />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
