import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  IconButton,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  GridItem,
  Grid,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import "../Styles/Patients.css";
import "../Styles/Table.css";
import {
  BiCalendarEvent,
  BiSearch,
  BiStats,
  BiUser,
  BiUserCheck,
  BiRefresh,
} from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbCheckupList } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";
import { GoCheck, GoX } from "react-icons/go";
import Swal from "sweetalert2";
import { capitalize } from "@mui/material";

const PatientsList = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [pendingPat, setPendingPat] = useState([]);
  // const [patDet, setPatDet]=useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);
  const {
    isOpen: isReferredOpen,
    onOpen: onReferredOpen,
    onClose: onReferredClose,
  } = useDisclosure();
  const {
    isOpen: isPendingOpen,
    onOpen: onPendingOpen,
    onClose: onPendingClose,
  } = useDisclosure();

  //get pending patient data
  const [patientId, setPatientId] = useState("");
  const [refFacility, setRefFacility] = useState("");
  const [refDate, setRefDate] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [sex, setSex] = useState("");
  const [admitDate, setAdmitDate] = useState("");
  const [refType, setRefType] = useState("");
  const [disposition, setDisposition] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [latestTemp, setLatestTemp] = useState("");
  const [latestBP, setLatestBP] = useState("");
  const [latestRespi, setLatestRespi] = useState("");
  const [latestPulse, setLatestPulse] = useState("");
  const [latestOxygen, setLatestOxygen] = useState("");
  const [latestGlasgow, setLatestGlasgow] = useState("");

  const [reasonPat, setReasonPat] = useState("");

  const getDetails = (id) => {
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_details.php", {
        params: { id: id },
      })
      .then(function (response) {
        setDetails(response.data);
      });
  };

  const getPendingDetails = (pid) => {
    axios
      .get("http://localhost/zcmc_referral_api/api/get_pending_details.php/", {
        params: { pid: pid },
      })
      .then(function (response) {
        setPatientId(response.data[0].patientId);
        setRefFacility(response.data[0].refFacility);
        setRefDate(response.data[0].tstamp);
        setLastName(response.data[0].lastname);
        setFirstName(response.data[0].firstname);
        setMiddleName(response.data[0].middleName);
        setSex(response.data[0].sex);
        setAdmitDate(response.data[0].dateAdmitted);
        setRefType(response.data[0].refType);
        setDisposition(response.data[0].disposition);
        setSpecialization(response.data[0].specialization);
        setLatestTemp(response.data[0].latestTemp);
        setLatestBP(response.data[0].latestBp);
        setLatestRespi(response.data[0].latestRespi);
        setLatestPulse(response.data[0].latestPulse);
        setLatestOxygen(response.data[0].latestOxygen);
        setLatestGlasgow(response.data[0].latestGlasgow);
      });
  };

  const handleAcceptPatient = (patId) => {
    onPendingClose(true);
    Swal.fire({
      text: "Are you sure you want to accept this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "http://localhost/zcmc_referral_api/api/accept_referred_patient.php",
            {
              patId: patId,
            }
          )
          .then((response) => {
            if (response.data.status === 1) {
              axios
                .get(
                  "http://mms-krizelle/zcmc_referral_api/api/get_pending_ref.php",
                  {
                    params: { id: patId },
                  }
                )
                .then((response) => {
                  let data = JSON.stringify(response.data);

                  fetch(
                    "https://script.google.com/macros/s/AKfycbyb0W56u9pJPRkCwP9__1kKWLVoMOQaMWUoP4o5d5rFc17JEUKFbvPJ1sxK2CIye-BBCg/exec?action=postData",
                    {
                      method: "POST",
                      body: data,
                    }
                  ).then(async (response) => {
                    if (response) {
                      Swal.fire(
                        "User verified!",
                        "You successfully verified the user.",
                        "success"
                      );
                    } else {
                      Swal.fire("Error!", "Something went wrong.", "error");
                    }
                  });
                });
            } else {
              Swal.fire("Error!", "Something went wrong.", "error");
            }
          });
      }
    });
  };

  const declineReferredPatient = (id) => {
    onPendingClose(true);
    Swal.fire({
      text: "Please indicate reason for rejecting the referral",
      icon: "warning",
      input: "text",
      // html:"<div class='b'><p>Please indicate reason for declining patient</p></div><input id='reason' class='swal2-input' required/>",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
      preConfirm: (data) => {
        if (!data) {
          Swal.showValidationMessage(`Request failed`);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "http://localhost/zcmc_referral_api/api/decline_referred_patient.php",
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
            console.log(response.data);
          });
      }
    });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patients.php")
      .then(function (response) {
        setPatients(response.data);
      });

    axios
      .get("http://localhost/zcmc_referral_api/api/get_pending_patients.php")
      .then(function (response) {
        setPendingPat(response.data);
      });
  }, [pendingPat, patients]);

  return (
    <div>
      <Grid templateColumns="repeat(9,1fr)" gap={4}>
        <GridItem colSpan={6}>
          <div className="table-container">
            <h1 className="block">Referred Patients</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiSearch color="gray.300" />}
                />
                <Input
                  fontSize="13px"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient"
                  width="400px"
                />
              </InputGroup>
            </div>

            {!patients ? (
              <i style={{ alignContent: "center" }}>---No data found---</i>
            ) : (
              <TableContainer>
                <Table cellSpacing={0}>
                  <Thead>
                    <Tr>
                      <Th className="border" width="30%">
                        Full name
                      </Th>
                      <Th className="border" width="10%">
                        Referred Date
                      </Th>
                      <Th className="border" width="30%">
                        Referred From
                      </Th>
                      <Th className="border" width="10%">
                        Discharge Date
                      </Th>
                      <Th className="border" width="10%">
                        Status
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {patients
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.patientName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((pat) => {
                        return (
                          <>
                            <Tr>
                              <Td className="border">{pat.patientName}</Td>
                              <Td className="border">
                                {moment(pat.referredDate).format("LLL")}
                              </Td>
                              <Td className="border">{pat.referredFrom}</Td>
                              <Td className="border">
                                {pat.dischDate == null ? (
                                  <Badge colorScheme="yellow">
                                    {" "}
                                    Not applicable
                                  </Badge>
                                ) : (
                                  moment(pat.dischDate).format("LLL")
                                )}
                              </Td>
                              <Td className="border">
                                {pat.dischDate === null ? (
                                  <Badge colorScheme="blue">+ Admitted</Badge>
                                ) : (
                                  <Badge colorScheme="red">- Discharged</Badge>
                                )}
                              </Td>
                              <Td border="0" paddingTop="0" paddingBottom="0">
                                <Tooltip
                                  label="View"
                                  aria-label="A tooltip"
                                  bg="blue.400"
                                  placement="right"
                                >
                                  <IconButton
                                    style={{ margin: 0, padding: 0 }}
                                    size="sm"
                                    variant="outline"
                                    colorScheme="blue"
                                    onClick={() => {
                                      onReferredOpen();
                                      getDetails(pat.PK_patientId);
                                    }}
                                    icon={<BsEye fontSize="15px" />}
                                  />
                                </Tooltip>
                              </Td>
                            </Tr>
                          </>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </div>
        </GridItem>

        <GridItem colSpan={3}>
          <div className="side-container" style={{ padding: "15px" }}>
            <h1 style={{ marginBottom: "15px" }}>
              <b>Pending Patients</b>
            </h1>

            <VStack spacing={2}>
              {pendingPat.length !== 0 ? (
                pendingPat.map((p, k) => {
                  return (
                    <>
                      <Box
                        width="100%"
                        borderWidth="1px"
                        borderRadius="xs"
                        padding={3}
                      >
                        <HStack>
                          <p style={{ fontSize: "14px" }}>
                            <b>
                              {p.lastname +
                                ", " +
                                p.firstname +
                                ", " +
                                p.middleName}
                            </b>
                            <Badge colorScheme="purple" ml="1" size="xs">
                              New
                            </Badge>
                            <br />
                            <Text style={{ textTransform: "capitalize" }}>
                              {p.refFacility}
                            </Text>
                          </p>

                          <Spacer></Spacer>
                          <IconButton
                            size="sm"
                            variant="outline"
                            colorScheme="teal"
                            onClick={() => {
                              onPendingOpen();
                              getPendingDetails(p.patientId);
                            }}
                            icon={<BiUserCheck fontSize="17px" />}
                          />
                        </HStack>
                      </Box>
                    </>
                  );
                })
              ) : (
                <Text mt={3}>Nothing to show</Text>
              )}
            </VStack>
          </div>
        </GridItem>
      </Grid>

      {/* MODAL VIEW DETAILS */}
      <Modal isOpen={isReferredOpen} onClose={onReferredClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {details.map((d) => {
              return (
                <>
                  <Grid templateColumns="repeat(2, 1fr)" mt={3}>
                    <GridItem>
                      <small
                        style={{
                          display: "flex",
                          marginBottom: 4,
                        }}
                      >
                        <BiUser style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient name</Text>
                      </small>
                      <Text fontWeight="600">{d.patientName}</Text>
                    </GridItem>

                    <GridItem>
                      <small
                        style={{
                          display: "flex",
                          marginBottom: 4,
                        }}
                      >
                        <BiStats style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient status</Text>
                      </small>
                      {d.dischDate === null ? (
                        <Badge colorScheme="blue">Patient is admitted</Badge>
                      ) : (
                        <Badge colorScheme="red">Discharged</Badge>
                      )}
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" mt={10}>
                    <GridItem>
                      <small style={{ display: "flex", marginBottom: 6 }}>
                        <TbBuildingHospital
                          style={{ marginRight: "5px", marginTop: 2 }}
                        />
                        <Text textTransform="uppercase">Referred from</Text>
                      </small>
                      <Text fontSize="15px">{d.referredFrom}</Text>
                    </GridItem>
                    <GridItem>
                      <small style={{ display: "flex", marginBottom: 6 }}>
                        <BiCalendarEvent
                          style={{ marginRight: "5px", marginTop: 2 }}
                        />
                        <Text textTransform="uppercase">Referred date</Text>
                      </small>
                      <Text fontSize="15px">
                        {moment(d.referredDate).format("lll")}
                      </Text>
                    </GridItem>
                  </Grid>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <TbCheckupList
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Discharge diagnosis</Text>
                    </small>

                    <Box>
                      {d.dischDiagnosis === "" || d.dischDiagnosis === null ? (
                        <Box p={3} bg="gray.50" borderRadius="5px">
                          <Text fontSize="13px">Nothing to show</Text>
                        </Box>
                      ) : (
                        <>
                          <Box p={3} bg="gray.50" borderRadius="5px">
                            <Text fontSize="13px">{d.dischDiagnosis}</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <TbCheckupList
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Final diagnosis</Text>
                    </small>

                    <Box>
                      {d.finalDiagnosis === "" || d.finalDiagnosis === null ? (
                        <Box p={3} bg="gray.50" borderRadius="5px">
                          <Text fontSize="13px">Nothing to show</Text>
                        </Box>
                      ) : (
                        <>
                          <Box p={3} bg="gray.50" borderRadius="5px">
                            <Text fontSize="13px">{d.finalDiagnosis}</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <BiCalendarEvent
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Discharge date</Text>
                    </small>

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
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onReferredClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODAL VIEW DETAILS - PENDING */}
      <Modal isOpen={isPendingOpen} onClose={onPendingClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" mt={3}>
              <GridItem>
                <small
                  style={{
                    display: "flex",
                    marginBottom: 4,
                  }}
                >
                  <BiUser style={{ marginRight: "5px", marginTop: 2 }} />
                  <Text textTransform="uppercase">Patient name</Text>
                </small>
                <Text fontWeight="600">
                  {lastName + " " + firstName + " " + middleName}
                </Text>
              </GridItem>

              <GridItem>
                <small
                  style={{
                    display: "flex",
                    marginBottom: 4,
                  }}
                >
                  <BiStats style={{ marginRight: "5px", marginTop: 2 }} />
                  <Text textTransform="uppercase">Sex</Text>
                </small>
                <Badge colorScheme="red">{sex}</Badge>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(1, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <TbBuildingHospital
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Referred from</Text>
                </small>
                <Text fontSize="15px">{refFacility}</Text>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Referred date</Text>
                </small>
                <Text fontSize="15px">{moment(refDate).format("lll")}</Text>
              </GridItem>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Date Admitted</Text>
                </small>
                <Text fontSize="15px">{moment(admitDate).format("ll")}</Text>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <TbCheckupList style={{ marginRight: "5px", marginTop: 2 }} />
                  <Text textTransform="uppercase">Referral Type</Text>
                </small>

                <Text fontSize="13px">{refType}</Text>
              </GridItem>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <TbCheckupList style={{ marginRight: "5px", marginTop: 2 }} />
                  <Text textTransform="uppercase">Disposition</Text>
                </small>
                <Text fontSize="13px">{disposition}</Text>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Latest V/S Temperature</Text>
                </small>
                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestTemp}
                </Text>
              </GridItem>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">
                    Latest V/S Blood Pressure
                  </Text>
                </small>
                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestBP}
                </Text>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">
                    Latest V/S Respiration Rate
                  </Text>
                </small>
                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestRespi}
                </Text>
              </GridItem>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Latest V/S Pulse Rate</Text>
                </small>
                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestPulse}
                </Text>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">
                    Latest V/S Oxygen Saturation
                  </Text>
                </small>
                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestOxygen}
                </Text>
              </GridItem>
              <GridItem>
                <small style={{ display: "flex", marginBottom: 6 }}>
                  <BiCalendarEvent
                    style={{ marginRight: "5px", marginTop: 2 }}
                  />
                  <Text textTransform="uppercase">Glasgow Coma Scale</Text>
                </small>

                <Text fontSize=" 14px" color="red.600" fontWeight="600">
                  {latestGlasgow}
                </Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter mt={4}>
            <Button
              size="sm"
              mr={3}
              colorScheme="green"
              onClick={() => {
                handleAcceptPatient(patientId);
              }}
              leftIcon={<GoCheck fontSize="20px" />}
            >
              Accept
            </Button>
            <Button
              size="sm"
              mr={3}
              colorScheme="red"
              onClick={() => {
                declineReferredPatient(patientId);
              }}
              leftIcon={<GoX fontSize="20px" />}
            >
              Decline
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              mr={3}
              onClick={onPendingClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PatientsList;
