import React from "react";
import { Text, Box, Center } from "@chakra-ui/react";

import ContributorsTile from "./ContributorsTile";

function Contributors(props) {
  var doc1 = require("../../Assets/Profile/doc_kunting_head.png");
  var doc2 = require("../../Assets/Profile/doc_kath.png");
  var doc3 = require("../../Assets/Profile/doc_ori_new.png");

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
          The Contributors
        </Text>

        <Text mt={3} color="black" fontWeight={400} fontSize={{ sm: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore..
        </Text>
      </Box>
      <Center mt={{ lg: 5, md: 5, sm: 0 }} mb={10}>
        <Box
          flexShrink={0}
          mb={{ lg: 10, md: 5 }}
          align="center"
          display={{ md: "flex" }}
        >
          <ContributorsTile
            image={doc2}
            name="Dr. Katherine Lim-Eisma"
            position="Medical Officer III"
            nameFontSize={{ lg: 14, md: 12, sm: 11.5 }}
            height={{ sm: 200, lg: 300 }}
            width={{ sm: 200, lg: 300 }}
          />
          <ContributorsTile
            image={doc1}
            name="Dr. Afdal B. Kunting"
            position="Medical Center Chief III"
            nameFontSize={{ lg: 15, md: 13, sm: 11.5 }}
            height={{ sm: 300, lg: 400 }}
            width={{ sm: 300, lg: 400 }}
          />
          <ContributorsTile
            image={doc3}
            name="Dr. Orissa Alpuerto"
            position="Medical Officer III"
            nameFontSize={{ lg: 14, md: 12, sm: 11.5 }}
            height={{ sm: 200, lg: 300 }}
            width={{ sm: 200, lg: 300 }}
          />
        </Box>
      </Center>
    </Box>
  );
}

export default Contributors;
