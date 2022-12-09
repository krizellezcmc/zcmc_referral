import React from "react";
import "../Styles/Report.css";
import "../Styles/DisplayReport.css";
import { width } from "@mui/system";

function TagubilinDownload(props) {
  return (
    <div>
      <div className="rheader">
        <img src={props.zcmcLogo} className="rlogo1" alt="ZCMC Logo" />
        <div className="rhead-data">
          <p>Republic of the Philippines</p>
          <p>Department of Health</p>
          <p>ZAMBOANGA CITY MEDICAL CENTER</p>
          <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
          <h2>ALAGANG PINOY TAGUBILIN</h2>
        </div>
        <img src={props.dohLogo} className="rlogo2" alt="DOH Logo" />
      </div>

      <table className="rtable">
        <tr>
          <td className="cell" style={{ width: "23%" }}>
            Name/Pangalan:<p>{props.refName}</p>
          </td>
          <td className="cell" style={{ borderLeft: "0", width: "10%" }}>
            Age/Edad:<p>{props.age}</p>
          </td>
          <td className="cell" style={{ borderLeft: "0", width: "13%" }}>
            Sex: <p>{props.sex}</p>
          </td>
          <td className="cell" style={{ borderLeft: "0", width: "12%" }}>
            Ward:<p>{props.ward}</p>
          </td>
          <td className="cell" style={{ borderLeft: "0", width: "15%" }}>
            Hospital Record No.: <p>{props.hrn}</p>
          </td>
        </tr>
        <tr>
          <td className="cell">
            Address: <p>{props.address}</p>
          </td>
          <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
            Admission/Petsa ng Pagpasok: <p>{props.admit}</p>
          </td>
          <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
            Discharge/Petsa ng Paglabas: <p>{props.discharge}</p>
          </td>
        </tr>
        <tr>
          <td className="cell" colSpan="5">
            Diagnosis/Sakit:
            <p style={{ display: "inline-block" }}>{props.diagnosis}</p>
          </td>
        </tr>
        <tr>
          <td className="cell">Operation/Operasyon:</td>
          <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
            Surgeon:
          </td>
          <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
            Petsa ng Operasyon:
          </td>
        </tr>
        <tr>
          <td className="major-label" colSpan="5">
            Major Diagnostic Results/Pangunahing Resulta ng Pasusuri
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #a9a9a9",
              borderBottom: "0",
              textAlign: "center",
              fontSize: "13px",
              paddingBottom: "5px",
            }}
          >
            <p style={{ width: "100%", height: "auto", textAlign: "center" }}>
              Laboratory
            </p>
            <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: " 'Times New Roman', Times, serif",
                  display: "block",
                  fontWeight: "bolder",
                  fontSize: "12px",
                }}
              >
                {props.lab}
              </p>
            </div>
          </td>

          <td
            style={{
              border: "1px solid #a9a9a9",
              borderBottom: "0",
              borderLeft: "0",
              textAlign: "center",
              fontSize: "13px",
              paddingBottom: "5px",
            }}
          >
            <p style={{ width: "100%", height: "auto", textAlign: "center" }}>
              X-ray
            </p>
            <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: " 'Times New Roman', Times, serif",
                  display: "block",
                  fontWeight: "bolder",
                  fontSize: "12px",
                }}
              >
                {props.xray}
              </p>
            </div>
          </td>

          <td
            style={{
              border: "1px solid #a9a9a9",
              borderBottom: "0",
              borderLeft: "0",
              textAlign: "center",
              fontSize: "13px",
              paddingBottom: "5px",
            }}
          >
            <p style={{ width: "100%", height: "auto", textAlign: "center" }}>
              CT
            </p>
            <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: " 'Times New Roman', Times, serif",
                  display: "block",
                  fontWeight: "bolder",
                  fontSize: "12px",
                }}
              >
                {props.ctscan}
              </p>
            </div>
          </td>

          <td
            style={{
              border: "1px solid #a9a9a9",
              borderBottom: "0",
              borderLeft: "0",
              textAlign: "center",
              fontSize: "13px",
              paddingBottom: "5px",
            }}
          >
            <p style={{ width: "100%", height: "auto", textAlign: "center" }}>
              MRI
            </p>
            <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: " 'Times New Roman', Times, serif",
                  display: "block",
                  fontWeight: "bolder",
                  fontSize: "12px",
                }}
              >
                {props.mri}
              </p>
            </div>
          </td>
          <td
            style={{
              border: "1px solid #a9a9a9",
              borderBottom: "0",
              borderLeft: "0",
              textAlign: "center",
              fontSize: "13px",
              paddingBottom: "5px",
            }}
          >
            <p style={{ width: "100%", height: "auto", textAlign: "center" }}>
              Others
            </p>
            <div style={{ width: "100%", height: "auto", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: " 'Times New Roman', Times, serif",
                  display: "block",
                  fontWeight: "bolder",
                  fontSize: "12px",
                }}
              >
                {props.others}
              </p>
            </div>
          </td>
        </tr>

        {!props.medId ? (
          <tr>
            <td className="med-header" colSpan="5">
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
        ) : (
          <>
            <tr>
              <td className="med-header" colSpan="5">
                <div className="med-box">
                  <div className="med-data">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      style={{ marginLeft: "5px" }}
                    />
                  </div>
                  <div className="med-label">
                    <p>Home Medication/Gamot</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="med" colSpan="2" style={{ borderRight: "0" }}>
                Pangalan ng Gamot
              </td>
              <td className="med" style={{ borderRight: "0" }}>
                Dosage
              </td>
              <td className="med" colSpan="2">
                Prikwensiya at Oras ng Pag-iinom
              </td>
            </tr>
            {props.med.map((m, k) => {
              return (
                <tr>
                  <td
                    className="med-cell"
                    colSpan="2"
                    style={{ borderRight: "0" }}
                  >
                    {m.medicine}
                  </td>
                  <td className="med-cell" style={{ borderRight: "0" }}>
                    {m.dosage}
                  </td>
                  <td className="med-cell" colSpan="2">
                    {m.sched}
                  </td>
                </tr>
              );
            })}
          </>
        )}

        <tr>
          <td className="diagnosis" colSpan="5">
            <b className="rb">
              Health Teaching/Pangunahing Paalalang Pangkalusugan
            </b>
            <div style={{ display: "flex" }}>
              {props.dietList.map((i, k) => {
                return (
                  <>
                    <div className="med-box">
                      <div className="med-data">
                        <input type="checkbox" defaultChecked={true} disabled />
                      </div>
                      <div className="med-label">
                        <p>{i}</p>
                      </div>
                    </div>
                  </>
                );
              })}
              {!props.healthOthers ? (
                ""
              ) : (
                <div className="med-label">
                  <p>Others: {props.healthOthers}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td
            className="diagnosis"
            colSpan="5"
            style={{ borderBottom: "1px solid #A9A9A9" }}
          >
            <b className="rb">Other Instructions/Karagdagang Paalala</b>
            <div style={{ display: "flex" }}>
              {props.instructions.map((i, k) => {
                return (
                  <>
                    <div className="med-box">
                      <div className="med-data">
                        <input type="checkbox" defaultChecked={true} disabled />
                      </div>
                      <div className="med-label">
                        <p>{i}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <p id="para">
              Please call the following Hotline Numbers: 09664965480 for Globe
              and 09533296457 for TM during office hours Monday to Saturday, 8am
              to 5pm or email us at
              <p id="email"> records@zcmc.doh.gov.ph</p> and we will happy to
              serve you.
            </p>
          </td>
        </tr>
        {!props.breastfeed ? (
          ""
        ) : (
          <>
            <tr>
              <td
                colSpan="5"
                style={{
                  borderRight: "1px solid #a9a9a9",
                  borderLeft: "1px solid #a9a9a9",
                  padding: "0px 0px 3px 0px",
                  textAlign: "center",
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "13px",
                  fontWeight: "bolder",
                }}
              >
                REFERRAL UNIT BREASTFEED
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <table style={{ maxWidth: "730px" }}>
                  <tr>
                    <td
                      style={{
                        width: "120px",
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "1px solid #a9a9a9",
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Date
                    </td>
                    <td
                      style={{
                        width: "150px",
                        fontFamily: "'Times New Roman', Times, serif",
                        borderTop: "1px solid #a9a9a9",
                        borderBottom: "1px solid #a9a9a9",
                        textAlign: "left",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      From
                      <p
                        style={{
                          marginLeft: "40px",
                          display: "inline",
                          fontFamily: "'Times New Roman', Times, serif",
                        }}
                      >
                        To
                      </p>
                    </td>
                    <td
                      style={{
                        width: "60px",
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "1px solid #a9a9a9",
                        borderRight: "0",
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Yes
                    </td>
                    <td
                      style={{
                        width: "160px",
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "1px solid #a9a9a9",
                        borderRight: "0",
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      If no, reason
                    </td>
                    <td
                      style={{
                        width: "110px",
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "1px solid #a9a9a9",
                        borderRight: "0",
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Management
                    </td>
                    <td
                      style={{
                        width: "160px",
                        fontFamily: "'Times New Roman', Times, serif",
                        border: "1px solid #a9a9a9",
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "0px 0px 5px 5px",
                        fontWeight: "bolder",
                      }}
                    >
                      Attended
                    </td>
                  </tr>
                  {props.breastfeed.map((b, i) => {
                    return (
                      <>
                        <tr>
                          <td
                            style={{
                              width: "120px",
                              fontFamily: "'Times New Roman', Times, serif",
                              border: "1px solid #a9a9a9",
                              borderTop: "0",
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.date}
                          </td>
                          <td
                            style={{
                              width: "150px",
                              fontFamily: "'Times New Roman', Times, serif",

                              borderBottom: "1px solid #a9a9a9",
                              textAlign: "left",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.fromTo}
                          </td>
                          <td
                            style={{
                              width: "60px",
                              fontFamily: "'Times New Roman', Times, serif",
                              border: "1px solid #a9a9a9",
                              borderTop: "0",
                              borderRight: "0",
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.yes}
                          </td>
                          <td
                            style={{
                              width: "160px",
                              fontFamily: "'Times New Roman', Times, serif",
                              border: "1px solid #a9a9a9",
                              borderTop: "0",
                              borderRight: "0",
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.reason}
                          </td>
                          <td
                            style={{
                              width: "110px",
                              fontFamily: "'Times New Roman', Times, serif",
                              border: "1px solid #a9a9a9",
                              borderTop: "0",
                              borderRight: "0",
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.management}
                          </td>
                          <td
                            style={{
                              width: "160px",
                              fontFamily: "'Times New Roman', Times, serif",
                              border: "1px solid #a9a9a9",
                              borderTop: "0",
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0px 0px 5px 5px",
                            }}
                          >
                            {b.attended}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                    <td
                      style={{
                        border: "1px solid #a9a9a9",
                        borderTop: "0",
                        borderBottom: "0",
                        padding: "0px 0px 5px 5px",
                      }}
                      colSpan="6"
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontFamily: "'Times New Roman', Times, serif",
                          fontWeight: "bolder",
                          fontSize: "13px",
                        }}
                      >
                        REMINDER
                      </p>
                      <div
                        style={{
                          float: "left",
                          display: "block",
                          width: "50%",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          1. Breastfeed your baby
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          2. Allow your baby to suck freely at breast without
                          any fixed time table
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          3. Do not give prelacteal feeds such as sterile water,
                          glucose water, honey, ampalaya juice, etc.
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          4. No feeding bottles, milk substitutes artificial,
                          teats and pacifiers.
                        </p>
                      </div>
                      <div
                        style={{
                          float: "right",
                          display: "block",
                          width: "50%",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          6. There is no to stop breastfeeding if the baby wants
                          to continue even after 3 years.
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          7. Start solid foods when your baby is 4-6 months old.
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          8. Eat a good and well balance diet
                        </p>
                        <p
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            fontSize: "12px",
                          }}
                        >
                          9. Visit any halth centers for advice.
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #a9a9a9",
                        borderTop: "0",
                        padding: "5px 0px 5px 5px",
                      }}
                      colSpan="6"
                    >
                      <p
                        style={{
                          fontFamily: "'Times New Roman', Times, serif",
                          fontSize: "12px",
                        }}
                      >
                        For assistance, kindly approach ZCMC Public Affairs &
                        Customer Care Unit (PACCU) or call{" "}
                        <b>GLOBE: 097585750/ 09262435850/ 09359284701</b>
                      </p>
                      {/* <p
                        style={{
                          fontFamily: "'Times New Roman', Times, serif",
                          fontSize: "12px",
                          fontWeight: "bolder",
                        }}
                      >
                        GLOBE: 097585750/ 09262435850/ 09359284701
                      </p> */}
                      <p
                        style={{
                          fontFamily: "'Times New Roman', Times, serif",
                          fontSize: "12px",
                          fontWeight: "bolder",
                        }}
                      >
                        SMART: 09474951217/ 09474963439
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </>
        )}
        <tr>
          <td
            colSpan="5"
            style={{
              borderLeft: "1px solid #a9a9a9",
              borderRight: "1px solid #a9a9a9",
              borderBottom: "1px solid #a9a9a9",
              borderTop: "0",
            }}
          >
            <div>
              <b className="rb">
                I understand the above explanation given, I do hereby agree that
                I will have follow-up check-up:
              </b>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                textAlign: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    borderBottom: "1px solid #a9a9a9",
                    paddingBottom: "5px",
                    width: "200px",
                    textAlign: "center",
                    marginLeft: "20px",
                  }}
                >
                  {props.followup}
                </p>

                <p className="hr-date">Date of Follow-up</p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    borderBottom: "1px solid #a9a9a9",
                    paddingBottom: "5px",
                    width: "200px",
                    textAlign: "center",
                    marginLeft: "20px",
                  }}
                >
                  {props.time}
                </p>

                <p className="hr-date">Time</p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    borderBottom: "1px solid #a9a9a9",
                    paddingBottom: "5px",
                    width: "200px",
                    textAlign: "center",
                    marginLeft: "20px",
                  }}
                >
                  {props.need}
                </p>
                <p className="hr-date">Need To Bring</p>
              </div>
            </div>
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
          <p className="rname">{props.nurse} RN</p>
          <p className="hr-sign">Nurse on Duty</p>
        </div>
        <div className="float-child2">
          <label>Noted by:</label>
          <p className="rname">{props.resident} MD</p>
          <p className="hr-sign">Resident-in-Charge</p>
        </div>
      </div>
    </div>
  );
}

export default TagubilinDownload;
