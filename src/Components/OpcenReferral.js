import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Textarea,
  Select,
  useToast,
  Checkbox,
  Flex,
  Spacer,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Badge,
} from "@chakra-ui/react";
import api from "../API/Api";
import moment from "moment";
import Loading from "./Spinner";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";

function OpcenReferral(props) {
  const [isLoading, setIsLoading] = useState(false);
  const newDate = moment().format("LLL");
  const [timeStamp, setTimeStamp] = useState(newDate);
  const [opcenUser, setOpcenUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [extendedName, setExtendedName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");

  const [civilStatus, setCivilStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [philhealth, setPhilhealth] = useState("");
  const [address, setAddress] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [contact, setContact] = useState("");
  const [userContact, setUserContact] = useState("");
  const [dateAdmitted, setDateAdmitted] = useState("");
  const [referralType, setReferralType] = useState("");
  const [disposition, setDisposition] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respiRate, setRespiRate] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [glasgow, setGlasgow] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [endorsement, setEndorsement] = useState("");
  const [reason, setReason] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [lastEdit, setLastEdit] = useState("");
  const [lastEditTime, setLastEditTime] = useState("");

  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  const [bowList, setBowList] = useState([]);
  const [getGp, setGetGP] = useState(["", "", ""]);
  const [ie, setIe] = useState([
    {
      cm: "",
      station: "",
      effacement: "",
      presentation: "",
    },
  ]);
  const [hpi, setHPI] = useState("");
  const [ppf, setPPF] = useState("");
  const [ivf, setIVF] = useState("");
  const [meds, setMeds] = useState("");
  const [lab, setLab] = useState("");

  const [load, setLoad] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [editable, setEditable] = useState("");
  const [requestEdit, setRequestEdit] = useState("");
  const [requestTime, setRequestTime] = useState("");

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const refData = async () => {
    setIsLoading(true);
    let response = await api.get("/get_pending_ref.php", {
      params: { id: props.patientId },
    });
    if (response) {
      setAge(response.data.age);
      setIsLoading(false);
      setUserName(response.data.username);
      setReferringFacility(response.data.refFacility);
      setLastName(response.data.lastname);
      setFirstName(response.data.firstname);
      setMiddleName(response.data.middleName);
      setExtendedName(response.data.extended);
      setSex(response.data.sex);
      setBirthdate(response.data.birthdate);
      setCivilStatus(response.data.civilStatus);
      setNationality(response.data.nationality);
      setReligion(response.data.religion);
      setOccupation(response.data.occupation);
      setPhilhealth(response.data.philhealth);
      setAddress(response.data.address);
      setNextOfKin(response.data.nextOfkin);
      setContact(response.data.contactWatcher);
      setDateAdmitted(response.data.dateAdmitted);
      setReferralType(response.data.refType);
      setDisposition(response.data.disposition);
      setSpecialization(response.data.specialization);
      setTemperature(response.data.latestTemp);
      setBloodPressure(response.data.latestBp);
      setRespiRate(response.data.latestRespi);
      setPulseRate(response.data.latestPulse);
      setOxygen(response.data.latestOxygen);
      setGlasgow(response.data.latestGlasgow);
      setChiefComplaints(response.data.chiefComplaints);
      setDiagnosis(response.data.diagnosis);
      setEndorsement(response.data.endorsement);
      setUserContact(response.data.userContact);
      setReason(response.data.reason);
      setGetGP(response.data.GP);
      setLmp(response.data.LMP);
      setAog(response.data.AOG);
      setEdc(response.data.EDC);
      setFht(response.data.FHT);
      setFh(response.data.FH);
      setApgar(response.data.APGAR);
      setIe(response.data.IE);
      setBowList(response.data.bow);
      setHPI(response.data.HPI);
      setPPF(response.data.PPF);
      setIVF(response.data.IVF);
      setMeds(response.data.MEDS);
      setLab(response.data.LAB);
      setTimeStamp(response.data.timestamp);
      setLastEdit(response.data.last_edit);
      setLastEditTime(response.data.last_edit_time);
      setEditable(response.data.editable);
      setRequestEdit(response.data.requestEdit);
      setRequestTime(response.data.requestTime);
    }
  };

  // REQUEST EDIT
  const request = async (e) => {
    // e.preventDefault();

    // alert("Request Edit");

    let resp = await api.post("/request_edit.php", { patId: props.patientId });

    console.log(resp.data);
    if (resp.data.status === 1) {
      Swal.fire({
        title: "Success!",
        text: "Request submitted.",
        type: "success",
        icon: "success",
      });
    }
  };

  const updateData = async () => {
    Swal.fire({
      title: "Are you sure to save?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update record!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true);
        let response = await api.post("/update_temp_referral.php", {
          patientId: props.patientId,
          username: opcenUser,
          referringFacility: referringFacility,
          lastname: lastname,
          firstname: firstname,
          middlename: middlename,
          extendedName: extendedName,
          sex: sex,
          birthdate: birthdate,
          age: getAge(birthdate),
          civilStatus: civilStatus,
          nationality: nationality,
          height: height,
          weight: weight,
          religion: religion,
          occupation: occupation,
          philhealth: philhealth,
          address: address,
          nextOfKin: nextOfKin,
          contact: contact,
          dateAdmitted: dateAdmitted,
          referralType: referralType,
          disposition: disposition,
          specialization: specialization,
          temperature: temperature,
          bloodPressure: bloodPressure,
          respiRate: respiRate,
          pulseRate: pulseRate,
          oxygen: oxygen,
          glasgow: glasgow,
          chiefComplaints: chiefComplaints,
          diagnosis: diagnosis,
          endorsement: endorsement,
          userContact: userContact,
          reason: reason,
          lmp: lmp,
          aog: aog,
          edc: edc,
          fht: fht,
          fh: fh,
          apgar: apgar,
          hpi: hpi,
          ppf: ppf,
          ivf: ivf,
          meds: meds,
          lab: lab,
        });
        if (response) {
          setLoad(false);
        }
        if (response.data.status === 1) {
          Swal.fire({
            title: "Success!",
            text: "Patient's record updated.",
            type: "success",
            icon: "success",
          }).then(() => {
            window.location.reload(false);
          });
        } else {
          Swal.fire("Error!", "Something went wrong. Try again!", "error");
        }
      }
    });
  };
  useEffect(() => {
    refData();
    const user = JSON.parse(localStorage.getItem("user"));
    setOpcenUserName(user.firstName + "  " + user.lastName);
  }, [props.patientId, requestEdit, editable]);

  return (
    <div>
      {isLoading ? (
        <Center mt={20}>
          <Loading />
        </Center>
      ) : (
        <>
          {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}
          <Box borderRadius="lg" p={5} bgColor="white" boxShadow="sm">
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              PATIENT INFORMATION
            </Text>
            <HStack mt={8}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Last Name</FormLabel>

                <Input
                  type="text"
                  variant="filled"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>First Name</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={middlename}
                  onChange={(e) => setMiddleName(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormControl w={80}>
                <FormLabel fontSize={14}>Suffix</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={extendedName}
                  onChange={(e) =>
                    setExtendedName(e.target.value.toUpperCase())
                  }
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Birthday</FormLabel>

                <Input
                  type="date"
                  variant="filled"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </FormControl>{" "}
              <FormControl isRequired width={60}>
                <FormLabel fontSize={14}>Age</FormLabel>

                <Input
                  type="text"
                  variant="filled"
                  value={age}
                  // onChange={(e) => setBirthdate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Sex</FormLabel>
                <Select
                  value={sex}
                  variant="filled"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Civil Status</FormLabel>
                <Select
                  variant="filled"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Separated">Separated</option>
                  <option value="Widow(er)">Widow(er)</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Nationality</FormLabel>
                <Input
                  variant="filled"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>
                  Height{" "}
                  <span
                    style={{ color: "red", fontStyle: "italic", fontSize: 11 }}
                  >
                    (in cm)
                  </span>
                </FormLabel>
                <Input
                  type="number"
                  variant="filled"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>
                  Weight{" "}
                  <span
                    style={{ color: "red", fontStyle: "italic", fontSize: 11 }}
                  >
                    (in kg)
                  </span>
                </FormLabel>
                <Input
                  type="number"
                  variant="filled"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Religion</FormLabel>
                <Select
                  variant="filled"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="Roman Catholic">Roman Catholic</option>
                  <option value="Islam">Islam</option>
                  <option value="Protestant">Protestant</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Occupation</FormLabel>
                <Input
                  variant="filled"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>PhilHealth</FormLabel>
                <Input
                  variant="filled"
                  value={philhealth}
                  onChange={(e) => setPhilhealth(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Address</FormLabel>
              <Textarea
                variant="filled"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box borderRadius="lg" p={5} mt={5} bgColor="white" boxShadow="sm">
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              SIGNIFICANT WATCHERS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Next of Kin</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={nextOfKin}
                  onChange={(e) => setNextOfKin(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Landline/Mobile/Email</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </FormControl>
            </HStack>
          </Box>

          <Box borderRadius="lg" p={5} mt={5} bgColor="white" boxShadow="sm">
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              ADMITTING DETAILS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Date Admitted</FormLabel>
                <Input
                  type="date"
                  variant="filled"
                  value={dateAdmitted}
                  onChange={(e) => setDateAdmitted(e.target.value)}
                />
              </FormControl>
              <FormControl w={500}>
                <FormLabel fontSize={14}>Referral Type</FormLabel>
                <Select
                  variant="filled"
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                >
                  <option value="COVID">COVID</option>
                  <option value="NON-COVID">NON-COVID</option>
                  <option value="COVID-SUSPECT">COVID-SUSPECT</option>
                </Select>
              </FormControl>
              {referralType === "COVID" ? (
                <FormControl w={500}>
                  <FormLabel fontSize={14}>Disposition</FormLabel>
                  <Select
                    variant="filled"
                    value={disposition}
                    onChange={(e) => setDisposition(e.target.value)}
                  >
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="Severe">Severe</option>
                    <option value="Critical">Critical</option>
                  </Select>
                </FormControl>
              ) : (
                ""
              )}

              <FormControl>
                <FormLabel fontSize={14}>Specialization</FormLabel>
                <Input
                  variant="filled"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  isReadOnly
                />
              </FormControl>
            </HStack>
            {specialization === "Obstetrics And Gynecology" ? (
              <>
                <Box mt={10}>
                  <Text fontSize="xl" textAlign="center" fontWeight={800}>
                    OB CASE
                  </Text>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Gravidity and Parity</FormLabel>
                      <HStack>
                        {getGp === "" || getGp === null ? (
                          ""
                        ) : (
                          <>
                            {JSON.parse(getGp).map((e, k) => {
                              return (
                                <>
                                  <Text>G</Text>
                                  <Input
                                    type="text"
                                    borderBottom="1px"
                                    w={50}
                                    h={8}
                                    textAlign="center"
                                    value={e.G}
                                    isDisabled
                                  />
                                  <Text>P</Text>
                                  <Input
                                    type="text"
                                    borderBottom="1px"
                                    w={50}
                                    h={8}
                                    textAlign="center"
                                    value={e.P}
                                    isDisabled
                                  />
                                  <Text>(</Text>
                                  <Input
                                    type="text"
                                    borderBottom="1px"
                                    w={100}
                                    h={8}
                                    textAlign="center"
                                    value={e.GAP}
                                    isDisabled
                                  />
                                  <Text>)</Text>
                                </>
                              );
                            })}
                          </>
                        )}
                      </HStack>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Last Menstrual Period</FormLabel>
                      <Input
                        type="text"
                        value={lmp}
                        onChange={(e) => {
                          setLmp(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>AOG</FormLabel>
                      <Input
                        type="text"
                        value={aog}
                        onChange={(e) => {
                          setAog(e.target.value);
                        }}
                      />
                    </FormControl>
                  </HStack>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>EDC</FormLabel>
                      <Input
                        type="text"
                        value={edc}
                        onChange={(e) => setEdc(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fetal Heart Tones</FormLabel>
                      <Input
                        type="text"
                        value={fht}
                        onChange={(e) => setFht(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fundal Height</FormLabel>
                      <Input
                        type="text"
                        value={fh}
                        onChange={(e) => setFh(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Baby APGAR</FormLabel>
                      <Input
                        type="text"
                        value={apgar}
                        onChange={(e) => setApgar(e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Internal Examination</FormLabel>
                      <HStack>
                        {JSON.parse(ie).map((i, k) => {
                          return (
                            <>
                              <Input
                                type="text"
                                borderBottom="1px"
                                w={80}
                                h={8}
                                value={i.cm}
                                textAlign="center"
                                isDisabled
                              />
                              <Text fontSize={14}>cm</Text>
                              <Input
                                type="text"
                                borderBottom="1px"
                                w={80}
                                h={8}
                                value={i.station}
                                textAlign="center"
                                isDisabled
                              />
                              <Text fontSize={14}>station</Text>
                              <Input
                                type="text"
                                borderBottom="1px"
                                h={8}
                                value={i.effacement}
                                textAlign="center"
                                isDisabled
                              />
                              <Text fontSize={14}>effacement</Text>
                              <Input
                                type="text"
                                borderBottom="1px"
                                h={8}
                                value={i.presentation}
                                textAlign="center"
                                isDisabled
                              />
                              <Text fontSize={14}>presentation</Text>
                            </>
                          );
                        })}
                      </HStack>
                    </FormControl>
                  </HStack>
                  <FormControl mt={5}>
                    <FormLabel fontSize={14}>Bow</FormLabel>
                    {JSON.parse(bowList).map((i, k) => {
                      return (
                        <Checkbox size="sm" ml={5} isChecked={true}>
                          {i}
                        </Checkbox>
                      );
                    })}
                  </FormControl>
                </Box>
              </>
            ) : (
              ""
            )}
            <HStack mt={10}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Temperature</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Blood Pressure</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Respiration Rate</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={respiRate}
                  onChange={(e) => setRespiRate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Pulse <br></br>Rate
                </FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={pulseRate}
                  onChange={(e) => setPulseRate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Oxygen Saturation
                </FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={oxygen}
                  onChange={(e) => setOxygen(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Glasgow Coma Scale</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={glasgow}
                  onChange={(e) => setGlasgow(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={14}>Resident on Duty/Contact #</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Endorsement/Initial Care</FormLabel>
              <Textarea
                type="text"
                variant="filled"
                value={endorsement}
                onChange={(e) => setEndorsement(e.target.value)}
              />
            </FormControl>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Chief Complaints</FormLabel>
                <Textarea
                  variant="filled"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Diagnosis</FormLabel>
                <Textarea
                  variant="filled"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5} isRequired>
              <FormLabel fontSize={14}> Reason for Referral</FormLabel>
              <Select
                variant="filled"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
              >
                {/* <option value={reason}>{reason}</option> */}
                <option value="Medical Center of Choice">
                  Medical Center of Choice
                </option>
                <option value="Upgrade of Health Care">
                  Upgrade of Health Care
                </option>
                <option value="Financial/Cost of Care">
                  Financial/Cost of Care
                </option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>History Present Illness</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  value={hpi}
                  onChange={(e) => setHPI(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Pertinent PE Findings</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  value={ppf}
                  onChange={(e) => setPPF(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>IVF</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  value={ivf}
                  onChange={(e) => setIVF(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Medications</FormLabel>
                <Textarea
                  type="text"
                  variant="filled"
                  value={meds}
                  onChange={(e) => setMeds(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Laboratory</FormLabel>
              <Textarea
                type="text"
                variant="filled"
                value={lab}
                onChange={(e) => setLab(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize={14}> Data inputted by:</FormLabel>
              <Input
                type="text"
                variant="filled"
                value={userName + " (" + moment(timeStamp).format("LLL") + ")"}
              />
            </FormControl>
          </Box>

          {!userName ? (
            ""
          ) : (
            <>
              <HStack mt={5} mb={5}>
                <Checkbox isChecked={true}></Checkbox>
                <p style={{ fontSize: "14px", marginTop: "3px" }}>
                  The patient understands and accepts the terms and conditions
                  of the
                </p>
                <Link fontSize="14px" color="blue" mt={3} onClick={onOpen}>
                  Patient Agreement Form
                </Link>
              </HStack>
              {lastEdit !== null ? (
                <Text
                  textAlign="left"
                  fontSize={13}
                  fontStyle="italic"
                  color="red.800"
                  fontWeight={500}
                >
                  + Last edited by {lastEdit} &nbsp;
                  {moment(lastEditTime).startOf().fromNow()}
                </Text>
              ) : (
                ""
              )}

              <Flex>
                <Spacer />
                {editable === 0 && requestEdit === 0 ? (
                  <Button
                    isLoading={load}
                    loadingText="Requesting"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    mt={5}
                    onClick={request}
                    w={150}
                    rightIcon={<BiEdit />}
                  >
                    Request Edit
                  </Button>
                ) : editable === 0 && requestEdit === 1 ? (
                  <Badge colorScheme="blue" fontSize="md">
                    Requested to edit: {moment(requestTime).format("LLL")}
                  </Badge>
                ) : (
                  <Button
                    isLoading={load}
                    loadingText="Saving"
                    spinnerPlacement="start"
                    colorScheme="teal"
                    variant="outline"
                    mt={5}
                    onClick={updateData}
                    w={150}
                  >
                    Save
                  </Button>
                )}
              </Flex>
            </>
          )}
        </>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mt={5}>
            <p style={{ fontWeight: "500", fontSize: "15px" }}>
              One Hospital Command
            </p>
            Patient Agreement Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="justify">
            <Box
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              backgroundColor="gray.100"
              // padding={5}
              // mt={5}
              p={4}
            >
              <p>
                Dear Patient, <br />
                <br />
                We are committed to protecting the privacy of your personal and
                medical information. In order to provide you with the best
                possible care to conduct research that may improve the care of
                future patients, we need to collect and use certain information
                about you. This consent form explains how we will collect, use,
                and disclose your personal and medical information. Please read
                this form carefully and ask any questions you may have before
                signing it. By signing this form, you are giving your consent
                for us to collect, use and disclose your personal and medical
                find information as described below:
                <br />
                <br />
                <strong>1. Confidentiality: </strong>We will keep all of your
                personal and medical information confidential. We will only use
                or disclose your information as permitted by law or as described
                in this consent form.
                <br />
                <strong>2. Laboratory and other imaging results: </strong>All
                laboratory and imaging results obtained in connection with your
                care will also be kept confidential and will only be used for
                the purposes outlined in this consent form.
                <br />
                <strong>3. Research: </strong>We may use your personal and
                medical information for research purposes, including the use of
                monitoring and evaluation tools to generate data. Participation
                in research is voluntary, and you may choose not to participate
                or discontinue your participation at any time.
                <br />
                <strong>4. Referral: </strong>Your personal and medical
                information may be used for referral/endorsement. <br />
                <br />
                <p>
                  By signing this form, you are giving your consent for the
                  collection, use, and disclosure of your personal and medical
                  information for the purposes outlined above. You may withdraw
                  your consent at any time by providing written notice to our
                  office. However, please be aware that withdrawing your consent
                  may affect our ability to refer in our institution. We will
                  not disclose your personal and medical information to any
                  third party without your consent, unless the disclosure is
                  permitted or required by law. We have the right to change this
                  form from time to time, and we will provide you with the
                  updated version of this form. If you have any questions or
                  concerns about this consent form or the use and disclosure of
                  your personal and medical information, please do not hesitate
                  to contact us. We appreciate your trust and confidence in us,
                  and we will do our best to protect your privacy.
                </p>
                <br />
                Sincerely, <br />
                <strong>Zamboanga City Medical Center-Operation Center</strong>
                <br />
                <br />
                <i>
                  I have read and understood the above consent form and I agree
                  to the collection, use, and disclosure of my personal and
                  medical information as described above.{" "}
                </i>
              </p>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default OpcenReferral;
