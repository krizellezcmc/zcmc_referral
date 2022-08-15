import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  useToast,
  Text,
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Center,
  HStack,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { Select } from "chakra-react-select";
import axios from "axios";
import {
  BiUser,
  BiLockAlt,
  BiRightArrowAlt,
  BiLock,
  BiPhone,
} from "react-icons/bi";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { MdAlternateEmail } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";

function Signup() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // DATA TO SEND
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalCode, setHospitalCode] = useState(0);
  const [accessCode, setAccessCode] = useState(0);
  const [hospitals, setHospitals] = useState([]); //Hospital List

  // Toast and navigate
  const toast = useToast();
  // let navigate = useNavigate();

  const register = (event) => {
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
      axios
        .post("http://192.168.3.135/zcmc_referral_api/api/register.php", {
          firstName: firstName,
          lastName: lastName,
          contact: contact,
          email: email,
          password: password,
          hospitalCode: hospitalCode,
          accessCode: accessCode,
        })
        .then(function (response) {
          if (response.data.status === 1) {
            toast({
              position: "top",
              title: "Account registered.",
              description: "Kindly check your email.",
              status: "success",
              variant: "solid",
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              title: "Email exists.",
              description: "Try to use another email",
              status: "warning",
              variant: "solid",
              duration: 2000,
              isClosable: true,
            });
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_hospitals.php")
      .then((response) => {
        setHospitals(response.data);
      });
  }, [hospitals]);

  const { user } = useAuth();

  if (user?.role === "user") {
    return <Navigate to="/home" />;
  } else if (user?.role === "admin") {
    return <Navigate to="/addhospital" />;
  } else {
    return (
      <div className="body" style={{ background: "#f3f6f4", height: "100vh" }}>
        <Center>
          <Flex
            alignItems="center"
            justify="center"
            height="580px"
            boxShadow="md"
            background="white"
            rounded="lg"
          >
            <Flex direction="column" p="10" width="800px">
              <Text fontSize="3xl" fontWeight="500">
                Registration
              </Text>
              <Text
                fontSize="sm"
                fontWeight="300"
                mt={2}
                mb={5}
                textTransform="uppercase"
              >
                Zamboanga City Medical Center
              </Text>
              <Box padding="" bg="white" mt={7}>
                <form onSubmit={register}>
                  <HStack mb={4}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiUser color="#058e46" />}
                      />
                      <Input
                        type="text"
                        placeholder="First name"
                        focusBorderColor="#058e46"
                        fontSize="15.5px"
                        name="firstName"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiUser color="#058e46" />}
                      />
                      <Input
                        type="text"
                        placeholder="Last name"
                        focusBorderColor="#058e46"
                        fontSize="15.5px"
                        name="lastName"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </HStack>

                  <HStack mb={4}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiPhone color="#058e46" />}
                      />
                      <Input
                        type="text"
                        placeholder="Contact number"
                        focusBorderColor="#058e46"
                        fontSize="15.5px"
                        name="contact"
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </HStack>

                  <HStack mb={4}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdAlternateEmail color="#058e46" />}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        focusBorderColor="#058e46"
                        fontSize="15.5px"
                        name="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>

                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiLockAlt color="#058e46" />}
                      />
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        focusBorderColor="#058e46"
                        color="gray.600"
                        name="password"
                        fontSize="15.5px"
                        minLength="8"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                      <InputRightElement>
                        <Button
                          h="1.75rem"
                          size="sm"
                          bgColor="white"
                          onClick={handleClick}
                          p="0"
                          _hover={{ bgColor: "white" }}
                        >
                          {show ? (
                            <VscEye color="gray.400" />
                          ) : (
                            <VscEyeClosed color="gray.400" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </HStack>

                  <Grid gap={2} templateColumns="repeat(5, 1fr)">
                    <GridItem colSpan={3}>
                      <Select
                        options={hospitals}
                        placeholder="Choose your hospital"
                        selectedOptionStyle="check"
                        closeMenuOnSelect={true}
                        focusBorderColor="#058e46"
                        onChange={(e) => {
                          setHospitalCode(e.value);
                        }}
                        required
                        useBasicStyles
                      />
                    </GridItem>
                    <GridItem colSpan={2}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BiLock color="#058e46" />}
                        />
                        <Input
                          type="number"
                          placeholder="Access code"
                          focusBorderColor="#058e46"
                          fontSize="15.5px"
                          name="accessCode"
                          onChange={(e) => {
                            setAccessCode(e.target.value);
                          }}
                          required
                        />
                      </InputGroup>
                    </GridItem>
                  </Grid>

                  <Button
                    type="submit"
                    h="2.7rem"
                    size="sm"
                    bgColor="#058e43"
                    mx="120px"
                    width="60%"
                    color="white"
                    mt="10"
                    p="4"
                    rounded="lg"
                    _hover={{
                      bgColor: "green.600",
                    }}
                    fontWeight="400"
                    rightIcon={<BiRightArrowAlt />}
                  >
                    Register
                  </Button>
                </form>

                <Center>
                  <Link color="teal.600" href="/" fontSize="14px" mt={5}>
                    Login here
                  </Link>
                </Center>
              </Box>
            </Flex>
          </Flex>
        </Center>
      </div>
    );
  }
}

export default Signup;
