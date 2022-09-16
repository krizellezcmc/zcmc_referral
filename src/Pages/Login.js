import React, { useEffect, useState } from "react";

import {
  Text,
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
  Link,
  Center,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import api from "../API/Api";

import { BiUser, BiLockAlt, BiRightArrowAlt } from "react-icons/bi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function Login() {
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [counter, setCounter] = useState(1);
  const [attempt, setAttempt] = useState(0);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Save value to {data} by name
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  let navigate = useNavigate();
  //SEND DATA TO API
  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await api.post("/login.php", data);
    if (response.data.status === 1) {
      sessionStorage.setItem(
        "sessionId",
        JSON.stringify(response.data.session_id)
      );

      setCookie("sessionId", JSON.stringify(response.data.session_id), "/");
      // window.location.reload();
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else if (response.data.status === 2) {
      toast({
        position: "top",
        title: response.data.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.data.status === 3) {
      toast({
        position: "top",
        title: response.data.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (response.data.status === 5) {
      navigate("/blocked");
    } else {
      let logs = 3 - response.data.logs;
      toast({
        position: "top",
        title: logs === 0 ? "User blocked!" : "Invalid password.",
        description:
          logs === 0
            ? "Contact the admin"
            : "You have " + logs + " login attempt.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    console.log(response);
  };

  const toast = useToast();
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/patientList" />;
    // return <Navigate to="/patientlist" />;
  }

  if (user?.role === "user") {
    return <Navigate to="/home" />;
  }

  if (user?.role === "ipcc") {
    return <Navigate to="/ipcc" />;
  }

  if (user?.role === "nurse") {
    return <Navigate to="/tagubilin" />;
  }
  return (
    <div className="body" style={{ background: "#f3f6f4", height: "100vh" }}>
      <Center>
        <Flex
          alignItems="center"
          justify="center"
          height="480px"
          width="500px"
          boxShadow="lg"
          rounded="lg"
          background="white"
        >
          <Flex direction="column" p="5" rounded="md" width="460px">
            <Box bgColor="white"></Box>
            <Text fontSize="3xl" fontWeight="500">
              Sign in
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
              <form onSubmit={handleSubmit}>
                <InputGroup size="md" mb={3}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiUser color="#058e46" />}
                  />
                  <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Email"
                    focusBorderColor="#058e46"
                    color="gray.600"
                    fontSize="15px"
                    name="email"
                    onChange={handleInput}
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
                    fontSize="15px"
                    name="password"
                    onChange={handleInput}
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

                <Button
                  type="submit"
                  h="2.7rem"
                  size="sm"
                  bgColor="#058e43"
                  width="100%"
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
                  Sign in
                </Button>
              </form>

              <Center>
                <Link color="teal.600" href="/register" fontSize="14px" mt={5}>
                  Register
                </Link>
              </Center>
            </Box>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
}

export default Login;
