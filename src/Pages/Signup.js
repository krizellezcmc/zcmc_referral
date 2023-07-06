import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Link,
  Select,
  useToast,
  Image,
} from "@chakra-ui/react";
import {
  HiEye,
  HiEyeOff,
  HiLockClosed,
  HiOutlineMail,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";

import { BsHospital } from "react-icons/bs";
// import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import api from "../API/Api";
import zcmc from "../Assets/zcmc-building.png";

function Signup() {
  // const specialization = [
  //   { label: "Obstetrics And Gynecology", value: "Obstetrics And Gynecology" },
  //   { label: "Internal Medicine", value: "Internal Medicine" },
  //   { label: "Pediatrics", value: "Pediatrics" },
  //   { label: "Surgery", value: "Surgery" },
  //   { label: "Psychiatry", value: "Psychiatry" },
  // ];
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);

  // DATA TO SEND
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalCode, setHospitalCode] = useState(0);
  const [accessCode, setAccessCode] = useState(0);
  const [department, setDepartment] = useState("");
  const [hospitals, setHospitals] = useState([]); //Hospital List

  // Toast and navigate
  const toast = useToast();
  // let navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    if (hospitalCode === 0) {
      toast({
        position: "top",
        title: "No selected hospital.",
        description: "Kindly select hospital to proceed.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      let response = await api.post("/register.php", {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        email: email,
        password: password,
        hospitalCode: hospitalCode,
        accessCode: accessCode,
        department: department,
      });

      if (response) {
        setIsLoading(false);
      }

      if (response.data.status === 1) {
        toast({
          position: "top",
          title: "Account registered.",
          description: "Kindly check your email.",
          status: "success",
          variant: "solid",
          isClosable: true,
        });
      } else if (response.data.status === 2) {
        toast({
          position: "top",
          title: "Email exists.",
          description: "Try to use another email",
          status: "warning",
          variant: "solid",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Error.",
          description: "Error ocurred. Please try again!",
          status: "error",
          variant: "solid",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const fetchHospiData = async () => {
    let hospiData = await api.get("/get_hospitals.php");
    setHospitals(hospiData.data);
  };
  useEffect(() => {
    fetchHospiData();
  }, [hospitals]);

  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/addhospital" />;
  }

  if (user?.role === "user") {
    return <Navigate to="/home" />;
  }
  return (
    <div className="body" style={{ background: "#F0F8F8", height: "100vh" }}>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        bg="gray.100"
      >
        <Box
          height="80vh"
          w={{ base: "90vw", sm: "90vw", md: "65vw", lg: "50vw", xl: "65vw" }}
          bg="white"
          borderRadius={"xl"}
        >
          <Grid
            templateColumns={{ md: "repeat(1, 1fr)", xl: "repeat(9, 1fr)" }}
          >
            <GridItem
              // height={"100%"}

              colSpan={{ sm: 0, md: 0, lg: 5 }}
              // display={{ md: "none" }}
            >
              <Box
                p={{ base: 5, sm: 10, md: 16, lg: 14, xl: 16 }}
                textAlign="center"
              >
                <Box lineHeight={10}>
                  <Heading color={"blue.500"}>Signup</Heading>
                  <Text>Patient Navigation and Referral System</Text>
                </Box>

                {/* FORM */}
                <form onSubmit={register}>
                  <Box mt={14}>
                    <Box textAlign="center">
                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiOutlineUser color="#A0AEC0" />}
                          />

                          <Input
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="First name"
                            name="firstName"
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiOutlineUser color="#A0AEC0" />}
                          />

                          <Input
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Last name"
                            name="lastName"
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>

                    <FormControl isRequired mb={2}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<HiOutlineMail color="#A0AEC0" />}
                        />

                        <Input
                          bg={"#F0F0F0"}
                          borderRadius={50}
                          border="0"
                          placeholder="Email"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormControl>

                    <Box
                      display={{ lg: "", xl: "flex" }}
                      justifyContent="center"
                      gap={2}
                    >
                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiPhone color="#A0AEC0" />}
                          />

                          <Input
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Contact Number"
                            name="contact"
                            onChange={(e) => {
                              setContact(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiLockClosed color="#A0AEC0" />}
                          />

                          <Input
                            type={show ? "text" : "password"}
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Password"
                            name="password"
                            minLength="8"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <InputRightElement>
                            <Button onClick={handleClick} size="sm" p="0">
                              {show ? (
                                <HiEyeOff color="#A0AEC0" />
                              ) : (
                                <HiEye color="#A0AEC0" />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      {/* 
                      <FormControl isRequired m={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiOutlineUser color="#A0AEC0" />}
                          />

                          <Input
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Confirm password"
                          />
                        </InputGroup>
                      </FormControl> */}
                    </Box>

                    {/* HEALTH  */}

                    <Box
                      display={{ lg: "", xl: "flex" }}
                      justifyContent="center"
                      gap={2}
                    >
                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          {/* <InputLeftElement
                            pointerEvents="none"
                            children={<BsHospital color="#A0AEC0" />}
                          /> */}

                          <Select
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Health facility"
                            onChange={(e) => {
                              setHospitalCode(e.target.value);
                            }}
                          >
                            {hospitals.map((hosp) => {
                              return (
                                <>
                                  <option value={hosp.value}>
                                    {hosp.label}
                                  </option>
                                </>
                              );
                            })}
                          </Select>
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiLockClosed color="#A0AEC0" />}
                          />

                          <Input
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Code"
                            name="accessCode"
                            onChange={(e) => {
                              setAccessCode(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>

                    {hospitalCode == 147 ? (
                      <FormControl isRequired mb={2}>
                        <InputGroup>
                          <Select
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Department"
                            onChange={(e) => {
                              setDepartment(e.target.value);
                            }}
                          >
                            <option value="IPCC">IPCC</option>
                            <option value="OPCEN">OPCEN</option>
                          </Select>
                        </InputGroup>
                      </FormControl>
                    ) : (
                      ""
                    )}

                    <Box align={"center"} pb={4}>
                      <Button
                        type="submit"
                        mt={14}
                        borderRadius={50}
                        variant="solid"
                        colorScheme={"blue"}
                        fontSize={16}
                        fontWeight={"semibold"}
                        w={161}
                        h={42}
                        isLoading={isLoading}
                      >
                        Sign up
                      </Button>
                    </Box>

                    <Link
                      href="/login"
                      textAlign="center"
                      fontSize={14}
                      color={"blue.500"}
                    >
                      Already have an account? Login here
                    </Link>
                  </Box>
                </form>
              </Box>
            </GridItem>
            <GridItem
              colSpan={{ sm: 0, md: 0, lg: 4 }}
              height={{ base: 0, sm: 0, xl: "80vh" }}
              bg="blue.500"
              borderTopRightRadius={"xl"}
              borderBottomRightRadius={"xl"}
              display={{
                base: "none",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "inline",
              }}
            >
              <Image
                src={zcmc}
                h="100%"
                borderTopRightRadius={"xl"}
                borderBottomRighRadius={"xl"}
              />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
