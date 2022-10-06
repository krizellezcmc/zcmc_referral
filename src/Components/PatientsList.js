import React, { useEffect, useState } from "react";
import api from "../API/Api";
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
  Link,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
  Container,
} from "@chakra-ui/react";
import moment from "moment";
import axios from "axios";
import "../Styles/Patients.css";
import "../Styles/Table.css";
import { Select } from "chakra-react-select";

import Spinner from "./Spinner";

import {
  BiCalendarEvent,
  BiSearch,
  BiStats,
  BiUser,
  BiUserCheck,
  BiRefresh,
  BiMaleSign,
  BiFemaleSign,
} from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbCheckupList } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";
import { GoCheck, GoX } from "react-icons/go";
import Swal from "sweetalert2";
import CancelledModal from "./CancelledModal";

const PatientsList = (props) => {
  let navigate = useNavigate();
  const [IsLoadingCancelled, setIsLoadingCancelled] = useState(false);
  const [IsLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const {
    isOpen: isCancelledOpen,
    onOpen: onCancelledOpen,
    onClose: onCancelledClose,
  } = useDisclosure();

  const {
    isOpen: isDeclinedOpen,
    onOpen: onDeclinedOpen,
    onClose: onDeclinedClose,
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
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  const [isLoadingPending, setIsLoadingPending] = useState(false);

  const [reason, setReason] = useState("");
  const [selectRef, setSelectedRef] = useState("");
  const [hospitals, setHospitals] = useState([]);

  let toast = useToast();

  const getDetails = async (id) => {
    setIsLoadingDetails(true);
    let deets = await api.get("/get_details.php", { params: { id: id } });
    setDetails(deets.data);

    if (deets) {
      setIsLoadingDetails(false);
    }
  };

  const getPendingDetails = async (pid) => {
    setIsLoadingPending(true);
    let penDeets = await api.get("/get_pending_details.php", {
      params: { pid: pid },
    });

    if (penDeets) {
      setPatientId(penDeets.data[0].patientId);
      setRefFacility(penDeets.data[0].refFacility);
      setRefDate(penDeets.data[0].tstamp);
      setLastName(penDeets.data[0].lastname);
      setFirstName(penDeets.data[0].firstname);
      setMiddleName(penDeets.data[0].middleName);
      setSex(penDeets.data[0].sex);
      setAdmitDate(penDeets.data[0].dateAdmitted);
      setRefType(penDeets.data[0].refType);
      setDisposition(penDeets.data[0].disposition);
      setSpecialization(penDeets.data[0].specialization);
      setLatestTemp(penDeets.data[0].latestTemp);
      setLatestBP(penDeets.data[0].latestBp);
      setLatestRespi(penDeets.data[0].latestRespi);
      setLatestPulse(penDeets.data[0].latestPulse);
      setLatestOxygen(penDeets.data[0].latestOxygen);
      setLatestGlasgow(penDeets.data[0].latestGlasgow);
      setStatus(penDeets.data[0].status);

      setIsLoadingPending(false);
    }
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
        let response = api.post("/accept_referred_patient.php", {
          patId: patId,
        });

        if (response.data.status === 1) {
          Swal.fire("Success!", "Record Successfully.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // PATIENT ARRIVAL
  const patientArrival = (patId) => {
    onPendingClose(true);
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "http://192.168.3.135/zcmc_referral_api/api/arrived_referred_patient.php",
            {
              patId: patId,
            }
          )
          .then((response) => {
            if (response.data.status === 1) {
              axios
                .get(
                  "http://192.168.3.135/zcmc_referral_api/api/get_pending_ref.php",
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
                      Swal.fire("Success!", "Record Successfully.", "success");
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

  const submit = async () => {
    let decline = await api.post("/transfer.php", {
      patientId: patientId,
      referredTo: selectRef,
      reason: reason,
    });
    if (decline.data.status === 1) {
      toast({
        position: "top",
        title: decline.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setReason("");
      onDeclinedClose();
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    let pat = await api.get("/get_patients.php");
    setPatients(pat.data);

    let pending = await api.get("/get_pending_patients.php");
    setPendingPat(pending.data);

    let count = await api.get("/get_cancelled.php");
    setCount(count.data);

    if (pat) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getHospitals = async () => {
      let response = await api.get("/get_local_hospitals.php");
      setHospitals(response.data);
    };
    getHospitals();
    fetchData();
  }, []);

  return (
    <div>
      <Container maxW="100%">
        <div className="table-container">
          <Box float="right">
            <Link
              fontSize="14px"
              onClick={() => {
                onCancelledOpen();
              }}
              color="red.600"
            >
              View Cancelled Referrals ({count.length})
            </Link>
          </Box>

          <Text fontWeight={800} fontSize={20} mb={5}>
            REFERRED PATIENTS
          </Text>

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
                _hover={{ borderColor: "green" }}
                _focus={{
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "green",
                }}
              />
            </InputGroup>
          </div>

          {/* <Button onClick={hey}>Get Headers</Button> */}

          {isLoading ? (
            <Center my={20}>
              <Spinner />
            </Center>
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
                  {!patients ? (
                    <Tr>
                      <Td colSpan={7} textAlign="center">
                        Nothing to show
                      </Td>
                    </Tr>
                  ) : (
                    patients
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
                      })
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Container>

      {/* MODAL VIEW DETAILS */}
      <Modal isOpen={isReferredOpen} onClose={onReferredClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {IsLoadingDetails ? (
              <Center my={20}>
                <Spinner />
              </Center>
            ) : (
              details.map((d) => {
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
                          <BiUser
                            style={{ marginRight: "5px", marginTop: 2 }}
                          />
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
                          <BiStats
                            style={{ marginRight: "5px", marginTop: 2 }}
                          />
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
                        <Text textTransform="uppercase">
                          Discharge diagnosis
                        </Text>
                      </small>

                      <Box>
                        {d.dischDiagnosis === "" ||
                        d.dischDiagnosis === null ? (
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
                        {d.finalDiagnosis === "" ||
                        d.finalDiagnosis === null ? (
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
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onReferredClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODAL VIEW DETAILS */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isCancelledOpen}
        onClose={onCancelledClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancelled Referrals</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CancelledModal />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCancelledClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isDeclinedOpen}
        onClose={onDeclinedClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Refuse and Transfer Referral</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Reason</FormLabel>
              <Textarea
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>Refer to</FormLabel>
              <Select
                options={hospitals}
                placeholder="Select Hospital"
                variant="flushed"
                selectedOptionStyle="check"
                closeMenuOnSelect={true}
                focusBorderColor="#058e46"
                onChange={(e) => {
                  setSelectedRef(e.value);
                }}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" size="sm" onClick={submit}>
              Submit
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              ml={3}
              onClick={onDeclinedClose}
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
