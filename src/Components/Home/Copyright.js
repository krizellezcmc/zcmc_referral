import {
  Box,
  Container,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiGmail, SiFacebook } from "react-icons/si";
import { BiCopyright } from "react-icons/bi";

function Copyright(props) {
  return (
    <>
      <Box
        display={{ md: "flex", sm: "flex" }}
        alignItems="center"
        bgColor="green.600"
        py={2}
        px={10}
      >
        <Box>
          <Text fontSize={{ lg: 13.5, md: 10, sm: 10 }}>
            <Icon as={BiCopyright} /> 2022 Zamboanga City Medical Center . All
            Rights reserved
          </Text>
        </Box>
        <Spacer />

        <Box display={{ md: "flex" }}>
          <Link>
            <Icon as={SiFacebook} mr={2} />
          </Link>
          <Link>
            <Icon as={SiGmail} />
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Copyright;
