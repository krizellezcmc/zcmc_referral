import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import axios from "axios";
import moment from "moment";
import "../Styles/StatusBar.css";
import {
  Box,
  Badge,
  Text,
  Grid,
  GridItem,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { BiCalendarEvent, BiIdCard, BiStats, BiUser } from "react-icons/bi";
import { TbCheckupList } from "react-icons/tb";
import Swal from "sweetalert2";

function SearchPatient(props) {
  const [patient, setPatient] = useState([]);
  const [selected, setSelected] = useState("/");
  const [bizbox, setBizbox] = useState([]);
  const [hospital, setHospital] = useState("");
  const [covid, setCovid] = useState([]);

  patient
    .filter((l) => l.refFacility === hospital.toUpperCase())
    .forEach((element, key) => {
      patient[key]["label"] =
        element.lastname +
        ", " +
        element.firstname +
        " " +
        element.middleName +
        " " +
        "(" +
        element.tstamp +
        ")";

      patient[key]["value"] =
        element.patientId +
        "/" +
        element.lastname +
        ", " +
        element.firstname +
        " " +
        element.middleName +
        " " +
        "/" +
        element.tstamp;
    });

  // Split
  let data = selected.split("/");
  let name = data[1];
  let id = data[0];
  const refDate = moment(data[2]).format("YYYY-MM-DD hh:mm");

  const cancelReferral = (id) => {
    Swal.fire({
      text: "Please indicate reason for cancelling the referral",
      icon: "warning",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
      preConfirm: (data) => {
        if (!data) {
          Swal.showValidationMessage(`Request failed`);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "http://localhost/zcmc_referral_api/api/cancel_referred_patient.php",
            {
              id: id,
              reason: result.value,
            }
          )
          .then((response) => {
            if (response.data.status === 1) {
              Swal.fire(
                "Rejected!",
                "You successfully rejected the referral.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Something went wrong.", "error");
            }
          });
      }
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    console.log(patient);
    axios
      .get("http://localhost/zcmc_referral_api/api/get_sheets.php", {
        params: { hospital: hospital },
      })
      .then((response) => {
        setPatient(response.data);
      });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_covid.php", {
        params: { id: id },
      })
      .then((response) => {
        setCovid(response.data);
      });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patient_data.php", {
        params: { patientName: name, referredDate: refDate },
      })
      .then((response) => {
        setBizbox(response.data);
      });
  }, [refDate, name, id, covid]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "700px" }}>
        <Text>Search Patient</Text>
        <Select
          options={patient}
          placeholder="Search patient"
          selectedOptionStyle="check"
          closeMenuOnSelect={true}
          focusBorderColor="#058e46"
          onChange={(e) => {
            setSelected(e.value);
          }}
          width="100%"
          x
          required
          useBasicStyles
          id="searchbar"
        />
      </div>

      {patient
        .filter((pat) => pat.patientId == id)
        .map((i, k) => {
          return (
            <>
              <Center>
                <Box mt={20} w="70%">
                  <ul id="progress">
                    <li
                      className={
                        i.status === "pending" || i.status === "accepted"
                          ? "active"
                          : // : i.status === "cancelled"
                            // ? "out"
                            ""
                      }
                    >
                      Pending
                    </li>
                    {i.status === "cancelled" ? (
                      <li className="out">Cancelled</li>
                    ) : (
                      <>
                        {" "}
                        <li
                          className={
                            bizbox.length === 0 && i.status === "arrived"
                              ? "active"
                              : ""
                          }
                        >
                          Arrived
                        </li>
                      </>
                    )}

                    {bizbox.length == 0 ? (
                      <>
                        <li>Admitted</li>
                        <li>Discharged</li>
                      </>
                    ) : (
                      <>
                        {bizbox.map((d) => {
                          return (
                            <>
                              <li
                                className={
                                  d.dischDate === null || d.dischDate === ""
                                    ? "active"
                                    : ""
                                }
                              >
                                Admitted
                              </li>
                            </>
                          );
                        })}

                        {bizbox.map((d) => {
                          return (
                            <>
                              <li
                                className={d.dischDate !== null ? "active" : ""}
                              >
                                Discharged
                              </li>
                            </>
                          );
                        })}
                      </>
                    )}
                  </ul>
                </Box>
              </Center>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <div className="referral-form-search">
                    <div className="block">
                      <Flex>
                        <h1>Patient Information</h1>
                      </Flex>

                      <div className="inline-block">
                        <label>
                          Full name <span>*</span>
                        </label>
                        <div className="input-container">
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            value={i.lastname}
                            className="lastname"
                            placeholder="Last name"
                            required
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            value={i.firstname}
                            className="firstname"
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            className="middlename"
                            placeholder="Middle name"
                            value={i.middleName}
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            value={i.extended}
                            className="suffix"
                            placeholder="Suffix"
                          />
                        </div>
                        <div className="inline-block-2">
                          <div className="input-container-4">
                            <label>Birthday</label>
                            <input
                              disabled
                              value={moment(i.birthdate).format("LL")}
                              type="text"
                            />
                          </div>

                          <div className="input-container-4">
                            <label>Sex</label>
                            <input disabled value={i.sex} type="text" />
                          </div>

                          <div className="input-container-4">
                            <label>Civil Status</label>
                            <select value={i.civilStatus}>
                              <option value={i.civilStatus} selected disabled>
                                {i.CivilStatus}
                              </option>
                            </select>
                          </div>

                          <div className="input-container-4">
                            <label>Nationality</label>
                            <input disabled value={i.nationality} type="text" />
                          </div>
                        </div>
                        <div className="inline-block-2">
                          <div className="input-container-3">
                            <label>Religion</label>
                            <select value={i.religion}>
                              <option value="" selected>
                                {i.Religion}
                              </option>
                            </select>
                          </div>

                          <div className="input-container-3">
                            <label>Occupation</label>
                            <input disabled value={i.occupation} type="text" />
                          </div>

                          <div className="input-container-3">
                            <label>PhilHealth MDR</label>
                            <input disabled value={i.philhealth} type="text" />
                          </div>
                        </div>
                        <div className="inline-block">
                          <label>Address</label>
                          <div className="input-container">
                            <textarea
                              disabled
                              rows="1"
                              value={i.address}
                            ></textarea>
                          </div>
                        </div>
                        <div className="block">
                          <h1>Significant Watchers</h1>

                          <div className="inline-block-2">
                            <div className="input-container-2">
                              <label>Next of Kin</label>
                              <input disabled value={i.nextOfKin} type="text" />
                            </div>

                            <div className="input-container-2">
                              <label>Landline/Mobile/Email</label>
                              <input
                                disabled
                                value={i.contactWatcher}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <h1>Admitting Details</h1>

                          <div className="inline-block-2">
                            <div className="input-container-4">
                              <label>
                                Date Admitted <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.dateAdmitted}
                                type="text"
                              />
                            </div>

                            <div className="input-container-4">
                              <label>
                                Referral Type <span>*</span>
                              </label>
                              <select value={i.refType}>
                                <option value={i.refType} disabled selected>
                                  {i.refType}
                                </option>
                              </select>
                            </div>

                            <div className="input-container-4">
                              <label>
                                Disposition <span>*</span>
                              </label>
                              <select value={i.disposition}>
                                <option disabled selected>
                                  {i.disposition}
                                </option>
                              </select>
                            </div>

                            <div className="input-container-4">
                              <label>
                                Specialization <span>*</span>
                              </label>
                              <select value={i.Specialization}>
                                <option disabled selected>
                                  {i.specialization}
                                </option>
                              </select>
                            </div>
                          </div>

                          {i.Specialization === "Obstetrics And Gynecology" ? (
                            <>
                              <Text
                                mb={3}
                                fontSize="16px"
                                textTransform="uppercase"
                              >
                                For OB Cases:
                              </Text>
                              <div className="inline-block-2">
                                <div className="input-container-3">
                                  <label>
                                    Gravidity and Parity <span>*</span>
                                  </label>

                                  <input disabled type="text" value={i.GP} />
                                </div>

                                <div className="input-container-3">
                                  <label>
                                    Last Menstrual Period <span>*</span>
                                  </label>
                                  <input disabled value={i.LMP} required />
                                </div>

                                <div className="input-container-3">
                                  <label>
                                    AOG <span>*</span>
                                  </label>
                                  <input
                                    disabled
                                    type="text"
                                    value={i.AOG}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="inline-block-2">
                                <div className="input-container-4">
                                  <label>
                                    EDC <span>*</span>
                                  </label>
                                  <input disabled value={i.EDC} required />
                                </div>
                                <div className="input-container-4">
                                  <label>
                                    Fetal Heart Tones <span>*</span>
                                  </label>
                                  <input
                                    disabled
                                    type="text"
                                    value={i.FHT}
                                    required
                                  />
                                </div>

                                <div className="input-container-4">
                                  <label>
                                    Fundal Height <span>*</span>
                                  </label>
                                  <input
                                    disabled
                                    type="text"
                                    value={i.FH}
                                    required
                                  />
                                </div>

                                <div className="input-container-4">
                                  <label>
                                    Baby APGAR <span>*</span>
                                  </label>
                                  <input
                                    disabled
                                    type="text"
                                    value={i.APGAR}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="inline-block-2">
                                <div className="input-container-2">
                                  <label>Internal Examination</label>

                                  <input disabled value={i.IE} />
                                </div>
                                <div className="input-container-2">
                                  <label>Bow</label>

                                  <input disabled value={i.bow} />
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}

                          <div className="inline-block-2">
                            <div className="input-container-5">
                              <label>
                                Latest V/S-Temperature <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.latestTemp}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Blood Pressure <span>*</span>
                              </label>
                              <input disabled value={i.latestBp} type="text" />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Respiration Rate <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.latestRespi}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S Pulse Rate <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.latestPulse}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Oxygen Saturation <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.latestOxygen}
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="inline-block-2">
                            <div className="input-container-3">
                              <label>
                                Glasgow Coma Scale <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.latestGlasgow}
                                type="text"
                              />
                            </div>

                            <div className="input-container-3">
                              <label>Endorsement/Initial Care</label>
                              <input
                                disabled
                                value={i.endorsement}
                                type="text"
                              />
                            </div>

                            <div className="input-container-3">
                              <label>Resident on Duty/Contact #</label>
                              <input
                                disabled
                                value={i.userContact}
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="inline-block-2">
                            <div className="input-container-2">
                              <label>Chief Complaints</label>
                              <textarea
                                disabled
                                value={i.chiefComplaints}
                                style={{
                                  marginTop: "5px",
                                  minWidth: "0px",
                                  borderRadius: "5px",
                                  resize: "none",
                                }}
                              ></textarea>
                            </div>

                            <div className="input-container-2">
                              <label>Diagnosis</label>
                              <textarea
                                disabled
                                value={i.diagnosis}
                                style={{
                                  marginTop: "5px",
                                  minWidth: "0px",
                                  borderRadius: "5px",
                                  resize: "none",
                                }}
                              ></textarea>
                            </div>
                          </div>

                          <div className="inline-block-2">
                            <div className="input-container-1">
                              <label>Reason for Referral</label>
                              <select value={i.ReasonforReferral}>
                                <option value="" disabled selected>
                                  {i.reason}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GridItem>
                <GridItem
                  p={3}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    height: "auto",
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    borderRadius: "5px",
                    padding: "30px",
                  }}
                >
                  {bizbox.length !== 0 ? (
                    bizbox.map((d) => {
                      return (
                        <>
                          <Text
                            style={{
                              display: "flex",
                              marginBottom: 4,
                              fontWeight: "600",
                            }}
                            mb={6}
                          >
                            <BiIdCard
                              style={{ marginRight: "5px", marginTop: 2 }}
                            />
                            <Text textTransform="uppercase" mb={6}>
                              Patient ID: {d.patId}
                            </Text>
                          </Text>

                          {/* COVID */}

                          <Text
                            textTransform="uppercase"
                            fontSize="15px"
                            fontWeight="500"
                          >
                            COVID:{" "}
                            {covid === null ? (
                              <Badge colorScheme="gray">No result</Badge>
                            ) : covid["result"] === 1 ? (
                              <Badge colorScheme="red">POSITIVE +</Badge>
                            ) : (
                              <Badge colorScheme="blue">negative -</Badge>
                            )}
                          </Text>
                          <br />

                          <Text
                            style={{
                              display: "flex",
                              marginBottom: 4,
                              marginTop: 10,
                            }}
                          >
                            <BiCalendarEvent
                              style={{ marginRight: "5px", marginTop: 2 }}
                            />
                            <Text textTransform="uppercase">Referred date</Text>
                          </Text>
                          <Text fontSize="15px">
                            <Box p={3} bg="gray.50" borderRadius="5px" mb={6}>
                              {moment(d.referredDate).format("lll")}
                            </Box>
                          </Text>

                          <Box mt={10}>
                            <Text style={{ display: "flex", marginBottom: 4 }}>
                              <TbCheckupList
                                style={{ marginRight: "5px", marginTop: 2 }}
                              />
                              <Text textTransform="uppercase">
                                Discharge diagnosis
                              </Text>
                            </Text>

                            <Box>
                              {d.dischDiagnosis === "" ||
                              d.dischDiagnosis === null ? (
                                <Box p={3} bg="gray.50" borderRadius="5px">
                                  <Text fontSize="13px">Nothing to show</Text>
                                </Box>
                              ) : (
                                <>
                                  <Box p={3} bg="gray.50" borderRadius="5px">
                                    <Text fontSize="13px">
                                      {d.dischDiagnosis}
                                    </Text>
                                  </Box>
                                </>
                              )}
                            </Box>
                          </Box>

                          <Box mt={10}>
                            <Text style={{ display: "flex", marginBottom: 4 }}>
                              <TbCheckupList
                                style={{ marginRight: "5px", marginTop: 2 }}
                              />
                              <Text textTransform="uppercase">
                                Final diagnosis
                              </Text>
                            </Text>

                            <Box>
                              {d.finalDiagnosis === "" ||
                              d.finalDiagnosis === null ? (
                                <Box p={3} bg="gray.50" borderRadius="5px">
                                  <Text fontSize="13px">Nothing to show</Text>
                                </Box>
                              ) : (
                                <>
                                  <Box p={3} bg="gray.50" borderRadius="5px">
                                    <Text fontSize="13px">
                                      {d.finalDiagnosis}
                                    </Text>
                                  </Box>
                                </>
                              )}
                            </Box>
                          </Box>

                          <Box mt={10}>
                            <Text style={{ display: "flex", marginBottom: 6 }}>
                              <BiCalendarEvent
                                style={{ marginRight: "5px", marginTop: 2 }}
                              />
                              <Text textTransform="uppercase">
                                Discharge date
                              </Text>
                            </Text>

                            <Box>
                              {d.dischDate === "" || d.dischDate === null ? (
                                <Box p={3} bg="gray.50" borderRadius="5px">
                                  <Text
                                    fontSize="13px"
                                    fontWeight="600"
                                    color="blue.500"
                                  >
                                    Patient is still admitted
                                  </Text>
                                </Box>
                              ) : (
                                <Box p={3} bg="red.50" borderRadius="5px">
                                  <Text
                                    fontSize=" 14px"
                                    color="red.600"
                                    fontWeight="600"
                                  >
                                    {moment(d.dischDate).format("lll")}
                                  </Text>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </>
                      );
                    })
                  ) : i.status === "cancelled" ? (
                    <>
                      {" "}
                      <Box p={3} bg="red.50" borderRadius="5px" mb={6}>
                        <Text fontSize="15px" fontWeight="600" color="red.500">
                          Referral Cancelled
                        </Text>
                        <Text mt={5} fontSize="15px">
                          <b>Reason:</b> <i>{i.rejectReason}</i>
                        </Text>
                      </Box>
                    </>
                  ) : i.status === "arrived" ? (
                    <>
                      {" "}
                      <Text
                        style={{
                          display: "flex",
                          marginBottom: 4,
                        }}
                      >
                        <BiStats style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient status</Text>
                      </Text>
                      <Box p={3} bg="gray.50" borderRadius="5px" mb={6}>
                        <Text fontSize="13px" fontWeight="600" color="blue.500">
                          Not yet available
                        </Text>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          display: "flex",
                          marginBottom: 4,
                        }}
                      >
                        <BiStats style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient status</Text>
                      </Text>
                      <Box p={3} bg="gray.50" borderRadius="5px" mb={6}>
                        <Text fontSize="13px" fontWeight="600" color="blue.500">
                          Pending referral
                        </Text>
                      </Box>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="solid"
                        onClick={() => cancelReferral(id)}
                      >
                        Cancel Referral
                      </Button>
                    </>
                  )}
                </GridItem>{" "}
              </Grid>
            </>
          );
        })}

      {/* // <Button onClick={find}>Find</Button> */}
    </div>
  );
}

export default SearchPatient;
