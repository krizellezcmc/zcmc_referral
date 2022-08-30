import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import "../Styles/Report.css";
import "../Styles/DisplayReport.css";
import "../Styles/Prescription.css";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import Prescription from "./Prescription";

function TagubilinReport() {
  const [refName, setRefName] = useState("");
  const [age, setAge] = useState("");
  const [ward, setWard] = useState("");
  const [hrn, setHrn] = useState("");
  const [admit, setAdmit] = useState("");
  const [discharge, setDischarge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [lab, setLab] = useState("");
  const [xray, setXray] = useState("");
  const [ctscan, setCTScan] = useState("");
  const [mri, setMRI] = useState("");
  const [others, setOthers] = useState("");
  const [med, setMed] = useState([]);
  const [followup, setFollowUp] = useState("");
  const [time, setTime] = useState("");
  const [need, setNeedBring] = useState("");
  const [nurse, setNurse] = useState("");
  const [resident, setResident] = useState("");

  useEffect(() => {
    let refpatient = JSON.parse(localStorage.getItem("refpatient"));
    setRefName(refpatient.patientName);
    setAge(refpatient.age);
    setWard(refpatient.ward);
    setHrn(refpatient.hrn);
    setAdmit(refpatient.admissionDate);
    setDischarge(refpatient.dischDate);
    setDiagnosis(refpatient.dischDiag);
    setLab(refpatient.laboratory);
    setXray(refpatient.xray);
    setCTScan(refpatient.ctScan);
    setMRI(refpatient.mri);
    setOthers(refpatient.others);
    setMed(refpatient.medications);
    setFollowUp(refpatient.followUp);
    setTime(refpatient.time);
    setNeedBring(refpatient.needBring);
    setNurse(refpatient.nurse);
    setResident(refpatient.resident);
  }, []);

  var zcmcLogo = require("../Assets/zcmc-logo.png");
  var dohLogo = require("../Assets/doh-logo.png");
  // let followTime = moment(time, [moment.ISO_8601, "HH:mm"]);

  const exportPDF = () => {
    let element = (
      <div>
        <div className="rheader">
          <img src={zcmcLogo} className="rlogo1" alt="ZCMC Logo" />
          <div className="rhead-data">
            <p>Republic of the Philippines</p>
            <p>Department of Health</p>
            <p>ZAMBOANGA CITY MEDICAL CENTER</p>
            <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
            <h2>ALAGANG PINOY TAGUBILIN</h2>
          </div>
          <img src={dohLogo} className="rlogo2" alt="DOH Logo" />
        </div>

        <table className="rtable">
          <tr>
            <td className="cell">
              Name/Pangalan:<p>{refName}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0" }}>
              Age/Edad:<p>{age}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0" }}>
              Ward:<p>{ward}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0" }}>
              Hospital Record No.: <p>{hrn}</p>
            </td>
          </tr>
          <tr>
            <td className="cell" colSpan="2">
              Admission/Petsa ng Pagpasok: <p>{admit}</p>
            </td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Discharge/Petsa ng Paglabas: <p>{discharge}</p>
            </td>
          </tr>
          <tr>
            <td className="cell" colSpan="4">
              Diagnosis/Sakit: <p>{diagnosis}</p>
            </td>
          </tr>
          <tr>
            <td className="cell">Operation/Operasyon:</td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Surgeon:
            </td>
            <td className="cell" style={{ borderLeft: "0" }}>
              Petsa ng Operasyon:
            </td>
          </tr>
          <tr>
            <td className="major-label" colSpan="4">
              Major diagnostic Results/Panguanhing Resulta ng Pasusuri
            </td>
          </tr>
          <tr>
            <td className="diagnosis" colSpan="4">
              Laboratory<p>{lab}</p>
            </td>
          </tr>
          <tr>
            <td className="diagnosis" colSpan="4">
              X-ray<p>{xray}</p>
            </td>
          </tr>
          <tr>
            <td className="diagnosis" colSpan="4">
              CT scan<p>{ctscan}</p>
            </td>
          </tr>
          <tr>
            <td className="diagnosis" colSpan="4">
              MRI<p>{mri}</p>
            </td>
          </tr>
          <tr>
            <td className="diagnosis" colSpan="4">
              Others<p>others</p>
            </td>
          </tr>
          <tr>
            <td className="med-header" colSpan="4">
              <div className="med-box">
                <div className="med-data">
                  <div className="checkbox"></div>
                </div>
                <div className="med-label">
                  <p>Home Medication/Gamot</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="med" colSpan="1" style={{ borderRight: "0" }}>
              Pangalan ng Gamot
            </td>
            <td className="med" colSpan="2" style={{ borderRight: "0" }}>
              Dosage
            </td>
            <td className="med" colSpan="1">
              Oras ng Pag-inom
            </td>
          </tr>
          {med.map((m, k) => {
            return (
              <tr>
                <td
                  className="med-cell"
                  colSpan="1"
                  style={{ borderRight: "0" }}
                >
                  {m.medicine}
                </td>
                <td
                  className="med-cell"
                  colSpan="2"
                  style={{ borderRight: "0" }}
                >
                  {m.dosage}
                </td>
                <td className="med-cell" colSpan="1">
                  {m.sched}
                </td>
              </tr>
            );
          })}
          <tr>
            <th className="diagnosis" colSpan="4">
              Health Teaching/Pangunahing Paalalang Pangkalusugan
            </th>
          </tr>
          <tr>
            <td
              className="diagnosis"
              colSpan="4"
              style={{ borderBottom: "1px solid black" }}
            >
              <b className="rb">Other Instructions/Karagdagang Paalala</b>
              <p id="para">
                Please call the following Hotline Numbers: 09664965480 for Globe
                and 09533296457 for TM during office hours Monday to Saturday,
                8am to 5pm or email us at{" "}
                <p id="email"> records@zcmc.doh.gov.ph</p> and we will happy to
                serve you.
              </p>
            </td>
          </tr>
          <tr className="border1">
            <td colSpan="4">
              <b className="rb">
                I understand the above explanation given, I do hereby agree that
                I will have follow-up check-up:
              </b>
            </td>
          </tr>
          <tr className="border2">
            <td>
              <p>{followup}</p>
              <p className="hr-date">Date of Follow-Up</p>
            </td>
            <td colSpan="2">
              <p>{time}</p>
              <p className="hr-followup">Time</p>
            </td>
            <td>
              <p>{need}</p>
              <p className="hr-followup">Need to Bring</p>
            </td>
          </tr>

          <tr className="borders">
            <td colSpan="4">
              <div style={{ textAlign: "center" }}>
                <p className="hr-watcher">
                  Signature over Printed Name of Patient/Watcher
                </p>
              </div>
            </td>
          </tr>
        </table>
        <div className="float-container">
          <div className="float-child1">
            <label>Prepared by:</label>
            <p className="rname">{nurse} RN</p>
            <p className="hr-sign">Nurse on Duty</p>
          </div>
          <div className="float-child2">
            <label>Noted by:</label>
            <p className="rname">{resident} MD</p>
            <p className="hr-sign">Resident-in-Charge</p>
          </div>
        </div>
      </div>
    );

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [210, 297],
    });
    doc.page = 1;

    function footer() {
      doc.setFont("Times-Roman");
      doc.setFontSize(8);
      doc.text(
        25,
        295,
        "ZCMC-F-OCMPS-05" +
          "                                " +
          "Rev. 1" +
          "                                              " +
          "       Effectivity Date: April 1, 2022" +
          "                       " +
          "  Page" +
          " " +
          doc.page +
          " " +
          " of " +
          "1"
      );
      doc.page++;
    }

    doc.html(ReactDOMServer.renderToString(element), {
      width: 210,
      height: 297,
      windowWidth: 800,
      windowHeight: 1600,
      margin: [3, 10, 10, 10],

      callback: function (doc) {
        footer();
        window.open(doc.output("bloburl"));
      },
    });
  };

  return (
    <div>
      <div style={{ float: "left" }}>
        <Button
          onClick={exportPDF}
          variant="outline"
          colorScheme="red"
          size="sm"
        >
          Generate Tagubilin Report
        </Button>
        <div className="report-form">
          <div className="dheader">
            <img src={zcmcLogo} className="logo1" alt="ZCMC Logo" />
            <div className="dhead-data">
              <p>Republic of the Philippines</p>
              <p>Department of Health</p>
              <p>ZAMBOANGA CITY MEDICAL CENTER</p>
              <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
              <h2 className="dh2">ALAGANG PINOY TAGUBILIN</h2>
            </div>
            <img src={dohLogo} className="logo2" alt="DOH Logo" />
          </div>
          <table>
            <tr>
              <td className="dcell">
                Name/Pangalan:<p>{refName}</p>
              </td>
              <td className="dcell">
                Age/Edad:<p>{age}</p>
              </td>
              <td className="dcell">
                Ward:<p>{ward}</p>
              </td>
              <td className="dcell">
                Hospital Record No.<p>{hrn}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell" colSpan="2">
                Admission/Petsa ng Pagpasok: <p>{admit}</p>
              </td>
              <td className="dcell" colSpan="2">
                Discharge/Petsa ng Paglabas: <p>{discharge}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell" colSpan="4">
                Diagnosis/Sakit: <p>{diagnosis}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell">Operation/Operasyon:</td>
              <td className="dcell" colSpan="2">
                Surgeon:
              </td>
              <td className="dcell">Petsa ng Operasyon:</td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                Major diagnostic Results/Panguanhing Resulta ng Pasusuri
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                Laboratory: <p className="diagnosis-con">{lab}</p>
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                X-ray: <p className="diagnosis-con">{xray}</p>
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                CT scan: <p className="diagnosis-con">{ctscan}</p>
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                MRI: <p className="diagnosis-con">{mri}</p>
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                Others: <p className="diagnosis-con">{others}</p>
              </td>
            </tr>
            <tr>
              <td className="dmed-header" colSpan="4">
                <div className="dmed-box">
                  <div className="dmed-data">
                    <div className="checkbox"></div>
                  </div>
                  <div className="dmed-label">
                    <p>Home Medication/Gamot</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="dmed" colSpan="1">
                (Pangalan ng Gamot)
              </td>
              <td className="dmed" colSpan="2">
                (Dosage)
              </td>
              <td className="dmed" colSpan="1">
                (Oras ng Pag-inom)
              </td>
            </tr>
            {med.map((m, k) => {
              return (
                <tr>
                  <td className="dmed-cell" colSpan="1">
                    {m.medicine}
                  </td>
                  <td className="dmed-cell" colSpan="2">
                    {m.dosage}
                  </td>
                  <td className="dmed-cell" colSpan="1">
                    {m.sched}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th className="ddiagnosis" colSpan="4">
                Health Teaching/Pangunahing Paalalang Pangkalusugan
              </th>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="4">
                <b className="db">Other Instructions/Karagdagang Paalala</b>
                <p id="dpara">
                  Please call the following Hotline Numbers: 09664965480 for``
                  Globe and 09533296457 for TM during office hours Monday to
                  Saturday, 8am to 5pm or email us at{" "}
                  <p id="demail">records@zcmc.doh.gov.ph</p> and we will happy
                  to serve you.
                </p>
              </td>
            </tr>
            <tr className="dborder1">
              <td colSpan="4">
                <b className="db">
                  I understand the above explanation given, I do hereby agree
                  that I will have follow-up check-up:
                </b>
              </td>
            </tr>
            <tr className="dborder2">
              <td>
                <p>{followup}</p>
                <p className="dhr-date">Date of Follow-Up</p>
              </td>
              <td colSpan="2">
                <p>{time}</p>
                <p className="dhr-followup">Time</p>
              </td>
              <td>
                <p>{need}</p>
                <p className="dhr-followup">Need to Bring</p>
              </td>
            </tr>

            <tr className="dborders">
              <td colSpan="4">
                <div style={{ textAlign: "center" }}>
                  <p className="dhr-watcher">
                    Signature over Printed Name of Patient/Watcher
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="4">
                <div className="dfloat-container">
                  <div className="dfloat-child1">
                    <label>Prepared by:</label>
                    <p className="dname">{nurse}</p>
                    <p className="dhr-sign">Nurse on Duty</p>
                  </div>
                  <div className="dfloat-child2">
                    <label>Noted by:</label>
                    <p className="dname">{resident}</p>
                    <p className="dhr-sign">Resident-in-Charge</p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <br></br>
          <div className="dfooter">
            <p>ZCMC-F-OCMPS-05</p>
            <p>Rev.1</p>
            <p>Effectivity Date: April 1, 2022</p>
            <p>Page 1 of 1</p>
          </div>
        </div>
      </div>

      {/* //PRESCRIPTION */}
      <Prescription />
    </div>
  );
}

export default TagubilinReport;
