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
} from "@chakra-ui/react";
import "../Styles/ReferralForm.css";
import moment from "moment";
import uniqid from "uniqid";
import api from "../API/Api";

const ReferralForm = () => {
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
  // const [newAge, setNewAge] = useState(getAge(age));

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

  const url = "/temp_referral.php";

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
    } else {
      let response = await api.post(url, {
        timeStamp: timeStamp,
        patientId: patientId,
        username: username,
        referringFacility: referringFacility,
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        extendedName: extendedName,
        sex: sex,
        birthdate: !birthdate ? "no bday" : birthdate,
        age: !birthdate ? age : getAge(birthdate),
        civilStatus: civilStatus,
        nationality: nationality,
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
        newIe: JSON.stringify(ie),
        newBowList: JSON.stringify(bowList),
      });

      if (response.data.status === 1) {
        setLastName("");
        setFirstName("");
        setMiddleName("");
        setExtendedName("");
        setSex("");
        setBirthdate("");
        setAge("");
        setCivilStatus("");
        setNationality("");
        setReligion("");
        setOccupation("");
        setPhilhealth("");
        setAddress("");
        setNextOfKin("");
        setContact("");
        setDateAdmitted("");
        setReferralType("");
        setDisposition("");
        setSpecialization("");
        setTemperature("");
        setBloodPressure("");
        setRespiRate("");
        setPulseRate("");
        setOxygen("");
        setGlasgow("");
        setChiefComplaints("");
        setDiagnosis("");
        setEndorsement("");
        setUserContact("");
        setReason("");
        setSpecialization("");
        setGp("");
        setAog("");
        setEdc("");
        setFht("");
        setFh("");
        setIe("");
        setBowList("");
        toast({
          position: "top",
          title: "Record successfully.",
          description: "Patient succesfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name.toUpperCase());
    console.log(choose);
  }, [choose]);

  return (
    <>
      <Container p={5} maxW="1200px">
        <form onSubmit={postData}>
          {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}

          <Box
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p={5}
            bgColor="white"
          >
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
                <FormLabel fontSize={14}>Birthdate</FormLabel>
                <Select
                  // value={choose}
                  variant="filled"
                  onChange={(e) => setChoose(e.target.value)}
                >
                  <option value="" selected disabled>
                    Please Select
                  </option>
                  <option value="1">With birthdate</option>
                  <option value="0">No birthdate</option>
                </Select>
              </FormControl>
              {choose == 1 ? (
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
                  value={sex}
                  variant="filled"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="" selected disabled>
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
                  <option value="" selected disabled>
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
                  type="text"
                  variant="filled"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Religion</FormLabel>
                <Select
                  variant="filled"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="" selected disabled>
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
            bgColor="white"
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
            bgColor="white"
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
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                >
                  <option value="" selected disabled>
                    Please Select
                  </option>
                  <option value="COVID">COVID</option>
                  <option value="NON-COVID">NON-COVID</option>
                  <option value="COVID-SUSPECT">COVID-SUSPECT</option>
                </Select>
              </FormControl>
              {referralType === "COVID" ? (
                <FormControl w={500} isRequired>
                  <FormLabel fontSize={14}>Disposition</FormLabel>
                  <Select
                    variant="filled"
                    value={disposition}
                    onChange={(e) => setDisposition(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please Select
                    </option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="Severe">Severe</option>
                    <option value="Critical">Critical</option>
                  </Select>
                </FormControl>
              ) : (
                ""
              )}

              <FormControl isRequired>
                <FormLabel fontSize={14}>Specialization</FormLabel>
                <Select
                  variant="filled"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="" disabled selected>
                    Please Select
                  </option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Obstetrics And Gynecology">
                    Obstetrics And Gynecology
                  </option>
                  <option value="Psychiatry">Psychiatry</option>
                </Select>
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
                <FormLabel fontSize={14}>
                  Latest V/S- <br></br>Temperature
                </FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Blood <br></br> Pressure
                </FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Respiration <br />
                  Rate
                </FormLabel>
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
                  Latest V/S-Oxygen <br />
                  Saturation
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
                <option value="" disabled selected>
                  Please Select
                </option>
                <option value="Financially Constrained">
                  Financially Constrained
                </option>
                <option value="No specialist/procedure available">
                  No specialist/procedure available
                </option>
                <option value="Further evaluation and management">
                  Further evaluation and management
                </option>
                <option value="For Tertiary Care">For Tertiary Care</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={5}>
              <FormLabel fontSize={14}>Please indicate your FULLNAME</FormLabel>
              <Input
                type="text"
                variant="filled"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
              variant="outline"
              mt={5}
              w={150}
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
    </>
  );
};

export default ReferralForm;
