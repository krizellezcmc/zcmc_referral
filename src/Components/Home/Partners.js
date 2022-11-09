import { Text, Box, Image } from "@chakra-ui/react";
import React from "react";
import alicia from "../../Assets/Partners/alicia.jfif";
import basilan from "../../Assets/Partners/basilan.jpg";
import bayog from "../../Assets/Partners/bayog.jfif";
import brent from "../../Assets/Partners/brent.png";
import cho from "../../Assets/Partners/cho.jfif";
import camp_navarro from "../../Assets/Partners/camp_navarro.jfif";
import cmz from "../../Assets/Partners/cmz.png";

import "../../Styles/Partners.css";

function Partners(props) {
  return (
    <div>
      <Box align="center" mt={20}>
        <Text fontSize="4xl" letterSpacing="wide" fontWeight="bold">
          Referring Facilities
        </Text>
      </Box>

      <Box className="slider" my={20}>
        <Box className="slide-track">
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
          {/* <!-- same 9 slides doubled (duplicate) --> */}
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
          <Image src={alicia} className="element" />
          <Image src={basilan} className="element" />
          <Image src={brent} className="element" />
          <Image src={camp_navarro} className="element" />
        </Box>
      </Box>

      {/* //hospitals */}
      {/* <Box display="flex" mt={10}>
        <Image src={alicia} className="element" />
        <Image src={basilan} className="element" />
        <Image src={brent} className="element" />
        <Image src={camp_navarro} className="element" />
        <Image src={alicia} className="element" />
        <Image src={basilan} className="element" />
        <Image src={brent} className="element" />
        <Image src={camp_navarro} className="element" />
        <Image src={alicia} className="element" />
        <Image src={basilan} className="element" />
        <Image src={brent} className="element" />
        <Image src={camp_navarro} className="element" />
      </Box>
      {/* rhu/cho 
      <Box display="flex" mt={10}>
        <Image src={bayog} className="element" />
        <Image src={cho} className="element" />
      </Box> */}
    </div>
  );
}

export default Partners;
