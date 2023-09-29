import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import {
  Box,
  Text,
  Divider,
  InputGroup,
  InputLeftElement,
  Input,
  Spacer,
  Center,
  Button,
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
  Grid,
  GridItem,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../Components/Sidebar";
import OpcenTable from "../Components/OpcenTable";
import { BiRefresh, BiSearch } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { TbAmbulance } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import CancelledModal from "../Components/CancelledModal";
import inbox from "../Assets/inbox.png";
import moment from "moment";
import patient from "../Assets/patient.png";

const header = [
  {
    title: "Patient",
  },
  {
    title: "Hospital",
  },
  { title: "Referred Date and Time" },
  {
    title: "Status",
  },
];
function OpcenHome() {
  const [showContent, setShowContent] = useState(false);
  const [list, setList] = useState([]);
  const [pending, setPending] = useState([]);
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
  const naviOpcenH2 = (id) => {
    navigate({ pathname: "/opcenhome/" + id });
  };
  const fetchPatients = async (e) => {
    try {
      setIsLoading(true);

      const [pat, count, pending] = await Promise.all([
        api.get("/get_list.php"),
        api.get("/get_cancelled.php"),
        api.get("/get_pending_referrals.php"),
      ]);
      console.log(pending.data);
      setList(pat.data);
      setCount(count.data);
      setPending(pending.data);
      setIsLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching patients:", error);
      setIsLoading(false);
    }
  };

  const comments = async () => {
    setIsLoading(true);
    let comment = await api.get(`/get_comment.php/${selected}`);
    if (comment) {
      setRemarks(comment.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    comments();
    fetchPatients();
  }, [selected]);

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{ backgroundColor: "#F0F8F8", flex: 1 }}
            className="content-wrapper"
          >
            <Box px={10}>
              <Flex alignItems="flex-end" mb={7} mt={10}>
                <Heading fontWeight={700} fontSize={33} color="teal.900" mr={3}>
                  REFERRALS
                </Heading>
                <TbAmbulance fontSize={33} style={{ color: "teal" }} />
                <Spacer />
              </Flex>
              <Grid templateColumns="repeat(8, 1fr)" gap={5}>
                <GridItem colSpan={6}>
                  <Flex my={10} gap={2}>
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
                        backgroundColor="white"
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
                        Cancelled Referrals ({count.length})
                      </Button>
                    </Box>
                  </Flex>
                  <Flex borderRadius="sm" mb={5} boxShadow="sm">
                    {header.map((h) => {
                      return (
                        <>
                          <Box bgColor="white" width="full" p={2}>
                            <Text
                              color="#4C4C4C"
                              textAlign="center"
                              fontWeight={600}
                            >
                              {h.title}{" "}
                            </Text>
                          </Box>
                        </>
                      );
                    })}
                  </Flex>

                  <Box
                    w="100%"
                    bgColor="white"
                    borderRadius="sm"
                    boxShadow="sm"
                    mt={2}
                    mb={10}
                  >
                    {isLoading ? (
                      <Center py={20}>
                        <Spinner />
                      </Center>
                    ) : (
                      <>
                        {list.length === 0 ? (
                          <Box
                            py={3}
                            align="center"
                            bgColor="white"
                            borderRadius="sm"
                            boxShadow="sm"
                          >
                            <img
                              src={inbox}
                              alt="inbox"
                              style={{ marginBottom: 5 }}
                            />
                            <Text
                              textAlign="center"
                              fontSize={13}
                              color="#9DB2BF"
                            >
                              Nothing to Show
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
                                      isFlag={e.flags}
                                    />
                                  </>
                                );
                              })}{" "}
                            <Divider />
                          </>
                        )}
                      </>
                    )}
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box bgColor="white" borderRadius={10} boxShadow="sm" p={5}>
                    <Text fontWeight={600} mb={10} color="#1F8383">
                      Incoming Referrals
                    </Text>

                    <VStack spacing={2}>
                      {pending.length !== 0 ? (
                        pending.map((ref) => {
                          return (
                            <>
                              <Box
                                width="full"
                                borderRadius="3xl"
                                padding={3}
                                bgColor="#e3f8f8"
                                p={4}
                              >
                                <Flex alignItems="center" gap={5} px={1}>
                                  <img
                                    src={patient}
                                    alt="patient"
                                    width="35px"
                                  />
                                  <Box>
                                    <Text fontSize={13} fontWeight={700}>
                                      {ref.label + ", " + ref.age} yr/s old
                                    </Text>

                                    <Text
                                      fontSize={11}
                                      fontWeight={500}
                                      fontStyle="italic"
                                    >
                                      {ref.facility}
                                    </Text>
                                    <Text fontSize={11} fontWeight={500} pt={2}>
                                      {moment(ref.date).startOf().fromNow()}
                                    </Text>
                                  </Box>

                                  <Spacer></Spacer>
                                  <IconButton
                                    size="sm"
                                    variant="outline"
                                    colorScheme="teal"
                                    borderRadius="full"
                                    onClick={() => {
                                      naviOpcenH2(ref.value);
                                    }}
                                    icon={<BsArrowRightShort fontSize={20} />}
                                  />
                                </Flex>
                              </Box>
                            </>
                          );
                        })
                      ) : (
                        <>
                          <Box pb={3} align="center">
                            <img src={inbox} alt="inbox" />
                            <Text
                              color="#4C4C4C"
                              mt={3}
                              fontSize={13}
                              fontWeight={600}
                            >
                              Nothing to show
                            </Text>
                          </Box>
                        </>
                      )}
                    </VStack>
                  </Box>
                </GridItem>
              </Grid>
            </Box>

            {/* //Modal */}

            <Modal
              closeOnOverlayClick={false}
              isOpen={isCancelledOpen}
              onClose={onCancelledClose}
              size="8xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Cancelled Referrals</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={5}>
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
    </div>
  );
}

export default OpcenHome;
