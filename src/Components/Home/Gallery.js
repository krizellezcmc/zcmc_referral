import { Wrap, WrapItem, Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import GalleryTile from "./GalleryTile";
import opcen from "../../Assets/opcen.jpg";
import opcen1 from "../../Assets/opcen1.jpg";

function Gallery(props) {
  return (
    <>
      <Box py={20} w="100%" bgColor="gray.50">
        <Container maxW="container.xl" pb={20}>
          <Box p={3} align="center">
            <Text
              fontWeight="bold"
              color=""
              fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
              letterSpacing="wide"
              mt={10}
            >
              Gallery
            </Text>

            <Text
              mt={7}
              color=""
              fontWeight="300"
              letterSpacing="wide"
              // w={600}
              fontSize={{ md: 13, lg: 16, sm: 13 }}
            >
              Getting a new business off the ground is a lot of hard work. Here
              are five ideas you can use <br /> to find your first customers.
            </Text>
          </Box>
          <Wrap justify="center" mt={10}>
            <WrapItem width={400}>
              <GalleryTile image={opcen} name="Internal Medicine" />
            </WrapItem>
            <WrapItem width={400}>
              <GalleryTile image={opcen1} name="Obstetrics and Gynecology" />
            </WrapItem>
            <WrapItem width={400}>
              <GalleryTile image={opcen} name="Pediatrics" />
            </WrapItem>
            <WrapItem width={400}>
              <GalleryTile image={opcen1} name="Psychiatry" />
            </WrapItem>
            <WrapItem width={400}>
              <GalleryTile image={opcen} name="Internal Medicine" />
            </WrapItem>
            <WrapItem width={400}>
              <GalleryTile image={opcen} name="Internal Medicine" />
            </WrapItem>
          </Wrap>
        </Container>
      </Box>
    </>
  );
}

export default Gallery;
