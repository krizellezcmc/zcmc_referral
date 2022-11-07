import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

function Tile(props) {
  return (
    <>
      <Box
        shadow="sm"
        bgColor="white"
        width={{ base: 300, lg: 300, md: 300, sm: 600 }}
        // h={{ base: 300, lg: 200, md: 300, sm: 650 }}
        m={5}
        borderRadius={14}
        py={7}
        align="center"
      >
        <Image src={props.image} w={{ lg: 100, md: 120, sm: 100 }} />
        <Text mt={4} fontWeight={500} fontSize={15}>
          {props.name}
        </Text>
      </Box>
    </>
  );
}

export default Tile;
