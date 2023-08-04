import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Input,
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import "../Styles/Patients.css";
import moment from "moment";
import {
  BiCalendarEvent,
  BiChevronDown,
  BiFile,
  BiStats,
  BiUser,
} from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbCheckupList, TbUsers } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";
import api from "../API/Api";
import Spinner from "./Spinner";
import inbox from "../Assets/inbox.png";

const header = [
  {
    title: "Patient ID",
  },
  {
    title: "Fullname",
  },
  { title: "Referred Date" },
  {
    title: "Discharge Date",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

const ReferredPatients = () => {
  let navigate = useNavigate();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hospital, setHospital] = useState("");
  const [patients, setPatients] = useState([]);
  const [details, setDetails] = useState([]);
  const [taguId, setTaguId] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");

  const fetchPatient = async () => {
    setIsLoading(true);
    let pat = await api.get("/get_patients.php");

    let tagu = await api.get("/get_tagubilinId.php");
    setTaguId(tagu.data);

    if (pat) {
      setPatients(pat.data);
      setIsLoading(false);

      console.log(patients);
    }
  };

  const getDetails = async (id) => {
    setIsLoadingDetails(true);
    let deets = await api.get("/get_details.php", { params: { id: id } });

    if (deets) {
      setDetails(deets.data);
      setIsLoadingDetails(false);
    }
  };

  const navigateTagubilin = (id) => {
    navigate({ pathname: "/hospitagubilin/" + id });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    fetchPatient();
  }, []);

  return (
    <>
      <Box px={10}>
        <Flex alignItems="center" my={7}>
          <Heading
            fontWeight={700}
            fontSize={33}
            color="teal.900"
            mr={3}
            textTransform="uppercase"
          >
            Referred Patients
          </Heading>
          <TbUsers fontSize={30} color="teal" />
        </Flex>
        <Box display="flex" justifyContent="space-between" marginBottom={10}>
          <Input
            fontSize="14px"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            width="400px"
            _hover={{ borderColor: "green" }}
            _focus={{
              boxShadow: "none",
              outline: "none",
              borderColor: "green",
            }}
            bgColor="white"
          />

          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => {
              navigate("/home");
            }}
          >
            + Refer Patient
          </Button>
        </Box>
        {isLoading ? (
          <Center my={20}>
            <Spinner />
          </Center>
        ) : (
          <>
            <Flex borderRadius="sm" mb={5} boxShadow="sm">
              {header.map((h) => {
                return (
                  <>
                    <Box bgColor="white" width="full" p={2}>
                      <Text color="#4C4C4C" textAlign="center">
                        {h.title}{" "}
                      </Text>
                    </Box>
                  </>
                );
              })}
            </Flex>

            {patients.length === 0 ? (
              <Box align="center" p={5} bgColor="white">
                <img
                  src={inbox}
                  style={{ marginBottom: 5 }}
                  alt="nothing to show"
                />
                <Text textAlign="center" fontSize={13} color="#9DB2BF">
                  Nothing to show
                </Text>
              </Box>
            ) : (
              patients
                .filter((val, key) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.patientName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((pat, key) => {
                  const isEven = key % 2 === 0;
                  const backgroundColor = isEven ? "white" : "#e9ffff";
                  return pat.referredFrom.toUpperCase() ===
                    hospital.toUpperCase() ? (
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
                          <Text fontWeight={600}>{pat.patId}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>{pat.patientName}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text> {moment(pat.referredDate).format("LLL")}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          {pat.dischDate == null ? (
                            <Badge colorScheme="yellow"> Not applicable</Badge>
                          ) : (
                            moment(pat.dischDate).format("LLL")
                          )}
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text fontWeight={600}>
                            {" "}
                            {pat.dischDate === null ? (
                              <Badge colorScheme="blue">+ Admitted</Badge>
                            ) : (
                              <Badge colorScheme="red">- Discharged</Badge>
                            )}
                          </Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<BiChevronDown />}
                              colorScheme="blue"
                              size="sm"
                            >
                              Action
                            </MenuButton>
                            <MenuList size="sm" borderColor="blue.500">
                              <MenuItem
                                minH="40px"
                                fontSize="15px"
                                onClick={() => {
                                  onOpen();
                                  getDetails(pat.PK_patientId);
                                }}
                                icon={<BsEye />}
                              >
                                View Details
                              </MenuItem>

                              {taguId.map((t, k) => {
                                return t.PK_tagubilinId ===
                                  pat.FK_psPatRegisters ? (
                                  <MenuItem
                                    key={k}
                                    minH="40px"
                                    fontSize="15px"
                                    onClick={() => {
                                      navigateTagubilin(pat.FK_psPatRegisters);
                                    }}
                                    icon={<BiFile />}
                                  >
                                    View Tagubilin
                                  </MenuItem>
                                ) : (
                                  ""
                                );
                              })}
                            </MenuList>
                          </Menu>
                        </Box>
                      </Flex>
                    </>
                  ) : (
                    ""
                  );
                })
            )}
          </>
        )}
      </Box>

      {/* MODAL VIEW DETAILS */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoadingDetails ? (
              <Center mt={10}>
                <Spinner />
              </Center>
            ) : (
              details.map((d, key) => {
                return (
                  <>
                    <Grid templateColumns="repeat(2, 1fr)" mt={3} key={key}>
                      <GridItem>
                        <small
                          style={{
                            display: "flex",
                            marginBottom: "4px",
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
                            marginBottom: "4px",
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
                          <Text textTransform="uppercase">Admission date</Text>
                        </small>
                        <Text fontSize="15px">
                          {moment(d.registryDate).format("ll H:mm")}
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReferredPatients;
