import { Flex, Link, VStack, Text, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";

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
    backgroundColor: "#f5fdfd",
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        bgColor="red"
        boxShadow={10}
        alignItems="center"
        sx={{
          position: "fixed",
          top: 3,
          right: 3,
          zIndex: 100,
        }}
      >
        <Link onClick={handleMenuToggle}>
          {isMenuOpen ? <BiX fontSize={30} /> : <BiMenu fontSize={30} />}
        </Link>
      </Flex>

      <div style={menuContainerStyle}>
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
