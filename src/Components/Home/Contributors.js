import React from "react";
import { Text, Box, Center } from "@chakra-ui/react";

import ContributorsTile from "./ContributorsTile";
import ProfileTile from "./ProfileTile";

function Contributors(props) {
  var doc1 = require("../../Assets/Profile/doc_kunting_head.png");
  var sir_john = require("../../Assets/Profile/sir_john.png");
  var alyana = require("../../Assets/Profile/alyana.png");
  var krizelle = require("../../Assets/Profile/krizelle.png");

  return (
    <Box>
      <Box
        mt={{ base: 5, lg: 40, md: 20 }}
        ml={{ lg: 10, md: 8, sm: 3 }}
        //   mr={{ lg: 40, md: 20, sm: 5 }
        mb={{ md: 10 }}
        align="center"
      >
        <Text
          fontWeight={700}
          fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
          color="black"
          letterSpacing="wide"
        >
          Meet the Team
        </Text>

        <Text
          mt={7}
          color="gray.500"
          fontWeight="300"
          letterSpacing="wide"
          w={{ sm: 500, md: 800 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </Text>
      </Box>
      <Center mt={{ lg: 20, md: 5, sm: 0 }} mb={10} display={{ lg: "block" }}>
        <Box
          flexShrink={0}
          mb={{ lg: 10, md: 5 }}
          align="center"
          // display={{ md: "flex" }}
        >
          <ContributorsTile
            image={doc1}
            name="Dr. Afdal B. Kunting"
            position="Medical Center Chief II"
            nameFontSize={{ lg: 15, md: 13, sm: 11.5 }}
            height={{ sm: 200, lg: 250 }}
            width={{ sm: 200, lg: 250 }}
          />
        </Box>
        <Center>
          <Box
            flexShrink={0}
            mt={{ base: 5, md: 5 }}
            mb={{ lg: 10, md: 5 }}
            display={{ md: "flex" }}
          >
            <ProfileTile
              image={sir_john}
              name="John Mary C. Sta Teresa"
              color="#A1CDDE"
              position="Statistician II"
              height={{ lg: 200, md: 180, sm: 180 }}
              width={{ lg: 180, md: 160, sm: 130 }}
            />
            <ProfileTile
              image={alyana}
              name="Alyana Claire C. Barretto"
              color=" #7C918F"
              position="Software Developer"
              height={{ lg: 200, md: 180, sm: 180 }}
              width={{ lg: 170, md: 140, sm: 130 }}
            />
            <ProfileTile
              image={krizelle}
              name="Krizelle Mae B. Falcasantos"
              color="#F0CAC7"
              // color="#a7c5ae"
              // color="#D1CFE2 "
              // color="#FFf1e6"
              // color="#ECD5E3"
              position="Software Developer"
              height={{ lg: 200, md: 180, sm: 180 }}
              width={{ lg: 180, md: 170, sm: 140 }}
            />
          </Box>
        </Center>
      </Center>
    </Box>
  );
}

export default Contributors;
