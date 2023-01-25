import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Divider,
  Image,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import "../App.css";

import verify_img from "../Assets/verify.png";
import { useLocation, useSearchParams } from "react-router-dom";
import api from "../API/Api";

function Verify() {
  const toast = useToast();
  // const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams();
  const reqid = searchParams.get("reqid");
  // const reqid = new URLSearchParams(search).get("reqid");
  const [email, setEmail] = useState([]);
  const [verification, setVerification] = useState(0);
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    let response = await api.get("get_user_data.php", {
      params: { Id: reqid },
    });

    let emailStr = response.data[0].email;
    const [name, domain] = emailStr.split("@");
    setEmail(
      `${name[0]}${name[1]}${new Array(name.length - 1).join("*")}@${domain}`
    );

    setVerification(response.data[0].verification);
  };

  const check = (event) => {
    event.preventDefault();

    setLoad(true);

    if (input == verification) {
      window.location.href = `https://zcmc-patientreferral.online/newpassword?reqid=${reqid}`;
    } else {
      setLoad(false);
      toast({
        position: "top",
        title: "Invalid verification code.",
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "solid",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [reqid]);
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
          p={20}
          width={{ base: "100%", sm: "70%", md: "50%", lg: "30%" }}
          boxShadow="sm"
          borderRadius
          background="white"
          textAlign="center"
          rounded="lg"
        >
          <Box align="center">
            <Image
              src={verify_img}
              w={{ base: "50%", sm: "70%", md: "50%", lg: "50%" }}
              mb={4}
            ></Image>
            <Text
              fontWeight="600"
              color="gray.700"
              fontSize={{ base: "xl", sm: "lg", md: "2xl", lg: "3xl" }}
            >
              Account Verification
            </Text>

            <Divider
              mt={2}
              mb={8}
              bg="#058e46"
              p="1px"
              w="27%"
              variant={"solid"}
            />

            <Text mt="8" color="gray.600">
              A verification code has been sent to
            </Text>
            <Text mt="1" fontWeight="bold" fontSize={13} color="gray.700">
              {email}
            </Text>
            <HStack justifyContent="center" my={10}>
              <PinInput
                focusBorderColor="#058e46"
                onChange={(e) => setInput(e)}
              >
                <PinInputField autoFocus on />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>

            <VStack>
              <Button
                background="#058e46"
                color="white"
                w="50%"
                fontWeight="400"
                isLoading={load}
                fontSize={15}
                loadingText="Verifying"
                style={{ transition: "0.5s" }}
                _hover={{ w: "60%" }}
                onClick={check}
              >
                Submit
              </Button>
            </VStack>
          </Box>
        </Box>
      </Center>
    </div>
  );
}

export default Verify;
