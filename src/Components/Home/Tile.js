import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

function Tile({ bgColor, image, name }) {
  return (
    <>
      <Box align="center">
        <Box
          boxShadow="lg"
          bgColor={bgColor}
          // width={{ base: 100, lg: 200, md: 200, sm: 300 }}
          // h={{ base: 300, lg: 200, md: 300, sm: 650 }}

          borderRadius="full"
          p={7}
          align="center"
        >
          <img src={image} width="64px" />
        </Box>
        <Text
          mt={4}
          mb={8}
          fontWeight={600}
          fontSize={{ lg: 15, md: 13, sm: 12 }}
          textAlign="center"
          color="#413F42"
        >
          {name}
        </Text>
      </Box>
    </>
  );
}

export default Tile;
