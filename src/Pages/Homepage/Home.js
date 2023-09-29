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
  Spacer,
  Text,
  IconButton,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiMenu, BiUpArrowAlt } from "react-icons/bi";
import logo from "../../Assets/OHCC.png";
import { BsArrowRight } from "react-icons/bs";
import Partners from "../../Components/Home/Partners";

const navItem = [
  {
    name: "Home",
    href: "header",
  },
  {
    name: "About",
    href: "about",
  },
  {
    name: "Facilities",
    href: "facilities",
  },
  {
    name: "Services",
    href: "services",
  },
  // {
  //   name: "Team",
  //   href: "team",
  // },
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
        const sect = sectTop - sectHeight / 3;
        if (window.pageYOffset >= sect) {
          current = section.getAttribute("id");
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

          <section id="header" style={{ height: "100vh" }}>
            <Header />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="facilities">
            <Partners />
          </section>

          <section id="services">
            <Specialization />
          </section>

          {/* <section id="team">
            <Team />
          </section> */}

          <section id="faqs">
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
