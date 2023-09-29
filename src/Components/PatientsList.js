import React, { useEffect, useState } from "react";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import {
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
  Spacer,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Flex,
  Heading,
} from "@chakra-ui/react";
import moment from "moment";
import "../Styles/Patients.css";
import "../Styles/Table.css";
import { Select } from "chakra-react-select";

import Spinner from "./Spinner";

import { BiCalendarEvent, BiSearch, BiStats, BiUser } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbCheckupList, TbUsers } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";
import inbox from "../Assets/inbox.png";

const header = [
  {
    title: "Full Name",
  },
  {
    title: "Referred Date",
  },
  { title: "Referred From" },
  {
    title: "Discharge Date",
  },
  {
    title: "Status",
  },
];

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
      <Flex alignItems="center" mb={7} px={10} mt={10}>
        <Heading
          fontWeight={700}
          fontSize={33}
          color="teal.900"
          mr={3}
          textTransform="uppercase"
        >
          Patients
        </Heading>
        <TbUsers fontSize={30} style={{ color: "teal" }} />
        <Spacer />
      </Flex>

      <Box py={2} px={10}>
        <InputGroup mb={8}>
          <InputLeftElement
            pointerEvents="none"
            children={<BiSearch color="gray.300" />}
          />
          <Input
            bg="white"
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

        <Alert
          status="info"
          variant="left-accent"
          borderRadius="lg"
          my={1}
          width="50%"
        >
          <AlertIcon />
          <AlertTitle fontSize={13}>Note:</AlertTitle>
          <AlertDescription fontSize={13}>
            The following patients are retrieved from Bizbox.
          </AlertDescription>
        </Alert>
      </Box>

      {/* <Button onClick={hey}>Get Headers</Button> */}

      {isLoading ? (
        <Center my={20}>
          <Spinner />
        </Center>
      ) : (
        <>
          <Box px={10}>
            <Flex borderRadius="sm" mb={5} boxShadow="sm">
              {header.map((h) => {
                return (
                  <>
                    <Box bgColor="white" width="full" p={2}>
                      <Text color="#4C4C4C" textAlign="center" fontWeight={600}>
                        {h.title}{" "}
                      </Text>
                    </Box>
                  </>
                );
              })}
            </Flex>

            {patients.length === 0 ? (
              <Box
                width="full"
                bgColor="white"
                align="center"
                p={5}
                boxShadow="sm"
                borderRadius="sm"
              >
                <img src={inbox} alt="inbox" style={{ marginBottom: 5 }} />
                <Text fontSize={13} color="#9DB2BF">
                  Nothing to show
                </Text>
              </Box>
            ) : (
              patients
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.patientName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((pat, p) => {
                  const isEven = p % 2 === 0;
                  const backgroundColor = isEven ? "white" : "#e9ffff";
                  return (
                    <>
                      <Flex
                        bgColor={backgroundColor}
                        color="#3E9393"
                        fontWeight={600}
                        fontSize={13}
                        alignItems="center"
                        boxShadow="sm"
                      >
                        <Box width="full" p={2} textAlign="center">
                          <Text>{pat.patientName}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text> {moment(pat.referredDate).format("LLL")}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>{pat.referredFrom}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>
                            {" "}
                            {pat.dischDate == null ? (
                              <Badge colorScheme="yellow">Not applicable</Badge>
                            ) : (
                              moment(pat.dischDate).format("LLL")
                            )}
                          </Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>
                            {" "}
                            {pat.dischDate === null ? (
                              <Badge colorScheme="blue">+ Admitted</Badge>
                            ) : (
                              <Badge colorScheme="red">- Discharged</Badge>
                            )}
                          </Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
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
                        </Box>
                      </Flex>
                    </>
                  );
                })
            )}
          </Box>
        </>
      )}

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
