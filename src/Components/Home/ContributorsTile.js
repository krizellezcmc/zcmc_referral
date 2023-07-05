import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";

function ContributorsTile(props) {
  return (
    <div>
      <Box width={props.width}>
        <Image src={props.image} width="100%" />
      </Box>
      <Box align="center">
        <Text fontSize={props.nameFontSize} color="gray.700" fontWeight={600}>
          {props.name}
        </Text>
        <Box align="center">
          <Text fontSize={{ lg: 13, md: 11, sm: 10 }} color="gray.700">
            {props.position}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default ContributorsTile;
