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
} from "../Data/Options";
import api from "../API/Api";

import { Select } from "chakra-react-select";
import { BiArrowBack, BiSend } from "react-icons/bi";
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
      !disposition ||
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
              padding={5}
              mt={5}
            >
              <p>
                <strong>Introduction and Purpose:</strong> The ZCMC Regional
                Telemedicine Center has been established to provide sound
                medical advice to other healthcare providers through various
                telecommunication systems available. This may involve live
                two-way audio and video, patient pictures, medical images,
                patient???s medical records and other things that may be pertinent
                to the process of telemedicine. It does not have direct physical
                contact with the parties involved and relies solely on the
                information being given by the referring hospital. Electronic
                systems will utilize network and software security protocols to
                protect patient identity, privacy and confidentiality and to
                safeguard data and prevent corruption of data against
                intentional or unintentional corruption. <br />
                <br />
                <strong>Nature of the teleconsultation:</strong> It was
                explained to me by my attending physician that an SMS, phone
                call, online chat or video conferencing technology will be used
                to conduct the telemedicine consultation. I understand that as
                in the face-to-face consultation, my medical history along with
                my laboratory test/s, imaging results and other documents
                pertinent to my concerns will be shared by my attending
                physician to the ZCMC telemedicine specialists. Moreover, I may
                be asked to show certain body parts as may be considered
                important to form a diagnosis. This is in view of the fact that
                the specialist we will be referring to will not be in the same
                hospital as I am and would not be able to perform the necessary
                physical examination on me. <br />
                <br />
                <strong>Benefits:</strong> Through the use of teleconsultation,
                my attending physicians will be able to concur with certain
                specialists who will in turn aid them in obtaining a medical
                evaluation and impression of my condition. I may receive
                guidance on monitoring my condition and the next steps to do
                should my condition change, specific prescription on what to
                take, instructions on what laboratory and imaging tests to do.{" "}
                <br />
                <br />
                <strong>Potential Risks:</strong> I understand there are
                potential risks in using this technology, including technical
                difficulties, interruptions, poor transmission of images leading
                to misdiagnosis and consequently mistreatment, no access to
                paper charts/medical records, delays and deficiencies due to
                malfunction of electronic equipment and software, unauthorized
                access leading to breach of data privacy and confidentiality.{" "}
                <br />
                <br />
                All consultations are considered confidential but given the
                nature of technology, I understand that despite using
                appropriate measures, the ZCMC Telemedicine Regional Center OPD
                and other related units cannot guarantee the safety of my
                personal data from data hacking. Therefore, I cannot hold them
                liable for any data that may be lost, corrupted, destroyed or
                intercepted or the illegal use of my data arising from a breach
                in security. <br />
                <br />
                <strong>Data Privacy and Confidentiality:</strong> I agree to
                share my personal data in order to facilitate scheduling of my
                consultation and to be utilized for research purposes. I agree
                not to record in video or audio format nor divulge the details
                of my consultation in compliance with the Data Privacy Act of
                2012. <br />
                <br />
                <strong>Rights:</strong> I have the right to: 1. Terminate the
                telemedicine teleconsultation at any time. 2. Be accompanied and
                assisted by a family member or caregiver during the
                teleconsultation. <br />
                <br />
                <strong>Limitations:</strong> The strength of network signal,
                the speed of the internet,audibility of the sound, the presence
                of background noise, clarity of the images, all affect the
                quality of the telemedicine consultation. Physical examination
                as done in the usual face-to-face consultation is not possible
                and is therefore a big limitation to the process of making a
                diagnosis. <br />
              </p>
            </Box>
            <Box
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              backgroundColor="gray.100"
              padding={5}
              mt={5}
            >
              <p>
                <strong>In case of an urgent concern:</strong> It is my doctor???s
                responsibility to refer me to the nearest Emergency Room or
                hospital of my choice in case he/she deems my concern to be
                urgent and would warrant immediate action and management. <br />
                <br />I acknowledge that prior to engaging in such consultation
                platform, I have been made fully aware of its purpose, scopes
                and limitations. <br />
                <br />I further acknowledge that consent was given to share my
                medical history, records and laboratory results for the purpose
                of discussion, in accordance with the RA 10173 Data Privacy Act.{" "}
                <br />
                <br />I further acknowledge that I am aware this virtual
                encounter will be recorded and all details be kept confidential
                between my attending physician and the ZCMC Telemedicine
                healthcare personnel involved. <br />
                <br />
                I further acknowledge given that this is only a virtual consult,
                the ZCMC Regional Telemedicine Center along with its doctors
                shall not be held directly liable for my care or for any other
                untoward events that may occur in between, thus freeing them
                from any legal responsibilities in the future. <br />
                <br />I fully understand the nature, processes, risks and
                benefits of teleconsultation as they were shared in a language
                that I can understand. I was given the opportunity to ask
                questions and my questions were answered.
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
