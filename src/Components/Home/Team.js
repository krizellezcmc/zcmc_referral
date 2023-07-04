import React from "react";
import { Box, Image, Container } from "@chakra-ui/react";
import Contributors from "./Contributors";
import Developers from "./Developers";

function Team(props) {
  var bg = require("../../Assets/bg.png");
  return (
    <div>
      <Box justifyContent="center" alignItems="center" py={20}>
        <Contributors />
        <Developers />
      </Box>

      {/* <Image
          position="absolute"
          zIndex={-10}
          w="full"
          height={600}
          opacity={0.8}
        /> */}
    </div>
  );
}

export default Team;
