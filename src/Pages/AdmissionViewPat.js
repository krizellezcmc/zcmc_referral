import React from "react";
import { useParams } from "react-router-dom";
import AdmissionReferral from "../Components/AdmissionReferral";

function AdmissionViewPat(props) {
  const { id } = useParams();
  return (
    <div>
      <AdmissionReferral patientId={id} />
    </div>
  );
}

export default AdmissionViewPat;
