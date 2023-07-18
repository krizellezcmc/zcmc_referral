import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Container,
  Badge,
  Divider,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import Header from "../Components/Header";
import api from "../API/Api";
import Swal from "sweetalert2";
import { BiRefresh, BiSearch } from "react-icons/bi";
import Loading from "../Components/Spinner";
import { TbAmbulance } from "react-icons/tb";

function PreTriageHome(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const patientArrival = async (id) => {
    try {
      const result = await Swal.fire({
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      });

      if (result.isConfirmed) {
        setLoad(true);
        const res = await api.post("/arrived_referred_patient.php", {
          patId: id,
        });

        if (res.data && res.data.status === 1) {
          Swal.fire("Arrived!", "Patient referral arrived.", "success").then(
            () => {
              getList();
            }
          );
          // Use the 'details' data as needed
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    } catch (error) {
      console.error("Error processing patient arrival:", error);
    }
  };

  const getList = async () => {
    let response = await api.get("/get_accepted_triage.php");
    if (response) {
      setList(response.data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <Header />
        <div className="">
          <Container maxW="100%" mt={2} p={8}>
            <Flex alignItems="center" mb={5}>
              <Heading fontWeight={700} fontSize={31} color="teal.900" mr={3}>
                Incoming Patients
              </Heading>
              <TbAmbulance fontSize={30} />
              <Spacer />
              <Button
                rightIcon={<BiRefresh />}
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Refresh
              </Button>
            </Flex>
            <Box pt={8}>
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
            </Box>

            <Box
              w="100%"
              bg="white"
              borderRadius="md"
              border="1px"
              borderColor="gray.300"
              boxShadow="sm"
              py={3}
              mt={5}
            >
              <HStack>
                <Box w="100%" textAlign="center">
                  <Text fontWeight="800" fontSize="13.5px">
                    PATIENT
                  </Text>
                </Box>

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
                <Box w="100%" textAlign="center">
                  <Text fontWeight="800" fontSize="13.5px">
                    ACTION
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box
              w="100%"
              bg="white"
              borderRadius="md"
              border="1px"
              borderColor="gray.300"
              boxShadow="base"
              mt={2}
            >
              {isLoading ? (
                <Center my={20}>
                  <Loading />
                </Center>
              ) : (
                <>
                  {list.length === 0 ? (
                    <Box py={4}>
                      <Text textAlign="center" fontSize={14}>
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
                            val.lastname
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            val.refFacility
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
                              <Box
                                w="100%"
                                _hover={{
                                  background: "green.50",
                                  color: "black",
                                  borderTop: "2px",
                                  borderColor: "green",
                                }}
                                py={3}
                                //   onClick={() => {
                                //     naviOpcenH2(props.value);
                                //   }}
                              >
                                <HStack>
                                  <Box w="100%" textAlign="center" p={2}>
                                    <Text
                                      fontWeight="900"
                                      fontSize="13px"
                                      mb={1}
                                    >
                                      {e.lastname +
                                        ", " +
                                        e.firstname +
                                        ", " +
                                        e.middleName}
                                    </Text>

                                    <Text fontSize="12px" fontWeight={800}>
                                      Referral Date and Time:
                                    </Text>
                                    <Text fontSize="12px" fontWeight={500}>
                                      {e.tstamp}
                                    </Text>
                                    <Text fontSize="12px" fontWeight={800}>
                                      Referral Type:
                                    </Text>
                                    <Text fontSize="12px" fontWeight={500}>
                                      {e.refType}
                                    </Text>
                                  </Box>

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
                                  <Box w="100%" textAlign="center">
                                    <Button
                                      size="sm"
                                      colorScheme="green"
                                      onClick={() =>
                                        patientArrival(e.patientId)
                                      }
                                      // isLoading={load}
                                      loadingText="Loading"
                                    >
                                      Arrived
                                    </Button>
                                  </Box>
                                </HStack>
                              </Box>
                              <Divider />
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
        </div>
      </div>
    </div>
  );
}

export default PreTriageHome;
