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
    const [sex, setSex]=useState("");
    const [ward, setWard] = useState("");
    const [med, setMed] = useState([]);
    const [resident, setResident] = useState("");
  
    useEffect(() => {
      let refpatient = JSON.parse(localStorage.getItem("refpatient"));
      setRefName(refpatient.patientName);
      setAge(refpatient.age);
      setSex(refpatient.sex);
      setWard(refpatient.ward);
      setMed(refpatient.medications);
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
            <div style={{ textAlign: "right", marginRight:"20px", marginTop: "20px" }}>
              <p className="pdate">Date:</p>
              <p className="pdate-line">{moment().format("LL")}</p>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p className="pfullname">Patient's Name :</p>
              <p className="pfullname-line">{refName}</p>
            </div>
            <p className="pdetails">Age :</p>
            {!age ? (
              <p className="pdetails-line">--</p>
            ):(
              <p className="pdetails-line">{age}</p>
            )}
             <p className="pdetails" style={{ marginLeft: "20px" }}>
              Sex :
            </p>
            {!sex ? (
            <p className="pdetails-line">-</p>
            ):(
              <p className="pdetails-line">{sex}</p>
            )}
            <p className="pdetails" style={{ marginLeft: "20px" }}>
              Ward :
            </p>
            {!ward ? (
              <p className="pward-line">--</p>
            ):(
              <p className="pward-line">{ward}</p>
            )}

            <p className="pdetails" style={{ marginLeft: "20px" }}>
              OPD :
            </p>
            <p className="pdetails-line">-</p>
    
            <div style={{ marginBottom: "5px" }}>
              <p className="rx">Rx</p>
            </div>

            <div className="meds-container">
            {med.map((pres, key) => {
              return (
                <>
                  <div style={{ marginBottom: "3px" }}>
                    <p className="pdetails">Generic Name :</p>
                    {!pres.medicine ? (
                    <p className="pgeneric-line">--</p>
                    ):(
                      <p className="pgeneric-line">{pres.medicine}</p>
                    )}
                    <p className="pdetails"># </p>
                    {!pres.quantity ? (
                    <p className="quantity-line">--</p>
                    ):(
                      <p className="quantity-line">{pres.quantity}</p>
                    )}
                    <div>
                    <p className="psig">Sig :</p>
                    {!pres.dosage ? (
                      <p className="psig-line">--</p>
                    ):(
                      <p className="psig-line">{pres.dosage}</p>
                    )}
                    
                    </div>
                  </div>
                </>
              );
            })}
            </div>
            <div className="signature">
              <div>
                <p className="signature-label">Signature</p>
                <p className="sign-line">-</p>
              </div>
              <div>
                <p className="signature-label">Printed Name</p>
                <p className="sign-line">{resident}</p>
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
          orientation: "l",
          unit: "mm",
          format: [297,210],
        });
        pres.page = 1;
    
        function footer() {
          pres.setFont("Times-Roman");
          pres.setFontSize(7);
          pres.text(
            38,
            204,
            '"RA 9502 prohibits brand prescriibng in all government health agencies"'
          );
          pres.text(
            30,
            207,
            "ZCMC-F-OCMPS-05" +
              "                        " +
              "Rev. 1" +
              "                        " +
              "Effectivity Date: May 16, 2022" 
          );
          pres.page++;
        }
    
        pres.html(ReactDOMServer.renderToString(elementPres), {
          width: 148.5,
          height: 210,
          windowWidth: 580,
          windowHeight: 1160,
          margin: [3, 5, 5, 5],
    
          callback: function (pres) {
            footer();
            window.open(pres.output("bloburl"));
          },
        });
      };

return(

    <div>
    <div style={{ float: "right", marginRight: "5px" }}>
        <Button
          onClick={exportPres}
          variant="outline"
          colorScheme="red"
          size="sm"
          mt={20}
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
          <div style={{ textAlign: "right", marginRight:"10px",marginTop: "3px" }}>
            <p className="pdate">Date:</p>
            <p className="pdate-line">{moment().format("LL")}</p>
          </div>
          <div style={{ marginTop: "5px" }}>
            <p className="pfullname">Patient's Name:</p>
            <p className="pfullname-line">{refName}</p>
          </div>
          <p className="pdetails">Age:</p>
          {!age ? (
            <p className="pdetails-line">--</p>
          ):(
            <p className="pdetails-line">{age}</p>
          )}
           <p className="pdetails" style={{ marginLeft: "20px" }}>
            Sex:
          </p>
          {!sex ? (
           <p className="pdetails-line">-</p>
          ):(
            <p className="pdetails-line">{sex}</p>
          )}
          <p className="pdetails" style={{ marginLeft: "20px" }}>
            Ward:
          </p>
          {!ward ? (
          <p className="pward-line">{ward}</p>
          ):(
            <p className="pward-line">--</p>
          )}
          <p className="pdetails" style={{ marginLeft: "20px" }}>
            OPD:
          </p>
          <p className="pdetails-line">-</p>

          <div style={{ marginBottom: "5px" }}>
            <p className="rx">Rx</p>
          </div>

          <div className="meds-container">
          {med.map((pres, key) => {
            return (
              <>
                <div style={{ marginBottom: "3px" }}>
                  <p className="pdetails">Generic Name :</p>
                  {!pres ? (
                      <p className="pgeneric-line">--</p>
                    ):(
                      <p className="pgeneric-line">{pres.medicine}</p>
                    )}
                
                  <p className="pdetails"># </p>
                  {!pres.quantity ? (
                    <p className="quantity-line">--</p>
                  ):(
                    <p className="quantity-line">{pres.quantity}</p>
                  )}
                  
                  <div>
                  <p className="psig">Sig :</p>
                  {!pres.dosage ? (
                  <p className="psig-line">--</p>
                  ):(
                  <p className="psig-line">{pres.dosage}</p>
                  )}
                  </div>
                  
                </div>
              </>
            );
          })}
          </div>
          <div className="signature">
            <div>
              <p className="signature-label">Signature</p>
              <p className="sign-line">-</p>
            </div>
            <div>
              <p className="signature-label">Printed Name</p>
              <p className="sign-line">{resident}</p>
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