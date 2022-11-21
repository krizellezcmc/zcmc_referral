import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import Carousel, { consts } from "react-elastic-carousel";

import opcen from "../../Assets/opcen.jpg";
import opcen1 from "../../Assets/opcen1.jpg";
import GalleryTile from "./GalleryTile";
import "../../Styles/Gallery.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function customArrow({ type, onClick, isEdge }) {
  const pointer =
    type === consts.PREV ? (
      <BiChevronLeft size={50} color="#38a169" />
    ) : (
      <BiChevronRight size={50} color="#38a169" />
    );
  return (
    <button onClick={onClick} disabled={isEdge}>
      {pointer}
    </button>
  );
}

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2, itemsToScroll: 2 },
  { width: 760, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Gallery(props) {
  return (
    <>
      <Box py={10} w="100%">
        <Container maxW="container.xl" mb={10}>
          <Box mb={14} align="center">
            <Text
              fontWeight="bold"
              fontSize={{ md: "4xl", lg: "5xl", sm: "4xl" }}
              letterSpacing="wide"
              mt={5}
            >
              Gallery
            </Text>

            <Text
              mt={7}
              fontWeight="300"
              letterSpacing="wide"
              w={{ sm: 460, lg: 800 }}
              fontSize={{ md: 13, lg: 16, sm: 13 }}
            >
              Getting a new business off the ground is a lot of hard work. Here
              are five ideas you can use to find your first customers.
            </Text>
          </Box>
          <div className="carousel-wrapper">
            <Carousel breakPoints={breakPoints} renderArrow={customArrow}>
              <GalleryTile image={opcen} />
              <GalleryTile image={opcen1} />
              <GalleryTile image={opcen} />
              <GalleryTile image={opcen1} />
              <GalleryTile image={opcen} />
              <GalleryTile image={opcen1} />
            </Carousel>
          </div>
        </Container>
      </Box>
    </>
  );
}

export default Gallery;
