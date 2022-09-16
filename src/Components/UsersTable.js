import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Grid,
  GridItem,
  Box,
  HStack,
  VStack,
  Spacer,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  IconButton,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  BiUser,
  BiPhone,
  BiMailSend,
  BiLock,
  BiClinic,
  BiUserCheck,
  BiTrash,
  BiSearch,
} from "react-icons/bi";
import { GoCheck, GoX } from "react-icons/go";
import "../Styles/Table.css";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../API/Api";

const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const [userVerify, setUserVerify] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //get user data
  const [userId, setUserId] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [code, setCode] = useState("");

  const [search, setSearch] = useState("");

  const getUserData = async (Id) => {
    let params = {
      Id: Id,
    };

    let response = await api.get("/get_user_data.php", {
      params,
    });

    setUserId(response.data[0].userId);
    setLastName(response.data[0].lastName);
    setFirstName(response.data[0].firstName);
    setContact(response.data[0].contact);
    setEmail(response.data[0].email);
    setCode(response.data[0].code);
    setHospital(response.data[0].name);
  };

  const fetchData = async () => {
    let response = await api.get("/get_verified_users.php");
    setUserData(response.data);

    let users = await api.get("/get_users.php");
    setUserVerify(users.data);
  };

  const handleVerifyuser = (userId) => {
    onClose(true);
    Swal.fire({
      text: "Are you sure you want to verify this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Verify",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/accept_user.php", {
          userId: userId,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "User verified!",
            "You successfully verified the user.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const deleteUser = (id) => {
    Swal.fire({
      text: "Are you sure you want to remove this user? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/remove_user.php", {
          userId: id,
        });

        if (res.data.status === 1) {
          Swal.fire("Deleted!", "The user has been removed.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const declineUser = (id) => {
    onClose(true);
    Swal.fire({
      text: "Are you sure you want to decline?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Decline",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post("/decline_user.php", {
          userId: id,
        });

        if (response.data.status === 1) {
          Swal.fire(
            "Declined!",
            "You successfully declined the user.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [userVerify, userData]);

  return (
    <div>
      <Grid templateColumns="repeat(8,1fr)" gap={4}>
        <GridItem colSpan={5} bg="white">
          <div className="table-container">
            <h1 className="block">Verified Users</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
              }}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiSearch color="gray.300" />}
                />
                <Input
                  fontSize="13px"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user"
                  width="400px"
                />
              </InputGroup>
            </div>
            {!userData ? (
              <i style={{ alignContent: "center" }}>---No data found---</i>
            ) : (
              <TableContainer>
                <Table cellSpacing={0}>
                  <Thead>
                    <Tr>
                      <Th className="border" width="30%">
                        Name
                      </Th>
                      {/* <Th className="border" width="20%">
                        Email
                      </Th>
                      <Th className="border" width="15%">
                        Phone No.
                      </Th> */}
                      <Th className="border">Hospital</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userData
                      .filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (
                          val.lastName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.firstName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((index) => {
                        return (
                          <>
                            <Tr>
                              <Td className="border">
                                {index.lastName + ", " + index.firstName}
                              </Td>
                              {/* <Td className="border">{index.email}</Td>
                              <Td className="border">{index.contact}</Td> */}
                              <Td className="border">{index.name}</Td>
                              {/* <Td className="border">
                                <Badge colorScheme="green">Verified</Badge>
                              </Td> */}
                              <Td border="0">
                                <IconButton
                                  style={{ margin: 0, padding: 0 }}
                                  size="sm"
                                  variant="solid"
                                  colorScheme="red"
                                  onClick={() => {
                                    deleteUser(index.userId);
                                  }}
                                  icon={<BiTrash fontSize="15px" />}
                                />
                              </Td>
                            </Tr>
                          </>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </div>
        </GridItem>

        <GridItem colSpan={3}>
          <div className="side-container" style={{ padding: "15px" }}>
            <h1 style={{ marginBottom: "10px" }}>
              <b>For Verification</b>
            </h1>

            <VStack spacing={2}>
              {userVerify.length !== 0 ? (
                userVerify.map((user) => {
                  return (
                    <>
                      <Box
                        width="100%"
                        borderWidth="1px"
                        borderRadius="xs"
                        padding={3}
                      >
                        <HStack>
                          <p style={{ fontSize: "14px" }}>
                            <b>{user.firstName + " " + user.lastName}</b>
                            <Badge colorScheme="purple" ml="1" size="xs">
                              New
                            </Badge>
                            <br />
                            {user.name}
                          </p>

                          <Spacer></Spacer>
                          <IconButton
                            size="sm"
                            variant="outline"
                            colorScheme="teal"
                            onClick={() => {
                              getUserData(user.userId);
                              onOpen(true);
                            }}
                            icon={<BiUserCheck fontSize="17px" />}
                          />
                        </HStack>
                      </Box>
                    </>
                  );
                })
              ) : (
                <Text mt={3}>Nothing to show</Text>
              )}
            </VStack>
          </div>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex direction="column">
              <FormControl mb={8}>
                <div style={{ display: "flex" }}>
                  <BiUser color="#058e46" fontSize="15px" />
                  <FormLabel fontSize="12px" ml={2}>
                    FULL NAME
                  </FormLabel>
                </div>
                <Text fontWeight={500}>{firstName + " " + lastName}</Text>
              </FormControl>

              <HStack mb={8}>
                <FormControl>
                  <div style={{ display: "flex" }}>
                    <BiPhone color="#058e46" fontSize="20px" />
                    <FormLabel fontSize="12px" ml={2}>
                      CONTACT NO
                    </FormLabel>
                  </div>
                  <Text ml={2} fontWeight={500}>
                    {contact}
                  </Text>
                </FormControl>
                <FormControl>
                  <div style={{ display: "flex" }}>
                    <BiMailSend color="#058e46" fontSize="20px" />
                    <FormLabel fontSize="12px" ml={2}>
                      EMAIL
                    </FormLabel>
                  </div>
                  <Text ml={2} fontWeight={500}>
                    {email}
                  </Text>
                </FormControl>
              </HStack>

              <HStack>
                <FormControl>
                  <div style={{ display: "flex" }}>
                    <BiClinic color="#058e46" fontSize="20px" />
                    <FormLabel fontSize="12px" ml={2}>
                      HOSPITAL
                    </FormLabel>
                  </div>
                  <Text ml={2} fontWeight={500}>
                    {hospital}
                  </Text>
                </FormControl>

                <FormControl>
                  <div style={{ display: "flex" }}>
                    <BiLock color="#058e46" fontSize="20px" />
                    <FormLabel fontSize="12px" ml={2}>
                      ACCESS CODE
                    </FormLabel>
                  </div>
                  <Text ml={2} fontWeight={500}>
                    {code}
                  </Text>
                </FormControl>
              </HStack>
            </Flex>
          </ModalBody>

          <ModalFooter my={6}>
            <Button
              size="sm"
              mr={3}
              colorScheme="green"
              onClick={() => {
                handleVerifyuser(userId);
              }}
              leftIcon={<GoCheck fontSize="20px" />}
            >
              Verify
            </Button>
            <Button
              size="sm"
              mr={3}
              colorScheme="red"
              onClick={() => {
                declineUser(userId);
              }}
              leftIcon={<GoX fontSize="20px" />}
            >
              Decline
            </Button>
            <Button onClick={onClose} variant="solid" size="sm">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersTable;
