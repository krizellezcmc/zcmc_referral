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
} from "@chakra-ui/react";
import Header from "../Components/Header";
import api from "../API/Api";
import Swal from "sweetalert2";
import { BiSearch } from "react-icons/bi";

function PreTriageHome(props) {
  const [list, setList] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getList = async () => {
      let response = await api.get("/get_accepted_triage.php");
      setList(response.data);
    };
    getList();
  });

  const patientArrival = async (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/arrived_referred_patient.php", {
          patId: id,
        });

        if (res) {
          //   console.log(res.data, data);
          if (res.data.status === 1) {
            let details = await api.get("/get_pending_ref.php", {
              params: { id: id },
            });
            if (details) {
              fetch(
                "https://script.google.com/macros/s/AKfycbyxewj4ORHUXIxYuxtkxwnapk8DfQjczGG-iX331VhUe3DEBPWdJXOxqwpaOggRGVzITg/exec?action=postData",
                {
                  method: "POST",
                  body: JSON.stringify(details.data),
                }
              ).then((response) => {
                if (response) {
                  Swal.fire("Success!", "Record Successfully.", "success");
                } else {
                  Swal.fire("Error!", "Something went wrong.", "error");
                }
              });
            }
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        } else {
          console.log("Something went wrong!");
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="content">
        <Header />
        <div className="">
          <Container maxW="80%" mt={10}>
            <Text fontWeight="bolder" fontSize="20px">
              INCOMING PATIENTS
            </Text>
            <Box py={5}>
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
              borderRadius="lg"
              border="1px"
              borderColor="gray.300"
              boxShadow="md"
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
              {list.length === 0 ? (
                <Box p={2}>
                  <Text textAlign="center">---Nothing to Show---</Text>
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
                        val.status.toLowerCase().includes(search.toLowerCase())
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
                                <Text fontWeight="900" fontSize="13px" mb={1}>
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
                                  onClick={() => patientArrival(e.patientId)}
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
            </Box>
            <Divider />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default PreTriageHome;
