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
  Divider,
  Link,
  Flex,
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
  FormErrorMessage,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Spinner";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {
  GoArrowSmallUp,
  GoArrowUp,
  GoCheck,
  GoMarkdown,
  GoX,
} from "react-icons/go";
import Swal from "sweetalert2";
import { HiArrowDown } from "react-icons/hi";

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
  const [data, setData] = useState([]);

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

  const patientArrival = async () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post(
          "http://192.168.3.135/zcmc_referral_api/api/arrived_referred_patient.php",
          {
            patId: id,
          }
        );

        if (res) {
          console.log(res.data, data);
          if (res.data.status === 1) {
            fetch(
              "https://script.google.com/macros/s/AKfycbyxewj4ORHUXIxYuxtkxwnapk8DfQjczGG-iX331VhUe3DEBPWdJXOxqwpaOggRGVzITg/exec?action=postData",
              {
                method: "POST",
                body: JSON.stringify(data),
              }
            ).then((response) => {
              if (response) {
                Swal.fire("Success!", "Record Successfully.", "success");
              } else {
                Swal.fire("Error!", "Something went wrong.", "error");
              }
            });
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        } else {
          console.log("Something went wrong!");
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
      setData(details.data);
      setPatientStat(details.data.status);
    }
  };

  useEffect(() => {
    axios
      .get(`http://192.168.3.135/zcmc_referral_api/api/get_comment.php/${id}`)
      .then((response) => {
        setRemarks(response.data);
        // setIsLoading(false);
      });

    const getHospitals = async () => {
      let response = await api.get("/get_local_hospitals.php");
      setHospitals(response.data);
    };
    getHospitals();
    getDetails();
  }, [id, remarks]);
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <Box w="95%" bg="white" p={5} zIndex={50} pos="fixed">
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
            {patientStat === "accepted" ? (
              <Button
                colorScheme="blue"
                mr={3}
                leftIcon={<HiArrowDown fontSize="20px" />}
                onClick={() => {
                  patientArrival();
                }}
              >
                Patient Arrived
              </Button>
            ) : patientStat === "arrived" ? (
              ""
            ) : (
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
                    <OpcenReferral patientId={id} />
                  </Box>
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
                                dept={"Zamboanga City Medical Center (OPCEN)"}
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
