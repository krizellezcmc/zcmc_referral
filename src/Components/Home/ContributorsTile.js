import React from "react";
import {
  Text,
  Box,
  Image,
  Icon,
  Link,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function ContributorsTile(props) {
  return (
    <div>
      <Box

      // boxShadow="xl"
      >
        <Box height={props.height} width={props.width}>
          <Image src={props.image} width="100%" />
        </Box>
        <Box mt={14} align="center">
          <Text fontSize={props.nameFontSize} color="gray.700" fontWeight={600}>
            {props.name}
          </Text>
          <Box align="center">
            <Text fontSize={{ lg: 13, md: 11, sm: 10 }} color="gray.700">
              {props.position}
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ContributorsTile;
