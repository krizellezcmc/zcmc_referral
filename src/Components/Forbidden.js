import { Center, VStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import errorImg from "../Assets/forbidden.png";

function Forbidden(props) {
  return (
    <div style={{ height: "100vh" }}>
      <Center marginTop="200px">
        <VStack>
          <Image src={errorImg} h="450px" />
          <Text fontSize="5xl" fontWeight="700" color="gray.800">
            ERROR 403
          </Text>
          <Text fontSize="xl" fontWeight="300">
            You don't have permission to access / on this server.
          </Text>
        </VStack>
      </Center>
    </div>
  );
}

export default Forbidden;
