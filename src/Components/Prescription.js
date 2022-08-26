import React,{useState, useEffect} from "react";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import "../Styles/Report.css";
import "../Styles/DisplayReport.css";
import "../Styles/Prescription.css";
import { Button } from "@chakra-ui/react";
import moment from "moment";

function Prescription(){
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

    const exportPres = () => {
        let elementPres = (
          <div>
            <div className="pres-container">
            <div className="pheader">
              <img src={zcmcLogo} className="plogo1" alt="ZCMC Logo" />
              <div className="phead-data">
                <p>Republic of the Philippines</p>
                <p>Department of Health</p>
                <p style={{ fontWeight: "bolder" }}>
                  ZAMBOANGA CITY MEDICAL CENTER
                </p>
                <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
              </div>
              <img src={dohLogo} className="plogo2" alt="DOH Logo" />
            </div>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <p className="pdate">Date:</p>
              <p className="pdate-line">{moment().format("LL")}</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p className="pfullname">Patient's Name:</p>
              <p className="pfullname-line">{refName}</p>
            </div>
            <p className="pdetails">Age:</p>
            <p className="pdetails-line">{age}</p>
            <p className="pdetails" style={{ marginLeft: "20px" }}>
              Sex:
            </p>
            <p className="pdetails-line">-</p>
            <p className="pdetails" style={{ marginLeft: "20px" }}>
              Ward:
            </p>
            <p className="pward-line">{ward}</p>
            <p className="pdetails" style={{ marginLeft: "20px" }}>
              OPD:
            </p>
            <p className="pdetails-line">-</p>
    
            <div style={{ marginBottom: "10px" }}>
              <p className="rx">Rx</p>
            </div>
    
            {med.map((pres, key) => {
              return (
                <>
                  <div style={{ marginBottom: "10px" }}>
                    <p className="pdetails">Generic Name:</p>
                    <p className="pgeneric-line">{pres.medicine}</p>
                    <p className="pdetails">#</p>
                    <p className="pward-line">--</p>
                    <p className="pdetails">Sig:</p>
                    <p className="psig-line">{pres.dosage}</p>
                  </div>
                </>
              );
            })}
    
            <div className="signature">
              <div>
                <p className="signature-label">Signature</p>
                <p className="sign-line">-</p>
              </div>
              <div>
                <p className="signature-label">Printed Name</p>
                <p className="sign-line">{resident} MD</p>
              </div>
              <div>
                <p className="signature-label">License No.</p>
                <p className="sign-line">-</p>
              </div>
              <div>
                <p className="signature-label">S2 License No.</p>
                <p className="sign-line">-</p>
              </div>
            </div>
          </div>
          </div>
        );
        const pres = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: [101.6, 290],
        });
        pres.page = 1;
    
        function footer() {
          pres.setFont("Times-Roman");
          pres.setFontSize(7);
          pres.text(
            15,
            280,
            '"RA 9502 prohibits brand prescriibng in all government health agencies"'
          );
          pres.text(
            7,
            288,
            "ZCMC-F-OCMPS-05" +
              "                        " +
              "Rev. 1" +
              "                        " +
              "Effectivity Date: May 16, 2022" 
          );
          pres.page++;
        }
    
        pres.html(ReactDOMServer.renderToString(elementPres), {
          width: 101.6,
          height: 290,
          windowWidth: 450,
          windowHeight: 900,
          margin: [3, 5, 5, 5],
    
          callback: function (pres) {
            footer();
            window.open(pres.output("bloburl"));
          },
        });
      };

return(

    <div>
    <div style={{ float: "right", marginRight: "100px" }}>
        <Button
          onClick={exportPres}
          variant="outline"
          colorScheme="green"
          size="sm"
        >
          Generate Prescription
        </Button>
        <div className="pres-form">
          <div className="pheader">
            <img src={zcmcLogo} className="plogo1" alt="ZCMC Logo" />
            <div className="phead-data">
              <p>Republic of the Philippines</p>
              <p>Department of Health</p>
              <p style={{ fontWeight: "bolder" }}>
                ZAMBOANGA CITY MEDICAL CENTER
              </p>
              <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
            </div>
            <img src={dohLogo} className="plogo2" alt="DOH Logo" />
          </div>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <p className="pdate">Date:</p>
            <p className="pdate-line">{moment().format("LL")}</p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p className="pfullname">Patient's Name:</p>
            <p className="pfullname-line">{refName}</p>
          </div>
          <p className="pdetails">Age:</p>
          <p className="pdetails-line">{age}</p>
          <p className="pdetails" style={{ marginLeft: "20px" }}>
            Sex:
          </p>
          <p className="pdetails-line">-</p>
          <p className="pdetails" style={{ marginLeft: "20px" }}>
            Ward:
          </p>
          <p className="pward-line">{ward}</p>
          <p className="pdetails" style={{ marginLeft: "20px" }}>
            OPD:
          </p>
          <p className="pdetails-line">-</p>

          <div style={{ marginBottom: "10px" }}>
            <p className="rx">Rx</p>
          </div>

          {med.map((pres, key) => {
            return (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <p className="pdetails">Generic Name:</p>
                  <p className="pgeneric-line">{pres.medicine}</p>
                  <p className="pdetails">#</p>
                  <p className="pward-line">--</p>
                  <p className="pdetails">Sig:</p>
                  <p className="psig-line">{pres.dosage}</p>
                </div>
              </>
            );
          })}

          <div className="signature">
            <div>
              <p className="signature-label">Signature</p>
              <p className="sign-line">-</p>
            </div>
            <div>
              <p className="signature-label">Printed Name</p>
              <p className="sign-line">{resident} MD</p>
            </div>
            <div>
              <p className="signature-label">License No.</p>
              <p className="sign-line">-</p>
            </div>
            <div>
              <p className="signature-label">S2 License No.</p>
              <p className="sign-line">-</p>
            </div>
          </div>

          <p className="ra">
            "RA 9502 prohibits brand prescriibng in all government health
            agencies"
          </p>

          <div className="pfooter">
            <p>ZCMC-F-OCMPS-01</p>
            <p>Rev.1</p>
            <p>Effectivity Date:May 16, 2022</p>
          </div>
        </div>
      </div>
    </div>
);
}

export default Prescription;