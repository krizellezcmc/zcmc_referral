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
  IconButton,
  flexbox,
  Image,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiX, BiMenu, BiUpArrowAlt } from "react-icons/bi";
// import GalleryTile from "../../Components/Home/GalleryTile";
import Gallery from "../../Components/Home/Gallery";
import logo from "../../Assets/OHCC.png";

function Home(props) {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [display, changeDisplay] = useState("none");
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    navigate("#header");
  };

  let checkLog = localStorage.getItem("user");

  // CHECK
  useEffect(() => {
    if (checkLog !== null) {
      setLoggedIn(true);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }

      // console.log(window.scrollY);
      if (window.scrollY >= 5400) {
        navigate("#faqs");
      } else if (window.scrollY >= 2330) {
        navigate("#about");
      } else if (window.scrollY >= 1400) {
        navigate("#services");
      } else {
        navigate("#header");
      }
    });
  }, []);

  return (
    <>
      <Box width="100%">
        <Flex shadow="sm" className="nav" bgColor="white">
          <Container maxW="container.xl">
            <Flex py={2} align="center">
              <Image src={logo} h={50} mr={3} />
              <Text fontWeight={700} fontSize={{ sm: 14, md: 15, lg: 18 }}>
                ZCMC - Online Referral System
              </Text>
              <Spacer />
              <Flex display={{ sm: "none", md: "flex", lg: "flex" }}>
                <div className="nav-list">
                  <Link
                    className={
                      location.hash == "#header"
                        ? "nav-item active"
                        : "nav-item"
                    }
                    href="#header "
                  >
                    Home
                  </Link>
                  <Link
                    className={
                      location.hash == "#services"
                        ? "nav-item active"
                        : "nav-item"
                    }
                    href="#services"
                  >
                    Services
                  </Link>
                  <Link
                    className={
                      location.hash == "#about" ? "nav-item active" : "nav-item"
                    }
                    href="#about"
                  >
                    About
                  </Link>
                  <Link
                    className={
                      location.hash == "#faqs" ? "nav-item active" : "nav-item"
                    }
                    href="#faqs"
                  >
                    FAQs
                  </Link>
                </div>
              </Flex>
              <IconButton
                aria-label="Open Menu"
                size="lg"
                mr={2}
                icon={<BiMenu />}
                display={{ sm: "flex", md: "none", lg: "none" }}
                onClick={() => changeDisplay("flex")}
              />
              <Button
                size="sm"
                rounded="full"
                px={4}
                colorScheme="green"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                {loggedIn ? "Go to Dashboard" : "Sign in"}
              </Button>
            </Flex>
            <Flex
              w="100vw"
              bgColor="gray.100"
              zIndex={20}
              h="100vh"
              pos="fixed"
              top="0"
              left="0"
              overflow="auto"
              flexDir="column"
              display={display}
            >
              <Flex justify="flex-end">
                <IconButton
                  mt={2}
                  mr={2}
                  aria-label="Close Menu"
                  size="lg"
                  icon={<BiX />}
                  onClick={() => changeDisplay("none")}
                />
              </Flex>
              <Flex flexDir="column" align="center">
                <Link
                  className={
                    location.hash == "#header" ? "active" : "nav-item2"
                  }
                  href="#header "
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  Home
                </Link>
                <Link
                  className={
                    location.hash == "#services" ? "active" : "nav-item2"
                  }
                  href="#services"
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  Services
                </Link>
                <Link
                  className={location.hash == "#about" ? "active" : "nav-item2"}
                  href="#about"
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  About
                </Link>
                <Link
                  className={location.hash == "#faqs" ? "active" : "nav-item2"}
                  href="#faqs"
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  FAQs
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Flex>

        <div className="content">
          {showScrollUp && (
            <div className="scroll">
              <Box
                as="button"
                bg="green.600"
                p="2.5"
                w="fit-content"
                rounded="lg"
                color="white"
                border="none"
                onClick={scrollUp}
                _hover={{ backgroundColor: "green.700" }}
              >
                <BiUpArrowAlt fontSize={20} />
              </Box>
            </div>
          )}

          <div id="header">
            <Header />
          </div>

          <div id="gallery">
            <Gallery />
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
