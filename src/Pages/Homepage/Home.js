import React, { useEffect, useState } from "react";
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
import { BiUpArrowAlt } from "react-icons/bi";

function Home(props) {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function login() {
    navigate("/login");
  }

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    navigate("#header");
  };

  // CHECK
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    });
  }, []);

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
          {showScrollUp && (
            <div className="scroll">
              <Box
                as="button"
                bg="rgba(0, 0, 0, 0.6);"
                p="2.5"
                w="fit-content"
                rounded="lg"
                color="white"
                border="none"
                onClick={scrollUp}
                _hover={{ backgroundColor: "gray.700" }}
              >
                <BiUpArrowAlt fontSize={40} />
              </Box>
            </div>
          )}

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
