import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

function GalleryTile(props) {
  return (
    <>
      {/* <Box
        // shadow="md"
        bgColor="white"
        width={{ base: 300, lg: 300, md: 200, sm: 600 }}
        // h={{ base: 300, lg: 200, md: 300, sm: 650 }}
        m={5}
        borderRadius={14}   
        py={7}
        align="center"
      >
        <Image src={props.image} w={{ lg: 100, md: 100, sm: 100 }} />
        <Text mt={4} fontWeight={500} fontSize={{ lg: 15, md: 13 }}>
          {props.name}
        </Text>
      </Box> */}
      <Box
        width={{ base: 300, lg: 400, md: 500, sm: 700 }}
        h={{ base: 300, lg: 230, md: 260, sm: 200 }}
        m={2}
      >
        <Image src={props.image} w="full" h="full" />
      </Box>
    </>
  );
}

export default GalleryTile;
