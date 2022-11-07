import { Box, Button, Container, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/Navbar.css";
import header_img from "../../Assets/header.png";

function Header(props) {
  return (
    <>
      <Container
        maxW="container.xl"
        pt={{ lg: 10, md: 5 }}
        pb={{ lg: 20, md: 0, sm: 0 }}
      >
        <Box
          p={3}
          display={{ md: "flex" }}
          mt={{ lg: 20, md: 0, sm: 0 }}
          pt={{ lg: 20, md: 0, sm: 0 }}
        >
          <Box mt={{ base: 4, lg: 15, md: 0, sm: 16 }} mr={{ md: 10, lg: 20 }}>
            <Text
              fontWeight="bold"
              fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
              letterSpacing={{ lg: "wide" }}
              className="header-text"
              mt={8}
            >
              Patient Navigation
              <br />
              and Referral System
            </Text>

            <Text
              mt={7}
              fontSize={{ md: 13, lg: 16 }}
              color="gray.500"
              fontWeight="300"
              letterSpacing="wide"
            >
              Getting a new business off the ground is a lot of hard work, Here
              are five ideas you can use to find your first customers.
            </Text>

            <Box display={{ md: "flex" }} mt={10}>
              <Button
                rounded="full"
                px={{ lg: 8 }}
                size={{ md: "sm", lg: "md", sm: "md" }}
                colorScheme="green"
                mr={{ base: 2, lg: 3, sm: 2 }}
              >
                Refer a patient
              </Button>

              <Link _hover={{ textDecoration: "none" }} href="#about">
                <Button
                  rounded="full"
                  px={8}
                  size={{ md: "sm", lg: "md", sm: "md" }}
                  colorScheme="green"
                  variant="outline"
                >
                  See more
                </Button>
              </Link>
            </Box>
          </Box>

          <Box flexShrink="0">
            <Image
              width={{ md: 400, lg: 600, sm: 0 }}
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
