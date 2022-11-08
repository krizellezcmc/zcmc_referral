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
import { SiFacebook, SiInstagram } from "react-icons/si";
import Partners from "./Partners";

function About(props) {
  var zcmc_admin = require("../../Assets/zcmc_admin.jpg");
  var zcmc_opd = require("../../Assets/zcmc_opd.webp");
  var dog1 = require("../../Assets/dog-alyana.png");
  var dog2 = require("../../Assets/dog-krizelle.png");
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
              w={600}
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
        </Container>
        <Box align="center" mt={20}>
          <Partners />
        </Box>
      </Box>
      <Box bgColor="gray.100">
        <Container maxW="container.xl">
          <Box mt={20} mb={10} display={{ md: "flex" }}>
            <Box
              mt={{ base: 5, md: 40 }}
              ml={{ md: 10 }}
              mr={{ md: 40 }}
              width={{ md: 450 }}
              mb={{ md: 20 }}
            >
              <Text fontWeight={700} fontSize={30} color="gray.700">
                Meet the
              </Text>
              <Text fontWeight={700} fontSize={30} color="gray.700">
                Developers
              </Text>
              <Text mt={2} align="justify" color="gray.600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore..
              </Text>
            </Box>
            <Box
              flexShrink={0}
              mt={{ base: 5, md: 10 }}
              mb={{ md: 10 }}
              display={{ md: "flex" }}
            >
              <Box
                height={{ md: 400 }}
                width={{ md: 250 }}
                mr={{ md: 10 }}
                borderRadius="20"
                bgColor="white"
                p={3}
                boxShadow="xl"
              >
                <Box
                  borderRadius="20"
                  bgColor="#B8C294"
                  height={{ md: 310 }}
                  width={{ md: 225 }}
                >
                  <Image src={dog1} />
                </Box>
                <Box mt={5}>
                  <Text fontSize={14} color="gray.700" fontWeight={600}>
                    Alyana Claire C. Barretto
                  </Text>
                  <Box display={{ md: "flex" }}>
                    <Text fontSize={13} color="gray.700">
                      Software Developer
                    </Text>
                    <Spacer />
                    <Link>
                      <Icon as={SiFacebook} mr={2} />
                    </Link>
                    <Link>
                      <Icon as={SiInstagram} />
                    </Link>
                  </Box>
                </Box>
              </Box>
              <Box
                height={{ md: 400 }}
                width={{ md: 250 }}
                borderRadius="20"
                bgColor="white"
                p={3}
                boxShadow="xl"
              >
                <Box
                  borderRadius="20"
                  bgColor="#F0CAC7"
                  height={{ md: 310 }}
                  width={{ md: 225 }}
                >
                  <Image src={dog1} />
                </Box>
                <Box mt={5}>
                  <Text fontSize={14} color="gray.700" fontWeight={600}>
                    Krizelle Mae B. Falcasantos
                  </Text>
                  <Box display={{ md: "flex" }}>
                    <Text fontSize={13} color="gray.700">
                      Software Developer
                    </Text>
                    <Spacer />
                    <Link>
                      <Icon as={SiFacebook} mr={2} />
                    </Link>
                    <Link>
                      <Icon as={SiInstagram} />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default About;
