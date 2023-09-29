import React, { useState } from "react";
import {
  Box,
  Center,
  Text,
  Button,
  useToast,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import "../App.css";

import { useSearchParams } from "react-router-dom";
import api from "../API/Api";
import { BiLockAlt } from "react-icons/bi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function ForgotPassword(props) {
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [short, setShort] = useState(false);
  const handleClick = () => setShow(!show);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  let toast = useToast();

  //   GET URL PARAMS
  // const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams();
  const reqid = searchParams.get("reqid");
  // const reqid = new URLSearchParams(search).get("reqid");

  const submit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      toast({
        position: "top",
        title: "Field required!",
        description: "Kindly input all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      if (password.length < 8) {
        setShort(true);
      } else if (password !== confirm) {
        setShort(false);
        setIsError(true);
      } else {
        setShort(false);
        setIsError(false);
        setLoad(true);

        let response = await api.post("/forgot_password.php", {
          id: reqid,
          password: password,
        });

        if (response) {
          setLoad(false);
          if (response.data.status === 1) {
            window.location.href = "/success";
          } else {
            toast({
              position: "top",
              title: "Failed to update!",
              description: "Something went wrong. Please try again later.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        }
      }
    }
  };
  return (
    <div>
      <div
        style={{
          background: "#f3f6f4",
          height: "100vh",
          paddingTop: "80px",
        }}
      >
        <Center>
          <Box
            p={12}
            width={{ base: "100%", sm: "70%", md: "60%", lg: "28%" }}
            boxShadow="sm"
            borderRadius
            background="white"
            rounded="lg"
          >
            <Text fontSize="3xl" fontWeight={500}>
              Reset Password
            </Text>
            <Text fontSize="sm" fontWeight={300}>
              Setup your new password.
            </Text>
            <form>
              <Box mt={10}>
                <FormControl isInvalid={isError}>
                  <Text fontSize={15} fontWeight={400} mb={1} color="gray.600">
                    New Password
                  </Text>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiLockAlt color="#058e46" />}
                    />
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      focusBorderColor="#058e46"
                      color="gray.600"
                      fontSize="15px"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
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
                </FormControl>

                <FormControl isInvalid={isError}>
                  <Text
                    fontSize={15}
                    fontWeight={400}
                    mb={1}
                    color="gray.600"
                    mt={4}
                  >
                    Confirm Password
                  </Text>
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiLockAlt color="#058e46" />}
                    />
                    <Input
                      pr="4.5rem"
                      type={showConfirm ? "text" : "password"}
                      focusBorderColor="#058e46"
                      color="gray.600"
                      fontSize="15px"
                      name="confirm"
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <InputRightElement>
                      <Button
                        h="1.75rem"
                        size="sm"
                        bgColor="white"
                        onClick={handleClickConfirm}
                        p="0"
                        _hover={{ bgColor: "white" }}
                      >
                        {showConfirm ? (
                          <VscEye color="gray.400" />
                        ) : (
                          <VscEyeClosed color="gray.400" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {short ? (
                    <FormErrorMessage>
                      Password must be 8 or more characters
                    </FormErrorMessage>
                  ) : isError ? (
                    <FormErrorMessage>
                      Password doesn't match.{" "}
                    </FormErrorMessage>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Box>
              <Box align="center">
                <Button
                  mt={8}
                  height="2.5rem"
                  style={{ transition: "0.5s" }}
                  background="#058e46"
                  colorScheme="green.500"
                  fontWeight="400"
                  _hover={{ w: "52%" }}
                  px={6}
                  w="45%"
                  isLoading={load}
                  loadingText="Verifying"
                  fontSize={15}
                  onClick={submit}
                >
                  Change password
                </Button>
              </Box>
            </form>
          </Box>
        </Center>
      </div>
    </div>
  );
}

export default ForgotPassword;
