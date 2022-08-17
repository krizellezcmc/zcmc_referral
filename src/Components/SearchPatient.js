import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import axios from "axios";
import moment from "moment";
import { Box, Badge, Text, Grid, GridItem, Flex } from "@chakra-ui/react";
import {
  BiCalendarEvent,
  BiIdCard,
  BiSearch,
  BiStats,
  BiUser,
} from "react-icons/bi";
import { TbCheckupList } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";

function SearchPatient(props) {
  const [patient, setPatient] = useState([]);
  const [selected, setSelected] = useState("/");

  const [bizbox, setBizbox] = useState([]);
  const [hospital, setHospital] = useState("");

  patient.forEach((element, key) => {
    patient[key]["label"] =
      element.Lastname +
      ", " +
      element.Firstname +
      " " +
      element.Middlename +
      " " +
      "(" +
      element.Timestamp +
      ")";

    patient[key]["value"] =
      element.patientId +
      "/" +
      element.Lastname +
      ", " +
      element.Firstname +
      " " +
      element.Middlename +
      " " +
      "/" +
      moment(element.Timestamp).format("YYYY-MM-DD hh:mm:ss");
  });

  // Split value
  let data = selected.split("/");
  let name = data[1];
  let id = data[0];
  let refDate = data[2];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_sheets.php")
      .then((response) => {
        let list = response.data;
        setPatient(
          list.filter((l) => l.ReferringFacility === hospital.toUpperCase())
        );
      });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patient_data.php", {
        params: { patientName: name, referredDate: refDate },
      })
      .then((response) => {
        setBizbox(response.data);
      });
  }, [patient, hospital, bizbox, name, refDate]);

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
          required
          useBasicStyles
        />
      </div>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {patient
          .filter((pat) => pat.patientId == id)
          .map((i, k) => {
            return (
              <>
                <GridItem>
                  <div className="referral-form-search">
                    <div className="block">
                      <Flex>
                        {" "}
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
                            value={i.Lastname}
                            className="lastname"
                            placeholder="Last name"
                            required
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            value={i.Firstname}
                            className="firstname"
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            className="middlename"
                            placeholder="Middle name"
                            value={i.Middlename}
                          />
                          <input
                            disabled
                            style={{ textTransform: "uppercase" }}
                            type="text"
                            value={i.ExtendedNameofPatient}
                            className="suffix"
                            placeholder="Suffix"
                          />
                        </div>
                        <div className="inline-block-2">
                          <div className="input-container-4">
                            <label>Birthday</label>
                            <input
                              disabled
                              value={moment(i.Birthdate).format("LL")}
                              type="text"
                            />
                          </div>

                          <div className="input-container-4">
                            <label>Sex</label>
                            <input disabled value={i.Sex} type="text" />
                          </div>

                          <div className="input-container-4">
                            <label>Civil Status</label>
                            <select value={i.CivilStatus}>
                              <option value={i.CivilStatus} selected disabled>
                                {i.CivilStatus}
                              </option>
                            </select>
                          </div>

                          <div className="input-container-4">
                            <label>Nationality</label>
                            <input disabled value={i.Nationality} type="text" />
                          </div>
                        </div>
                        <div className="inline-block-2">
                          <div className="input-container-3">
                            <label>Religion</label>
                            <select value={i.Religion}>
                              <option value="" selected>
                                {i.Religion}
                              </option>
                            </select>
                          </div>

                          <div className="input-container-3">
                            <label>Occupation</label>
                            <input disabled value={i.Occupation} type="text" />
                          </div>

                          <div className="input-container-3">
                            <label>PhilHealth MDR</label>
                            <input
                              disabled
                              value={i.PhilhealthMDR}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="inline-block">
                          <label>Address</label>
                          <div className="input-container">
                            <textarea
                              disabled
                              rows="1"
                              value={i.Address}
                            ></textarea>
                          </div>
                        </div>
                        <div className="block">
                          <h1>Significant Watchers</h1>

                          <div className="inline-block-2">
                            <div className="input-container-2">
                              <label>Next of Kin</label>
                              <input disabled value={i.NextofKin} type="text" />
                            </div>

                            <div className="input-container-2">
                              <label>Landline/Mobile/Email</label>
                              <input
                                disabled
                                value={i.ContactNoWatcher}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="block">
                          <h1>Admitting Details</h1>

                          <div className="inline-block-2">
                            <div className="input-container-3">
                              <label>
                                Date Admitted <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.DateAdmitted}
                                type="text"
                              />
                            </div>

                            <div className="input-container-3">
                              <label>
                                Referral Type <span>*</span>
                              </label>
                              <select value={i.ReferralType}>
                                <option
                                  value={i.ReferralType}
                                  disabled
                                  selected
                                >
                                  {i.ReferralType}
                                </option>
                              </select>
                            </div>

                            <div className="input-container-3">
                              <label>
                                Disposition <span>*</span>
                              </label>
                              <select value={i.Disposition}>
                                <option disabled selected>
                                  {i.Disposition}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="inline-block-2">
                            <div className="input-container-5">
                              <label>
                                Latest V/S-Temperature <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.LatestVSTemperature}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Blood Pressure <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.LatestVSBloodPressure}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Respiration Rate <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.LatestVSRespirationRate}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S Pulse Rate <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.LatestVSPulseRate}
                                type="text"
                              />
                            </div>

                            <div className="input-container-5">
                              <label>
                                Latest V/S-Oxygen Saturation <span>*</span>
                              </label>
                              <input
                                disabled
                                value={i.LatestVSOxygenSaturation}
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
                                value={i.GlasgowComaScale}
                                type="text"
                              />
                            </div>

                            <div className="input-container-3">
                              <label>Endorsement/Initial Care</label>
                              <input
                                disabled
                                value={i.Endorsement}
                                type="text"
                              />
                            </div>

                            <div className="input-container-3">
                              <label>Resident on Duty/Contact #</label>
                              <input
                                disabled
                                value={i.UserContactNo}
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="inline-block-2">
                            <div className="input-container-2">
                              <label>Chief Complaints</label>
                              <textarea
                                disabled
                                value={i.ChiefComplaints}
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
                                value={i.Diagnosis}
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
                                  {i.ReasonforReferral}
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
                    height: "800px  ",
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

                          <Text
                            style={{
                              display: "flex",
                              marginBottom: 4,
                            }}
                          >
                            <BiStats
                              style={{ marginRight: "5px", marginTop: 2 }}
                            />
                            <Text textTransform="uppercase">
                              Patient status
                            </Text>
                          </Text>
                          {d.dischDate === null ? (
                            <Box p={3} bg="gray.50" borderRadius="5px" mb={6}>
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                color="blue.500"
                              >
                                Patient Admitted
                              </Text>
                            </Box>
                          ) : (
                            <Box p={3} bg="gray.50" borderRadius="5px" mb={6}>
                              <Text
                                fontSize="13px"
                                fontWeight="600"
                                color="red.500"
                              >
                                Patient Discharged
                              </Text>
                            </Box>
                          )}

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
                    </>
                  )}
                </GridItem>
              </>
            );
          })}
      </Grid>
      {/* // <Button onClick={find}>Find</Button> */}
    </div>
  );
}

export default SearchPatient;
