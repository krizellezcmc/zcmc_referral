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
  var opcen_full = require("../../Assets/opcen_full.JPG");
  var opcen = require("../../Assets/opcen_pic.JPG");
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
              fontSize={{ md: 13, lg: 16, sm: 13 }}
            >
              The ZCMC OPCEN with its own unique values and line of work,
              inculcates some of ZCMC’s core values that is relevant to the
              group’s core functions. These include{" "}
              <b>
                Organization, Professionalism, Compassion, Efficiency, and
                Non-discrimination.
              </b>
            </Text>
          </Box>

          <Box mt={14} display={{ md: "flex" }}>
            <Box flexShrink={0}>
              <Image
                borderRadius="2xl"
                width={{ md: 500 }}
                src={opcen}
                alt="zcmc"
              />
            </Box>
            <Box mt={{ base: 4, md: 10 }} ml={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={23} color="gray.600">
                Mission
              </Text>
              <Text mt={2} align="justify" color="gray.600">
                To implement a well-coordinated referral system between health
                institutions within the ZamBaSulTa region and ZCMC, and to serve
                as liaison between referring members of the health care team,
                bridging previously identified gaps including miscommunication,
                limitations to knowledge on specialized care, and lack of access
                to appropriate healthcare.
              </Text>
            </Box>
          </Box>
          <Box mt={10} display={{ md: "flex" }} bgColor="white">
            <Box mt={{ base: 4, md: 10 }} mr={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={23} color="gray.600">
                Vision
              </Text>
              <Text mt={2} align="justify" color="gray.600">
                Zamboanga City Medical Center Operation Center (ZCMC OPCEN) will
                be recognized as the leader and innovator in inter-health
                facility referrals in the Region and beyond.
              </Text>
            </Box>
            <Box flexShrink={0}>
              <Image
                borderRadius="2xl"
                width={{ md: 500 }}
                src={opcen_full}
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
          mt={10}
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
        <Container maxW="container.xl" py={1}>
          <Developers />
        </Container>
      </Box>
    </div>
  );
}

export default About;
