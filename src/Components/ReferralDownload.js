import React from "react";
// import "../Styles/RefDownload.css";
import zcmc from "../Assets/zcmc-logo.png";
import doh from "../Assets/doh-logo.png";
import moment from "moment";

function ReferralDownload(props) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          maxWidth: "730px",
          display: "flex",
          textAlign: "center",
          marginLeft: "45px",
        }}
      >
        <img
          src={zcmc}
          alt="ZCMC Logo"
          style={{
            float: "left",
            width: "60px",
            height: "75px",
          }}
        />
        <div
          style={{
            float: "left",
            width: "700px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              lineHeight: "11px",
            }}
          >
            Republic of the Philippines
          </p>
          <p
            style={{
              fontSize: "10px",
              lineHeight: "11px",
            }}
          >
            Department of Health
          </p>
          <p
            style={{
              fontSize: "10px",
              lineHeight: "11px",
            }}
          >
            ZAMBOANGA CITY MEDICAL CENTER
          </p>
          <p
            style={{
              fontSize: "10px",
              lineHeight: "11px",
            }}
          >
            Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000
          </p>
          <h2
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "black",
              fontSize: "20px",
              paddingBottom: "10px",
            }}
          >
            ONLINE REFERRAL &nbsp; SYSTEM &nbsp;RECEIVING &nbsp;FORM
          </h2>
        </div>
        <img
          src={doh}
          alt="DOH Logo"
          style={{
            float: "right",
            width: "80px",
            height: "75px",
          }}
        />
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "830px",
          textAlign: "left",
          padding: "5px",
          fontSize: "12px",
        }}
      >
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
              width: "45%",
            }}
          >
            Date &nbsp;:{" "}
            <p style={{ display: "inline", fontWeight: "bolder" }}>
              {moment(props.timestamp).format("LL")}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Time Received &nbsp; :{" "}
            <p style={{ display: "inline", fontWeight: "bolder" }}>
              {moment(props.timestamp).format("LT")}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
              width: "27%",
            }}
          >
            Time Endorsed &nbsp; :{" "}
            <p style={{ display: "inline", fontWeight: "bolder" }}>
              {moment(props.timestamp).format("LT")}
            </p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
              wordSpacing: "5px",
            }}
          >
            Referring Facility &nbsp;:{" "}
            <p
              style={{
                wordSpacing: "5px",
                fontWeight: "bolder",
                display: "inline",
              }}
            >
              {props.refFacility}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Caller &nbsp;:&nbsp;
            <p
              style={{
                wordSpacing: "5px",
                fontWeight: "bolder",
                display: "inline",
              }}
            >
              {props.username}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Call back No &nbsp;:
            <p
              style={{
                display: "inline",
              }}
            >
              -
            </p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Referring ROD &nbsp;:
            <p>{props.rod}</p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Contact No. of Watchers &nbsp;:
            {!props.contact ? (
              <p>-</p>
            ) : (
              <p style={{ fontWeight: "bolder" }}>{props.contact}</p>
            )}
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Dispatcher &nbsp;:&nbsp;
            <p>-</p>
          </td>
        </tr>
        <tr>
          <td
            colSpan="2"
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Reason &nbsp; for Transfer &nbsp;:&nbsp;
            <p
              style={{
                fontWeight: "bolder",
                display: "inline",
                wordSpacing: "5px",
              }}
            >
              {props.reason}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
          >
            ETA &nbsp;:
            <p style={{ fontWeight: "bolder", display: "inline" }}>-</p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
            }}
          >
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "5px", padding: "0 0 5px 3px" }}>
                Case&nbsp;:
              </p>
              <input
                type="checkbox"
                defaultChecked={true}
                style={{ marginTop: "8px", marginLeft: "3px" }}
              />
              <p
                style={{
                  marginLeft: "5px",
                  padding: "0 0 5px 3px",
                  fontWeight: "bolder",
                }}
              >
                {props.specialization}
              </p>
            </div>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
            colSpan="2"
          >
            {props.referralType === "COVID" ? (
              <>
                <div style={{ display: "flex" }}>
                  <p> COVID&nbsp;-19 Positive</p>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    style={{ marginTop: "8px", marginLeft: "3px" }}
                  />
                  <p
                    style={{
                      marginLeft: "5px",
                      padding: "0 0 5px 3px",
                      fontWeight: "bolder",
                    }}
                  >
                    {props.disposition}
                  </p>
                </div>
              </>
            ) : props.referralType === "NON-COVID" ? (
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  style={{ marginTop: "8px", marginLeft: "3px" }}
                />
                <p
                  style={{
                    marginLeft: "5px",
                    padding: "0 0 5px 3px",
                    fontWeight: "bolder",
                  }}
                >
                  NON-COVID
                </p>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  style={{ marginTop: "8px", marginLeft: "3px" }}
                />
                <p
                  style={{
                    marginLeft: "5px",
                    padding: "0 0 5px 3px",
                    fontWeight: "bolder",
                  }}
                >
                  COVID-19 Suspect
                </p>
              </div>
            )}
          </td>

          {/* <td
            style={{
              border: "1px solid black",
            }}
          >
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                style={{ marginTop: "8px", marginLeft: "3px" }}
              />
              <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                NON-COVID
              </p>
            </div>
          </td> */}
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              textAlign: "center",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
            colSpan="3"
          >
            PATIENT'S &nbsp; INFORMATION
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            style={{
              border: "1px solid black",
              borderBottom: "0",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "830px",
                textAlign: "left",
              }}
            >
              <tr>
                <td
                  style={{
                    // border: "1px solid black",
                    padding: "0 0 5px 3px",
                    display: "flex",
                  }}
                >
                  Name of Patient&nbsp;: &nbsp;
                  <p style={{ fontWeight: "bolder" }}>
                    {props.lastname} &nbsp;, &nbsp;{props.firstName} &nbsp;{" "}
                    {props.extended} &nbsp;, {props.middleName}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  Age&nbsp;: &nbsp;
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.age}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  Sex&nbsp;: &nbsp;
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.sex}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  Address&nbsp;: &nbsp;
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.address}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              padding: "0 0 5px 3px",
              borderBottom: "0",
              borderRight: "0",
            }}
          >
            Chief Complaint/s&nbsp;:{" "}
            <p style={{ display: "inline", fontWeight: "bolder" }}>
              {props.chiefComplaints}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Weight&nbsp;:
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Height&nbsp;:
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
            }}
          >
            Diagnosis&nbsp;:{" "}
            <p style={{ display: "inline", fontWeight: "bolder" }}>
              {props.diagnosis}
            </p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              textAlign: "center",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
            colSpan="3"
          >
            LATEST &nbsp; VITAL &nbsp; SIGNS
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            style={{
              border: "1px solid black",
              borderBottom: "0",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                width: "830px",
                textAlign: "left",
              }}
            >
              <tr>
                <td
                  style={{
                    // border: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  Temp &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.temp}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  BP &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.bp}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  PR &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.pr}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  RR &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.rr}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  O2sat &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.oxygen}
                  </p>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                    padding: "0 0 5px 3px",
                  }}
                >
                  GCS &nbsp;:{" "}
                  <p style={{ display: "inline", fontWeight: "bolder" }}>
                    {props.gcs}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {props.specialization === "Obstetrics And Gynecology" ? (
          <>
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderBottom: "0",
                  padding: "0 0 5px 3px",
                  fontWeight: "bolder",
                }}
              >
                OB CASES
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                style={{
                  border: "1px solid black",
                  borderBottom: "0",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "830px",
                    textAlign: "left",
                  }}
                >
                  <tr>
                    <td
                      style={{
                        // border: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      {props.gp === "" || props.gp === null ? (
                        <p>GP</p>
                      ) : (
                        <>
                          {JSON.parse(props.gp).map((j, k) => {
                            return (
                              <>
                                <div style={{ display: "flex" }}>
                                  <p>G</p>
                                  &nbsp;
                                  <p
                                    style={{
                                      borderBottom: "1px solid black",
                                      padding: "0 0 5px 3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {j.G}
                                  </p>
                                  &nbsp;
                                  <p>P</p>
                                  &nbsp;
                                  <p
                                    style={{
                                      borderBottom: "1px solid black",
                                      padding: "0 0 5px 3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {j.P}
                                  </p>
                                  &nbsp;
                                  <p>(</p>
                                  &nbsp;
                                  <p
                                    style={{
                                      borderBottom: "1px solid black",
                                      padding: "0 0 5px 3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {j.GAP}
                                  </p>
                                  &nbsp;
                                  <p>)</p>
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      LMP &nbsp;: &nbsp;
                      <p style={{ display: "inline", fontWeight: "bolder" }}>
                        {props.lmp}
                      </p>
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      AOG &nbsp;:&nbsp;
                      <p style={{ display: "inline", fontWeight: "bolder" }}>
                        {props.aog}
                      </p>
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      EDC &nbsp;:&nbsp;
                      <p style={{ display: "inline", fontWeight: "bolder" }}>
                        {props.edc}
                      </p>
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      FHT &nbsp;:&nbsp;
                      <p style={{ display: "inline", fontWeight: "bolder" }}>
                        {props.fht}
                      </p>
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid black",
                        padding: "0 0 5px 3px",
                      }}
                    >
                      FH &nbsp;:&nbsp;
                      <p style={{ display: "inline", fontWeight: "bolder" }}>
                        {props.fh}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  border: "1px solid black",
                  borderBottom: "0",
                  borderRight: "0",
                  padding: "0 0 8px 3px",
                }}
              >
                IE &nbsp;: &nbsp;
                {JSON.parse(props.ie).map((j, k) => {
                  return (
                    <>
                      <div style={{ display: "flex" }}>
                        <p
                          style={{
                            borderBottom: "1px solid black",
                            padding: "0 0 5px 3px",
                            textAlign: "center",
                          }}
                        >
                          {j.cm}
                        </p>
                        &nbsp;
                        <p style={{ marginRight: "5px" }}>cm</p>
                        &nbsp;
                        <p
                          style={{
                            borderBottom: "1px solid black",
                            padding: "0 0 5px 3px",
                            textAlign: "center",
                          }}
                        >
                          {j.station}
                        </p>
                        &nbsp;
                        <p style={{ marginLeft: "3px", marginRight: "5px" }}>
                          station
                        </p>
                        &nbsp;
                        <p
                          style={{
                            borderBottom: "1px solid black",
                            padding: "0 0 5px 3px",
                            textAlign: "center",
                          }}
                        >
                          {j.effacement}
                        </p>
                        &nbsp;
                        <p style={{ marginLeft: "3px", marginRight: "5px" }}>
                          effacement
                        </p>
                        &nbsp;
                        <p
                          style={{
                            borderBottom: "1px solid black",
                            padding: "0 0 5px 3px",
                            textAlign: "center",
                          }}
                        >
                          {j.presentation}
                        </p>
                        &nbsp;
                        <p style={{ marginLeft: "3px", marginRight: "5px" }}>
                          presentation
                        </p>
                      </div>
                    </>
                  );
                })}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  borderBottom: "0",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p style={{ marginLeft: "3px" }}>BOW&nbsp;:</p>

                  {JSON.parse(props.bow).map((j, k) => {
                    return (
                      <>
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          style={{ marginTop: "8px", marginLeft: "3px" }}
                        />
                        <p
                          style={{
                            marginLeft: "5px",
                            padding: "0 0 5px 3px",
                            fontWeight: "bolder",
                          }}
                        >
                          {j}
                        </p>
                      </>
                    );
                  })}
                </div>
              </td>
            </tr>
          </>
        ) : (
          ""
        )}

        <tr>
          <td colSpan="3" style={{ border: "1px solid black" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "830px",
                textAlign: "left",
              }}
            >
              <tr>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    padding: "0 0 8px 3px",
                  }}
                ></td>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                    padding: "0 0 8px 3px",
                  }}
                >
                  RT&nbsp;-PCR
                </td>
                <td
                  style={{
                    borderBottom: "1px solid black",
                    borderLeft: "1px solid black",
                    padding: "0 0 8px 3px",
                    width: "40%",
                  }}
                >
                  RAPID &nbsp; ANTIGEN &nbsp; TEST
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "0 0 8px 3px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      style={{ marginTop: "8px", marginLeft: "3px" }}
                    />
                    <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                      NO SWAB
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      style={{ marginTop: "8px", marginLeft: "3px" }}
                    />
                    <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                      PENDING &nbsp;RESULT
                    </p>
                  </div>
                </td>
                <td
                  style={{
                    borderLeft: "1px solid black",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      style={{ marginTop: "8px", marginLeft: "3px" }}
                    />
                    {props.status === "0" ? (
                      <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                        Negative
                      </p>
                    ) : (
                      <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                        Positive
                      </p>
                    )}
                    <p
                      style={{
                        marginLeft: "20px",
                        textAlign: "left",
                      }}
                    >
                      Date Swabbed &nbsp; :&nbsp;
                    </p>
                    <p>{moment(props.swab).format("LLL")}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        marginLeft: "85px",
                        textAlign: "left",
                      }}
                    >
                      Date Result&nbsp; :&nbsp;
                    </p>
                    <p>{moment(props.result).format("LLL")}</p>
                  </div>
                </td>

                <td
                  style={{
                    borderLeft: "1px solid black",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      style={{ marginTop: "8px", marginLeft: "3px" }}
                    />
                    <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                      Positive
                    </p>
                    <p
                      style={{
                        marginLeft: "20px",
                        textAlign: "left",
                      }}
                    >
                      Date Swabbed:
                    </p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      style={{ marginTop: "8px", marginLeft: "3px" }}
                    />
                    <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                      Negative
                    </p>
                    <p
                      style={{
                        marginLeft: "20px",
                        textAlign: "left",
                      }}
                    >
                      Date Result:
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            Patient History
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
              width: "50%",
            }}
            colSpan="2"
          >
            Pertinent PE
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderTop: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
            }}
          >
            <p
              style={{
                fontWeight: "normal",
                textAlign: "justify",
                padding: "3px",
              }}
            >
              {props.HPI}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderTop: "0",
              padding: "0 0 5px 3px",

              width: "50%",
            }}
            colSpan="2"
          >
            <p style={{ fontWeight: "normal", whiteSpace: "pre" }}>
              {props.PPF}
            </p>
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            IVF:
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
            colSpan="2"
          >
            LABS
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            <p style={{ display: "block" }}>MEDS:</p>
            <p style={{ fontWeight: "normal", whiteSpace: "pre" }}>
              {props.meds}
            </p>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
            colSpan="2"
          >
            <p
              style={{
                fontWeight: "normal",
                padding: "5px",
                whiteSpace: "pre",
              }}
            >
              {props.lab}
            </p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderRight: "0",
              borderBottom: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            ROD Instructions
            <div style={{ height: "100px" }}></div>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
            colSpan="2"
          >
            Remarks
            <div style={{ height: "100px" }}></div>
          </td>
        </tr>
        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderRight: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            OPCEN &nbsp; ROD &nbsp;:
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",

              borderRight: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            Receiving &nbsp;:
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            Time Endorsed &nbsp;:
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          ></td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            <div style={{ display: "block", fontWeight: "normal" }}>
              <p>ROD &nbsp;:</p>
              <p>ER &nbsp;:</p>
              <p>Triage &nbsp;:</p>
            </div>
          </td>
          <td
            style={{
              border: "1px solid black",
              borderBottom: "0",
              borderTop: "0",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            <div style={{ display: "block", fontWeight: "normal" }}>
              <p>_____________AM &nbsp;/ &nbsp;PM</p>
              <p>_____________AM &nbsp;/ &nbsp;PM</p>
              <p>_____________AM &nbsp;/&nbsp;PM</p>
            </div>
          </td>
        </tr>

        <tr>
          <td
            colSpan="2"
            style={{
              border: "1px solid black",
              borderRight: "0px",
              padding: "0 0 5px 3px",
              fontWeight: "bolder",
            }}
          >
            Final Disposition
            <div
              style={{
                paddingTop: "15px",
                fontWeight: "normal",
              }}
            >
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  style={{ marginTop: "8px", marginLeft: "3px" }}
                />
                <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                  Arrived at ZCMC ______
                </p>
                <input
                  type="checkbox"
                  style={{ marginTop: "8px", marginLeft: "20px" }}
                />
                <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                  Transferred &nbsp; to other facility ________
                </p>
                <input
                  type="checkbox"
                  style={{ marginTop: "8px", marginLeft: "20px" }}
                />
                <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                  Deferred
                </p>
                <input
                  type="checkbox"
                  style={{ marginTop: "8px", marginLeft: "20px" }}
                />
                <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                  Expired
                </p>
              </div>

              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  style={{ marginTop: "8px", marginLeft: "3px" }}
                />
                <p style={{ marginLeft: "5px", padding: "0 0 5px 3px" }}>
                  Others ________
                </p>
              </div>
            </div>
          </td>
          <td
            style={{
              border: "1px solid black",
              padding: "0 0 10px 3px",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "20%",
                paddingBottom: "20px",
              }}
            >
              <p
                style={{
                  borderTop: "1px solid black",
                  fontWeight: "bolder",
                  marginLeft: "20px",
                  textAlign: "center",
                }}
              >
                Dispatcher
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReferralDownload;
