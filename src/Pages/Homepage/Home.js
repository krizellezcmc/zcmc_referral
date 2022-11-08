import React from "react";
import Header from "../../Components/Home/Header";
import Copyright from "../../Components/Home/Copyright";
import Specialization from "../../Components/Home/Specialization";
import FAQs from "../../Components/Home/FAQs";
import About from "../../Components/Home/About";
import "../../Styles/Navbar.css";
import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();

  const location = useLocation();

  function login() {
    navigate("/login");
  }
  return (
    <>
      <Box width="100%">
        <Box shadow="sm" className="nav" bgColor="white">
          <Container maxW="container.xl">
            <Flex py={4} align="center">
              <Text fontWeight={800} fontSize="15px">
                One Hospital Command
              </Text>
              <Spacer />
              <div className="nav-list">
                <Link
                  className={location.hash == "#header" ? "active" : "nav-item"}
                  href="#header "
                >
                  Home
                </Link>
                <Link
                  className={
                    location.hash == "#services" ? "active" : "nav-item"
                  }
                  href="#services"
                >
                  Services
                </Link>
                <Link
                  className={location.hash == "#about" ? "active" : "nav-item"}
                  href="#about"
                >
                  About
                </Link>
                <Link
                  className={location.hash == "#faqs" ? "active" : "nav-item"}
                  href="#faqs"
                >
                  FAQs
                </Link>
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

        <div className="content">
          <div id="header">
            <Header />
          </div>

          <div id="services">
            <Specialization />
          </div>

          <div id="about">
            <About />
          </div>

          <div id="faqs">
            <FAQs />
          </div>
        </div>

        <div className="copyright">
          <Copyright />
        </div>
      </Box>
    </>
  );
}

export default Home;
