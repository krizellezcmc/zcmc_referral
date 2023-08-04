import React, { useEffect, useState } from "react";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import "../Styles/ReferralForm.css";
import moment from "moment";
import uniqid from "uniqid";
import {
  sexList,
  religionList,
  civilStatusList,
  refTypeList,
  dispositionList,
  specializationList,
  reasonList,
  bday,
} from "../Data/Options";
import api from "../API/Api";

import { Select } from "chakra-react-select";
import { BiSend } from "react-icons/bi";
import Swal from "sweetalert2";

const AddReferral = () => {
  const newDate = moment().format("LLL");
  const [timeStamp, setTimeStamp] = useState(newDate);
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [extendedName, setExtendedName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [hospitals, setHospitals] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

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
  const [bowList, setBowList] = useState([]);
  const [choose, setChoose] = useState("");

  const [hpi, setHPI] = useState("");
  const [ppf, setPPF] = useState("");
  const [ivf, setIVF] = useState("");
  const [meds, setMeds] = useState("");
  const [lab, setLab] = useState("");

  // FOR OB CASES
  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  const [gp, setGp] = useState([
    {
      G: "",
      P: "",
      GAP: "",
    },
  ]);
  // const [newIe, setNewIe] = useState("");
  // const [newBowList, setNewBowList] = useState("");
  // const [newGp, setNewGp] = useState("");
  const [ie, setIe] = useState([
    {
      cm: "",
      station: "",
      effacement: "",
      presentation: "",
    },
  ]);

  const bow = [
    { value: "Intact" },
    { value: "Ruptured" },
    { value: "Leaking" },
  ];

  const toast = useToast();

  const handleGap = (e) => {
    const { name, value } = e.target;
    let temp = [...gp];
    temp[0][name] = value;
    setGp(temp);
  };

  const handleSelect = (e, value) => {
    if (e.target.checked) {
      setBowList([...bowList, value]);
    } else {
      setBowList(bowList.filter((val) => val !== value));
    }
  };

  const handleIE = (e) => {
    const { name, value } = e.target;
    let temp = [...ie];
    temp[0][name] = value;
    setIe(temp);
  };

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

  const url = "/opcen_add_referral.php";

  const postData = async (e) => {
    e.preventDefault();

    const patientId = uniqid(lastname.toLowerCase() + "_");

    if (
      !lastname ||
      !firstname ||
      !dateAdmitted ||
      !referralType ||
      // !disposition ||
      !specialization ||
      !temperature ||
      !bloodPressure ||
      !respiRate ||
      !pulseRate ||
      !oxygen ||
      !glasgow ||
      !reason
    ) {
      toast({
        position: "top",
        title: "Input all fields.",
        description: "Kindly input all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else if (!referringFacility) {
      toast({
        position: "top",
        title: "No hospital selected.",
        description: "Kindly select referring facility.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      Swal.fire({
        title: "Are you sure to save?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save record!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await api.post(url, {
            timeStamp: timeStamp,
            patientId: patientId,
            username: username,
            referringFacility: referringFacility.toUpperCase(),
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            extendedName: extendedName,
            sex: sex,
            birthdate: !birthdate ? "no bday" : birthdate,
            age: !birthdate ? age : getAge(birthdate),
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
            newGp: JSON.stringify(gp),
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
            newIe: JSON.stringify(ie),
            newBowList: JSON.stringify(bowList),
          });
          if (response.data.status === 1) {
            Swal.fire({
              title: "Success",
              text: "New referral added!",
              icon: "success",
            }).then(() => {
              window.close();
            });
          } else {
            Swal.fire("Error!", "Something went wrong. Try again!", "error");
          }
        }
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const fetchHospitals = async () => {
    let hospiData = await api.get("/get_hospitals_new.php");
    setHospitals(hospiData.data);
  };

  useEffect(() => {
    fetchHospitals();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserName(user.firstName + "  " + user.lastName);
  }, []);

  return (
    <>
      <Container p={5} maxW="1200px">
        <form onSubmit={postData}>
          {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}

          <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={5}>
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              PATIENT INFORMATION
            </Text>
            <FormControl isRequired mt={10}>
              <Grid gap={2} templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={3}>
                  <FormLabel fontSize={14}>Select Referring Facility</FormLabel>
                  <Select
                    variant="filled"
                    options={hospitals}
                    placeholder="Select hospital"
                    selectedOptionStyle="check"
                    closeMenuOnSelect={true}
                    onChange={(e) => {
                      setReferringFacility(e.value);
                    }}
                    required
                    useBasicStyles
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormLabel fontSize={14}>Select Referral Date</FormLabel>
                  <Input type="datetime-local" variant="filled" required />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormLabel fontSize={14}>User</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    variant="filled"
                    isReadOnly
                  />
                </GridItem>
              </Grid>
            </FormControl>
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
                <FormLabel fontSize={14}>Birthdate</FormLabel>

                <Select
                  variant="filled"
                  options={bday}
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  onChange={(e) => {
                    setChoose(e.value);
                  }}
                  required
                  useBasicStyles
                />
              </FormControl>
              {choose === 1 ? (
                <>
                  <FormControl isRequired>
                    <FormLabel fontSize={14}>Birthday</FormLabel>
                    <HStack>
                      <Input
                        type="date"
                        variant="filled"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                  <FormControl isRequired w={80}>
                    <FormLabel fontSize={14}>Age</FormLabel>
                    <HStack>
                      <Input
                        type="text"
                        variant="filled"
                        value={getAge(birthdate)}
                        // onChange={(e) => setAge(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                </>
              ) : (
                <FormControl isRequired w={80}>
                  <FormLabel fontSize={14}>Age</FormLabel>
                  <HStack>
                    <Input
                      type="text"
                      variant="filled"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </HStack>
                </FormControl>
              )}
              <FormControl isRequired>
                <FormLabel fontSize={14}>Sex</FormLabel>
                <Select
                  variant="filled"
                  options={sexList}
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  onChange={(e) => {
                    setSex(e.value);
                  }}
                  required
                  useBasicStyles
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Civil Status</FormLabel>
                <Select
                  variant="filled"
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  required
                  useBasicStyles
                  options={civilStatusList}
                  onChange={(e) => setCivilStatus(e.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Nationality</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  onChange={(e) => setNationality(e.target.value)}
                  value={nationality}
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
                  options={religionList}
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  onChange={(e) => {
                    setReligion(e.value);
                  }}
                  required
                  useBasicStyles
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Occupation</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>PhilHealth</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={philhealth}
                  onChange={(e) => setPhilhealth(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Address</FormLabel>
              <Textarea
                type="text"
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
              <FormControl isRequired>
                <FormLabel fontSize={14}>Date Admitted</FormLabel>
                <Input
                  type="date"
                  variant="filled"
                  value={dateAdmitted}
                  onChange={(e) => setDateAdmitted(e.target.value)}
                />
              </FormControl>
              <FormControl w={600} isRequired>
                <FormLabel fontSize={14}>Referral Type</FormLabel>
                <Select
                  variant="filled"
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  required
                  useBasicStyles
                  options={refTypeList}
                  onChange={(e) => setReferralType(e.value)}
                />
              </FormControl>
              {referralType === "COVID" ? (
                <FormControl w={500} isRequired>
                  <FormLabel fontSize={14}>Disposition</FormLabel>
                  <Select
                    variant="filled"
                    placeholder="Select"
                    selectedOptionStyle="check"
                    closeMenuOnSelect={true}
                    required
                    useBasicStyles
                    options={dispositionList}
                    onChange={(e) => setDisposition(e.value)}
                  />
                </FormControl>
              ) : (
                ""
              )}

              <FormControl isRequired>
                <FormLabel fontSize={14}>Specialization</FormLabel>
                <Select
                  variant="filled"
                  placeholder="Select"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  required
                  options={specializationList}
                  onChange={(e) => setSpecialization(e.value)}
                  useBasicStyles
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
                        <Text>G</Text>
                        <Input
                          type="text"
                          name="G"
                          borderBottom="1px"
                          w={50}
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleGap(e)}
                        />
                        <Text>P</Text>
                        <Input
                          type="text"
                          name="P"
                          borderBottom="1px"
                          w={50}
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleGap(e)}
                        />
                        <Text>(</Text>
                        <Input
                          type="text"
                          name="GAP"
                          borderBottom="1px"
                          w={100}
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleGap(e)}
                        />
                        <Text>)</Text>
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
                        <Input
                          type="text"
                          name="cm"
                          borderBottom="1px"
                          w={80}
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleIE(e)}
                        />
                        <Text fontSize={14}>cm</Text>
                        <Input
                          type="text"
                          name="station"
                          borderBottom="1px"
                          w={80}
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleIE(e)}
                        />
                        <Text fontSize={14}>station</Text>
                        <Input
                          type="text"
                          name="effacement"
                          borderBottom="1px"
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleIE(e)}
                        />
                        <Text fontSize={14}>effacement</Text>
                        <Input
                          type="text"
                          name="presentation"
                          borderBottom="1px"
                          h={8}
                          textAlign="center"
                          onChange={(e) => handleIE(e)}
                        />
                        <Text fontSize={14}>presentation</Text>
                      </HStack>
                    </FormControl>
                  </HStack>
                  <FormControl mt={5}>
                    <FormLabel fontSize={14}>Bow</FormLabel>
                    {bow.map((i, k) => {
                      return (
                        <Checkbox
                          size="sm"
                          ml={5}
                          value={i.value}
                          onChange={(e) => {
                            handleSelect(e, i.value);
                          }}
                        >
                          {i.value}
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
                <FormLabel fontSize={14}>Latest V/S-Pulse Rate</FormLabel>
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
            <FormControl mt={5} isRequired>
              <FormLabel fontSize={14}> Reason for Referral</FormLabel>
              <Select
                variant="filled"
                placeholder="Select"
                selectedOptionStyle="check"
                closeMenuOnSelect={true}
                required
                useBasicStyles
                options={reasonList}
                onChange={(e) => setReason(e.value)}
              />
            </FormControl>
          </Box>

          <FormControl isRequired>
            <HStack mt={5} mb={5}>
              <Checkbox isRequired={true}></Checkbox>
              <p style={{ fontSize: "14px", marginTop: "3px" }}>
                The patient understands and accepts the terms and conditions of
                the
              </p>
              <Link fontSize="14px" color="blue" mt={3} onClick={onOpen}>
                Patient Agreement Form
              </Link>
            </HStack>
          </FormControl>
          <Flex>
            <Spacer />
            <Button
              // isLoading={load}
              // loadingText="Saving"
              // spinnerPlacement="start"
              type="submit"
              colorScheme="teal"
              variant="solid"
              mt={5}
              w={150}
              rightIcon={<BiSend />}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mt={5}>
            <p style={{ fontWeight: "500", fontSize: "14px" }}>
              One Hospital Command
            </p>
            Patient Consent Form <br />
            <small style={{ fontWeight: "400" }}>
              Use and Disclosure of Personal and Medical information
            </small>
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
    </>
  );
};

export default AddReferral;
