import {
  Flex,
  Link,
  VStack,
  Text,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiArrowToRight, BiMenu, BiX } from "react-icons/bi";
import logo from "../../../Assets/OHCC.png";
import { useNavigate } from "react-router-dom";

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

function MobileNavbar({ handleSelectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();
  let checkLog = localStorage.getItem("user");

  const handleClick = (item) => {
    setActiveItem(item.href);
    handleSelectionClick(`#${item.href}`);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuToggle = () => {
    // console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const menuContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: isMenuOpen ? "100%" : "0",
    overflow: "hidden",
    transition: "width 0.3s ease",
    zIndex: isMenuOpen ? 99 : -1,
    // backgroundColor: "#f5fdfd",
    backgroundColor: "white",
  };
  useEffect(() => {
    if (checkLog !== null) {
      setLoggedIn(true);
    }
  }, [checkLog]);

  return (
    <>
      <Flex
        bgColor="white"
        boxShadow={20}
        alignItems="center"
        width="100%"
        position="fixed"
        height={16}
        zIndex={10}
        px={5}
      >
        <Flex alignItems="center" zIndex={30}>
          <Image src={logo} h={50} mr={3} />
          <VStack lineHeight={0.2} align="left">
            <Text fontWeight={700} fontSize={9}>
              Online Referral System
            </Text>
            <Divider />
            <Text fontSize={9}> Zammboanga City Medical Center</Text>
          </VStack>
        </Flex>

        <Link
          onClick={handleMenuToggle}
          sx={{
            position: "absolute",
            top: 3.5,
            right: 4,
            zIndex: 1000,
          }}
        >
          {isMenuOpen ? <BiX fontSize={30} /> : <BiMenu fontSize={30} />}
        </Link>
      </Flex>

      <div style={menuContainerStyle}>
        <Link
          onClick={handleMenuToggle}
          sx={{
            position: "absolute",
            top: 3.5,
            right: 4,
            zIndex: 1000,
          }}
        >
          <BiX fontSize={30} />
        </Link>
        {isMenuOpen && (
          <VStack gap={10} pt={20}>
            {navItem.map((item) => {
              return (
                <>
                  <Text
                    fontSize={15}
                    fontWeight={item.href === activeItem ? 600 : 400}
                    color={item.href === activeItem ? "green" : ""}
                    // borderBottom={item.active ? "1px solid teal" : "none"}
                    // borderBottomWidth={2}
                    onClick={() => handleClick(item)}
                    cursor="pointer"
                  >
                    {item.name}
                  </Text>
                </>
              );
            })}

            <Button
              size="sm"
              rounded="full"
              px={4}
              colorScheme="green"
              onClick={() => navigate("/login")}
              rightIcon={<BiArrowToRight />}
            >
              {loggedIn ? "Go to Account" : "Sign in"}
            </Button>
          </VStack>
        )}
      </div>
    </>
  );
}

export default MobileNavbar;
