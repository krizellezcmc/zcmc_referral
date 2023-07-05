import React from "react";
import { Text, Box, Image, Container, VStack } from "@chakra-ui/react";
import SectionHeader from "../SectionHeader";

function MobileAbout(props) {
  var opcen_full = require("../../../Assets/opcen_full.JPG");
  var opcen = require("../../../Assets/opcen_pic.JPG");
  return (
    <div>
      <Box bgColor="white" py={20}>
        <Container maxW="container.xl">
          <SectionHeader
            title="Get to know us"
            description=" The ZCMC OPCEN with its own unique values and line of work,
              inculcates some of ZCMC’s core values that is relevant to the
              group’s core functions. These include
                Organization, Professionalism, Compassion, Efficiency, and
                Non-discrimination.
              "
          />

          <VStack mt={14} display={{ md: "flex" }}>
            <Box flexShrink={0}>
              <Image
                borderRadius="2xl"
                width={{ md: "auto" }}
                src={opcen}
                alt="zcmc"
              />
            </Box>

            <Box mt={{ base: 4, md: 10 }} ml={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={20} color="gray.600">
                Mission
              </Text>
              <Text mt={2} align="justify" color="gray.600" fontSize={14}>
                To implement a well-coordinated referral system between health
                institutions within the ZamBaSulTa region and ZCMC, and to serve
                as liaison between referring members of the health care team,
                bridging previously identified gaps including miscommunication,
                limitations to knowledge on specialized care, and lack of access
                to appropriate healthcare.
              </Text>
            </Box>
          </VStack>
          <VStack mt={10} display={{ md: "flex" }} bgColor="white">
            <Box flexShrink={0}>
              <Image
                borderRadius="2xl"
                width={{ md: "auto" }}
                src={opcen_full}
                alt="zcmc"
              />
            </Box>
            <Box mt={{ base: 4, md: 10 }} mr={{ md: 6 }} p={5}>
              <Text fontWeight="bold" fontSize={20} color="gray.600">
                Vision
              </Text>
              <Text mt={2} align="justify" color="gray.600" fontSize={14}>
                Zamboanga City Medical Center Operation Center (ZCMC OPCEN) will
                be recognized as the leader and innovator in inter-health
                facility referrals in the Region and beyond.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </div>
  );
}

export default MobileAbout;
