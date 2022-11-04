import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import "../../Styles/Navbar.css";

function Navbar(props) {
  return (
    <>
      <Box shadow="sm" position="sticky">
        <Container maxW="container.xl">
          <Flex py={4} align="center">
            <Text fontWeight={800} fontSize="15px">
              One Hospital Command
            </Text>
            <Spacer />
            <div className="nav-list">
              <Link className="nav-item">Home</Link>
              <Link className="nav-item">Services</Link>
              <Link className="nav-item">About</Link>
              <Link className="nav-item">FAQs</Link>
            </div>
            <Button size="sm" rounded="full" px={4} colorScheme="green">
              Sign in
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
