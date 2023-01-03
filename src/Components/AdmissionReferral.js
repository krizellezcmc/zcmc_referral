import React, { useState, useEffect } from "react";
import {
  Text,
  Container,
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
  Center,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import api from "../API/Api";
import moment from "moment";
import Loading from "./Spinner";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function AdmissionReferral(props) {
  let navigate = useNavigate();
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
  const [arrivalDate, setArrivalDate] = useState("");
  const [lastEditTime, setLastEditTime] = useState("");

  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  const [bowList, setBowList] = useState([]);
  const [gp, setGp] = useState(["", "", ""]);
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
  // const [newIe, setNewIe] = useState("");
  // const [newBowList, setNewBowList] = useState("");
  // const [newGp, setNewGp] = useState("");
  const toast = useToast();
  const [load, setLoad] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

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
      setIsLoading(false);
      setUserName(response.data.username);
      setArrivalDate(response.data.arrival_time);
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
      setTimeStamp(response.data.tstamp);
      setLastEdit(response.data.last_edit);
      setLastEditTime(response.data.last_edit_time);
    }
  };

  useEffect(() => {
    refData();
    const user = JSON.parse(localStorage.getItem("user"));
    setOpcenUserName(user.firstName + "  " + user.lastName);
  }, [props.patientId]);

  return (
    <div>
      {isLoading ? (
        <Center mt={20}>
          <Loading />
        </Center>
      ) : (
        <Container p={5} maxW="1300px">
          <Box display="flex" alignItems="center" mb={10}>
            <Button
              onClick={() => {
                navigate("/admission");
              }}
              leftIcon={<BiArrowBack />}
              bg="white"
              _hover={{ background: "none", textDecoration: "none" }}
              fontSize={17}
            >
              <Text fontWeight={500}> Back to Home</Text>
            </Button>
            <Spacer />

            <Badge fontSize={16} colorScheme="blue">
              For viewing only
            </Badge>
          </Box>
          {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}
          <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={6}>
            <HStack mt={4}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Referred From</FormLabel>

                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={referringFacility}
                />
              </FormControl>
              <FormControl isRequired width={620}>
                <FormLabel fontSize={14}>Referral Date</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={moment(timeStamp).format("LLL")}
                />
              </FormControl>
              <FormControl isRequired width={620}>
                <FormLabel fontSize={14}>Arrival Date</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={moment(arrivalDate).format("LLL")}
                />
              </FormControl>
            </HStack>
            <Text
              fontSize="xl"
              textAlign="center"
              fontWeight={800}
              mt={10}
              mb={5}
            >
              PATIENT INFORMATION
            </Text>
            <HStack mt={8}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Last Name</FormLabel>

                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={lastname}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>First Name</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={firstname}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={middlename}
                />
              </FormControl>
              <FormControl w={80}>
                <FormLabel fontSize={14}>Suffix</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={extendedName}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Birthday</FormLabel>
                <HStack>
                  <Input
                    isReadOnly
                    variant="filled"
                    value={moment(birthdate).format("ll")}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Sex</FormLabel>
                <Input isReadOnly value={sex} variant="filled" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Civil Status</FormLabel>
                <Input isReadOnly variant="filled" value={civilStatus} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Nationality</FormLabel>
                <Input isReadOnly variant="filled" value={nationality} />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Religion</FormLabel>
                <Input
                  isReadOnly
                  variant="filled"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Occupation</FormLabel>
                <Input
                  isReadOnly
                  variant="filled"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>PhilHealth</FormLabel>
                <Input
                  isReadOnly
                  variant="filled"
                  value={philhealth}
                  onChange={(e) => setPhilhealth(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Address</FormLabel>
              <Textarea
                isReadOnly
                variant="filled"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p={5}
            mt={5}
          >
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              SIGNIFICANT WATCHERS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Next of Kin</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={nextOfKin}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Landline/Mobile/Email</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={contact}
                />
              </FormControl>
            </HStack>
          </Box>
          <Box
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p={5}
            mt={5}
          >
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              ADMITTING DETAILS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Date Admitted</FormLabel>
                <Input
                  isReadOnly
                  variant="filled"
                  value={moment(dateAdmitted).format("ll")}
                />
              </FormControl>
              <FormControl w={500}>
                <FormLabel fontSize={14}>Referral Type</FormLabel>
                <Input isReadOnly variant="filled" value={referralType} />
              </FormControl>
              <FormControl w={500}>
                <FormLabel fontSize={14}>Disposition</FormLabel>
                <Input isReadOnly variant="filled" value={disposition} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Specialization</FormLabel>
                <Input
                  isReadOnly
                  variant="filled"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
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
                                    isReadOnly
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
                                    isReadOnly
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
                                    isReadOnly
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
                        isReadOnly
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
                        isReadOnly
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
                        isReadOnly
                        type="text"
                        value={edc}
                        onChange={(e) => setEdc(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fetal Heart Tones</FormLabel>
                      <Input
                        isReadOnly
                        type="text"
                        value={fht}
                        onChange={(e) => setFht(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fundal Height</FormLabel>
                      <Input
                        isReadOnly
                        type="text"
                        value={fh}
                        onChange={(e) => setFh(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Baby APGAR</FormLabel>
                      <Input
                        isReadOnly
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
                                isReadOnly
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
                                isReadOnly
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
                                isReadOnly
                                type="text"
                                borderBottom="1px"
                                h={8}
                                value={i.effacement}
                                textAlign="center"
                                isDisabled
                              />
                              <Text fontSize={14}>effacement</Text>
                              <Input
                                isReadOnly
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
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Blood Pressure</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Respiration Rate</FormLabel>
                <Input
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={respiRate}
                  onChange={(e) => setRespiRate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Pulse Rate</FormLabel>
                <Input
                  isReadOnly
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
                  isReadOnly
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
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={glasgow}
                  onChange={(e) => setGlasgow(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={14}>Resident on Duty/Contact #</FormLabel>
                <Input
                  isReadOnly
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
                isReadOnly
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
                  isReadOnly
                  variant="filled"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Diagnosis</FormLabel>
                <Textarea
                  isReadOnly
                  variant="filled"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5} isRequired>
              <FormLabel fontSize={14}> Reason for Referral</FormLabel>
              <Input
                isReadOnly
                variant="filled"
                onChange={(e) => setReason(e.target.value)}
                value={reason}
              />
            </FormControl>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>History Present Illness</FormLabel>
                <Textarea
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={hpi}
                  onChange={(e) => setHPI(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Pertinent PE Findings</FormLabel>
                <Textarea
                  isReadOnly
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
                  isReadOnly
                  type="text"
                  variant="filled"
                  value={ivf}
                  onChange={(e) => setIVF(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Medications</FormLabel>
                <Textarea
                  isReadOnly
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
                isReadOnly
                type="text"
                variant="filled"
                value={lab}
                onChange={(e) => setLab(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize={14}> Data inputted by:</FormLabel>
              <Input
                isReadOnly
                type="text"
                variant="filled"
                value={userName + " (" + moment(timeStamp).format("LLL") + ")"}
              />
            </FormControl>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default AdmissionReferral;
