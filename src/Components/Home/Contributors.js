import React from "react";
import { Text, Box, Center } from "@chakra-ui/react";

import ContributorsTile from "./ContributorsTile";
import ProfileTile from "./ProfileTile";
import SectionHeader from "./SectionHeader";

function Contributors(props) {
  var doc1 = require("../../Assets/Profile/doc_kunting_head.png");
  var sir_john = require("../../Assets/Profile/sir_john.png");
  var alyana = require("../../Assets/Profile/alyana.png");
  var krizelle = require("../../Assets/Profile/krizelle.png");

  return (
    <Box>
      <SectionHeader title="Meet the Team" />
      <Center>
        <Box
          display="flex"
          alignItems="flex-end"
          gap={20}
          // display={{ md: "flex" }}
        >
          <ContributorsTile
            image={doc1}
            name="Dr. Afdal B. Kunting"
            position="Medical Center Chief II"
            nameFontSize={{ lg: 15, md: 13, sm: 11.5 }}
            width={{ sm: 200, lg: 250 }}
          />
          <ProfileTile
            image={sir_john}
            name="John Mary C. Sta Teresa"
            position="Statistician II"
            width={{ lg: 170, md: 160, sm: 130 }}
          />
          <ProfileTile
            image={alyana}
            name="Alyana Claire C. Barretto"
            position="Software Developer"
            width={{ lg: 160, md: 160, sm: 130 }}
          />
          <ProfileTile
            image={krizelle}
            name="Krizelle Mae B. Falcasantos"
            position="Software Developer"
            width={{ lg: 170, md: 160, sm: 140 }}
          />
        </Box>
        <Center>
          <Box
            flexShrink={0}
            mt={{ base: 5, md: 5 }}
            mb={{ lg: 10, md: 5 }}
            display={{ md: "flex" }}
            p={10}
          ></Box>
        </Center>
      </Center>
    </Box>
  );
}

export default Contributors;
