import {
  Box,
  Container,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
  Divider,
  Input,
  Center,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Spacer,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../API/Api";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { BiRefresh, BiSearch } from "react-icons/bi";
import AdmissionTable from "../Components/AdmissionTable";
import { TbUsers } from "react-icons/tb";

function AdmissionHome(props) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    window.location.href = "login";
  };

  const [list, setList] = useState([]);

  const getPatients = async () => {
    setIsLoading(true);
    let response = await api.get("/get_admission.php");
    setList(response.data);

    if (response) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />

          <Container maxW="92%" mt={10} mb={10}>
            <Flex alignItems="center">
              <Heading
                fontWeight={700}
                fontSize={33}
                color="teal.900"
                mr={3}
                textTransform="uppercase"
              >
                Patients
              </Heading>
              <TbUsers fontSize={30} />
            </Flex>
            <Box
              bgColor="white"
              // position="fixed"
              // w="1680px"
              pt={10}
              // zIndex={20}
            >
              <Box display="flex">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiSearch color="gray.300" />}
                  />
                  <Input
                    fontSize="15px"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search patient"
                    width="450px"
                    _hover={{ borderColor: "green" }}
                    _focus={{
                      boxShadow: "none",
                      outline: "none",
                      borderColor: "green",
                    }}
                  />
                </InputGroup>

                <Button
                  onClick={refreshPage}
                  rightIcon={<BiRefresh />}
                  colorScheme="teal"
                >
                  Refresh
                </Button>
              </Box>

              <Box
                w="100%"
                bgColor="white"
                borderRadius="lg"
                border="1px"
                borderColor="gray.50"
                boxShadow="base"
                py={3}
                mt={6}
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
            </Box>

            <Box
              w="100%"
              bgColor="white"
              borderRadius="md"
              border="1px"
              borderColor="gray.100"
              boxShadow="base"
              mt={2}
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
                              <AdmissionTable
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
            <Divider zIndex={20} />
          </Container>
        </div>
      </div>
    </>
  );
}

export default AdmissionHome;
