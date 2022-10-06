import React, { useState } from "react";
import {
  Box,
  Center,
  Text,
  Divider,
  Image,
  Button,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  UseToast,
  Link,
} from "@chakra-ui/react";
import "../App.css";

import email_img from "../Assets/email.png";
import { BiAt, BiMailSend } from "react-icons/bi";
import api from "../API/Api";

function Recover() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const checkEmail = async () => {
    setLoad(true);
    let response = await api.post("recover.php", { email: email });

    if (response.data.status === 1) {
      setLoad(false);
      window.location.href = response.data.link;
    } else if (response.data.status === 2) {
      setLoad(false);
      toast({
        position: "top",
        description: "Email isn't associated with any account.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        variant: "left-accent",
      });
    } else {
      toast({
        position: "top",
        description: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "solid",
      });
    }
  };

  return (
    <div
      style={{
        background: "#f3f6f4",
        height: "100vh",
        paddingTop: "80px",
      }}
    >
      <Center>
        <Box
          p={{ base: "10px", sm: "30px", md: "40px", lg: "30px", xl: "50px" }}
          width={{ base: "180%", sm: "80%", md: "60%", lg: "40%", xl: "30%" }}
          boxShadow="sm"
          borderRadius
          background="white"
          textAlign="center"
          rounded="lg"
        >
          <Box align="center">
            <Image
              src={email_img}
              w={{ base: "50%", sm: "70%", md: "50%", lg: "50%" }}
              mb={4}
            ></Image>
            <Text
              fontWeight="600"
              color="gray.700"
              fontSize={{ base: "xl", sm: "lg", md: "2xl", lg: "3xl" }}
            >
              Recover Account
            </Text>

            <Divider
              mt={2}
              mb={10}
              bg="#058e46"
              p="1px"
              w="27%"
              variant={"solid"}
            />
          </Box>
          {/* <Box mx={5}>
            <Alert status="error" variant="subtle">
              <AlertIcon />
              <Text fontWeight={500} color="red.600" fontSize="14.5px">
                Your account is temporarily locked.
              </Text>
            </Alert>
          </Box> */}
          <Text mt={6} mb={6} mx={6} color="gray.600">
            Enter the email associated with your account to receive a
            verification code.
          </Text>

          {/* <Text fontSize="14px" mb={2} color="gray.600" fontWeight={500}>
              Email address
            </Text> */}
          {/* <Box>
            <Alert status="error" fontSize="14px">
              <AlertIcon />
              <AlertTitle>Account temporarily locked!</AlertTitle>
              <AlertDescription>
                Your Chakra experience may be degraded.
              </AlertDescription>
            </Alert>
          </Box> */}

          <Center my={9}>
            <InputGroup size="md" mb={3} mx={8}>
              <InputLeftElement
                pointerEvents="none"
                children={<BiAt color="#058e46" />}
              />
              <Input
                type="text"
                focusBorderColor="#058e46"
                color="gray.700"
                fontSize="14.5px"
                name="email"
                placeholder="sample@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Center>

          <Button
            style={{ transition: "0.5s" }}
            background="#058e46"
            colorScheme="green.500"
            fontWeight="400"
            _hover={{ w: "70%" }}
            px={6}
            w="60%"
            onClick={checkEmail}
            isLoading={load}
            loadingText="Sending"
            fontSize={15}
            rightIcon={<BiMailSend />}
            // isLoading
          >
            Send verification code
          </Button>
        </Box>
      </Center>
    </div>
  );
}

export default Recover;
