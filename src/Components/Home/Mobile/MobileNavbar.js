import {
  Flex,
  Link,
  VStack,
  Text,
  Container,
  Image,
  Divider,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import logo from "../../../Assets/OHCC.png";

const navItem = [
  {
    name: "Home",
    href: "home",
  },
  {
    name: "Gallery",
    href: "gallery",
  },
  {
    name: "Specialization",
    href: "specialization",
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

function MobileNavbar({ handleSelectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

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
          </VStack>
        )}
      </div>
    </>
  );
}

export default MobileNavbar;
