import {
  Container,
  HStack,
  Text,
  Box,
  Badge,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  GridItem,
  Grid,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "../Styles/Patients.css";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import {
  BiCalendar,
  BiCalendarEvent,
  BiClinic,
  BiIdCard,
  BiStats,
  BiUser,
} from "react-icons/bi";
import Loading from "../Components/Spinner";
import {
  TbBuildingHospital,
  TbCheckupList,
  TbTransferIn,
  TbTransferOut,
} from "react-icons/tb";
import moment from "moment";
import { GoCheck } from "react-icons/go";
import Swal from "sweetalert2";

function Referrals(props) {
  let navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [IsLoadingDetails, setIsLoadingDetails] = useState(false);
  const getReferrals = async () => {
    let response = await api.get("get_temp_referral.php", {
      params: {
        id: user.FK_hospitalId,
      },
    });

    setData(response.data);
    // console.log(user.FK_hospitalId);
  };

  const refuse = (id) => {
    onClose();
    Swal.fire({
      text: "Please indicate reason for rejecting the referral",
      icon: "warning",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
      preConfirm: (data) => {
        if (!data) {
          Swal.showValidationMessage(`This field is required`);
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post("/decline_referred_patient.php", {
          id: id,
          reason: result.value,
        });
        if (response.data.status === 1) {
          Swal.fire("Refused!", "Record updated.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // ACCEPT PATIENT
  const acceptPatient = (routeId) => {
    onClose(true);
    Swal.fire({
      text: "Are you sure you want to accept this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post("/accept_referral.php", {
          patId: selected,
          routeId: routeId,
        });

        console.log(response.data);

        if (response.data.status === 1) {
          Swal.fire("Success!", "Record Successfully.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const viewMore = (id) => {
    navigate({ pathname: "/referrals/" + id });
  };

  useEffect(() => {
    getReferrals();
    console.log(data);
  }, []);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper">
            <Container maxW="92%" mt={5}>
              <Flex alignItems="center" mb={7}>
                <Heading
                  fontWeight={700}
                  fontSize={33}
                  color="teal.900"
                  mr={3}
                  textTransform="uppercase"
                >
                  Referrals
                </Heading>
                <TbTransferOut fontSize={30} />
              </Flex>
              <Box
                w="100%"
                bg="white"
                borderRadius="lg"
                padding={1}
                border="1px"
                borderColor="gray.100"
                boxShadow="md"
                py={3}
              >
                <HStack>
                  <Box w="100%" textAlign="center">
                    <Text fontWeight="800" fontSize="13.5px">
                      PATIENT
                    </Text>
                  </Box>

                  {/* <Box w="100%" textAlign="center">
                    <Text fontWeight="800" fontSize="13.5px">
                      REFERRED TO
                    </Text>
                  </Box> */}
                  <Box w="100%" textAlign="center">
                    <Text fontWeight="800" fontSize="13.5px">
                      REFERRED FROM
                    </Text>
                  </Box>
                  <Box w="100%" textAlign="center">
                    <Text fontWeight="800" fontSize="13.5px">
                      STATUS
                    </Text>
                  </Box>
                </HStack>
              </Box>
              <Box
                w="100%"
                bg="white"
                borderRadius="md"
                border="1px"
                borderColor="gray.100"
                boxShadow="base"
                mt={3}
              >
                {data.length === 0 ? (
                  <Box p={5}>
                    <Text textAlign="center">---Nothing to Show---</Text>
                  </Box>
                ) : (
                  <>
                    {data.map((e, k) => {
                      return (
                        <>
                          <Box
                            as="button"
                            w="100%"
                            _hover={{
                              background: "green.50",
                              color: "black",
                              borderLeft: "2px",
                              borderColor: "green",
                              transform: "scale(1.00)",
                            }}
                            py={3}
                            onClick={() => {
                              e.statRoute === "accepted"
                                ? viewMore(e.patientId)
                                : onOpen();
                              setSelected(e.patientId);
                            }}
                          >
                            <HStack>
                              <Box w="100%" textAlign="center">
                                <Text fontWeight="900" fontSize="13px">
                                  {e.lastname +
                                    ", " +
                                    e.firstname +
                                    " " +
                                    e.middleName}
                                </Text>
                                <Text fontSize="12px" fontWeight={500}>
                                  Gender: {e.sex}{" "}
                                </Text>
                                <Text fontSize="12px" fontWeight={500}>
                                  Specialization: {e.specialization}
                                </Text>
                              </Box>
                              {/* 
                          <Box w="100%" textAlign="center">
                            <Text fontWeight="500" fontSize="13px">
                              {e.name}
                            </Text>
                          </Box> */}
                              <Box w="100%" textAlign="center">
                                <Text fontWeight="500" fontSize="13px">
                                  {e.refFacility}
                                </Text>
                              </Box>
                              <Box w="100%" textAlign="center">
                                <Badge
                                  variant="subtle"
                                  fontWeight="bolder"
                                  fontSize="13px"
                                  colorScheme="green"
                                >
                                  {e.status}
                                </Badge>
                              </Box>
                            </HStack>
                          </Box>
                          <Divider />
                        </>
                      );
                    })}
                  </>
                )}
              </Box>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>PATIENT REFERRAL HISTORY</ModalHeader>
                <ModalCloseButton />

                {IsLoadingDetails ? (
                  <Center my={20}>
                    <Loading />
                  </Center>
                ) : (
                  data
                    .filter((e) => e.patientId === selected)
                    .map((d) => {
                      return (
                        <>
                          <ModalBody>
                            <Grid templateColumns="repeat(2, 1fr)" mt={3}>
                              <GridItem>
                                <small
                                  style={{
                                    display: "flex",
                                    marginBottom: 4,
                                  }}
                                >
                                  <BiUser
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Patient name
                                  </Text>
                                </small>
                                <Text fontWeight="600">
                                  {d.lastname +
                                    ", " +
                                    d.firstname +
                                    " " +
                                    d.middleName +
                                    " " +
                                    d.extended}
                                </Text>
                              </GridItem>

                              <GridItem>
                                <small
                                  style={{
                                    display: "flex",
                                    marginBottom: 4,
                                  }}
                                >
                                  <BiIdCard
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Patient ID
                                  </Text>
                                </small>
                                <Text fontSize="14px">{d.patientId}</Text>
                              </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(2, 1fr)" mt={10}>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <TbBuildingHospital
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Referred from
                                  </Text>
                                </small>
                                <Text fontSize="15px" fontWeight={500}>
                                  {d.refFacility}
                                </Text>
                              </GridItem>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <BiCalendarEvent
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Referred date
                                  </Text>
                                </small>
                                <Text fontSize="15px">
                                  {moment(d.referredDate).format("lll")}
                                </Text>
                              </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(4, 1fr)" mt={10}>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <BiUser
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">Sex</Text>
                                </small>
                                <Text fontSize="15px" fontWeight={500}>
                                  {d.sex}
                                </Text>
                              </GridItem>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <BiCalendarEvent
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Birthdate
                                  </Text>
                                </small>
                                <Text fontSize="15px">
                                  {moment(d.birthdate).format("LL")}
                                </Text>
                              </GridItem>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <BiCalendarEvent
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">Age</Text>
                                </small>
                                <Text fontSize="15px">{d.age}</Text>
                              </GridItem>
                              <GridItem>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <BiStats
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Civil Status
                                  </Text>
                                </small>
                                <Text fontSize="15px">{d.civilStatus}</Text>
                              </GridItem>
                            </Grid>
                            <Box mt={8} bg="gray.50" p={6}>
                              <Text fontWeight={500}>Admitting Details</Text>
                              <Divider my={2} />

                              <Grid templateColumns="repeat(3, 1fr)" mt={8}>
                                <GridItem>
                                  <small
                                    style={{
                                      display: "flex",
                                      marginBottom: 6,
                                    }}
                                  >
                                    <BiCalendar
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Date Admitted
                                    </Text>
                                  </small>
                                  <Text fontSize="15px" fontWeight={500}>
                                    {moment(d.dateAdmitted).format("LL")}
                                  </Text>
                                </GridItem>
                                <GridItem>
                                  <small
                                    style={{
                                      display: "flex",
                                      marginBottom: 6,
                                    }}
                                  >
                                    <BiStats
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Referral
                                    </Text>
                                  </small>
                                  <Text fontSize="15px">{d.refType}</Text>
                                </GridItem>
                                <GridItem>
                                  <small
                                    style={{
                                      display: "flex",
                                      marginBottom: 6,
                                    }}
                                  >
                                    <BiClinic
                                      style={{
                                        marginRight: "5px",
                                        marginTop: 2,
                                      }}
                                    />
                                    <Text textTransform="uppercase">
                                      Specialization
                                    </Text>
                                  </small>
                                  <Text fontSize="15px">
                                    {d.specialization}
                                  </Text>
                                </GridItem>
                              </Grid>

                              <Box mt={8}>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <TbCheckupList
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Chief Complaints
                                  </Text>
                                </small>

                                <Box p={3} bg="gray.100" borderRadius="5px">
                                  <Text fontSize="13px">
                                    {d.chiefComplaints}
                                  </Text>
                                </Box>
                              </Box>

                              <Box mt={6}>
                                <small
                                  style={{ display: "flex", marginBottom: 6 }}
                                >
                                  <TbCheckupList
                                    style={{
                                      marginRight: "5px",
                                      marginTop: 2,
                                    }}
                                  />
                                  <Text textTransform="uppercase">
                                    Diagnosis
                                  </Text>
                                </small>

                                <Box p={3} bg="gray.100" borderRadius="5px">
                                  <Text fontSize="13px">{d.diagnosis}</Text>
                                </Box>
                              </Box>
                            </Box>{" "}
                          </ModalBody>
                          <ModalFooter>
                            {d.statRoute !== "waiting" ? (
                              " "
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  mr={3}
                                  colorScheme="green"
                                  onClick={() => {
                                    acceptPatient(d.PK_routeId);
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
                                    refuse(d.PK_routeId);
                                  }}
                                >
                                  Refuse
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  size="sm"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Close
                                </Button>
                              </>
                            )}
                          </ModalFooter>
                        </>
                      );
                    })
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
