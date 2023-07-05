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
import SectionHeader from "./SectionHeader";

function customArrow({ type, onClick, isEdge }) {
  const pointer =
    type === consts.PREV ? (
      <BiChevronLeft size={30} color="#38a169" />
    ) : (
      <BiChevronRight size={30} color="#38a169" />
    );
  return (
    <button onClick={onClick} disabled={isEdge}>
      {pointer}
    </button>
  );
}

const breakPoints = [
  { width: 6, itemsToShow: 1 },
  { width: 700, itemsToShow: 2, itemsToScroll: 2 },
  { width: 760, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Gallery(props) {
  return (
    <>
      <Box mt={40}>
        <Container maxW="container.xl" mb={10}>
          <SectionHeader
            title="Gallery"
            description="With web based referral system, healthcare facilities can improve
              patient outcomes by ensuring that patients receive the care they
              need in a timely manner."
          />

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
