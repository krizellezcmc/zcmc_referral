import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import PreTriageHome from "../Pages/PreTriageHome";
import About from "./Home/About";
import ReferralForm from "./ReferralForm";
import AddReferral from "./AddReferral";
import AdmissionHome from "../Pages/AdmissionHome";
import AdmissionViewPat from "../Pages/AdmissionViewPat";
import ReferralDownload from "./ReferralDownload";
import AdminRequests from "../Pages/AdminRequests";
import ForgotPassword from "../Pages/ForgotPassword";
import Main from "../Pages/Homepage/Main";

const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    const storedPath = localStorage.getItem("previousPath");
    if (storedPath) {
      setPreviousPath(storedPath);
      localStorage.removeItem("previousPath");
    }

    return () => {
      localStorage.setItem("previousPath", location.pathname);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route path="/forbidden" element={<Forbidden />}></Route>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blocked" element={<Blocked />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/success" element={<Success />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sample" element={<Sample />} />
          <Route
            path="/tagubilinreport/:id"
            element={<TagubilinPrescription />}
          />
          <Route path="/referralform" element={<AddReferral />} />
          {/* <Route path="/user" element={<UserDashboard />}></Route> */}
          <Route path="/about" element={<About />} />
          <Route path="/recovery" element={<Verify />}></Route>
          <Route path="/newpassword" element={<ForgotPassword />} />
          {/* PRE-TRIAGE ROUTES */}
          <Route element={<ProtectedRoutes user={user} role="triage" />}>
            <Route path="/pretriage" element={<PreTriageHome />}></Route>
          </Route>
          {/* OPCEN ROUTES */}
          <Route element={<ProtectedRoutes user={user} role="opcen" />}>
            <Route path="/transfer" element={<Transferred />}></Route>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/refdownload" element={<ReferralDownload />} />
            <Route path="/opcen" element={<OpcenHome />}></Route>
            <Route path="/opcenref" element={<OpcenReferral />}></Route>
            <Route path="/patientlist" element={<Patient />} />
            <Route path="/opcentable" element={<OpcenTable />}></Route>
            <Route path="/opcenhome/:id" element={<OpcenHome2 />}></Route>
          </Route>
          {/* Nurse Routes*/}
          <Route element={<ProtectedRoutes user={user} role="nurse" />}>
            <Route path="/tagubilin" element={<NurseHome />} />
          </Route>
          {/* User Routes */}
          <Route element={<ProtectedRoutes user={user} role="user" />}>
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/referredpatient" element={<ReferredPatient />} />
            <Route path="/hospitagubilin/:id" element={<HospiTagubilin />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/referrals/:id" element={<ReferralHome />}></Route>
            <Route path="/newreferral" element={<ReferralForm />}></Route>
          </Route>
          {/* IPCC Routes */}
          <Route element={<ProtectedRoutes user={user} role="ipcc" />}>
            <Route path="/ipcc" element={<IPCCHome />} />
          </Route>
          {/* Universal */}
          <Route path="/changepass" element={<ChangePassword />} />
          {/* Admin Routes */}
          <Route element={<ProtectedRoutes user={user} role="admin" />}>
            <Route path="/addhospital" element={<AddHospital />} />
            <Route path="/verifyuser" element={<VerifyUser />} />
            <Route path="/requests" element={<AdminRequests />} />
          </Route>
          {/* Admission Routes */}
          <Route element={<ProtectedRoutes user={user} role="admission" />}>
            <Route path="/admission" element={<AdmissionHome />} />
            <Route path="/admission/:id" element={<AdmissionViewPat />} />
          </Route>
          {/* CHARTS (Remove after testing)*/}
          {/* <Route path="/reason-chart" element={<Reason />} /> */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
