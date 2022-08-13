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
  BiStop,
  BiX,
  BiCheck,
} from "react-icons/bi";
import "../Styles/Table.css";
import axios from "axios";
import Swal from "sweetalert2";

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

  const getUserData = (Id) => {
    let params = {
      Id: Id,
    };
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_user_data.php", {
        params,
      })
      .then((response) => {
        setUserId(response.data[0].userId);
        setLastName(response.data[0].lastName);
        setFirstName(response.data[0].firstName);
        setContact(response.data[0].contact);
        setEmail(response.data[0].email);
        setCode(response.data[0].code);
        setHospital(response.data[0].name);
      });
  };

  const handleVerifyuser = (userId) => {
    axios
      .post("http://192.168.3.135/zcmc_referral_api/api/verify_user.php", {
        userId: userId,
      })
      .then((response) => {
        if (response.data.status === 1) {
          Swal.fire("User Verified!", "The user is now verified.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      });
    onClose(true);
  };
  useEffect(() => {
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_verified_users.php")
      .then(function (response) {
        setUserData(response.data);
      });
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_users.php")
      .then(function (response) {
        setUserVerify(response.data);
      });
  });

  const deleteUser = (name) => {
    Swal.fire({
      title: "Are you sure you?",
      text: "This will remove " + name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://192.168.3.135/zcmc_referral_api/api/decline_user.php", {
            userId: id,
          })
          .then((response) => {
            if (response.data.status === 1) {
              Swal.fire(
                "Declined!",
                "You successfully declined the user.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Something went wrong.", "error");
            }
            console.log(response.data);
          });
      }
    });
  };

  return (
    <div>
      <Grid templateColumns="repeat(7,1fr)" gap={4}>
        <GridItem colSpan={5} bg="white">
          <div className="table-container">
            <h1 className="block">Users</h1>
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
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search User"
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
                      <Th className="border" width="20%">
                        Email
                      </Th>
                      <Th className="border" width="15%">
                        Phone No.
                      </Th>
                      <Th className="border" width="25%">
                        Hospital
                      </Th>
                      <Th className="border" width="5%">
                        Status
                      </Th>
                      <Th className="border" width="5%">
                        Action
                      </Th>
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
                          val.email
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          val.contact
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
                              <Td className="border">{index.email}</Td>
                              <Td className="border">{index.contact}</Td>
                              <Td className="border">{index.name}</Td>
                              <Td className="border">
                                <Badge colorScheme="green">Verified</Badge>
                              </Td>
                              <Td className="border">
                                <IconButton
                                  style={{ margin: 0, padding: 0 }}
                                  size="sm"
                                  variant="outline"
                                  colorScheme="red"
                                  onClick={() => {
                                    deleteUser(index.firstName);
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

        <GridItem colSpan={2}>
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
                            <b>{user.firstName + " " + user.lastName}</b>{" "}
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
                <p>Nothing to show</p>
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
                <FormLabel>Name</FormLabel>
                <div style={{ display: "flex" }}>
                  <BiUser color="#058e46" fontSize="20px" />
                  <Text ml={2}>{firstName + " " + lastName}</Text>
                </div>
              </FormControl>
              <HStack mb={8}>
                <FormControl>
                  <FormLabel>Contact #</FormLabel>
                  <div style={{ display: "flex" }}>
                    <BiPhone color="#058e46" fontSize="20px" />
                    <Text ml={2}>{contact} </Text>
                  </div>
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <div style={{ display: "flex" }}>
                    <BiMailSend color="#058e46" fontSize="20px" />
                    <Text ml={2}>{email}</Text>
                  </div>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Hospital</FormLabel>
                  <div style={{ display: "flex" }}>
                    <BiClinic color="#058e46" fontSize="20px" />
                    <Text ml={2}>{hospital} </Text>
                  </div>
                </FormControl>

                <FormControl>
                  <FormLabel>Access Code</FormLabel>
                  <div style={{ display: "flex" }}>
                    <BiLock color="#058e46" fontSize="20px" />
                    <Text ml={2}>{code}</Text>
                  </div>
                </FormControl>
              </HStack>
            </Flex>
          </ModalBody>
          <ModalFooter my={6}>
            <Button
              mr={3}
              colorScheme="green"
              onClick={() => {
                handleVerifyuser(userId);
              }}
              leftIcon={<BiCheck fontSize="20px" />}
            >
              Verify
            </Button>
            <Button
              mr={3}
              colorScheme="pink"
              onClick={() => {
                declineUser(userId);
              }}
              leftIcon={<BiX fontSize="20px" />}
            >
              Decline
            </Button>
            <Button onClick={onClose} variant="solid">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UsersTable;
