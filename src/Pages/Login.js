import React, { useEffect, useState } from "react";
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
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import api from "../API/Api";
import { HiEye, HiEyeOff, HiOutlineMail } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import zcmc from "../Assets/zcmc-building.png";

function Login() {
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShow(!show);

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
    console.log(data);
    event.preventDefault();

    setIsLoading(true);
    let response = await api.post("/login.php", data);

    if (response) {
      setIsLoading(false);
    }

    if (response.data.status === 1) {
      sessionStorage.setItem(
        "sessionId",
        JSON.stringify(response.data.session_id)
      );

      // setCookie("sessionId", JSON.stringify(response.data.session_id), "/");
      window.location.reload();
      // sessionStorage.setItem("user", JSON.stringify(response.data.user));

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
  };

  const toast = useToast();
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/verifyuser" />;
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

  if (user?.role === "opcen") {
    return <Navigate to="/admindashboard" />;
  }
  if (user?.role === "triage") {
    return <Navigate to="/pretriage" />;
  }
  if (user?.role === "admission") {
    return <Navigate to="/admission" />;
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
          w={{ sm: "90vw", md: "65vw", lg: "50vw", xl: "65vw" }}
          bg="white"
          borderRadius={"xl"}
        >
          <Grid
            templateColumns={{ md: "repeat(1, 1fr)", xl: "repeat(9, 1fr)" }}
          >
            <GridItem
              // height={"100%"}
              height={{ xs: 0, sm: 0, xl: "80vh" }}
              bg="blue.500"
              borderTopLeftRadius={"xl"}
              borderBottomLeftRadius={"xl"}
              colSpan={{ sm: 0, md: 0, lg: 5 }}
              display={{ md: "none", lg: "none", xl: "inline" }}
            >
              <Image
                src={zcmc}
                h={"100%"}
                borderTopLeftRadius={"xl"}
                borderBottomLeftRadius={"xl"}
              />
            </GridItem>
            <GridItem colSpan={4} height={{ sm: 0, xl: "80vh" }}>
              <Box p={{ sm: 10, md: 16, lg: 14, xl: 14 }} textAlign="center">
                <Box lineHeight={10}>
                  <Heading color={"blue.500"}>Welcome</Heading>
                  <Text>Patient Navigation and Referral System</Text>
                </Box>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                  <Box mt={14}>
                    <Box textAlign={"center"}>
                      <FormControl isRequired>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<HiOutlineMail color="#A0AEC0" />}
                          />

                          <Input
                            type="text"
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Email"
                            name="email"
                            onChange={handleInput}
                          />
                        </InputGroup>
                      </FormControl>

                      {/* PASSWORD */}
                      <FormControl isRequired mt={5}>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BiLockAlt color="#A0AEC0" />}
                          />

                          <Input
                            type={show ? "text" : "password"}
                            bg={"#F0F0F0"}
                            borderRadius={50}
                            border="0"
                            placeholder="Password"
                            name="password"
                            onChange={handleInput}
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
                    </Box>

                    <Stack>
                      <Box mt={2}>
                        <Link
                          float={"right"}
                          fontWeight={"semibold"}
                          fontSize={14}
                          color={"blue.500"}
                          href="/recover"
                        >
                          Forgot password?
                        </Link>
                      </Box>
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
                          loadingText="Signing in"
                        >
                          Sign in
                        </Button>
                      </Box>

                      <Link
                        href="/register"
                        textAlign="center"
                        fontSize={14}
                        color={"blue.500"}
                      >
                        No account? Register here
                      </Link>
                    </Stack>
                  </Box>
                </form>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
