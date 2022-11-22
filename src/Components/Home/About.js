import React from "react";
import {
  Text,
  Box,
  Image,
  Icon,
  Link,
  Spacer,
  Container,
} from "@chakra-ui/react";

import Partners from "./Partners";
import Contributors from "./Contributors";
import Developers from "./Developers";

function About(props) {
  var zcmc_admin = require("../../Assets/zcmc_admin.jpg");
  var zcmc_opd = require("../../Assets/zcmc_opd.webp");
  var bg = require("../../Assets/bg.png");

  return (
    <div>
      <Box bgColor="white" pt={10}>
        <Container maxW="container.xl">
          <Box my={20} align="center">
            <Text fontWeight="bold" fontSize="4xl" letterSpacing="wide">
              Get to know us
            </Text>
            <Text
              mt={7}
              color="gray.500"
              fontWeight="300"
              letterSpacing="wide"
              w={{ sm: 500, md: 600 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </Text>
          </Box>

          <Box mt={14} display={{ md: "flex" }}>
            <Box flexShrink={0}>
              <Image
                borderRightRadius="2xl"
                width={{ md: 500 }}
                src={zcmc_admin}
                alt="zcmc"
              />
            </Box>
            <Box mt={{ base: 4, md: 10 }} ml={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={23} color="gray.600">
                Mission
              </Text>
              <Text mt={2} align="justify" color="gray.600">
                To provide affordable and accessible specialized helath
                services, training and research through state-of-the-art
                technology in Zamboanga Peninsula in support of the Philippine
                Health Agenda
              </Text>
            </Box>
          </Box>
          <Box mt={10} display={{ md: "flex" }} bgColor="white">
            <Box mt={{ base: 4, md: 10 }} mr={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={23} color="gray.600">
                Vision
              </Text>
              <Text mt={2} align="justify" color="gray.600">
                ZCMC will be the Apex Multi-specialty Medical Center in
                Zamboanga Peninsula
              </Text>
            </Box>
            <Box flexShrink={0}>
              <Image
                borderLeftRadius="2xl"
                width={{ md: 500 }}
                src={zcmc_opd}
                alt="zcmc"
              />
            </Box>
          </Box>

          <Partners />
        </Container>
      </Box>
      <Box p={{ lg: 0, md: 0, sm: 5 }}>
        <Image
          src={bg}
          position="absolute"
          zIndex={-10}
          w={{ sm: "lg", md: "full" }}
          height={{ sm: 500, md: 600 }}
          opacity={0.8}
        />
        <Container maxW="container.xl" pb={20}>
          <Contributors />
        </Container>
      </Box>
      <Box bgColor="green.50" p={1}>
        {/* <Image
          position="absolute"
          zIndex={-10}
          w="full"
          height={600}
          opacity={0.8}
        /> */}
        <Container maxW="container.xl" pb={10}>
          <Developers />
        </Container>
      </Box>
    </div>
  );
}

export default About;
