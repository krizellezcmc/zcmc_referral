import React from "react";
import { Text, Box } from "@chakra-ui/react";
import ProfileTile from "./ProfileTile";

function Developers(props) {
  var sir_john = require("../../Assets/Profile/sir_john.png");
  var alyana = require("../../Assets/Profile/alyana.png");
  var krizelle = require("../../Assets/Profile/krizelle.png");

  return (
    <div>
      <Box mt={{ lg: 20, md: 10, sm: 0 }} mb={10} display={{ md: "flex" }}>
        <Box
          mt={{ base: 5, lg: 20, md: 20 }}
          mr={{ lg: 10, md: 10, sm: 5 }}
          p={3}
          width={{ md: 500 }}
        >
          <Text
            fontWeight={700}
            fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
            color="alpha.900"
            letterSpacing="wide"
          >
            Meet the Team.
          </Text>

          <Text
            mt={3}
            align="justify"
            color="alpha.900"
            fontWeight={400}
            fontSize={{ sm: 14 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore..
          </Text>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 5, md: 10 }}
          mb={{ lg: 10, md: 5 }}
          display={{ md: "flex" }}
          align={{ md: "center" }}
        >
          <ProfileTile
            image={sir_john}
            name="John Mary C. Sta Teresa"
            color="#A1CDDE"
            position="Statistician II"
            height={{ lg: 270, md: 180, sm: 180 }}
            width={{ lg: 200, md: 160, sm: 130 }}
          />
          <ProfileTile
            image={alyana}
            name="Alyana Claire C. Barretto"
            color="#B8C294"
            position="Software Developer"
            height={{ lg: 270, md: 180, sm: 180 }}
            width={{ lg: 190, md: 160, sm: 120 }}
          />
          <ProfileTile
            image={krizelle}
            name="Krizelle Mae B. Falcasantos"
            // color="#F0CAC7"
            color="#D1CFE2 "
            // color="#FFf1e6"
            // color="#ECD5E3"
            position="Software Developer"
            height={{ lg: 270, md: 180, sm: 180 }}
            width={{ lg: 212, md: 170, sm: 140 }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Developers;
