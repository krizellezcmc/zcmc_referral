import { Box, Button, Container, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/Navbar.css";
import header_img from "../../Assets/header1.png";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function login() {
    navigate("/login");
  }
  return (
    <Container maxW="container.xl">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={{ xl: 20, lg: 20, md: 10 }}
      >
        <Box display={{ md: "flex" }}>
          <Box mt={{ base: 10, lg: 20, md: 0 }} mr={{ md: 10, lg: 10 }}>
            <Text
              fontWeight="bold"
              fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
              letterSpacing={{ lg: "wide" }}
              className="header-text"
              mt={8}
              transition="ease-in"
              transitionDuration="2s"
            >
              Patient Navigation
              <br />
              and Referral System
            </Text>

            <Text
              mt={7}
              color="gray.500"
              fontWeight="300"
              letterSpacing="wide"
              fontSize={{ md: 13, lg: 16, sm: 13 }}
            >
              Introducing the Web Based Referral System- a cutting-edge solution
              that revolutionizes the way healthcare facilities refer patients
              to tertiary care hospital.
              <b>
                “Matching right PATIENT to right FACILITY at the right TIME.”{" "}
              </b>
            </Text>

            <Box display={{ md: "flex" }} mt={20}>
              <Button
                rounded="full"
                px={{ lg: 8, sm: 10 }}
                size={{ md: "sm", lg: "md", sm: "md" }}
                colorScheme="green"
                mr={{ base: 2, lg: 3, sm: 2 }}
                onClick={login}
                shadow="base"
                _hover={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  transition: ".5s ease",
                }}
              >
                Refer a patient
              </Button>

              <Link _hover={{ textDecoration: "none" }} href="#about">
                <Button
                  rounded="full"
                  size={{ md: "sm", lg: "md", sm: "md" }}
                  colorScheme="green"
                  variant="outline"
                  shadow="sm"
                  _hover={{
                    paddingLeft: 8,
                    paddingRight: 8,
                    transition: ".5s ease",
                  }}
                >
                  See more
                </Button>
              </Link>
            </Box>
          </Box>

          <Box flexShrink="0" px={5} display={{ xs: "none", lg: "block" }}>
            <Image
              width={{ sm: 0, md: 300, lg: 500, xl: 600 }}
              src={header_img}
              alt="Doctors Illustration"
              mt={{ base: 4, lg: 20, md: 0, sm: 16, xl: 20 }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Header;
