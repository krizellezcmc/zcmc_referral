import { Box, Button, Container, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/Navbar.css";
import header_img from "../../Assets/header.png";

function Header(props) {
  return (
    <>
      <Container maxW="container.xl">
        <Box p={3} display={{ md: "flex" }} mt={20} pt={20}>
          <Box mt={{ base: 4, lg: 15 }} mr={{ md: 20 }}>
            <Text
              fontWeight="bold"
              fontSize="5xl"
              letterSpacing="wide"
              className="header-text"
              mt={8}
            >
              Patient Navigation <br />
              and Referral System
            </Text>

            <Text mt={7} color="gray.500" fontWeight="300" letterSpacing="wide">
              Getting a new business off the ground is a lot of hard work.{" "}
              <br /> Here are five ideas you can use to find your first
              customers.
            </Text>

            <Box display={{ md: "flex" }} mt={10}>
              <Button
                rounded="full"
                px={8}
                colorScheme="green"
                mr={{ base: 2, lg: 3, sm: 0 }}
              >
                Refer a patient
              </Button>

              <Button
                rounded="full"
                px={8}
                colorScheme="green"
                variant="outline"
              >
                See more
              </Button>
            </Box>
          </Box>

          <Box flexShrink="0">
            <Image
              width={{ md: 600 }}
              src={header_img}
              alt="Doctors Illustration"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Header;
