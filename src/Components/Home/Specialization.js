import { Box, Container, Spacer, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import Tile from "./Tile";
import lungs from "../../Assets/lungs.png";
import pedia from "../../Assets/pedia.png";
import brain from "../../Assets/brain.png";
import oby from "../../Assets/oby.png";

function Specialization(props) {
  return (
    <>
      <Box bgColor="gray.50" py={20} w="100%">
        <Container maxW="container.xl" pb={20}>
          <Box p={3} align="center">
            <Text
              fontWeight="bold"
              fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
              letterSpacing="wide"
              mt={10}
            >
              Our Specializations
            </Text>

            <Text
              mt={7}
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
            <WrapItem width={300}>
              <Tile image={lungs} name="Internal Medicine" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={oby} name="Obstetrics and Gynecology" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={pedia} name="Pediatrics" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={brain} name="Psychiatry" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={lungs} name="Internal Medicine" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={oby} name="Obstetrics and Gynecology" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={pedia} name="Pediatrics" />
            </WrapItem>
            <WrapItem width={300}>
              <Tile image={brain} name="Psychiatry" />
            </WrapItem>
          </Wrap>
        </Container>
      </Box>
    </>
  );
}

export default Specialization;
