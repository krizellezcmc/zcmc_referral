import { Box, Button, Container, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import "../../Styles/Navbar.css";
import header_img from "../../Assets/header.png";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function login() {
    navigate("/login");
  }
  return (
    <>
      <Container
        maxW="container.xl"
        py={{ lg: 20, md: 5 }}
        pb={{ lg: 20, md: 0, sm: 0 }}
      >
        <Box
          display={{ md: "flex" }}
          py={{ lg: 20, md: 0, sm: 0 }}
          px={{ lg: 20, md: 0, sm: 0 }}
        >
          <Box mt={{ base: 4, lg: 20, md: 0, sm: 16 }} mr={{ md: 10, lg: 20 }}>
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
                onClick={login}
                shadow="base"
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
                  shadow="sm"
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
              mt={{ base: 4, lg: 20, md: 0, sm: 16 }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Header;
