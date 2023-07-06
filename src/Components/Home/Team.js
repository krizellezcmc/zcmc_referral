import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Contributors from "./Contributors";
import doc from "../../Assets/Profile/doc_kunting.png";
import ContributorsTile from "./ContributorsTile";
import SectionHeader from "./SectionHeader";

function Team(props) {
  return (
    <div>
      <Box py={20}>
        <SectionHeader title="Meet the Team" />
        <Center>
          <ContributorsTile
            image={doc}
            name="Dr. Afdal B. Kunting, MPH, FPCP"
            position="Medical Center Chief II"
            nameFontSize={{ lg: 15, md: 13, sm: 11.5 }}
            width={{ sm: 200, lg: 250 }}
          />
        </Center>

        <Box display="flex" justifyContent="center" alignItems="center" py={20}>
          <Contributors />
          {/* <Developers /> */}
        </Box>
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
