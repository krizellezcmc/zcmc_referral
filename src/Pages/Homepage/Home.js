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
  Image,
  HStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiX, BiMenu, BiUpArrowAlt } from "react-icons/bi";
// import GalleryTile from "../../Components/Home/GalleryTile";
import Gallery from "../../Components/Home/Gallery";
import logo from "../../Assets/OHCC.png";
import { BsArrowRight } from "react-icons/bs";

const navItem = [
  {
    name: "Home",
    href: "header",
  },
  {
    name: "Services",
    href: "services",
  },
  {
    name: "About",
    href: "about",
  },
  {
    name: "FAQs",
    href: "faqs",
  },
];

function Home(props) {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [display, changeDisplay] = useState("none");
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [currSection, setCurrSection] = useState("");

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }

      const sections = document.querySelectorAll("section");
      let current = "";
      // console.log(window.scrollY);
      sections.forEach((section) => {
        const sectTop = section.offsetTop;
        const sectHeight = section.clientHeight;
        const sect = sectTop - sectHeight / 2;
        if (window.pageYOffset >= sect) {
          current = section.getAttribute("id");
          console.log(current);
        }
      });

      setCurrSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checkLog]);

  useEffect(() => {
    setActiveItem(currSection);
  }, [currSection]);

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
              <HStack gap={10} mr={10}>
                {navItem.map((item) => {
                  return (
                    <>
                      <Text
                        fontSize={15}
                        fontWeight={item.href === activeItem ? 600 : 400}
                        color={item.href === activeItem ? "teal" : ""}
                        // borderBottom={item.active ? "1px solid teal" : "none"}
                        // // borderBottomWidth={2}
                        onClick={() => {
                          setActiveItem(item.href);
                          scrollToSection(`#${item.href}`);
                        }}
                        cursor="pointer"
                      >
                        {item.name}
                      </Text>
                    </>
                  );
                })}
              </HStack>

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
                rightIcon={<BsArrowRight />}
              >
                {loggedIn ? "Go to Account" : "Sign in"}
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
                    location.hash === "#header" ? "active" : "nav-item2"
                  }
                  href="#header "
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  Home
                </Link>
                <Link
                  className={
                    location.hash === "#services" ? "active" : "nav-item2"
                  }
                  href="#services"
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  Services
                </Link>
                <Link
                  className={
                    location.hash === "#about" ? "active" : "nav-item2"
                  }
                  href="#about"
                  my={5}
                  onClick={() => changeDisplay("none")}
                >
                  About
                </Link>
                <Link
                  className={location.hash === "#faqs" ? "active" : "nav-item2"}
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

          <section id="header">
            <Header />
            <Box>
              <Gallery />
            </Box>
          </section>

          <section id="services" style={{ height: "100vh" }}>
            <Specialization />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="faqs" style={{ height: "100vh" }}>
            <FAQs />
          </section>
        </div>

        <div className="copyright">
          <Copyright />
        </div>
      </Box>
    </>
  );
}

export default Home;
