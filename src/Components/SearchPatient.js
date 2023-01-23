import React, { useEffect, useState } from "react";
import moment from "moment";
import "../Styles/StatusBar.css";
import { Select } from "chakra-react-select";
import {
  Box,
  Badge,
  Text,
  Grid,
  GridItem,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Textarea,
  Checkbox,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BiCalendarEvent, BiIdCard, BiStats } from "react-icons/bi";
import { TbCheckupList } from "react-icons/tb";
import Swal from "sweetalert2";
import api from "../API/Api";
import Loading from "./Spinner";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";

function SearchPatient(props) {
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingList, setIsLoadingList] = useState(false);
  const [patient, setPatient] = useState([]);
  // const [selected, setSelected] = useState("/");
  const [bizbox, setBizbox] = useState([]);
  const [hospital, setHospital] = useState("");
  const [covid, setCovid] = useState([]);
  const [id, setId] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [status, setStatus] = useState(""); //for getting status if cancelled

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const { user } = useAuth();

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
        element.tstamp +
        " " +
        "/" +
        element.status;
    });

  // Split

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/cancel_referred_patient.php", {
          id: id,
          reason: result.value,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "Cancelled!",
            "You successfully cancelled the referral.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // SELECTED
  const selectedText = async (e) => {
    let data = e.split("/");
    let name = data[1];
    let selectedId = data[0];
    setId(data[0]);
    setStatus(data[3]);
    const refDate = moment(data[2]).format("YYYY-MM-DD hh:mm");
    // setSelected(e);

    setIsLoading(true);

    let covidData = await api.get("/get_covid.php", {
      params: { id: selectedId },
    });

    setCovid(covidData.data);

    let bizboxData = await api.get("/get_patient_data.php", {
      params: { patientName: name, referredDate: refDate },
    });
    setBizbox(bizboxData.data);

    if (covidData) {
      setIsLoading(false);
    }
  };

  const comments = async () => {
    // setIsLoading(true);
    let comment = await api.get(`/get_comment.php/${id}`);
    if (comment) {
      setRemarks(comment.data);
      //  setIsLoading(false);
    }
  };

  const fetchPatData = async () => {
    let pat = await api.get("/get_sheets.php", {
      params: { hospital: hospital },
    });
    if (pat) {
      setPatient(pat.data);
    }
  };

  useEffect(() => {
    const userr = JSON.parse(localStorage.getItem("user"));
    setHospital(userr.name);
    fetchPatData();

    // axios
    //   .get(`http://192.168.3.135/zcmc_referral_api/api/get_comment.php/${id}`)
    //   .then((response) => {
    //     setRemarks(response.data);
    //     // setIsLoading(false);
    //   });

    comments();
  }, [id, remarks, hospital]);

  // useEffect(() => {}, []);

  return (
    <div style={{ padding: "20px" }}>
      <Text fontWeight={500}>Search Patient</Text>

      <Select
        // styles={{ position: "fixed", zIndex: "50" }}

        options={patient}
        placeholder="Search patient"
        // variant="flushed"
        selectedOptionStyle="check"
        closeMenuOnSelect={true}
        focusBorderColor="black"
        onChange={(e) => {
          selectedText(e.value);
        }}
        width="100%"
        required
        id="searchbar"
        color="white"
      />

      {patient
        .filter((pat) => pat.patientId === id)
        .map((i, k) => {
          return (
            <>
              <Center>
                <Box mt={20} w="80%">
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

                    {i.status === "referred" ? (
                      <li className="active" style={{ width: "auto" }}>
                        Referred to {i.name}
                      </li>
                    ) : (
                      <>
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
                        {bizbox.length === 0 ? (
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

                                  <li
                                    className={
                                      d.dischDate !== null ? "active" : ""
                                    }
                                  >
                                    Discharged
                                  </li>
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                  </ul>
                </Box>
              </Center>

              <Container mt={10} maxW="100%">
                <Tabs variant="enclosed">
                  <TabList mb="1em">
                    <Tab>
                      <Text>Patient Referral</Text>
                    </Tab>
                    {i.status === "cancelled" ? (
                      ""
                    ) : (
                      <Tab>
                        <Text>
                          Remarks
                          <Badge ml="1.5" colorScheme="blue">
                            {remarks.length}
                          </Badge>
                        </Text>
                      </Tab>
                    )}
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Grid
                        templateColumns={
                          i.status === "referred"
                            ? "repeat(1, 1fr)"
                            : "repeat(3, 1fr)"
                        }
                        gap={6}
                      >
                        <GridItem colSpan={i.status === "referred" ? 1 : 2}>
                          <Container p={5} maxW="1200px">
                            {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}
                            <Box
                              borderWidth="1px"
                              borderColor="gray.300"
                              borderRadius="lg"
                              p={5}
                            >
                              <Text
                                fontSize="xl"
                                textAlign="center"
                                fontWeight={800}
                              >
                                PATIENT INFORMATION
                              </Text>
                              <HStack mt={8}>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>Last Name</FormLabel>

                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.lastname.toUpperCase()}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    First Name
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.firstname.toUpperCase()}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Middle Name</FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.middleName.toUpperCase()}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl w={80}>
                                  <FormLabel fontSize={14}>Suffix</FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.extended.toUpperCase()}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <HStack mt={5}>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>Birthday</FormLabel>
                                  <HStack>
                                    <Input
                                      type="text"
                                      variant="filled"
                                      fontWeight={800}
                                      value={i.birthdate}
                                      disabled
                                    />
                                  </HStack>
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>Sex</FormLabel>
                                  <Input
                                    value={i.sex}
                                    variant="filled"
                                    fontWeight={800}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Civil Status
                                  </FormLabel>
                                  <Input
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.civilStatus}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Nationality
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.nationality}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <HStack mt={5}>
                                <FormControl>
                                  <FormLabel fontSize={14}>Religion</FormLabel>
                                  <Input
                                    variant="filled"
                                    value={i.religion}
                                    fontWeight={800}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Occupation
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.occupation}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    PhilHealth
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.philhealth}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <FormControl mt={5}>
                                <FormLabel fontSize={14}>Address</FormLabel>
                                <Textarea
                                  type="text"
                                  variant="filled"
                                  fontWeight={800}
                                  value={i.address}
                                  disabled
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
                              <Text
                                fontSize="xl"
                                textAlign="center"
                                fontWeight={800}
                              >
                                SIGNIFICANT WATCHERS
                              </Text>
                              <HStack mt={8}>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Next of Kin
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.nextOfkin}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Landline/Mobile/Email
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.contactWatcher}
                                    disabled
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
                              <Text
                                fontSize="xl"
                                textAlign="center"
                                fontWeight={800}
                              >
                                ADMITTING DETAILS
                              </Text>
                              <HStack mt={8}>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Date Admitted
                                  </FormLabel>
                                  <Input
                                    type="date"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.dateAdmitted}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl w={600}>
                                  <FormLabel fontSize={14}>
                                    Referral Type
                                  </FormLabel>
                                  <Input
                                    variant="filled"
                                    value={i.refType}
                                    fontWeight={800}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl w={500}>
                                  <FormLabel fontSize={14}>
                                    Disposition
                                  </FormLabel>
                                  <Input
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.disposition}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Specialization
                                  </FormLabel>
                                  <Input
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.specialization}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              {i.specialization ===
                              "Obstetrics And Gynecology" ? (
                                <>
                                  <Box mt={10}>
                                    <Text
                                      fontSize="xl"
                                      textAlign="center"
                                      fontWeight={800}
                                    >
                                      OB CASE
                                    </Text>
                                    <HStack mt={5}>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Gravidity and Parity
                                        </FormLabel>
                                        <HStack>
                                          {i.GP
                                            ? JSON.parse(i.GP).map(
                                                (el, key) => {
                                                  return (
                                                    <>
                                                      <Text>G</Text>
                                                      <Input
                                                        type="text"
                                                        fontWeight={800}
                                                        value={el.G}
                                                        borderBottom="1px"
                                                        w={50}
                                                        h={8}
                                                        textAlign="center"
                                                        disabled
                                                      />
                                                      <Text>P</Text>
                                                      <Input
                                                        type="text"
                                                        fontWeight={800}
                                                        value={el.P}
                                                        borderBottom="1px"
                                                        w={50}
                                                        h={8}
                                                        textAlign="center"
                                                        disabled
                                                      />
                                                      <Text>(</Text>
                                                      <Input
                                                        type="text"
                                                        fontWeight={800}
                                                        value={el.GAP}
                                                        borderBottom="1px"
                                                        w={100}
                                                        h={8}
                                                        textAlign="center"
                                                        disabled
                                                      />
                                                      <Text>)</Text>
                                                    </>
                                                  );
                                                }
                                              )
                                            : ""}
                                        </HStack>
                                      </FormControl>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Last Menstrual Period
                                        </FormLabel>
                                        <Input
                                          type="text"
                                          value={i.LMP}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>AOG</FormLabel>
                                        <Input
                                          type="text"
                                          value={i.AOG}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                    </HStack>
                                    <HStack mt={5}>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>EDC</FormLabel>
                                        <Input
                                          type="text"
                                          value={i.EDC}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Fetal Heart Tones
                                        </FormLabel>
                                        <Input
                                          type="text"
                                          value={i.FHT}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Fundal Height
                                        </FormLabel>
                                        <Input
                                          type="text"
                                          value={i.FH}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Baby APGAR
                                        </FormLabel>
                                        <Input
                                          type="text"
                                          value={i.APGAR}
                                          fontWeight={800}
                                          disabled
                                        />
                                      </FormControl>
                                    </HStack>
                                    <HStack mt={5}>
                                      <FormControl isRequired>
                                        <FormLabel fontSize={14}>
                                          Internal Examination
                                        </FormLabel>
                                        <HStack>
                                          {i.IE
                                            ? JSON.parse(i.IE).map((el) => {
                                                return (
                                                  <>
                                                    <Input
                                                      type="text"
                                                      borderBottom="1px"
                                                      w={80}
                                                      h={8}
                                                      textAlign="center"
                                                      disabled
                                                      fontWeight={800}
                                                      value={el.cm}
                                                    />
                                                    <Text fontSize={14}>
                                                      cm
                                                    </Text>
                                                    <Input
                                                      type="text"
                                                      borderBottom="1px"
                                                      w={80}
                                                      h={8}
                                                      textAlign="center"
                                                      disabled
                                                      fontWeight={800}
                                                      value={el.station}
                                                    />
                                                    <Text fontSize={14}>
                                                      station
                                                    </Text>
                                                    <Input
                                                      type="text"
                                                      borderBottom="1px"
                                                      h={8}
                                                      textAlign="center"
                                                      disabled
                                                      fontWeight={800}
                                                      value={el.effacement}
                                                    />
                                                    <Text fontSize={14}>
                                                      effacement
                                                    </Text>
                                                    <Input
                                                      type="text"
                                                      borderBottom="1px"
                                                      h={8}
                                                      textAlign="center"
                                                      disabled
                                                      fontWeight={800}
                                                      value={el.presentation}
                                                    />
                                                    <Text fontSize={14}>
                                                      presentation
                                                    </Text>
                                                  </>
                                                );
                                              })
                                            : ""}
                                        </HStack>
                                      </FormControl>
                                    </HStack>
                                    <FormControl mt={5}>
                                      <FormLabel fontSize={14}>Bow</FormLabel>
                                      {i.bow
                                        ? JSON.parse(i.bow).map((el) => {
                                            return (
                                              <Checkbox
                                                size="sm"
                                                ml={5}
                                                isChecked={true}
                                                fontWeight={800}
                                              >
                                                {el}
                                              </Checkbox>
                                            );
                                          })
                                        : ""}
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
                                    fontWeight={800}
                                    value={i.latestTemp}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Latest V/S-Blood <br /> Pressure
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.latestBp}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Latest V/S-Respiration <br /> Rate
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.latestRespi}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Latest V/S-Pulse <br />
                                    Rate
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.latestPulse}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Latest V/S-Oxygen <br /> Saturation
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.latestOxygen}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <HStack mt={5}>
                                <FormControl isRequired>
                                  <FormLabel fontSize={14}>
                                    Glasgow Coma Scale
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.latestGlasgow}
                                    disabled
                                  />
                                </FormControl>

                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Resident on Duty/Contact #
                                  </FormLabel>
                                  <Input
                                    type="text"
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.userContact}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <FormControl>
                                <FormLabel fontSize={14}>
                                  Endorsement/Initial Care
                                </FormLabel>
                                <Textarea
                                  type="text"
                                  variant="filled"
                                  fontWeight={800}
                                  value={i.endorsement}
                                  disabled
                                />
                              </FormControl>
                              <HStack mt={5}>
                                <FormControl>
                                  <FormLabel fontSize={14}>
                                    Chief Complaints
                                  </FormLabel>
                                  <Textarea
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.chiefComplaints}
                                    disabled
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel fontSize={14}>Diagnosis</FormLabel>
                                  <Textarea
                                    variant="filled"
                                    fontWeight={800}
                                    value={i.diagnosis}
                                    disabled
                                  />
                                </FormControl>
                              </HStack>
                              <FormControl mt={5} isRequired>
                                <FormLabel fontSize={14}>
                                  {" "}
                                  Reason for Referral
                                </FormLabel>
                                <Input
                                  variant="filled"
                                  value={i.reason}
                                  fontWeight={800}
                                  disabled
                                />
                              </FormControl>
                            </Box>

                            <HStack mt={5} mb={5}>
                              <Checkbox isChecked={true}></Checkbox>
                              <p style={{ fontSize: "14px", marginTop: "3px" }}>
                                The patient understands and accepts the terms
                                and conditions of the
                              </p>
                              <Link
                                fontSize="14px"
                                color="blue"
                                mt={3}
                                onClick={onOpen}
                              >
                                Patient Agreement Form
                              </Link>
                            </HStack>
                          </Container>
                        </GridItem>
                        {isLoading ? (
                          <Center mt={20}>
                            <Loading />
                          </Center>
                        ) : bizbox.length !== 0 ? (
                          bizbox.map((d) => {
                            return (
                              <>
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
                                  <Text
                                    style={{
                                      display: "flex",
                                      marginBottom: 4,
                                      fontWeight: "600",
                                    }}
                                    mb={6}
                                  >
                                    <BiIdCard
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase" mb={6}>
                                      Patient ID: {d.patId}
                                    </Text>
                                  </Text>
                                  {/* COVID */}{" "}
                                  <Text
                                    textTransform="uppercase"
                                    fontSize="15px"
                                    fontWeight="500"
                                  >
                                    COVID:{" "}
                                    {covid === null ? (
                                      <Badge colorScheme="gray">
                                        No result
                                      </Badge>
                                    ) : covid["result"] === 1 ? (
                                      <Badge colorScheme="red">
                                        POSITIVE +
                                      </Badge>
                                    ) : (
                                      <Badge colorScheme="blue">
                                        negative -
                                      </Badge>
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
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Admission date
                                    </Text>
                                  </Text>
                                  <Text fontSize="15px">
                                    <Box
                                      p={3}
                                      bg="gray.50"
                                      borderRadius="5px"
                                      mb={6}
                                    >
                                      {moment(d.registryDate).format("lll")}
                                    </Box>
                                  </Text>
                                  <Box mt={10}>
                                    <Text
                                      style={{
                                        display: "flex",
                                        marginBottom: 4,
                                      }}
                                    >
                                      <TbCheckupList
                                        style={{
                                          marginRight: "5px",
                                          marginTop: 2,
                                        }}
                                      />
                                      <Text textTransform="uppercase">
                                        Discharge diagnosis
                                      </Text>
                                    </Text>

                                    <Box>
                                      {d.dischDiagnosis === "" ||
                                      d.dischDiagnosis === null ? (
                                        <Box
                                          p={3}
                                          bg="gray.50"
                                          borderRadius="5px"
                                        >
                                          <Text fontSize="13px">
                                            Nothing to show
                                          </Text>
                                        </Box>
                                      ) : (
                                        <>
                                          <Box
                                            p={3}
                                            bg="gray.50"
                                            borderRadius="5px"
                                          >
                                            <Text fontSize="13px">
                                              {d.dischDiagnosis}
                                            </Text>
                                          </Box>
                                        </>
                                      )}
                                    </Box>
                                  </Box>
                                  {/* <Box mt={10}>
                                    <Text
                                      style={{
                                        display: "flex",
                                        marginBottom: 4,
                                      }}
                                    >
                                      <TbCheckupList
                                        style={{
                                          marginRight: "5px",
                                          marginTop: 2,
                                        }}
                                      />
                                      <Text textTransform="uppercase">
                                        Final diagnosis
                                      </Text>
                                    </Text>

                                    <Box>
                                      {d.finalDiagnosis === "" ||
                                      d.finalDiagnosis === null ? (
                                        <Box
                                          p={3}
                                          bg="gray.50"
                                          borderRadius="5px"
                                        >
                                          <Text fontSize="13px">
                                            Nothing to show
                                          </Text>
                                        </Box>
                                      ) : (
                                        <>
                                          <Box
                                            p={3}
                                            bg="gray.50"
                                            borderRadius="5px"
                                          >
                                            <Text fontSize="13px">
                                              {d.finalDiagnosis}
                                            </Text>
                                          </Box>
                                        </>
                                      )}
                                    </Box>
                                  </Box> */}
                                  <Box mt={10}>
                                    <Text
                                      style={{
                                        display: "flex",
                                        marginBottom: 6,
                                      }}
                                    >
                                      <BiCalendarEvent
                                        style={{
                                          marginRight: "5px",
                                          marginTop: 2,
                                        }}
                                      />
                                      <Text textTransform="uppercase">
                                        Discharge date
                                      </Text>
                                    </Text>

                                    <Box>
                                      {d.dischDate === "" ||
                                      d.dischDate === null ? (
                                        <Box
                                          p={3}
                                          bg="gray.50"
                                          borderRadius="5px"
                                        >
                                          <Text
                                            fontSize="13px"
                                            fontWeight="600"
                                            color="blue.500"
                                          >
                                            Patient is still admitted
                                          </Text>
                                        </Box>
                                      ) : (
                                        <Box
                                          p={3}
                                          bg="red.50"
                                          borderRadius="5px"
                                        >
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
                                </GridItem>
                              </>
                            );
                          })
                        ) : (
                          <>
                            {i.status === "cancelled" ? (
                              <>
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
                                  <Box
                                    p={3}
                                    bg="red.50"
                                    borderRadius="5px"
                                    mb={6}
                                  >
                                    <Text
                                      fontSize="15px"
                                      fontWeight="600"
                                      color="red.500"
                                    >
                                      Referral Cancelled
                                    </Text>
                                    <Text mt={5} fontSize="15px">
                                      <b>Reason:</b> <i>{i.rejectReason}</i>
                                    </Text>
                                  </Box>
                                </GridItem>
                              </>
                            ) : i.status === "arrived" ? (
                              <>
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
                                  <Text
                                    style={{
                                      display: "flex",
                                      marginBottom: 4,
                                    }}
                                  >
                                    <BiStats
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Patient status
                                    </Text>
                                  </Text>
                                  <Box
                                    p={3}
                                    bg="gray.50"
                                    borderRadius="5px"
                                    mb={6}
                                  >
                                    <Text
                                      fontSize="13px"
                                      fontWeight="600"
                                      color="blue.500"
                                    >
                                      Not yet available
                                    </Text>
                                  </Box>
                                  <Text
                                    textTransform="uppercase"
                                    fontSize="15px"
                                    fontWeight="500"
                                  >
                                    COVID:{" "}
                                    {covid === null ? (
                                      <Badge colorScheme="gray">
                                        No result
                                      </Badge>
                                    ) : covid["result"] === 1 ? (
                                      <Badge colorScheme="red">
                                        POSITIVE +
                                      </Badge>
                                    ) : (
                                      <Badge colorScheme="blue">
                                        negative -
                                      </Badge>
                                    )}
                                  </Text>
                                </GridItem>
                              </>
                            ) : i.status === "referred" ? (
                              ""
                            ) : i.status === "accepted" ? (
                              <>
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
                                  <Text
                                    style={{
                                      display: "flex",
                                      marginBottom: 4,
                                    }}
                                  >
                                    <BiStats
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Referral status
                                    </Text>
                                  </Text>
                                  <Box
                                    p={3}
                                    bg="green.50"
                                    borderRadius="5px"
                                    mb={6}
                                    mt={2}
                                  >
                                    <Text
                                      fontSize="13px"
                                      fontWeight="600"
                                      color="green.500"
                                    >
                                      Referral has been accepted by Zamboanga
                                      City Medical Center
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
                                </GridItem>
                              </>
                            ) : (
                              <>
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
                                  <Text
                                    style={{
                                      display: "flex",
                                      marginBottom: 4,
                                    }}
                                  >
                                    <BiStats
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Patient status
                                    </Text>
                                  </Text>
                                  <Box
                                    p={3}
                                    bg="gray.50"
                                    borderRadius="5px"
                                    mb={6}
                                  >
                                    <Text
                                      fontSize="13px"
                                      fontWeight="600"
                                      color="blue.500"
                                    >
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
                                </GridItem>
                              </>
                            )}
                          </>
                        )}
                      </Grid>
                    </TabPanel>
                    <TabPanel>
                      <Container maxW="container.lg" px={20}>
                        <AddComment patientId={id} user={user?.userId} />

                        <Box>
                          {remarks.map((el, key) => {
                            return (
                              <>
                                {el.role === "opcen" ? (
                                  <Comment
                                    remark={el.remark}
                                    date={el.remark_tstamp}
                                    user={el.firstName + " " + el.lastName}
                                    dept={
                                      "Zamboanga City Medical Center (OPCEN)"
                                    }
                                  />
                                ) : (
                                  <Comment
                                    remark={el.remark}
                                    date={el.remark_tstamp}
                                    user={el.firstName + " " + el.lastName}
                                    dept={el.name}
                                  />
                                )}
                              </>
                            );
                          })}
                        </Box>
                      </Container>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Container>
            </>
          );
        })}
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
                patient’s medical records and other things that may be pertinent
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
                <strong>In case of an urgent concern:</strong> It is my doctor’s
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
      {/* // <Button onClick={find}>Find</Button> */}
    </div>
  );
}

export default SearchPatient;
