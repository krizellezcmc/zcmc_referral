import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import OpcenReferral from "../Components/OpcenReferral";
import {
  Badge,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Center,
  GridItem,
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";

import Sidebar from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack, BiDownload } from "react-icons/bi";
import { GoArrowUp, GoCheck } from "react-icons/go";
import Swal from "sweetalert2";
import moment from "moment";

function OpcenHome2(props) {
  const [patientStat, setPatientStat] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isDeclinedOpen,
    onOpen: onDeclinedOpen,
    onClose: onDeclinedClose,
  } = useDisclosure();

  const [reason, setReason] = useState("");
  const [selectRef, setSelectedRef] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");

  const [rejectReason, setRejectReason] = useState("");

  const { user } = useAuth();
  const { id } = useParams();
  let toast = useToast();

  const navigate = useNavigate();

  function homeOpcen() {
    navigate("/opcen");
  }
  const handleAcceptPatient = (patId) => {
    Swal.fire({
      text: "Are you sure you want to accept this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post("/accept_referred_patient.php", {
          patId: patId,
        });

        if (response.data.status === 1) {
          Swal.fire("Accepted!", "Patient referral accepted.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong. Try again!", "error");
        }
      }
    });
  };

  const submit = async () => {
    let decline = await api.post("/transfer.php", {
      patientId: id,
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

  const getDetails = async () => {
    let details = await api.get("/get_pending_ref.php", {
      params: { id: id },
    });
    if (details) {
      setPatientStat(details.data.status);
      setArrivalTime(details.data.arrival_time);
      setRejectReason(details.data.rejectReason);
    }
  };

  const comments = async () => {
    // setIsLoading(true);
    let comment = await api.get(`/get_comment.php/${id}`);
    if (comment) {
      setRemarks(comment.data);
      setIsLoading(false);
    }
  };

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
  useEffect(() => {
    const getHospitals = async () => {
      let response = await api.get("/get_list.php");
      setHospitals(response.data);
    };
    comments();
    getHospitals();
    getDetails();
  }, [id, remarks]);

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <Box w="75%" bg="white" p={4} zIndex={50} pos="fixed" mb={5}>
          <Button
            onClick={homeOpcen}
            variant="outline"
            colorScheme="green"
            leftIcon={<BiArrowBack />}
          >
            Back
          </Button>
          {/* <Box float="right" p={10}> */}

          <Box float="right">
            {patientStat === "pending" ? (
              <>
                <Button
                  colorScheme="green"
                  mr={3}
                  leftIcon={<GoCheck fontSize="20px" />}
                  onClick={() => {
                    handleAcceptPatient(id);
                  }}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  leftIcon={<GoArrowUp fontSize="20px" />}
                  onClick={onDeclinedOpen}
                >
                  Transfer
                </Button>
              </>
            ) : patientStat === "arrived" ? (
              <Box
                width="100%"
                padding={3}
                borderRadius="lg"
                border="1px"
                borderColor="green.500"
              >
                <HStack>
                  <Text fontSize="13px">Status:</Text>
                  <Text color="green" fontSize="13px" fontWeight={500}>
                    ARRIVED
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize="13px">Date and Time:</Text>
                  <Text fontSize="13px" color="green" fontWeight={400}>
                    {moment(arrivalTime).format("LLL")}
                  </Text>
                </HStack>
              </Box>
            ) : patientStat === "accepted" ? (
              <Button
                size="sm"
                colorScheme="red"
                variant="solid"
                onClick={() => cancelReferral(id)}
              >
                Cancel Referral
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
        {/* </Box> */}
        <div className="">
          {/* {isLoading ? (
              <Container>
                <Loading />
              </Container>
            ) : ( */}

          <Container mt={100} maxW="container.xl">
            <Tabs variant="enclosed">
              <TabList mb="1em">
                <Tab>
                  <Text>Patient Referral</Text>
                </Tab>
                <Tab>
                  <Text>
                    Remarks
                    <Badge ml="1.5" colorScheme="blue">
                      {remarks.length}
                    </Badge>
                  </Text>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box px={20}>
                    <OpcenReferral patientId={id} status={patientStat} />
                    {/* <ReferralDownload patientId={id} /> */}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Container maxW="container.lg" px={20}>
                    <AddComment patientId={id} user={user?.userId} />

                    <Box>
                      {isLoading ? (
                        <Center>
                          <Spinner />
                        </Center>
                      ) : (
                        <>
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
                                    file={el.attachment}
                                  />
                                ) : (
                                  <Comment
                                    remark={el.remark}
                                    date={el.remark_tstamp}
                                    user={el.firstName + " " + el.lastName}
                                    dept={el.name}
                                    file={el.attachment}
                                  />
                                )}
                              </>
                            );
                          })}
                        </>
                      )}
                    </Box>
                  </Container>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
          <Modal
            closeOnOverlayClick={false}
            isOpen={isDeclinedOpen}
            onClose={onDeclinedClose}
            size="2xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Transfer Referral</ModalHeader>
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
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default OpcenHome2;
