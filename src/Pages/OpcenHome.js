import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import {
  Box,
  Container,
  Text,
  HStack,
  Divider,
  InputGroup,
  InputLeftElement,
  Input,
  Spacer,
  Center,
  Button,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";

import useAuth from "../Hooks/useAuth";
// import Loading from "../Components/Spinner";
// import axios from "axios";
import Sidebar from "../Components/Sidebar";
import OpcenTable from "../Components/OpcenTable";
import { BiRefresh, BiSearch } from "react-icons/bi";
import { TbAmbulance } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import CancelledModal from "../Components/CancelledModal";

function OpcenHome() {
  const [showContent, setShowContent] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [count, setCount] = useState(0);

  const { user } = useAuth();

  const {
    isOpen: isCancelledOpen,
    onOpen: onCancelledOpen,
    onClose: onCancelledClose,
  } = useDisclosure();

  // const select = (e) => {
  //   setSelected(e);
  //   setIsLoading(false);
  //   setShowContent(true);
  // };

  let navigate = useNavigate();

  const fetchPatients = async (e) => {
    setIsLoading(true);
    let pat = await api.get("/get_list.php");
    setList(pat.data);

    let count = await api.get("/get_cancelled.php");
    setCount(count.data);

    if (pat) {
      setIsLoading(false);
    }
  };

  const comments = async () => {
    // setIsLoading(true);
    let comment = await api.get(`/get_comment.php/${selected}`);
    if (comment) {
      setRemarks(comment.data);
      setIsLoading(false);
    }
  };

  // function toRefer() {
  //   navigate("/referralform");
  // }

  useEffect(() => {
    // axios
    //   .get("http://192.168.3.121/zcmc_referral_api/api/get_comment.php", {
    //     params: { patientId: selected },
    //   })
    //   .then((response) => {
    //     setRemarks(response.data);
    //     setIsLoading(false);
    //   });
    comments();
    fetchPatients();
  }, [selected]);

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="">
          <Container maxW="90%" mt={5}>
            <Flex alignItems="center" mb={7} mt={10}>
              <Heading fontWeight={700} fontSize={33} color="teal.900" mr={3}>
                REFERRALS
              </Heading>
              <TbAmbulance fontSize={30} />
              <Spacer />
            </Flex>
            <HStack mt={10} mb={6} pos="relative">
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
              <Box>
                <Button
                  fontSize="14px"
                  size="md"
                  colorScheme="gray"
                  onClick={() => {
                    window.location.href = "/opcen";
                  }}
                  leftIcon={<BiRefresh />}
                >
                  Refresh
                </Button>
              </Box>
              <Box>
                <Button
                  fontSize="14px"
                  size="md"
                  colorScheme="green"
                  onClick={() => window.open("/referralform", "_blank")}
                >
                  + Add Referral
                </Button>
              </Box>

              <Box>
                <Button
                  fontSize="14px"
                  onClick={() => {
                    onCancelledOpen();
                  }}
                  colorScheme="red"
                >
                  View Cancelled Referrals ({count.length})
                </Button>
              </Box>
            </HStack>

            <Box
              w="100%"
              bg="white"
              borderRadius="lg"
              border="1px"
              borderColor="gray.50"
              boxShadow="base"
              py={3}
            >
              <HStack>
                <Box w="100%" textAlign="center">
                  <Text fontWeight="800" fontSize="13.5px">
                    PATIENT
                  </Text>
                </Box>

                <Box w="100%" textAlign="center">
                  <Text fontWeight="800" fontSize="13.5px">
                    HOSPITAL
                  </Text>
                </Box>
                <Box w="100%" textAlign="center">
                  <Text fontWeight="800" fontSize="13.5px">
                    REFERRED DATE AND TIME
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
              mt={2}
              mb={10}
            >
              {isLoading ? (
                <Center my={20}>
                  <Spinner />
                </Center>
              ) : (
                <>
                  {list.length === 0 ? (
                    <Box p={2}>
                      <Text textAlign="center" fontSize={13}>
                        --- Nothing to Show ---
                      </Text>
                    </Box>
                  ) : (
                    <>
                      {list
                        .filter((val) => {
                          if (search === "") {
                            return val;
                          } else if (
                            val.label
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            val.facility
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            val.status
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((e) => {
                          return (
                            <>
                              <OpcenTable
                                name={e.label}
                                value={e.value}
                                gender={e.gender}
                                facility={e.facility}
                                date={e.date}
                                status={e.status}
                                service={e.specialization}
                                age={e.age}
                              />
                            </>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </Box>
            <Divider />
          </Container>

          {/* //Modal */}

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
        </div>
      </div>
    </div>
  );
}

export default OpcenHome;
