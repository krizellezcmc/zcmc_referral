import React, { useEffect, useState } from "react";
import {
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
  Input,
  Center,
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
  BiUserX,
} from "react-icons/bi";
import { GoCheck, GoX } from "react-icons/go";
import "../Styles/Table.css";
import Swal from "sweetalert2";
import api from "../API/Api";
import Spinner from "./Spinner";
import moment from "moment";
import inbox from "../Assets/inbox.png";

const header = [
  {
    title: "Name",
  },
  {
    title: "Hospital",
  },
  { title: "Role" },
  {
    title: "Status",
  },
  {
    title: "Actions",
  },
];

const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const [userVerify, setUserVerify] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
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
    setIsLoadingModal(true);
    let params = {
      Id: Id,
    };

    let response = await api.get("/get_user_data.php", {
      params,
    });

    if (response) {
      setIsLoadingModal(false);
      setUserId(response.data[0].userId);
      setLastName(response.data[0].lastName);
      setFirstName(response.data[0].firstName);
      setContact(response.data[0].contact);
      setEmail(response.data[0].email);
      setCode(response.data[0].accessCode);
      setHospital(response.data[0].name);
    }
  };

  const fetchData = async () => {
    let response = await api.get("/get_verified_users.php");
    setUserData(response.data);

    let users = await api.get("/get_users.php");
    setUserVerify(users.data);

    if (response) {
      setIsLoading(false);
    }
  };

  const handleVerifyuser = async (userId) => {
    onClose(true);
    const result = await Swal.fire({
      text: "Are you sure you want to verify this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Verify",
    });
    if (result.isConfirmed) {
      try {
        const res = await api.post("/accept_user.php", {
          userId: userId,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "User verified!",
            "You successfully verified the user.",
            "success"
          ).then(() => {
            fetchData();
          });
        } else {
          Swal.fire("Error!", "Something went wrong.", "error").then(() => {
            window.location.href = "/login";
          });
        }
      } catch (error) {
        console.log("Error verifying user:", error);
      }
    }
  };

  const deleteUser = (id) => {
    Swal.fire({
      text: "Are you sure you want to deactivate this user? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/remove_user.php", {
          userId: id,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "Deactivated!",
            "The user has been deactivated.",
            "success"
          ).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // Activate user
  const activateUser = (id) => {
    Swal.fire({
      text: "Are you sure you want to activate this user? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/activate_user.php", {
          userId: id,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "Activated!",
            "The user has been activated.",
            "success"
          ).then(() => {
            window.location.href = "/login";
          });
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
          ).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire("Error!", "Something went wrong.", "error").then(() => {
            window.location.href = "/login";
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
    console.log(userVerify);

    // const interval = setInterval(fetchData, 5000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <div>
      <Grid templateColumns="repeat(8,1fr)" gap={4} px={10}>
        <GridItem colSpan={6}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            pb={5}
          >
            <Input
              fontSize="13px"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user"
              width="400px"
              _hover={{ borderColor: "green" }}
              _focus={{
                boxShadow: "none",
                outline: "none",
                borderColor: "green",
              }}
              bgColor="white"
            />
          </Box>
          {isLoading ? (
            <Center my={16}>
              <Spinner />
            </Center>
          ) : (
            <Box>
              <Flex borderRadius="sm" mb={5}>
                {header.map((h) => {
                  return (
                    <>
                      <Box bgColor="white" width="full" p={2}>
                        <Text color="#4C4C4C" textAlign="center">
                          {h.title}{" "}
                        </Text>
                      </Box>
                    </>
                  );
                })}
              </Flex>

              {userData
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    val.firstName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((index, i) => {
                  const isEven = i % 2 === 0;
                  const backgroundColor = isEven ? "white" : "#e9ffff";
                  return (
                    <>
                      <Flex
                        bgColor={backgroundColor}
                        color="#3E9393"
                        fontWeight={600}
                        fontSize={13}
                        alignItems="center"
                      >
                        <Box width="full" p={2} textAlign="center">
                          <Text>{index.firstName + " " + index.lastName}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>{index.name}</Text>{" "}
                        </Box>
                        <Box width="full" p={2}>
                          <Text textTransform="uppercase" textAlign="center">
                            {index.role === "triage"
                              ? "PRE-TRIAGE"
                              : index.role === "user"
                              ? "REFERRING"
                              : index.role}
                          </Text>
                        </Box>
                        <Box width="full" p={2}>
                          <Text textAlign="center">
                            <Badge
                              colorScheme={
                                index.validated === 1
                                  ? "green"
                                  : index.validated === 5
                                  ? "red"
                                  : "blue"
                              }
                              borderRadius="lg"
                              px={2}
                            >
                              {index.validated === 1
                                ? "Active"
                                : index.validated === 5
                                ? "Deactivated"
                                : "Pending"}
                            </Badge>
                          </Text>
                        </Box>
                        <Box width="full" p={2} align="center">
                          {index.validated === 5 ? (
                            <IconButton
                              style={{ margin: 0, padding: 0 }}
                              size="sm"
                              variant="solid"
                              colorScheme="green"
                              onClick={() => {
                                activateUser(index.userId);
                              }}
                              icon={<BiUserCheck fontSize="15px" />}
                            />
                          ) : (
                            <IconButton
                              style={{ margin: 0, padding: 0 }}
                              size="sm"
                              variant="solid"
                              colorScheme="red"
                              onClick={() => {
                                deleteUser(index.userId);
                              }}
                              icon={<BiUserX fontSize="15px" />}
                            />
                          )}
                        </Box>
                      </Flex>
                    </>
                  );
                })}
            </Box>
          )}
        </GridItem>

        <GridItem colSpan={2}>
          <Box bgColor="white" borderRadius={10} boxShadow="md" p={5}>
            <Text fontWeight={600} mb={10} color="#1F8383">
              Users for Verification
            </Text>

            <VStack spacing={2}>
              {userVerify.length !== 0 ? (
                userVerify.map((user) => {
                  return (
                    <>
                      <Box
                        width="full"
                        borderRadius="3xl"
                        padding={3}
                        bgColor="#e3f8f8"
                        p={4}
                      >
                        <Flex alignItems="center">
                          <Box>
                            <Flex gap={2}>
                              <Text fontSize={14} fontWeight={700}>
                                {user.firstName + " " + user.lastName}
                              </Text>
                              <Badge
                                colorScheme="purple"
                                size="xs"
                                borderRadius="lg"
                                px={2}
                              >
                                New
                              </Badge>
                            </Flex>
                            <Text
                              fontSize={13}
                              fontWeight={400}
                              fontStyle="italic"
                            >
                              {" "}
                              {user.name}
                            </Text>
                            <Text fontSize={11} pt={3} fontWeight={500}>
                              {" "}
                              {moment(user.tstamp).calendar()}
                            </Text>
                          </Box>

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
                        </Flex>
                      </Box>
                    </>
                  );
                })
              ) : (
                <>
                  <img src={inbox} />
                  <Text mt={3}>Nothing to show</Text>
                </>
              )}
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />

          {isLoadingModal ? (
            <Center mt={14} mb={20}>
              <Spinner />
            </Center>
          ) : (
            <>
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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersTable;
