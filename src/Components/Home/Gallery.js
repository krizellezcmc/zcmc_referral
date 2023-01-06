import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import Carousel, { consts } from "react-elastic-carousel";

import opcen1 from "../../Assets/Gallery/1.jpg";
import opcen2 from "../../Assets/Gallery/2.jpg";
import opcen3 from "../../Assets/Gallery/3.jpg";
import opcen4 from "../../Assets/Gallery/4.jpg";
import opcen5 from "../../Assets/Gallery/5.jpg";
import opcen6 from "../../Assets/Gallery/6.jpg";
import opcen7 from "../../Assets/Gallery/7.jpg";
import opcen8 from "../../Assets/Gallery/8.jpg";
import opcen9 from "../../Assets/Gallery/9.jpg";
import opcen10 from "../../Assets/Gallery/10.jpg";
import opcen11 from "../../Assets/Gallery/11.jpg";

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
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
            </Text>
          </Box>
          <div className="carousel-wrapper">
            <Carousel breakPoints={breakPoints} renderArrow={customArrow}>
              <GalleryTile image={opcen1} />
              <GalleryTile image={opcen2} />
              <GalleryTile image={opcen3} />
              <GalleryTile image={opcen4} />
              <GalleryTile image={opcen5} />
              <GalleryTile image={opcen6} />
              <GalleryTile image={opcen7} />
              <GalleryTile image={opcen8} />
              <GalleryTile image={opcen9} />
              <GalleryTile image={opcen10} />
              <GalleryTile image={opcen11} />
            </Carousel>
          </div>
        </Container>
      </Box>
    </>
  );
}

export default Gallery;
