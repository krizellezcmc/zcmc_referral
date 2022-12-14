import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/Navbar.css";
import logo from "../../Assets/OHCC.png";

function Navbar(props) {
  const navigate = useNavigate();

  const location = useLocation();
  function login() {
    navigate("/login");
  }

  return (
    <>
      <Box shadow="sm" position="sticky">
        <Container maxW="container.xl">
          <Flex py={4} align="center">
            <Image src={logo} />
            {/* <Text fontWeight={800} fontSize="15px">
              One Hospital Command
            </Text> */}
            <Spacer />
            <div className="nav-list">
              <Link className="nav-item">Home</Link>
              <Link
                className={location.hash("#services") ? "active" : "nav-item"}
              >
                Services
              </Link>
              <Link className="nav-item">About</Link>
              <Link className="nav-item">FAQs</Link>
            </div>
            <Button
              size="sm"
              rounded="full"
              px={4}
              colorScheme="green"
              onClick={login}
            >
              Sign in
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
