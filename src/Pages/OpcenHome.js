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
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";

import useAuth from "../Hooks/useAuth";
// import Loading from "../Components/Spinner";
// import axios from "axios";
import Sidebar from "../Components/Sidebar";
import OpcenTable from "../Components/OpcenTable";
import { BiSearch } from "react-icons/bi";

function OpcenHome() {
  const [showContent, setShowContent] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const { user } = useAuth();

  // const select = (e) => {
  //   setSelected(e);
  //   setIsLoading(false);
  //   setShowContent(true);
  // };

  const fetchPatients = async (e) => {
    setIsLoading(true);
    let pat = await api.get("/get_list.php");
    setList(pat.data);

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
          <Container maxW="80%" mt={5}>
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
              borderColor="gray.300"
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
        </div>
      </div>
    </div>
  );
}

export default OpcenHome;
